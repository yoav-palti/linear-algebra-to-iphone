# דמו: דגימה ו-Aliasing

הדמו הקטן הזה מציג את אחת התופעות הכי חשובות בדגימה: אם דוגמים לאט מדי, אות מהיר יכול להיראות בדיוק כמו אות איטי יותר. זו לא רק בעיה גרפית, אלא איבוד מידע אמיתי.

הקו הכחול הוא אות רציף, הנקודות השחורות הן הדגימות, והקו הכתום הוא שחזור פשוט מסוג zero-order hold. נסו להעלות את תדר האות עד שהוא עובר את תדר נייקוויסט.

```{raw} html
<div id="aliasing-demo" dir="rtl">
  <style>
    #aliasing-demo {
      max-width: 960px;
      margin: 1rem 0;
      font-family: system-ui, sans-serif;
    }

    #aliasing-demo .controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 0.75rem;
      margin: 0 0 0.75rem;
    }

    #aliasing-demo label {
      display: grid;
      gap: 0.25rem;
      font-weight: 600;
    }

    #aliasing-demo input {
      width: 100%;
    }

    #aliasing-demo canvas {
      display: block;
      width: 100%;
      max-width: 900px;
      height: auto;
      border: 1px solid #c9ced6;
      background: #fff;
    }

    #aliasing-demo .note {
      margin-top: 0.5rem;
      font-weight: 600;
    }

    #aliasing-demo .aliasing-warning {
      color: #b42318;
    }
  </style>

  <div class="controls">
    <label>
      תדר האות f:
      <input id="aliasing-demo-f" type="range" min="1" max="40" value="12">
      <span><span id="aliasing-demo-f-value">12</span> Hz</span>
    </label>

    <label>
      תדר הדגימה fs:
      <input id="aliasing-demo-fs" type="range" min="10" max="60" value="24">
      <span><span id="aliasing-demo-fs-value">24</span> Hz</span>
    </label>
  </div>

  <canvas id="aliasing-demo-canvas" width="900" height="260" aria-label="דמו של דגימת גל סינוס"></canvas>
  <div id="aliasing-demo-note" class="note"></div>
</div>

<script>
(function () {
  const root = document.getElementById("aliasing-demo");
  const canvas = document.getElementById("aliasing-demo-canvas");
  const g = canvas.getContext("2d");
  const fInput = document.getElementById("aliasing-demo-f");
  const fsInput = document.getElementById("aliasing-demo-fs");
  const fValue = document.getElementById("aliasing-demo-f-value");
  const fsValue = document.getElementById("aliasing-demo-fs-value");
  const note = document.getElementById("aliasing-demo-note");

  function draw() {
    const f = Number(fInput.value);
    const fs = Number(fsInput.value);
    const duration = 2;
    const width = canvas.width;
    const height = canvas.height;
    const left = 40;
    const right = width - 10;
    const mid = height / 2;
    const amp = 80;

    fValue.textContent = f.toFixed(0);
    fsValue.textContent = fs.toFixed(0);

    g.clearRect(0, 0, width, height);

    g.strokeStyle = "#d7dce3";
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(left, mid);
    g.lineTo(right, mid);
    g.stroke();

    g.strokeStyle = "#1e88e5";
    g.lineWidth = 2;
    g.beginPath();
    for (let x = left; x <= right; x += 1) {
      const t = ((x - left) / (right - left)) * duration;
      const y = Math.sin(2 * Math.PI * f * t);
      const yy = mid - y * amp;
      if (x === left) {
        g.moveTo(x, yy);
      } else {
        g.lineTo(x, yy);
      }
    }
    g.stroke();

    const samples = [];
    const sampleCount = Math.floor(duration * fs) + 1;
    for (let n = 0; n < sampleCount; n += 1) {
      const t = n / fs;
      const y = Math.sin(2 * Math.PI * f * t);
      const x = left + (t / duration) * (right - left);
      const yy = mid - y * amp;
      samples.push({ x, yy });
    }

    g.strokeStyle = "#f97316";
    g.lineWidth = 2;
    g.beginPath();
    samples.forEach((sample, index) => {
      const next = samples[Math.min(index + 1, samples.length - 1)];
      if (index === 0) {
        g.moveTo(sample.x, sample.yy);
      }
      g.lineTo(next.x, sample.yy);
    });
    g.stroke();

    g.fillStyle = "#111827";
    samples.forEach((sample) => {
      g.beginPath();
      g.arc(sample.x, sample.yy, 3, 0, 2 * Math.PI);
      g.fill();
    });

    const nyquist = fs / 2;
    if (f === nyquist) {
      note.innerHTML = `תדר נייקוויסט הוא ${nyquist.toFixed(1)} Hz. <span class="aliasing-warning">זהו מקרה הגבול: בסינוס שבדמו כל הדגימות הן אפס, ולכן אי אפשר לשחזר מהן את האות.</span>`;
    } else if (f > nyquist) {
      note.innerHTML = `תדר נייקוויסט הוא ${nyquist.toFixed(1)} Hz. <span class="aliasing-warning">יש aliasing: האות מהיר מדי ביחס לדגימה.</span>`;
    } else {
      note.textContent = `תדר נייקוויסט הוא ${nyquist.toFixed(1)} Hz. תדר האות נמוך מתדר נייקוויסט, ולכן אין חפיפה בין העתקי הספקטרום של הסינוס הזה.`;
    }
  }

  fInput.addEventListener("input", draw);
  fsInput.addEventListener("input", draw);
  draw();
}());
</script>
```

```{admonition} מה לקחת מהדמו?
:class: tip
תדר הדגימה לא רק קובע כמה נקודות יהיו לנו. הוא גם קובע איזה תדרים בכלל אפשר להבחין בהם. מעל $f_s/2$, תדרים שונים יכולים לתת את אותן דגימות בדיוק.
```
