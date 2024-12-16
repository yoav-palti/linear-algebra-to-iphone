# דגימה

<details>
  <summary>אמלק</summary>

ניתן לשחזר את האות $V\left(t\right)$ באופן מושלם מתוך הדגימות $V_{n}$ על ידי
הגדרה של האות הדגום

$$V_{s}\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)$$

וקונבולוציה שלו (אינטרפולציה) עם הפונקצייה $sinc\left(f_{s}t\right)=\frac{\sin\left(\pi f_{s}t\right)}{\pi f_{s}t}$
במידה ותדר הדגימה מקיים $f_{max}<\frac{f_{s}}{2}$

כלומר

$$\underset{\text{ירוקמה}-\text{תואה}}{\underbrace{V\left(t\right)}}=\sum_{n=-\infty}^{\infty}\underset{\text{תומיגדה}}{\underbrace{V_{n}}}\underset{sinc\left(f_{s}\left(t-n\Delta t\right)\right)}{\underbrace{\frac{\sin\left(\pi f_{s}\left(t-n\Delta t\right)\right)}{\pi f_{s}\left(t-n\Delta t\right)}}}$$

</details>

נתחיל מהתהליך של הדגימה וניתן על ההתחלה את התוצאה הכי חשובה בתחום

### משפט הדגימה של נייקוויסט-שאנון
אות $V\left(t\right)$ ניתן לשחזור במדוייק מתוך דגימותיו
$V_{n}=V\left(t_{n}\right)=V\left(n\cdot\Delta t\right)=V\left(\frac{n}{f_{s}}\right)$
אם:
1. יש תדר מקסימלי - $\tilde{V}\left(\left|f\right|>f_{max}\right)=0$
2. התדר המקסימלי הוא פחות מחצי תדר הדגימה - $f_{max}<\frac{f_{s}}{2}$

במקרה זה ניתן לשחזר את האות בצורה הבאה:

$$\underset{\text{ירוקמה}-\text{תואה}}{\underbrace{V\left(t\right)}}=\sum_{n=-\infty}^{\infty}\underset{\text{תומיגדה}}{\underbrace{V_{n}}}\underset{sinc\left(f_{s}\left(t-n\Delta t\right)\right)}{\underbrace{\frac{\sin\left(\pi f_{s}\left(t-n\Delta t\right)\right)}{\pi f_{s}\left(t-n\Delta t\right)}}}$$

וואו וואו וואו לא ניתן אלא להתרשם!

```{admonition} קצת אינטואיציה 
:class: tip
 אם אומרים לנו שתדר הדגימה מוגבל זה אומר משהו על השינוי של הפונקציה. כלומר שהיא משתנה לאט
 אם היא משתנה לאט ואנחנו דוגמים אותה מהר נוכל לעשות אינטרפולציה בין נקודות הדגימה כדי
 לשחזר את הפונקציה המקורית. אם נדגום מהר יותר ויותר אפילו אינטרפולציה לינארית
 בסוף תביא אותנו לפונקציה המקורית אלא שנצטרך תדר דגימה אינסופי כדי לשחזר בדיוק
 
 כאן נכנס היופי של המשפט, ישנן פונקציות שהן חסומות בתדר. כלומר ניתן לייצג אותן בבסיס כלשהו
 (בסיס התדר) כפונקציות על קטע סגור. אבל כבר נתקלנו בעבר בסיטואציה כזו... טור פורייה!
 
 טור פורייה של פונקציה על קטע סגור הוא בדיוק אותו הדבר, יצוג של פונקציה לכאורה אינסופית
 בעזרת מספר (אינסופי אך ספיר) של מקדמים.
 
 האמת שזה בדיוק הסיפור. תחשבו על "טור" פורייה של הייצוג של הפונקצייה שלנו בתדר. הוא משהו מהצורה:
 
 $$\tilde{V}\left(f\right)=\underset{\text{תוירוזחמ}-\text{ילב}}{\underbrace{Rect\left(\frac{f}{f_{s}}\right)}}\cdot\sum_{n=-\infty}^{\infty}\alpha_{n}e^{2\pi i\frac{n}{f_{s}}f}=Rect\left(\frac{f}{f_{s}}\right)\cdot\sum_{n=-\infty}^{\infty}V_{n}e^{2\pi in\frac{f}{f_{s}}}$$
 
נשים לב שהפונקציה שלנו יכולה להיות מוגדרת על כל קטע $\left[-\frac{f_{s}}{2},\frac{f_{s}}{2}\right]$ באורך $f_{s}$ כל עוד $f_{max}<\frac{f_{s}}{2}$ 

 נוכל לעשות פורייה הפוך בחזרה למרחב הזמן ולקבל
 
 $$V\left(t\right)=\mathcal{F}^{-1}\left[Rect\left(\frac{f}{f_{s}}\right)\cdot\sum_{n=-\infty}^{\infty}V_{n}e^{2\pi in\frac{f}{f_{s}}}\right]=sinc\left(f_{s}\cdot t\right)\ast\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-\frac{n}{f_{s}}\right)$$
 
 או במילים אחרות:
 
 $$V\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}sinc\left(f_{s}\left(t-n\Delta t\right)\right)$$

``` 

### "הוכחה"

נסתכל על האות הדגום:

$$V_{s}\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)=V\left(t\right)\cdot comb\left(\frac{t}{\Delta t}\right)$$

ונעשה לו טרנספורם פורייה

$$\tilde{V}_{s}\left(\omega\right)=\tilde{V}\left(\omega\right)\ast comb\left(\frac{\omega}{2\pi}\Delta t\right)=\tilde{V}\left(\omega\right)\ast comb\left(\frac{\omega}{2\pi f_{s}}\right)$$

האם ניתן לשחזר את $\tilde{V}\left(\omega\right)$ מתוך $\tilde{V}_{s}\left(\omega\right)$?

כן אבל רק אם $f_{max}<\frac{f_{s}}{2}$ למה? נסתכל בתמונה:

![AliasedSpectrum.png](images/AliasedSpectrum.png)

האות הכחול הוא מה שאנחנו רוצים. מה שיש לנו זה את האות הכחול קונבולוציה עם מסרק (רכבת הלמים). שזה האות בירוק
נוכל לשחזר את האות הכחול רק אם לא תהיה חפיפה בין השכפולים. נשים לב שהמרחק בין שכפולים
הוא $2\pi f_{s}$ בעוד הרוחב של האות שלנו הוא $2\pi\cdot\left(2f_{max}\right)$
ולכן אנחנו חייבים לעמוד בתנאי $f_{max}<\frac{f_{s}}{2}$

איך נשחזר את האות? על ידי LPF מלבני. מכפלה בחלון בתדר היא קונבולוציה עם sinc בזמן.
קיבלנו כי:

$$\tilde{V}\left(\omega\right)=\tilde{V}_{s}\left(\omega\right)\cdot Rect\left(\frac{\omega}{2\pi f_{s}}\right)$$

נעשה פורייה הפוך:

$$V\left(t\right)=V_{s}\left(t\right)\ast sinc\left(f_{s}\cdot t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)\ast sinc\left(f_{s}\cdot t\right)$$

ושוב קיבלנו:

$$V\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}sinc\left(f_{s}\left(t-n\Delta t\right)\right)$$

```{admonition} שחזור אידאלי

ניתן לשחזר את האות $V\left(t\right)$ באופן מושלם מתוך הדגימות $V_{n}$ על ידי
הגדרה של האות הדגום $V_{s}\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)$
וקונבולוציה שלו (אינטרפולציה) עם הפונקצייה $sinc\left(f_{s}t\right)=\frac{\sin\left(\pi f_{s}t\right)}{\pi f_{s}t}$
במידה ותדר הדגימה מקיים $f_{max}<\frac{f_{s}}{2}$

```

