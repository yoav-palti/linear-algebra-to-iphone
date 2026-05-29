# בדיקת תוכן

```{raw} html
<!DOCTYPE html><meta charset="utf-8">
<title>Sampling & Aliasing</title>
<style>body{font:14px system-ui;margin:20px}canvas{border:1px solid #ccc}</style>
<h2>Sampling & Aliasing</h2>
<p>Blue = continuous sine, black dots = samples, orange = ZOH reconstruction. Adjust <b>f</b> and <b>f<sub>s</sub></b>.</p>
<label>Signal frequency f (Hz): <input id="f" type="range" min="1" max="40" value="12"></label>
<label>Sampling rate f<sub>s</sub> (Hz): <input id="fs" type="range" min="10" max="60" value="24"></label>
<canvas id="cv" width="900" height="260"></canvas>
<div id="note"></div>
<script>
const cv=document.getElementById('cv'), g=cv.getContext('2d');
function draw(){
  const f=+fIn.value, fs=+fsIn.value, T=2; // seconds
  const W= cv.width, H=cv.height, N=W;
  g.clearRect(0,0,W,H);
  // axes
  g.strokeStyle="#ddd"; g.beginPath(); g.moveTo(40,H/2); g.lineTo(W-10,H/2); g.stroke();
  // continuous sine
  g.strokeStyle="#1e90ff"; g.beginPath();
  for(let x=0;x<W;x++){
    const t = (x-40)/(W-80)*T;
    const y = Math.sin(2*Math.PI*f*t);
    const yy = H/2 - y*80;
    if(x===40) g.moveTo(x,yy); else g.lineTo(x,yy);
  }
  g.stroke();
  // samples
  const Ts = 1/fs; const Ns = Math.floor(T/Ts)+1; let samples=[];
  for(let n=0;n<Ns;n++){
    const t=n*Ts, y=Math.sin(2*Math.PI*f*t);
    const x= 40 + (t/T)*(W-80), yy=H/2 - y*80;
    samples.push({x,yy,y});
  }
  g.fillStyle="#000";
  samples.forEach(s=>{g.beginPath(); g.arc(s.x,s.yy,3,0,2*Math.PI); g.fill();});
  // ZOH
  g.strokeStyle="#ff7f0e"; g.beginPath();
  for(let i=0;i<samples.length;i++){
    const s=samples[i], s2=samples[Math.min(i+1,samples.length-1)];
    if(i===0) g.moveTo(s.x,s.yy);
    g.lineTo(s2.x,s.yy);
  } g.stroke();
  // Nyquist note
  const ny=fs/2;
  document.getElementById('note').innerHTML=
    `Nyquist = ${ny.toFixed(1)} Hz. ${f>ny?'<b style="color:#c00">Aliasing occurs</b>':'No aliasing (ideal)'} for this pure sine.`;
}
const fIn=document.getElementById('f'), fsIn=document.getElementById('fs');
[fIn,fsIn].forEach(e=>e.oninput=draw); draw();
</script>
<p style="max-width:820px;color:#555">Reference: Nyquist–Shannon sampling theorem and Nyquist frequency. </p>
```
