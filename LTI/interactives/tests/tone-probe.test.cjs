const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../frequency-response.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match=>match[1]);
const sandbox={window:{}};vm.runInNewContext(scripts[0],sandbox);
const model=sandbox.window.MicrophoneToneProbe;
const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
test('the sinusoid probe reads the physical microphone gain and phase at the selected frequency',()=>{
  const system={mass:1.65,damping:.82,stiffness:3.32};
  for(const omega of [.2,1,1.4,3,6]){
    const source={mode:'one',frequencies:[omega,2,4],enabled:[true,true,true]},parts=model.components(system,source);
    assert.equal(parts[0].amplitude,1);assert.equal(parts.filter(p=>p.enabled).length,1);
    const {gain,phase}=parts[0];near(gain,1/Math.hypot(3.32-1.65*omega**2,.82*omega));
    near(phase,-Math.atan2(.82*omega,3.32-1.65*omega**2));
    for(const t of [0,.1,1,3.7,12]){near(model.sum(t,parts),Math.cos(omega*t));near(model.sum(t,parts,true),gain*Math.cos(omega*t+phase));}
  }
});
test('single and three-tone outputs solve the same steady-state microphone equation at slider extremes',()=>{
  for(const mass of [.2,1.65,4])for(const damping of [.1,.82,8])for(const stiffness of [.2,3.32,8])for(const mode of ['one','three']){
    const system={mass,damping,stiffness},parts=model.components(system,{mode,frequencies:[.2,1.4,6],enabled:[true,true,true]});
    for(const t of [0,.7,3.1,9.6]){
      let first=0,second=0;
      for(const p of parts.filter(p=>p.enabled)){
        first-=p.amplitude*p.gain*p.omega*Math.sin(p.omega*t+p.phase);
        second-=p.amplitude*p.gain*p.omega**2*Math.cos(p.omega*t+p.phase);
      }
      near(mass*second+damping*first+stiffness*model.sum(t,parts,true),model.sum(t,parts));
    }
  }
});
test('excluding a component subtracts its contribution without rescaling the others',()=>{
  const system={mass:1.65,damping:.82,stiffness:3.32},source={mode:'three',frequencies:[1,1.4,3],enabled:[true,true,true]};
  const all=model.components(system,source),without=model.components(system,{...source,enabled:[true,false,true]});
  assert.deepEqual(all.map(p=>p.amplitude),without.map(p=>p.amplitude));
  for(const output of [false,true])for(const t of [0,.5,3,12]){
    const p=all[1],contribution=p.amplitude*(output?p.gain:1)*Math.cos(p.omega*t+(output?p.phase:0));
    near(model.sum(t,all,output)-model.sum(t,without,output),contribution);
  }
});
test('the response has conjugate symmetry and both authored scripts parse',()=>{
  const system={mass:1.65,damping:.82,stiffness:3.32};
  for(const omega of [.2,1,4]){near(model.response(-omega,system).gain,model.response(omega,system).gain);near(model.response(-omega,system).phase,-model.response(omega,system).phase);}
  scripts.forEach(script=>new vm.Script(script));
});
