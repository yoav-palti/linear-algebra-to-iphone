const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../qam-constellation.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match=>match[1]);
const sandbox={window:{}};
vm.runInNewContext(scripts[0],sandbox);
const m=sandbox.window.QAMConstellation;
const near=(a,b,tolerance=1e-10)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
test('16-QAM has fixed energy, balanced symbols and correct noiseless decisions',()=>{
  const data=m.samples({phase:0,snr:Infinity});
  assert.equal(m.alphabet.length,16);assert.equal(data.symbols.length,256);
  near(data.symbols.reduce((sum,s)=>sum+s.i*s.i+s.q*s.q,0)/256,10);
  for(let start=0;start<256;start+=16)assert.equal(new Set(data.symbols.slice(start,start+16).map(s=>s.i+':'+s.q)).size,16);
  data.received.forEach((r,n)=>{near(r.i,data.symbols[n].i);near(r.q,data.symbols[n].q);assert.equal(r.error,false);});
});
test('positive phase error rotates counterclockwise and retains the section convention',()=>{
  const data=m.samples({phase:90,snr:Infinity});
  data.received.forEach((r,n)=>{near(r.i,-data.symbols[n].q);near(r.q,data.symbols[n].i);assert.equal(r.error,true);});
});
test('frequency error adds 2pi delta-f Ts radians per symbol without changing amplitude',()=>{
  for(const frequency of [-20,-3,0,3,20]){
    const data=m.samples({phase:25,frequency,snr:Infinity});
    data.received.forEach((r,n)=>{
      near(r.angle,25*Math.PI/180+2*Math.PI*frequency*n*.001);
      near(r.i*r.i+r.q*r.q,data.symbols[n].i**2+data.symbols[n].q**2);
      if(n)near(r.angle-data.received[n-1].angle,2*Math.PI*frequency*.001);
    });
  }
});
test('SNR scales a reproducible complex AWGN realization with variance Es/(2 SNR)',()=>{
  const low=m.samples({phase:0,snr:10,seed:17}),high=m.samples({phase:0,snr:30,seed:17});
  near(low.sigma**2,.5);near(high.sigma**2,.005);
  for(let n=0;n<256;n++){
    near(low.received[n].i-low.symbols[n].i,10*(high.received[n].i-high.symbols[n].i));
    near(low.received[n].q-low.symbols[n].q,10*(high.received[n].q-high.symbols[n].q));
  }
  assert.deepEqual(high.received,m.samples({phase:0,snr:30,seed:17}).received);
  assert.notDeepEqual(high.received,m.samples({phase:0,snr:30,seed:18}).received);
});
test('all slider extremes are finite and the deferred illustration scripts parse',()=>{
  for(const phase of [-180,180])for(const frequency of [-20,20])for(const snr of [0,40]){
    const data=m.samples({phase,frequency,snr});
    assert.ok(data.received.every(r=>Number.isFinite(r.i)&&Number.isFinite(r.q)));
  }
  scripts.forEach(script=>new vm.Script(script));
});
