const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'../../..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const scripts=html=>[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const sandbox={window:{}};vm.runInNewContext(scripts(read('LTI/interactives/process-models.html'))[0],sandbox);
const m=sandbox.window.ProcessModels;
const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
const rms=s=>Math.sqrt(s.values.reduce((sum,v)=>sum+v*v,0)/s.values.length);
test('FFT round trip and ideal filtering preserve physical amplitude',()=>{
  const s=m.signal(t=>.7*Math.cos(2*Math.PI*250*t)+.3*Math.sin(2*Math.PI*375*t)),re=s.values.slice(),im=new Float64Array(re.length);
  m.fft(re,im);m.fft(re,im,true);re.forEach((v,i)=>near(v,s.values[i]));
  const filtered=m.lowpass(s,300);filtered.values.forEach((v,i)=>near(v,.7*Math.cos(2*Math.PI*250*i/s.rate)));
});
test('diode/RC simulation charges on peaks, decays exponentially, and removes only DC',()=>{
  const data=m.amEnvelope(),decay=Math.exp(-1/(25600*.00045));
  data.held.values.forEach((v,i)=>{assert.ok(v>=data.rectified.values[i]-1e-12);if(i)near(v,Math.max(data.rectified.values[i],data.held.values[i-1]*decay));});
  near(data.recovered.values.reduce((a,b)=>a+b,0),0,1e-8);
  const constant=m.signal(t=>Math.cos(2*Math.PI*4000*t));
  assert.ok(rms(m.dc(m.diode(constant,.00005)))>rms(m.dc(m.diode(constant,.00045))));
});
test('heterodyne selects either station at the same IF with the mixer half gain',()=>{
  for(const [lo,offset,amplitude,messageFrequency] of [[1200,.5,.3,250],[2200,.2,.1,375]]){
    const data=m.heterodyne({lo});
    data.intermediate.values.forEach((v,i)=>{const t=i/25600;near(v,(offset+amplitude*Math.cos(2*Math.PI*messageFrequency*t))*Math.cos(2*Math.PI*1200*t));});
    data.recovered.values.forEach((v,i)=>near(v,amplitude*Math.cos(2*Math.PI*messageFrequency*i/25600)));
  }
  near(rms(m.heterodyne({lo:1200,width:100}).recovered),0);
});
test('FM differentiator uses explicit fixed gain and recovery preserves the message',()=>{
  for(const deviation of [100,600,1000])for(const message of ['tone','two']){
    const data=m.fm({deviation,message});
    data.recovered.values.forEach((v,i)=>near(v,data.original.values[i]));
    for(let i=1;i<100;i++){
      const t=i/25600,h=1e-8;
      const integral=t=>message==='two'?.6*Math.sin(2*Math.PI*250*t)/(2*Math.PI*250)+.4*Math.sin(2*Math.PI*375*t)/(2*Math.PI*375):Math.sin(2*Math.PI*250*t)/(2*Math.PI*250);
      const r=t=>Math.cos(2*Math.PI*3000*t+2*Math.PI*deviation*integral(t));
      near(data.differentiated.values[i],(r(t+h)-r(t-h))/(2*h*2*Math.PI*3000),1e-7);
    }
  }
});
test('I/Q receiver separates signals, rotates with the correct LO sign, and clips information at low cutoff',()=>{
  for(const phase of [-90,0,45,90]){
    const data=m.iq({phase}),theta=phase*Math.PI/180;
    data.outI.values.forEach((v,i)=>near(v,data.i.values[i]*Math.cos(theta)+data.q.values[i]*Math.sin(theta)));
    data.outQ.values.forEach((v,i)=>near(v,-data.i.values[i]*Math.sin(theta)+data.q.values[i]*Math.cos(theta)));
  }
  const narrow=m.iq({cutoff:300});near(rms(narrow.outQ),0);near(rms(narrow.outI),.75/Math.sqrt(2));
});
test('all interpolation methods pass through the samples; sinc aliases and antialias filtering removes the offending tone',()=>{
  for(const method of ['sinc','hold','linear']){
    const data=m.sampling({rate:1000,frequency:900,message:'tone',method});
    for(let n=0;n<100;n++){const index=Math.round(n/1000*25600);if(index%128===0)near(data.recovered.values[index],.8*Math.cos(2*Math.PI*900*n/1000));}
  }
  const folded=m.sampling({rate:1000,frequency:900,message:'tone'});
  folded.recovered.values.forEach((v,i)=>near(v,.8*Math.cos(2*Math.PI*100*i/25600)));
  const protectedData=m.sampling({rate:1000,frequency:900,cutoff:400});
  protectedData.recovered.values.forEach((v,i)=>near(v,.5*Math.cos(2*Math.PI*250*i/25600)));
  for(const method of ['sinc','hold','linear']){
    const data=m.sampling({rate:4000,message:'two',method});
    for(let n=0;n<80;n+=5){const index=n*25600/4000;near(data.recovered.values[index],data.samples.values[n]);}
  }
});
test('windowed spectra are continuous samples of both signs, keep absolute gain, and show sample replicas',()=>{
  const s=m.signal(t=>Math.cos(2*Math.PI*250*t)),spectrum=m.spectrum(s);
  const peak=(data,x)=>data.y[data.x.reduce((best,v,i)=>Math.abs(v-x)<Math.abs(data.x[best]-x)?i:best,0)];
  near(peak(spectrum,.25),.5,1e-6);near(peak(spectrum,-.25),.5,1e-6);
  const doubled=m.spectrum(m.map(s,v=>2*v));near(peak(doubled,.25),1,1e-6);
  const samples=m.sampling({rate:1000,frequency:250,message:'tone'}).samples,dtft=m.spectrum(samples,0,20,2);
  near(peak(dtft,.25),.4,1e-3);near(peak(dtft,1.25),.4,1e-3);near(peak(dtft,-1.25),.4,1e-3);
});
test('matched filter has unit clean peak at the causal delay, and threshold controls the decision',()=>{
  for(const shape of ['rect','biphasic']){
    const data=m.matched({noise:0,arrival:60,shape}),peak=Math.max(...data.correlated.values),index=data.correlated.values.indexOf(peak);
    near(peak,1);assert.equal(index,480+159);near(index/8-159/8,60);
    assert.equal(data.decision.values[index],1);
  }
  assert.equal(Math.max(...m.matched({noise:0,present:'no'}).decision.values),0);
  assert.equal(Math.max(...m.matched({noise:0,threshold:1.2}).decision.values),0);
  assert.deepEqual(m.matched({seed:42}).received.values,m.matched({seed:42}).received.values);
  assert.notDeepEqual(m.matched({seed:42}).received.values,m.matched({seed:43}).received.values);
});
test('every new embedded script parses and each illustration has valid selectable signals',()=>{
  new vm.Script(scripts(read('LTI/interactives/process-lab.html'))[0]);
  const configs=[];
  for(const file of ['analog_communication/interactives/envelope-detector.html','analog_communication/interactives/heterodyne.html','analog_communication/interactives/fm-detector.html','digital_communication/interactives/iq-receiver.html','digitation_and_reconstruction/interactives/sampling-process.html','noise/interactives/matched-detector.html']){
    for(const script of scripts(read(file)))vm.runInNewContext(script,{ProcessModels:m,ProcessLab:{mount:(id,config)=>configs.push({id,config})}});
  }
  assert.equal(new Set(configs.map(c=>c.id)).size,6);
  for(const {config} of configs){const data=config.model(config.initial);for(const stage of config.stages){assert.ok(data[stage.input]);assert.ok(data[stage.output]);assert.ok(config.signals[stage.output]);}}
});
