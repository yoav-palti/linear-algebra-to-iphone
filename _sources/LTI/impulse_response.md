# תגובה להלם

<details>
<summary>אמ;לק</summary>

כל אות ניתן לפירוק כצירוף לינארי של פונקציות דלתא: $x(t)=\int x(\tau)\delta(t-\tau)d\tau$. מערכת לינארית מגיבה לדלתא בזמן $\tau$ עם תגובת הלם $h(t,\tau)$. עבור מערכות LTI: $h(t,\tau)=h(t-\tau)$ → קונבולוציה $y(t)=x(t)*h(t)$. תגובת הלם מאפיינת לחלוטין את המערכת: ברגע שיודעים $h(t)$, אפשר לחשב פלט לכל קלט. דוגמאות: הד בחדר (סכום דלתות מעוכבות), אוסילטור הרמוני (דעיכה מתנדנדת). המושג מקביל למטריצה באלגברה לינארית.

</details>

### פונקציית דלתא
בואו נתחיל להשתמש בלינאריות של המערכת!
אמרנו שאפשר לפרק אותות מורכבים לסכום של אותות פשוטים. מה האות הכי פשוט?
קבוע בזמן זה נחמד, אבל קשה להרכיב ממנו כל אות. ננסה משהו אחר: אות שהוא אפס בכל מקום חוץ מבנקודה אחת – פונקציית הדלתא.
![delta_function.png](images/delta_function.png)
חשוב לחזור קצת על תכונות של פונקציית דלתא.
נזכיר בפשטות: הדלתא אינה "פונקציה רגילה" אלא אידאליזציה שימושית – היא אפס בכל מקום, והשטח שלה שווה 1. לא ניכנס כאן לעומק המתמטי (התמרות, מרחבי פונקציות וכו').
פונקציית דלתא אצלנו תיקרא גם "הלם" (impulse).
תכונות פונקציית הדלתא הן:

$$
\delta\left(t\ne0\right)=0
$$
$$
\intop_{-\infty}^{\infty}\delta\left(t\right)dt=1
$$

כלומר כל מה שאנחנו צריכים לדעת עליה זה שהיא אפס בכל מקום ושהאינטגרל עליה הוא 1
תכונה מאוד חשובה שנשתמש בה הרבה היא העובדה שכשמכפילים פונקציה כלשהי $x\left(t\right)$
בפונקציית דלתא מקבלים את ערך הפונקציה בנקודה כפול פונקציית הדלתא. כלומר:

$$
x\left(t\right)\cdot\delta\left(t-\tau\right)=x\left(\tau\right)\cdot\delta\left(t-\tau\right)
$$

שימו לב שלא ברור מה כאן הוא משתנה של זמן ומה הוא זמן כלשהו. כלומר אפשר לחשוב על ציר הזמן בתור $\tau$
וכל $t$ בתור נקודה עליו. זה לא סתם ואנחנו נעבור בין צורות ההסתכלות האלו הרבה.

ומכאן ניתן לכתוב:

$$
\intop_{-\infty}^{\infty}x\left(\tau\right)\cdot\delta\left(t-\tau\right)d\tau=\intop_{-\infty}^{\infty}x\left(t\right)\cdot\delta\left(t-\tau\right)d\tau=x\left(t\right)\underset{1}{\underbrace{\intop_{-\infty}^{\infty}\cdot\delta\left(t-\tau\right)d\tau}}=x\left(t\right)
$$
$$
\boxed{\underset{\text{תוא}}{\underbrace{x\left(t\right)}}=\intop_{-\infty}^{\infty}\underset{\text{רפסמ}}{\underbrace{x\left(\tau\right)}}\cdot\delta\left(t-\tau\right)d\tau}
$$

כלומר כל אות ניתן לכתוב כצירוף לינארי (אינטגרל) של פונקציות דלתא מושהות בזמן.
![function_delta_decomposition.png](images/function_delta_decomposition.png)

```{admonition} חשיבה כמו באלגברה לינארית
כאן אנחנו מתחילים "להציץ" ללמה מופיעה אלגברה לינארית. אנחנו הולכים לדבר על זה עוד
 הרבה אבל איך שאפשר לחשוב על הביטוי שכרגע רשמנו הוא
 
$$\overrightarrow{x}_{i}=\sum_{j}\overrightarrow{x}_{j}\cdot\delta_{ij}$$
  
או אם לכתוב את אותה נוסחה רק לכל $i$
 
$$ \underset{\text{רוטקו}}{\underbrace{\overrightarrow{x}}}=\sum_{j}\underset{\text{רפסמ}}{\underbrace{\overrightarrow{x}_{j}}}\cdot\underset{\text{רוטקו}}{\underbrace{\overrightarrow{e_{j}}}} $$
```

### פירוק של אות במערכת לינארית
נשתמש בתכונה החשובה שלנו עבור פונקציית דלתא וכל אות כדי לכתוב
כיצד מערכת לינארית כלשהי פועלת עליו

$$
T:\left\{ x\left(t\right)\right\} =T:\left\{ \intop_{-\infty}^{\infty}\underset{\text{רפסמ}}{\underbrace{x\left(\tau\right)}}\cdot\delta\left(t-\tau\right)d\tau\right\} =\intop_{-\infty}^{\infty}\underset{\text{םדקמ}}{\underbrace{x\left(\tau\right)}}\cdot T:\left\{ \delta\left(t-\tau\right)\right\} d\tau
$$

ואם נסמן

$$
h\left(t,\tau\right)\equiv T:\left\{ \delta\left(t-\tau\right)\right\} 
$$

נקבל לבסוף:

$$
\boxed{T:\left\{ x\left(t\right)\right\} =\intop_{-\infty}^{\infty}\underset{\text{םדקמ}}{\underbrace{x\left(\tau\right)}}\cdot\underset{\text{םלהל}-\text{הבוגת}}{\underbrace{h\left(t,\tau\right)}}d\tau}
$$

```{admonition} פונקציית התגובה להלם כמטריצה

$$ h\left(\underset{\text{הבוגתה}-\text{תדידמ}-\text{ןמז}}{\underbrace{t}},\underset{\text{םלהה}-\text{ןמז}}{\underbrace{\tau}}\right)$$
ניתן לחשוב על זה כמו שני אינדקסים של מטריצה ואז הנוסחה שלמעלה היא ממש הגיונית 

$$\overrightarrow{y}_{t}=\left[T:\left\{ \overrightarrow{x}\right\} \right]_{t}=\sum_{\tau}\overrightarrow{x}_{\tau}\cdot h_{t,\tau}$$

כלומר שניתן לחשוב על זה "כאילו" כל מערכת לינארית מיוצגת על ידי מטריצה $h$ ועכשיו למדנו גם איך לחשב אותה.
```

### תכונות של פונקציית התגובה להלם
1. ממשית (האותות פיזיקליים)
2. סיבתית - $\forall t<\tau:h\left(t,\tau\right)=0$
3. יחידות

### דוגמאות

#### התקדמות גלים בחלל חופשי עם החזרות
נניח שיש לנו רמקול בנקודה מסוימת בחדר ובמקום אחר בחדר יש מיקרופון.
אם הרמקול ישמיע צליל קצר וחזק (דלתא) המיקרופון ישמע את הצליל בדיליי אבל הוא גם ישמע את כל ההחזרות מהקירות של אותו צליל
כלומר שפונקציית התמסורת תהיה מהצורה הבאה:

$$
h\left(t,\tau\right)=\sum_{i}\alpha_{i}\delta\left(t-\left(\tau+\frac{d_{i}}{c}\right)\right)
$$

כלומר יגיעו למיקרופון "הדים" בזמנים שונים לפי המרחקים $d_i$ ומקדמי ההנחתה השונים $\alpha_i$ כמו בתמונה:
![sound_reflections.png](images/sound_reflections.png)

פונקציית התגובה להלם תיראה ככה:
![room_impulse_response.png](images/room_impulse_response.png)
נשים לב שאם נחשב את פלט המערכת הזו נקבל:

$$T:\left\{ x\left(t\right)\right\} =\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(t,\tau\right)d\tau=\intop_{-\infty}^{\infty}x\left(\tau\right)\sum_{i}\alpha_{i}\delta\left(t-\left(\tau+\frac{d_{i}}{c}\right)\right)d\tau$$
$$=\sum_{i}\alpha_{i}\intop_{-\infty}^{\infty}x\left(\tau\right)\delta\left(t-\tau-\frac{d_{i}}{c}\right)d\tau=\sum_{i}\alpha_{i}x\left(t-\frac{d_{i}}{c}\right)$$

כלומר אות משוכפל עם דיליי וניחות. כלומר קיבלנו פשוט הד!

#### אוסילטור הרמוני מרוסן
אנחנו יודעים כבר שמשוואת אוסילטור הרמוני מרוסן היא:

$$F\left(t\right)=m\ddot{x}+\gamma\dot{x}+kx$$

כלומר שכדי לחשב את התגובה להלם כל מה שאנחנו צריכים לעשות הוא "להכניס דלתא למערכת" – דהיינו לפתור את המשוואה:

$$\delta\left(t-\tau\right)=m\ddot{h}+\gamma\dot{h}+kh$$

שימו לב שעכשיו נסמן את הפתרון ב $h$ ולא ב$x$ משום שזה הפלט של המערכת עבור הלם. 
אנחנו לא נעשה את זה כאן ורק נאמר שהפתרון הוא:

$$h\left(t,\tau\right)=\theta\left(t-\tau\right)\frac{1}{m\omega_{D}}e^{-\frac{\gamma}{2m}\left(t-\tau\right)}\sin\left(\omega_{D}\left(t-\tau\right)\right)$$
$$\omega_{D}=\sqrt{\frac{k}{m}-\left(\frac{\gamma}{2m}\right)^{2}}$$

שזה מה שאנחנו מצפים: נותנים "מכה" לאוסילטור בזמן $\tau$ והוא מתחיל להתנדנד ולדעוך. לפני זמן המכה הוא כמובן לא זז ולכן מופיעה פונקציית המדרגה. את התכונה הזו אנו מניחים פיזיקלית וקוראים לה סיבתיות (קוזאליות). כלומר:
לפני ההלם בזמן $t-\tau$ פונקציית התגובה להלם צריכה להיות $0$. אין תגובה "אחורה בזמן"
מתמטית נכתוב: 

$$\forall t<\tau:h\left(t,\tau\right)=0$$

נשים לב שבכל מקום בפונקציית התגובה להלם מופיע $t-\tau$. כלומר נוכל לרשום: 

$$ h\left(t,\tau\right)=h\left(t-\tau\right)$$
ישנן כל כך הרבה מערכות שהדבר הזה נכון להן שיש להן שם מיוחד. LTI!!!

במערכות אלו פונקציית התגובה להלם תלויה רק בכמות הזמן שחלף מאז שהיה ההלם ולא בזמן של ההלם עצמו.

### מערכות LTI
עבור מערכות אלו נרשום:

$$T:\left\{ x\left(t\right)\right\} \underset{Linear}{\underbrace{=}}\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(t,\tau\right)d\tau\underset{Time-Invariant}{\underbrace{=}}\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(t-\tau\right)d\tau\equiv x\left(t\right)\ast h\left(t\right)$$

המעבר האחרון הוא סימון. לאינטגרל $\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(t-\tau\right)d\tau$ יש שם מיוחד. הוא נקרא קונבולוציה ונסמן אותו ב-$x\left(t\right)\ast h\left(t\right)$
נסכם את התוצאה שלנו

```{admonition} מערכות LTI
:class: tip

$$T:\left\{ x\left(t\right)\right\} =x\left(t\right)\ast h\left(t\right)$$
$$x\left(t\right)\ast h\left(t\right)\equiv\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(t-\tau\right)\,d\tau$$
```

```{admonition} מה המשמעות של h(t)?
:class: tip
פונקציית התגובה להלם $h(t)$ מתארת לגמרי את המערכת: ברגע שיודעים אותה – אפשר לחשב את הפלט לכל קלט בעזרת קונבולוציה.
```

```{admonition} דוגמה חישובית קצרה
בחרו $h(t)=e^{-t}\theta(t)$ וכניסה $x(t)$ כמלבן קצר. נסו להעריך מה יהיה $y(t)=x*h$ – תקבלו "החלקה" (smoothing) ואיחור בזמן.
```

### הדגמה של קונבולוציה 
מוזמנים לבדוק את הדברים הבאים:
- מה קורה כאשר פונקציית תגובה להלם היא מלבן מאוד צר
- מה קורה כאשר פונקציית תגובה להלם היא מלבן מאוד רחב
- מה אם גם התגובה להלם וגם הקלט הם גאוסיינים?

```{raw} html
:file: interactives/runtime.html
```

```{raw} html
:file: interactives/convolution.html
```
