# תגובת להלם

### פונקציית דלתא
בוא נתחיל להשתמש בלינאריות של המערכת!
אמרנו לשאפשר לפרק את המערכת לאותות פשוטים. מה האות הכי פשוט
שאפשר לחשוב עליו? כנראה שאות קבוע. אבל קצ תקשה להרכיב אותות 
מחיבור של אותות קבועים. ננסה משהוא אחר. אות שהוא אפס בכל מקום חוץ מבנקודה אחת.
כן כן, פונקציית דלתא.
![delta_function.png](delta_function.png)
חשוב לחזור קצת על תכונות של פונקציית דלתא.
נתחיל מזה שלקרוא לה פונקציה זה קצת עקום. פונקציה אמורה להחזיר ערך $x$ על כל
ערך $t$ שהיא מקבלת. מה $\delta\left(t-\tau\right)$ מחזירה  בנקודה $\tau$?
לא ניכנס לסיבוך המתמטי של "אפיון מרחב האותות" בקורס הזה.
פונקציית דלתא אצלנו תיקרא גם "הלם" או באנגלית "impulse"
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

כלומא כל אות ניתן לכתוב כצירוף לינארי של פונקציות דלתא מושהות

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

### תכונות של פונקציית התגובה להלם
1. ממשית (האותות פיזיקלים)
2. סיבתית - $\forall t<\tau:h\left(t,\tau\right)=0$
3. יחידות

### דוגמאות

#### אוסילטור הרמוני מרוסן
