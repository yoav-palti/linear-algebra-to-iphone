# מערכות לינאריות

## למה

1. הרבה מערכות פיזיקליות הן לינאריות (לפחות בקירוב טוב)
2. התגובה לאות מורכב ע"י סכום תגובות לאותות פשוטים
3. מתמטיקה אלגנטית (אלגברה לינארית)
4. שרשור מערכות לינאריות היא מערכת לינארית

## הגדרות

#### אות (סיגנל)

* פונקציה מתמטית המעבירה אינפורמציה אודות התנהגות של תופעה מסויימת

  דוגמאות:
    * $p(t)$ לחץ כפונקציה של זמן - כלומר אות אקוסטי
      ![sound_wave.png](sound_wave.png)
    * $V(t)$ מתח כפונקציה של זמן
    * $I(t)$ זרם כפונקציה של זמן
    * $T(t)$ טמפרטורה כפונקציה של זמן

#### מערכת

* תהליך $T$ שיוצר טרנפורמציה מאות נתון לאות אחר

נסמן:

$$
T:\underset{input}{\left\{ \underbrace{x\left(t\right)}\right\} }=\underset{output}{\underbrace{y\left(t\right)}}
$$

![LTI_diagram.png](LTI_diagram.png)
למשל: מיקרופון היא מערכת שמירה לחץ למתח/זרם חשמלי

$$
\underset{\text{ןופורקימה אצומב חתמ}}{\underbrace{V\left(t\right)}}=T:\left\{ p\left(t\right)\right\}
$$

#### מערכת לינארית

מערכת לינארית $T$ במרחב האותות היא מערכת המקבלת אות $x\left(t\right)$
בכניסה ומחזירה אות ביציאה $y\left(t\right)=T:\left\{ x\left(t\right)\right\} $
כאשר הטרנספורמציה $T$ מקיינת את עקרון הלינאריות (או סופור פוזיציה)
כלומר בהינתן אות מהצורה $x\left(t\right)=\alpha x_{1}\left(t\right)+\beta x_{2}\left(t\right)$ 
האות במוצא המערכת הלינארית יהיה הצירוף הלינארי של מוצא המערכת עבור כל 
אחד מהאותות בנפרד כלומר: 

$$
T:\underset{x\left(t\right)}{\underbrace{\left\{ \alpha x_{1}\left(t\right)+\beta x_{2}\left(t\right)\right\} }}=\alpha\underset{y_{1}\left(t\right)}{\underbrace{T:\left\{ x_{1}\left(t\right)\right\} }}+\beta\underset{y_{2}\left(t\right)}{\underbrace{T:\left\{ x_{2}\left(t\right)\right\} }}
$$

חשוב לציין שהתכונה הזו מאוד עוזרת לנו משום שאנחנו יכולים בתקווה לקחת אות
מורכב $x\left(t\right)$ ולכתוב אותו כחיבור של אותות פשוטים