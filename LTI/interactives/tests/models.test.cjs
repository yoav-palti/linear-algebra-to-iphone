const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../runtime.html'),'utf8');
const sandbox={window:{}};
vm.runInNewContext(source.match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
const m=sandbox.window.CourseInteractives.models;
const near=(actual,expected,tolerance=1e-10)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} versus ${expected}`);
function integrate(fn,min,max,step=0.002){let total=0;const count=Math.round((max-min)/step);for(let i=0;i<=count;i++)total+=fn(min+i*step)*(i===0||i===count?0.5:1);return total*step;}

test('RC distinguishes half-power cutoff from half-amplitude width',()=>{
  for(const tau of [0.05,0.1691,1]) {
    near(m.rc(0,tau).magnitude,1);
    near(m.rc(1/tau,tau).magnitude**2,0.5);
    near(m.rc(1/tau,tau).phase,-Math.PI/4);
    near(m.rc(Math.sqrt(3)/tau,tau).magnitude,0.5);
  }
});
test('RLC resonance, exact half-power roots and bandwidth agree across slider extremes',()=>{
  for(const r of [0.0001,0.04365,0.1])for(const l of [0.1e-9,0.47e-9,2e-9])for(const c of [1e-9,69.18e-9,100e-9]) {
    const p=m.rlcParameters(r,l,c);
    near(m.rlc(0,r,l,c).magnitude,0);
    near(m.rlc(p.resonance,r,l,c).magnitude,1,1e-9);
    near(m.rlc(p.resonance,r,l,c).phase,0,1e-9);
    near(m.rlc(p.lower,r,l,c).magnitude**2,0.5,1e-8);
    near(m.rlc(p.upper,r,l,c).magnitude**2,0.5,1e-8);
    near((p.upper-p.lower)/p.bandwidth,1,1e-8);
    near(p.q,p.resonance/p.bandwidth,1e-8);
  }
});
test('two-path interference uses the chapter Fourier normalization and breaks undefined phase',()=>{
  const delta=1.5,sum=3.1;
  near(m.room(0,delta,sum,0.5).magnitude,1/Math.sqrt(2*Math.PI));
  near(m.room(Math.PI/delta,delta,sum,0.5).magnitude,0);
  assert.ok(Number.isNaN(m.room(Math.PI/delta,delta,sum,0.5).phase));
  for(const w of [0.2,1,8]) {
    const positive=m.room(w,delta,sum,0.2),negative=m.room(-w,delta,sum,0.2);
    near(positive.re,negative.re);near(positive.im,-negative.im);
    near(m.room(w,delta,sum,0).magnitude,0.5/Math.sqrt(2*Math.PI));
  }
});
test('normal PDFs stay normalized and the shaded standard-deviation interval is constant',()=>{
  for(const [mean,sigma] of [[-3.1,1.32],[0,0.4],[4,2.5]]) {
    const f=x=>m.gaussian(x,mean,sigma);
    near(integrate(f,mean-10*sigma,mean+10*sigma),1,1e-7);
    near(integrate(f,mean-sigma,mean+sigma),0.682689492,2e-6);
    near(f(mean),1/(Math.sqrt(2*Math.PI)*sigma));
  }
});
test('telegraph process satisfies Bernoulli power, symmetry, stationarity limit and initial condition',()=>{
  for(const l0 of [0.1,2,4])for(const l1 of [0.1,1,4]) {
    const p=m.telegraph(l0,l1);
    near(p.correlation(0),p.mean);
    near(p.correlation(0),p.mean*p.mean+p.variance);
    near(p.correlation(1000),p.mean*p.mean);
    near(p.correlation(-0.7),p.correlation(0.7));
    near(p.conditional(0),1);near(p.conditional(1000),p.mean);
  }
});
test('conjugate load matching attains the available power and is the global optimum',()=>{
  for(const rs of [0.5,3.6,8])for(const xs of [-5,0,2.6,5]) {
    near(m.loadPower(rs,rs,xs,-xs),1/(4*rs));
    for(const xl of [-5,0,5]) {
      const optimum=m.optimalResistance(rs,xs,xl),max=m.loadPower(optimum,rs,xs,xl);
      assert.ok(max<=1/(4*rs)+1e-10);
      assert.ok(m.loadPower(optimum*0.8,rs,xs,xl)<max);
      assert.ok(m.loadPower(optimum*1.2,rs,xs,xl)<max);
    }
  }
});
test('numerical convolution recovers the analytic triangle from equal rectangles',()=>{
  const rectangle=t=>m.signal('rectangle',1,1,t),result=m.convolution(rectangle,rectangle);
  for(const t of [-3,-2,-1,0,0.5,1,2,3])near(result.at(t),Math.max(0,2-Math.abs(t)),0.011);
});
test('Gaussian convolution broadens analytically, preserves area and commutes',()=>{
  const a=0.7,b=1.2,f=t=>m.signal('gaussian',a,1,t),g=t=>m.signal('gaussian',b,1,t);
  const result=m.convolution(f,g),reverse=m.convolution(g,f),width=Math.hypot(a,b);
  for(const t of [-2,-0.5,0,1,3]) {
    near(result.at(t),m.signal('gaussian',width,1,t),2e-5);
    near(result.at(t),reverse.at(t),1e-10);
  }
  near(integrate(t=>result.at(t),-6,6,0.02),1,1e-7);
});
test('finite impulse and train approximations have the stated areas',()=>{
  for(const width of [0.3,0.7,2]) {
    near(integrate(t=>m.signal('impulse',width,1,t),-20,20,0.01),1,1e-8);
    near(integrate(t=>m.signal('train',width,1,t),-20,20,0.01),7,1e-7);
  }
});
test('all authored inline scripts parse as JavaScript',()=>{
  const root=path.resolve(__dirname,'../../..');
  const files=[...fs.readdirSync(path.join(root,'LTI/interactives')).map(f=>path.join(root,'LTI/interactives',f)),
    ...['RLC','noise'].flatMap(ch=>fs.readdirSync(path.join(root,ch,'interactives')).map(f=>path.join(root,ch,'interactives',f)))];
  for(const file of files.filter(f=>f.endsWith('.html'))) {
    for(const match of fs.readFileSync(file,'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1],{filename:file});
  }
});
