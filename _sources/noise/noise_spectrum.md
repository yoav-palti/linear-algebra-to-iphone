# רעש במרחב התדר

ראינו כבר עד עכשיו שאותות יותר נוח לנתח במרחב התדר. בעיקר כשיש לנו
מערכת לינארית שהאות עובר דרכה.

אני מזכיר שמעכשיו האות שלנו הולך להיות מהצורה:

$$x\left(t\right)=\underset{\text{תוא}}{\underbrace{s\left(t\right)}}+\underset{\text{שער}}{\underbrace{n\left(t\right)}}$$

היינו רוצים לכתוב:

$$\tilde{X}\left(\omega\right)=\tilde{S}\left(\omega\right)+\tilde{N}\left(\omega\right)$$

וזה אכן נכון אבל נשים לב שאין לנו נוסחה ל-$n\left(t\right)$ כך שאנחנו לא באמת יכולים
לחשב את $\tilde{N}\left(\omega\right)$. עבור כל ריאליזציה נקבל משהו שונה.

מה כן יש לנו בכלל?
אם נניח שהאות הוא WSS (wide sense stationary - סטציונרי במובן הרחב)
אז יש לנו שתי תכונות של האות שאנחנו יכולים לעבוד איתן:
* ממוצע - $\mu_{x}$
* פונקציית אוטוקורלציה - $R_{x}\left(\tau\right)$

נשים לב שהאוטוקורלציה של האות מאוד מזכירה לנו קונבולוציה
רק שלא הופכים את אחת הפונקציות:

$$R_{x}\left(\tau\right)=\intop_{-\infty}^{\infty}x\left(t\right)x^{\ast}\left(t+\tau\right)=\intop_{-\infty}^{\infty}x\left(t\right)x^{\ast}\left(\tau-\left(-t\right)\right)dt=x\left(t\right)\ast x\left(-t\right)$$
$$\tilde{S}_{xx}\left(\omega\right)=\mathcal{F}\left[R_{x}\left(\tau\right)\right]=\mathcal{F}\left[x\left(t\right)\ast x\left(-t\right)\right]=\sqrt{2\pi}\tilde{X}\left(\omega\right)\cdot\tilde{X}^{\ast}\left(\omega\right)=\sqrt{2\pi}\left|\tilde{X}\left(\omega\right)\right|^{2}$$

אבל מה זה בכלל אומר לעשות פורייה ל-$x\left(t\right)$
זה פורייה של אחת הריאליזציות. למה שעבור שתי ריאליזציות שונות לא נקבל תוצאות שונות?

אז התשובה היא שכן נקבל תוצאות שונות אבל לא בערך המוחלט.

נעשה קצת סדר בדברים:
* הגודל $\tilde{S}_{xx}\left(\omega\right)$ הוא לא משתנה מקרי. זה בגלל שהפונקציה $R_{x}\left(\tau\right)$ היא פשוט פונקציה רגילה וידועה
* לאומת זאת הגודל $\tilde{X}\left(\omega\right)$ הוא כן משתנה מקרי ותלוי בריאליזציה של האות האקראי שלנו

זה אומר שמה שרשמנו נכון עבור אותות לא אקראיים. כדי לקשר בין השניים נצטרך לומר משהו
על המתשנה האקראי $\tilde{X}\left(\omega\right)$.

כאן מגיע המשפט הכי חשוב בניתוח ספקטרי של אותות אקראיים:

```{admonition} משפט וינר חינצ'ין
נתון אות אקראי $x\left(t\right)$ סטציונרי במובן הרחב עם ממוצע $\mu_{x}=0$

נגדיר את הפונקציה הבאה:

$$x_{T}\left(t\right)=Rect\left(\frac{t}{T}\right)\cdot x\left(t\right)$$

כלומר הגבלה של האות האקראי שלנו לתחום $\left[-\frac{T}{2},\frac{T}{2}\right]$

אז:

$$\lim_{T\rightarrow\infty}\mathbb{E}\left[\left|\mathcal{F}\left[x_{T}\left(t\right)\right]\right|^{2}\right]=\tilde{S}_{xx}\left(\omega\right)$$

```

נפרק את המשפט לאט לאט. בצד ימים יש לנו את הפונקציה $\tilde{S}_{xx}\left(\omega\right)$
שאותה אנחנו מכירים והיא לא אות אקראי.
בצד שמאל יש לנו את הגודל $\left|\mathcal{F}\left[x_{T}\left(t\right)\right]\right|^{2}$
שהוא כן משתנה מקרי. אנחנו ניקח את התוכלת שלו $\mathbb{E}\left[\left|\mathcal{F}\left[x_{T}\left(t\right)\right]\right|^{2}\right]$
זאת פונקציה של $\omega,T$ ואם ניקח את הגבול של $T\rightarrow\infty$
אז הצדדים שווים.

```{warning}
ממש חשוב לשים לב שהגבול הוא מחוץ לתוכלת ולא בתוך. כלומר לא לוקחים את התוכלת של הגבול
אלא את הגבול של התוכלת
```

לגודל $\tilde{S}_{xx}\left(\omega\right)$ יש שם. הוא נקרא Power Spectral Density או בקיצור PSD
הוא הולך לומר לנו איך האנרגיה של האות האקראי שלנו מתחלקת בין
תדרים שונים

אפשר לבדוק יחידות ולראות שה-PSD נמדד ב-$\frac{W}{Hz}$ כלומר הספק לפורסת תדר
ולכן זה נקרא **צפיפות הספק ספקטרלית**

```{dropdown} דוגמא - רעש לבן

ניקח את הדוגמה הכי בסיסית שאנחנו יכולים לחשוב עליה.
אוטוקורלציה של 0 בכל זמן חוץ מהראשית  וממוצע 0:

$$R_{x}\left(\tau\right)=\sigma^{2}\delta\left(\tau\right)$$
$$\mu_{x}=0$$

יש כאן נקודה עדינה. אם האוטוקורלציה היא אינסוף ב$\tau=0$ איך נראה המשתנה המקרי?
אני לא אכנס לזה כאן. מוזמנים לקרוא את
[הבלוג הזה לדוגמא ואת הספר שהוא מפנה אליו](https://https://danshiebler.com/2020-01-09-white-noise/)
בכל מקרה נמשיך עם זה ש שהאוטוקורלציה שלנו מוגדרת ואנחנו לא מפחדים!

אי ך יראה ה-PSD $\tilde{S}_{xx}\left(\omega\right)$?

זה כבר פשוט, צריך לעשות פורייה לדלתא ומקבלים:

$$\tilde{S}_{xx}\left(\omega\right)=\frac{\sigma^{2}}{\sqrt{2\pi}}$$

כלומר פונקציה קבועה!

> ה-PSD של רעש לבן הוא קבוע (לכן הוא נקרא לבן - הוא מכיל את כל התדרים)

```

 