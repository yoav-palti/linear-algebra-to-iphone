# דגימה

<details>
  <summary>אמ;לק</summary>

ניתן לשחזר את האות $V\left(t\right)$ באופן מושלם מתוך הדגימות $V_{n}$ על ידי
הגדרה של האות הדגום

$$V_{s}\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)$$

וקונבולוציה שלו (אינטרפולציה) עם הפונקצייה $sinc\left(f_{s}t\right)=\frac{\sin\left(\pi f_{s}t\right)}{\pi f_{s}t}$
במידה ותדר הדגימה מקיים $f_{max}<\frac{f_{s}}{2}$

כלומר

$$\underset{\text{ירוקמה}-\text{תואה}}{\underbrace{V\left(t\right)}}=\sum_{n=-\infty}^{\infty}\underset{\text{תומיגדה}}{\underbrace{V_{n}}}\underset{sinc\left(f_{s}\left(t-n\Delta t\right)\right)}{\underbrace{\frac{\sin\left(\pi f_{s}\left(t-n\Delta t\right)\right)}{\pi f_{s}\left(t-n\Delta t\right)}}}$$

בנוסף נקבל כי האות $\tilde{V}_{s}\left(\omega\right)$ הוא מחזורי. בשביל הנוחות נגדיר את האות:

$$\tilde{V}\left(\theta\right)\equiv\tilde{V}_{s}\left(\omega=\frac{\theta}{\Delta t}\right)=\frac{1}{\sqrt{2\pi}}\sum_{n=-\infty}^{\infty}V_{n}e^{-i\theta n}$$

אם נגביל את כמות הדגימות ל-$N$ דגימות (כלומר אורך האות שלנו הוא $n\Delta t$)
נקבל כי האות $\tilde{V}\left(\theta\right)$ יהיה דגום $N$ פעמים.
הקשר בין הדגימות בזמן לדגימות בתדר הוא:

$$\tilde{V}_{k}=\sum_{n=0}^{N-1}V_{n}e^{-i\frac{2\pi k}{N}n}$$

* מרחק בין שתי דגימות בזמן - $\Delta t=\frac{1}{f_{s}}$
* מרחק בין שתי דגימות בתדר - $\Delta\omega=\frac{2\pi}{N\Delta t}=\frac{2\pi}{T}$

* תחום הזמן - $t\in\left[0,T\right]$
* תחום התדרים - $\omega\in\left[-\pi f_{s},\pi f_{s}\right]$

קיבלנו מסקנה חשובה:

**דגימה מהירה יותר משפרת רזולוציה בזמן ואת טווח התדרים**
**דגימה ארוכה יותר משפרת את רזולוציית התדרים ואת טווח הזמנים**

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

$$\tilde{V}_{s}\left(\omega\right)=\frac{1}{\sqrt{2\pi}}\tilde{V}\left(\omega\right)\ast\frac{\sqrt{2\pi}}{\Delta t}comb\left(\frac{\omega}{2\pi}\Delta t\right)=f_{s}\tilde{V}\left(\omega\right)\ast comb\left(\frac{\omega}{2\pi f_{s}}\right)$$

האם ניתן לשחזר את $\tilde{V}\left(\omega\right)$ מתוך $\tilde{V}_{s}\left(\omega\right)$?

כן אבל רק אם $f_{max}<\frac{f_{s}}{2}$ למה? נסתכל בתמונה:

![AliasedSpectrum.png](images/AliasedSpectrum.png)

האות הכחול הוא מה שאנחנו רוצים. מה שיש לנו זה את האות הכחול קונבולוציה עם מסרק (רכבת הלמים). שזה האות בירוק.
נוכל לשחזר את האות הכחול רק אם לא תהיה חפיפה בין השכפולים. נשים לב שהמרחק בין שכפולים
הוא $2\pi f_{s}$ בעוד הרוחב של האות שלנו הוא $2\pi\cdot\left(2f_{max}\right)$
ולכן אנחנו חייבים לעמוד בתנאי $f_{max}<\frac{f_{s}}{2}$

איך נשחזר את האות? על ידי LPF מלבני.
קיבלנו כי:

$$\tilde{V}\left(\omega\right)=\tilde{V}_{s}\left(\omega\right)\cdot\frac{1}{f_{s}}Rect\left(\frac{\omega}{2\pi f_{s}}\right)=\sqrt{2\pi}\tilde{V}_{s}\left(\omega\right)\cdot\frac{1}{\sqrt{2\pi}f_{s}}Rect\left(\frac{\omega}{2\pi f_{s}}\right)$$

נוח לראות כאן כי:

$$\forall\omega\in\left[-\pi f_{s},\pi f_{s}\right]:\tilde{V}\left(\omega\right)=\Delta t\tilde{V}_{s}\left(\omega\right)$$

מכפלה בחלון בתדר היא קונבולוציה עם sinc בזמן. נעשה פורייה הפוך:

$$V\left(t\right)=V_{s}\left(t\right)\ast sinc\left(f_{s}\cdot t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)\ast sinc\left(f_{s}\cdot t\right)$$

ושוב קיבלנו:

$$V\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}sinc\left(f_{s}\left(t-n\Delta t\right)\right)$$

```{admonition} שחזור אידאלי - סיכום

ניתן לשחזר את האות $V\left(t\right)$ באופן מושלם מתוך הדגימות $V_{n}$ על ידי
הגדרה של האות הדגום $V_{s}\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)$
וקונבולוציה שלו (אינטרפולציה) עם הפונקצייה $sinc\left(f_{s}t\right)=\frac{\sin\left(\pi f_{s}t\right)}{\pi f_{s}t}$
במידה ותדר הדגימה מקיים $f_{max}<\frac{f_{s}}{2}$

```

### הפונקציה $\tilde{V}\left(\theta\right)$
ראינו כי הפונקציה עבור הפונקציה $V_{s}\left(t\right)=\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)$ נקבל פונקציה מחזורית בתדר $\tilde{V}_{s}\left(\omega\right)=f_{s}\tilde{V}\left(\omega\right)\ast comb\left(\frac{\omega}{2\pi f_{s}}\right)$

על מנת שיהיה לנו נוח ועל מנת להדגיש שהפונקציה $\tilde{V}_{s}\left(\omega\right)$ היא מחזורית נגדיר:

$$\boxed{\tilde{V}\left(\theta\right)\equiv\tilde{V}_{s}\left(\omega=\frac{\theta}{\Delta t}\right)=\frac{1}{\Delta t}\tilde{V}\left(\omega=\frac{\theta}{\Delta t}\right)}$$

מה הפונקציה הזו שווה? נוכל לעשות פורייה ישירות ולקבל:

$$\tilde{V}_{s}\left(\theta\right)=\mathcal{F}\left[\sum_{n=-\infty}^{\infty}V_{n}\delta\left(t-n\Delta t\right)\right]=\frac{1}{\sqrt{2\pi}}\sum_{n=-\infty}^{\infty}V_{n}e^{i\omega n\Delta t}\underset{\omega=\frac{\theta}{\Delta t}}{\underbrace{=}}\frac{1}{\sqrt{2\pi}}\sum_{n=-\infty}^{\infty}V_{n}e^{i\theta n}$$

כלומר:

$$\boxed{\tilde{V}\left(\theta\right)=\frac{1}{\sqrt{2\pi}}\sum_{n=-\infty}^{\infty}V_{n}e^{-i\theta n}}$$

הפונקציה $\tilde{V}\left(\theta\right)$ מוגדרת על טבעת.
בקלות רואים כי $\tilde{V}\left(\theta+2\pi\right)=\tilde{V}\left(\theta\right)$ 

### Alias
מה קורה אם אנחנו דוגמים אות אשר לא עומד בתנאי שלנו? כלומר שיש לו תדרים גבוהים יותר מ-$\frac{f_{s}}{2}$.
עכשיו יש לנו ממש דרך מתמטית לחשוב על תהליך הגדימה. **דגימה היא הכפלה ברכבת הלמים**.
זה אומר שבתדר זה קונבולוציה עם רכבת הלמים. 

איך זה נראה?
![spectral_folding.png](images/spectral_folding.png)
קרדיט [^spectral_folding]

[^spectral_folding]:  Boaz Porat. 1996. A Course in Digital Signal Processing (1st. ed.). John Wiley & Sons, Inc., USA.

מה שאנחנו רואים בתמונה הוא שהתדרים מעל התדר $\frac{f_{s}}{2}$ התקפלו
בחזרה. על מנת להבין את זה קצת יותר טוב נתחיל מדוגמה פשוטה:

$$V\left(t\right)=\cos\left(2\pi f_{0}t\right)$$

בתדר כמובן שכל מה שיש לנו הוא שתי דלתאות. איך נראה האות הדגום?

$$V_{s}\left(t\right)\equiv V\left(t\right)\cdot comb\left(\frac{t}{\Delta t}\right)=\cos\left(2\pi f_{0}t\right)\cdot comb\left(\frac{t}{\Delta t}\right)$$

ולכן בתדר: 

$$V_{s}\left(\omega\right)=\frac{1}{\sqrt{2\pi}}\frac{1}{2}\left(\delta\left(\omega-2\pi f_{0}\right)+\delta\left(\omega+2\pi f_{0}\right)\right)\ast\sqrt{2\pi}f_{s}comb\left(\frac{\omega}{2\pi f_{s}}\right)$$
$$V_{s}\left(\omega\right)=\frac{f_{s}}{2}\left(\delta\left(\omega-2\pi f_{0}\right)+\delta\left(\omega+2\pi f_{0}\right)\right)\ast comb\left(\frac{\omega}{2\pi f_{s}}\right)$$

נסתכל רק על התחום  $\left[-\frac{f_{s}}{2},\frac{f_{s}}{2}\right]$

במידה ו-$f_{0}<\frac{f_{s}}{2}$ אז אין משהו מיוחד ונקבל כי:

$$\omega\in\left[-\frac{2\pi f_{s}}{2},\frac{2\pi f_{s}}{2}\right]\Rightarrow V_{s}\left(\omega\right)=\frac{f_{s}}{2}\left(\delta\left(\omega-2\pi f_{0}\right)+\delta\left(\omega+2\pi f_{0}\right)\right)$$

כלומר שאנחנו יכולים לשחזר את האות שלנו על ידי LPF (בתדר).

אבל מה אם לדוגמה $f_{0}=\frac{f_{s}}{2}+\Delta f$

במקרה הזה מה שיהיה בתחום שאנחנו מסתכלים עליו הוא אחד מההעתקים שמגיע מהקונבולוציה בפונקציית המסרק
איפה בדיוק הוא יהיה? פונקציית המסרק בתדר היא במרווחים של $2\pi f_{s}$.

מקודם היו לנו שני תדרים $\pm\omega_{0}=\pm\left(2\pi\frac{f_{s}}{2}+2\pi\Delta f\right)$

כל אחד מהם הולך להיות משוכפל אינסוף פעמים בקפיצות של $2\pi f_{s}$.
איזה מהשכפולים הולך להיות בתוך הקטע שאנחנו מסתכלים עליו? זה תלוי בגודל של $\Delta f$ כמובן.
נניח לרגע שהוא קטן ונקבל:

$$\omega_{0}-2\pi f_{s}=2\pi\left(-\frac{f_{s}}{2}+\Delta f\right)$$
$$-\omega_{0}+2\pi f_{s}=2\pi\left(\frac{f_{s}}{2}-\Delta f\right)$$

כלומר דווקא התדר השלילי נמצא עכשיו בתחום החיובי של הטווח שלנו והתדר החיובי הוא בתחום השלילי.
התוצאה היא:

$$\omega\in\left[-\frac{2\pi f_{s}}{2},\frac{2\pi f_{s}}{2}\right]\Rightarrow V_{s}\left(\omega\right)=\frac{f_{s}}{2}\left(\delta\left(\omega-2\pi\left(\frac{f_{s}}{2}-\Delta f\right)\right)+\delta\left(\omega+2\pi\left(\frac{f_{s}}{2}-\Delta f\right)\right)\right)$$

שימו לב שקיבלנו שהתדר "התקפל" סביב קצה התחום שלנו.

יהיה יותר קל להבין בסרטוט

![cos_before_sampeling.png](images/cos_before_sampeling.png)
![cos_after_sampeling.png](images/cos_after_sampeling.png)

אתם יכולים לראות שקיבלנו קיפול של התדרים.
למה הציר נראה כמו שהוא נראה?

בשביל נוחות נהוג להציג את הפונקציה הדגומה כ-$\tilde{V}\left(\theta\right)\equiv\tilde{V}_{s}\left(\omega=\frac{\theta}{\Delta t}\right)$ כמו מקודם

את התופעה של קיפול תדרים אנחנו רואים גם במרחב הזמן:

![alias_t.png](images/alias_t.png)

שימו לב שזה לא באמת שקיבלנו את התדר הנמוך אחרי הדגימה.
כל מה שיש לנו זה את הדגימות. אבל זה אומר שלדגום את שני
גלי הקוסינוס האלו נותן את אותה תוצאה בדיוק. ולא ניתן להבחין בינהם אחרי הדגימה.
זה בגלל שהקוסינוס בתדר הגבוה (מעל $\frac{f_{s}}{2}$) יתקפל לתדר של הקוסינוס בתדר הנמוך.

דוגמה יחסית נפוצה לתופעה היא בסרטוני ווידאו.
אם מצלמים משהו שמסתובב בתדר מסויים אבל דוגמים אותו ב-30FPS.
מה יקרה אם הוא מסתובב ב3000RPS?
זה אומר שכל פעם שאנחנו מצלמים הוא עושה מספר שלם של סיבובים וזה יראה כאילו הוא לא זז!

דוגמה מגניבה לזה אפשר לראות ב-GIF הבא:
![hlycopter_nyq.gif](images/hlycopter_nyq.gif)

זה בדיוק קיפול תדרים רק שהתדר שלנו מתקפל לתדר 0.

### Anti Alias Filter

מה אם יש לנו אות שכן עומד בתנאי הדגימה שלנו אבל יש לנו רעש או אותות אחרים בתדרים גבוהים יותר?

נבצע קודם LPF כך שכל התדרים שלא בתחום של $\left[-\frac{f_{s}}{2},\frac{f_{s}}{2}\right]$ יתאפסו ואז נדגום.
הפילטר הזה נקרא anti alias כי הוא דואג לנו שלא יהיו לנו קיפולים לא רצויים בדגימה.

שימו לב שלמעשה במקלט קוהרנטי כבר יש לנו LPF לכל אחד מהערוצים I ו-Q.
נוכל להשתמש בו בתור ה-anti alias filter. לפני שאנחנו מעבירים את הערוצים לדוגם.

### העלאה של תדר הדגימה
נניח שיש לנו אות חסום בתדר. כלומר יש לו תדר מקסימלי $f_{max}$.
איך נראה האות בתדר אחרי שדוגמים אותו בשני תדרי דגימה שונים $f_{s}^{1},f_{s}^{2}$. נניח שמתקיים:

$$f_{max}<\frac{f_{s}^{1}}{2}<\frac{f_{s}^{2}}{2}$$

איך יראו הפונקציות $\tilde{V}\left(\theta\right)$ עבור שני תדרי הדגימה

![upsample.png](images/upsample.png)

מה שקורה הוא שלקחנו את הפונקציה הכחולה והוספנו לה אפסים משני הצדדים. משום שכשעלינו
בתדר הדגימה אנחנו "רואים" תדרים יותר גבוהים. הפונקציה הירוקה צרה יותר משום שאת שתיהן אנחנו מציירים
בעזרת הפרמטר $\theta\equiv\frac{\omega}{f_{s}}$ רק שלכל פונקציה יש תדר דגימה שונה.

```{tip}
דיגמה בתדר גבוה יותר $\Longleftrightarrow$ לרפד באפסים בתדר
```

זה לקח חשוב לזכור ונחזור אליו בהמשך

### מספר דגימות סופי

אנחנו כבר מתחילים להריח משהו שאנחנו יכולים לעשות איתו משהו במחשב. אבל עם כל הכבוד לדגימות, כדאי שגם המספר שלהן יהיה סופי.
החוק הפשוט יהיה כזה. במקום לומר שכמות הדגימות שלנו היא סופית נאמר שיש לנו כמות סופית של דגימות שהן לא 0.
כלומר אם קיבלנו דגימה באורך $N$ נחשוב עליה בתור דגימה אינסופית מרופדת באפסים לשני הכיוונים.

למה בכלל לעשות את זה? התשובה היא שכבר פיתחנו כלים לעבוד עם אות דגום אינסופי.

זאת תכונה שחשוב לזכור. גם כשיש לנו דגימה סופית בזמן אנחנו יכולים לייצג אותה בתור דגימה אינסופית בזמן.

נשאל את עצמנו מה זה אומר שהדגימה היא סופית בזמן (או חסומה בזמן) עבור התדר? כבר נתקלנו לפני דקה במקרה כזה. זה אומר
שאם דוגמים אותה (הפעם במרחב התדר) בקצב מספק נוכל לשחזר אותה במרחב הזמן.

הפעם נעשה את זה הפוך. נסתכל על אות:

$$V\left[n\right]\ast comb\left[\frac{n}{N}\right]$$
$$\mathcal{F}\left[V\left[n\right]\ast comb\left[\frac{n}{N}\right]\right]=\sqrt{2\pi}N\cdot V\left(\theta\right)\cdot comb\left[\frac{\theta}{2\pi}N\right]$$

זה אומר שיש לנו $N$ ערכים של $\theta$ שהם לא 0. זה אומר שאנחנו יכולים להציג את האות שלנו במרחב התדר בתור $N$ דגימות (או יותר)

נוכל לסכם את החישוב בצורה הבאה. נניח שיש לנו פונקציה דגומה אשר מכילה
רק $N$ דגימות במרווחים של $\Delta t$. אם נמשיך אותה בצורה מחזורית
.כך שיהיו לנו אינסוף דגימות אשר חוזרות על עצמן אז  נקבל פונקציה 
דגומה ומחזורית עם מחזוריות של $N\Delta t$.

נוכל לרשום פונקציה כזו באופן הבא:

$$V_{s}\left(t\right)=\left[\sum_{n=0}^{N-1}V_{n}\delta\left(t-n\Delta t\right)\right]\ast comb\left(\frac{t}{N\Delta t}\right)$$

איך יראה הפורייה שלה? מצד אחד היא דגומה ולכן נצפה לפורייה מחזורי עם מחזור $\frac{2\pi}{\Delta t}=2\pi f_{s}$ מצד שני הפונקציה שלנו
מחזורית עם מחזור של $N\Delta t$ ולכן נצפה לפורייה דגום עם מרחק של $\Delta\omega=\frac{2\pi}{N\Delta t}$ בין דגימות.

נחשב ונראה:

$$\tilde{V}_{s}\left(\omega\right)=\sqrt{2\pi}\left[\frac{1}{\sqrt{2\pi}}\sum_{n=0}^{N-1}V_{n}e^{-i\omega n\Delta t}\right]\cdot\left[\frac{\sqrt{2\pi}}{N\Delta t}comb\left(\frac{\omega N\Delta t}{2\pi}\right)\right]$$
$$=\left[\sum_{n=0}^{N-1}V_{n}e^{-i\omega n\Delta t}\right]\cdot\left[\frac{\sqrt{2\pi}}{N\Delta t}comb\left(\frac{\omega N\Delta t}{2\pi}\right)\right]$$

קודם נראה שהפונקציה הזו באמת מחזורית עם מחזור של $\frac{2\pi}{\Delta t}$:

$$\tilde{V}_{s}\left(\omega+\frac{2\pi}{\Delta t}\right)=\sum_{n=0}^{N-1}V_{n}e^{-i\left(\omega+\frac{2\pi}{\Delta t}\right)n\Delta t}\cdot\frac{\sqrt{2\pi}}{N\Delta t}comb\left(\frac{\left(\omega+\frac{2\pi}{\Delta t}\right)N\Delta t}{2\pi}\right)$$
$$=\left[\sum_{n=0}^{N}V_{n}e^{-i\omega n\Delta t}\underset{1}{\underbrace{e^{-2\pi in}}}\right]\cdot\frac{\sqrt{2\pi}}{N\Delta t}comb\left(\frac{\omega N\Delta t}{2\pi}+N\right)$$
$$=\left[\sum_{n=0}^{N}V_{n}e^{-i\omega n\Delta t}\right]\cdot\frac{\sqrt{2\pi}}{N\Delta t}comb\left(\frac{\omega N\Delta t}{2\pi}\right)=\tilde{V}_{s}\left(\omega\right)$$

מעולה. זה אומר שאנחנו יכולים להגדיר פונקציה מחזורית על טבעת בעזרת 
המשתנה $\theta\equiv\frac{\omega}{f_{s}}=\omega\Delta t\in\left[-\pi,\pi\right]$

$$\tilde{V}\left(\theta\right)\equiv\tilde{V}_{s}\left(\omega=\frac{\theta}{\Delta t}\right)$$

$$\tilde{V}\left(\theta\right)=\left[\sum_{n=0}^{N-1}V_{n}e^{-i\theta n}\right]\cdot\frac{\sqrt{2\pi}}{N\Delta t}comb\left(\frac{\theta}{2\pi}N\right)$$

עכשיו כמו מקודם נגדיר את הפונקציה הדגומה (הפעם בתדר) בתור:

$$\tilde{V}_{k}\equiv\frac{N\Delta t}{\sqrt{2\pi}}\tilde{V}\left(\theta=\frac{2\pi}{N}k\right)$$

ועכשיו רואים בבירור שהאות דגום ויש $N$ ערכים שהם לא 0. הערכים האלו הם:

$$\tilde{V}_{k}=\sum_{n=0}^{N-1}V_{n}e^{-i\frac{2\pi k}{N}n}$$


```{tip}
אם יש לנו אות של $N$ דגימות במרחב הזמן אשר חוזרות במחזוריות עד אינסוף נקבל שהייצוג שלו
במרחב התדר הוא אות של $N$ דגימות אשר חוזרות במחזוריות עד אינסוף! 

אם ערך הדגימות בזמן הן $\forall n\in\left[0,N-1\right]:V_{n}$ אז הערך של הדגימות במרחב התדר הוא $\forall k\in\left[0,N-1\right]:\tilde{V}_{k}\equiv\frac{1}{N}\sum_{n=0}^{N-1}V_{n}e^{-i\frac{2\pi k}{N}n}$

נסכם כי:

$$V_{n}=\frac{1}{N}\sum_{k=0}^{N-1}V_{k}e^{i\frac{2\pi n}{N}k}\leftrightarrows\tilde{V}_{k}=\sum_{n=0}^{N-1}V_{n}e^{-i\frac{2\pi k}{N}n}$$

הפעולה שלוקחת $N$ מספרים $V_{n}$ ומחשבלת עבורם את $N$ המספרים $\tilde{V}_{k}$ נקראת DFT

$$$$
```

מה שאנחנו רואים זה שהכרנו עד עכשיו ארבע דרכים שונות לייצג את מרחב התדר בארבעה מצבים שונים. נסכם:
![FT_shapes.png](images/FT_shapes.png)

נחזור לDFT בהמשך אבל נציין כבר עכשיו שאנחנו רואים "בעיה" פטולוגית ראשונה.
כדי להסתכל על זמן סופי ולהגיע למרחב תדר דגום היינו צריכים להתייחס למרחב הזמן
ככזה שמוגדר גם הוא על טבעת. כלומר הדגימה הראשונה מגיעה מייד אחרי הדגימה האחרונה.
מאוד קל לשכוח את העובדה הזו אבל היא עושה המון צרות באיבוד אות דיגיטלי אם היא לא יושבת בראש.

שאלה למחשבה: אמרנו שקפיצות חדות בזמן מייצרות המון תדרים. כלומר שצריך הרבה תדרים גבוהים כדי ליצור קפיצה חדה.
מה קורה לגל סינוס עם תדר יחיד שלא מסיים בדיוק כמות שלמה של זמני מחזור מהדגימה הראשונה לאחרונה?