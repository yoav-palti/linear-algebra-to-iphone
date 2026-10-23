const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../coherent-am.html'),'utf8');
const sandbox={window:{}};
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match=>match[1]);
vm.runInNewContext(scripts[0],sandbox);
const m=sandbox.window.CoherentAM;
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
test('synchronized receiver recovers each input with the physical mixer gain',()=>{
  for(const message of Object.keys(m.messages)) {
    const s=m.chain({message});
    for(let i=0;i<100;i++){
      const t=i*.000137;
      near(m.at(s.received,t),(1+.7*m.at(s.original,t))*Math.cos(2*Math.PI*2400*t));
      near(m.at(s.mixed,t),m.at(s.received,t)*Math.cos(2*Math.PI*2400*t));
      near(m.at(s.filtered,t),.5+.35*m.at(s.original,t));
      near(m.at(s.recovered,t),.35*m.at(s.original,t));
    }
  }
});
test('phase error attenuates, nulls, and inverts the recovered message',()=>{
  for(const phase of [0,30,90,180]){
    const s=m.chain({phase,message:'two'});
    for(let i=0;i<50;i++)near(m.at(s.recovered,i*.00023),.35*Math.cos(phase*Math.PI/180)*m.at(s.original,i*.00023));
  }
});
test('frequency offset produces beats; removing DC does not remove the offset carrier',()=>{
  for(const offset of [-40,20,40]){
    const s=m.chain({offset});
    for(let i=0;i<100;i++){
      const t=i*.00137;
      near(m.at(s.recovered,t),.5*(1+.7*m.at(s.original,t))*Math.cos(2*Math.PI*offset*t));
    }
    assert.ok(s.recovered.some(c=>c.f===Math.abs(offset)));
  }
});
test('the oscillator checkpoint shows the exact signal feeding the mixer',()=>{
  for(const phase of [0,90,180])for(const offset of [-40,0,40]){
    const s=m.chain({phase,offset});
    for(let i=0;i<50;i++){
      const t=i*.000139;
      near(m.at(s.oscillator,t),Math.cos(2*Math.PI*(2400+offset)*t+phase*Math.PI/180));
      near(m.at(s.mixed,t),m.at(s.received,t)*m.at(s.oscillator,t));
    }
  }
});
test('ideal low-pass removes only out-of-band tones and preserves fixed amplitudes',()=>{
  const s=m.chain({message:'two',cutoff:250});
  assert.ok(s.filtered.every(c=>Math.abs(c.f)<=250));
  const lines=m.spectrum(s.recovered);
  assert.equal(lines.length,1);near(lines[0].f,220);near(lines[0].amplitude,.21);
  const received=m.spectrum(s.received);
  near(received.find(c=>c.f===2400).amplitude,1);
  near(received.find(c=>c.f===2620).amplitude,.21);
});
test('all controls stay finite and conjugate symmetric; fixed audio gain cannot clip',()=>{
  for(const message of Object.keys(m.messages))for(const phase of [0,90,180])for(const offset of [-40,0,40])for(const cutoff of [100,800]){
    const s=m.chain({message,phase,offset,cutoff});
    for(const terms of Object.values(s)){
      assert.ok(terms.reduce((a,c)=>a+Math.hypot(c.re,c.im),0)*.12<1);
      for(const c of terms){assert.ok(Number.isFinite(c.re)&&Number.isFinite(c.im));const pair=terms.find(p=>p.f===-c.f);assert.ok(pair);near(c.re,pair.re);near(c.im,-pair.im);}
    }
  }
});
test('inline scripts parse',()=>{for(const script of scripts)new vm.Script(script);});
test('continuous spectrum matches numerical Fourier integration of the Hann-windowed signal',()=>{
  const terms=m.chain({message:'two',phase:30}).mixed,start=.007,T=.04;
  const curve=m.windowedSpectrum(terms,start,T),count=8000,dt=T/count;
  for(const frequency of [-4800,-330,-220,0,220,330,4800]){
    const index=curve.x.findIndex(f=>Math.abs(f*1000-frequency)<1e-8);
    assert.ok(index>=0);
    let re=0,im=0;
    for(let i=0;i<=count;i++){
      const t=start+i*dt,w=.5-.5*Math.cos(2*Math.PI*i/count),value=m.at(terms,t)*w;
      re+=value*Math.cos(2*Math.PI*frequency*t)*dt;
      im-=value*Math.sin(2*Math.PI*frequency*t)*dt;
    }
    assert.ok(Math.abs(curve.y[index]-Math.hypot(re,im)/(T/2))<1e-8);
  }
});
test('melody changes pitch across its four notes and repeats without a discontinuity',()=>{
  const terms=m.chain({message:'melody'}).original;
  for(const [index,pitch] of [220,275,330,275].entries()){
    const curve=m.windowedSpectrum(terms,index*.5+.23);
    const positive=curve.y.filter((_,i)=>curve.x[i]>=0);
    const maximum=curve.y.length-positive.length+positive.indexOf(Math.max(...positive));
    assert.ok(Math.abs(curve.x[maximum]*1000-pitch)<=2.5);
  }
  near(m.at(terms,.123),m.at(terms,2.123));
});
test('full windowed magnitude covers both frequency signs with conjugate symmetry',()=>{
  const curve=m.windowedSpectrum(m.chain({message:'chord',phase:30,offset:20}).mixed,.25);
  near(curve.x[0],-5.5);near(curve.x.at(-1),5.5);
  assert.equal(curve.x.filter(x=>x===0).length,1);
  for(let i=0;i<curve.x.length;i++){
    near(curve.x[i],-curve.x[curve.x.length-1-i]);
    near(curve.y[i],curve.y[curve.y.length-1-i]);
    assert.ok(Number.isFinite(curve.y[i]));
  }
});
test('audio and plotted sample generation preserve the same waveform and amplitude',()=>{
  const terms=m.chain({message:'melody'}).mixed,values=m.series(terms,.25,1/48000,96000);
  for(let i=0;i<values.length;i+=997)assert.ok(Math.abs(values[i]-m.at(terms,.25+i/48000))<3e-6);
});
