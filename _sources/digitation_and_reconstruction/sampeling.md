# דגימה

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