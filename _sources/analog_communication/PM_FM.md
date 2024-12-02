# אפנון פאזה (PM) ואפנון תדר (FM)

### אפנון PM

כמו מקודם נתחיל "בנוסחא" של האפנון

$$g_{PM}\left(t\right)=\cos\left(\omega_{0}t+\phi_{0}+mf\left(t\right)\right)$$

זה דיי מתבקש, במקום לאפנן את המידע על האמפליטודה עכשיו נאפנן אותו על הפאזה.

יתרונות:
* עוצמת שידור קבועה. גם אם יש רעש חזק וגם אם יש שקט
* קל יותר לקלוט? תלוי את מי שואלים

בפועל משתמשים כמעט אך ורק ב-FM שנראה עוד מעט שהוא מקביל לחלוטין ל-PM

### אפנון FM

על מנת להגדיר שידור FM נשאל את השאלה מה הוא "התדר בכל זמן". 
השאלה הזו צריכה לצרום לכם מאוד חזק. מה זה תדר בזמן מסויים!?
תדר הוא משהו לא לוקאלי בזמן. להפך, ככל שמתמקדים יותר בנקודת זמן ספציפית
(כלומר יש לנו פיסה קצרה יותר מהאות) נוכל לדעת פחות טוב מה הם התדרים שמשתתפים באות

מכאן מגיעה מסכנה ראשונה:

```{warning}
תדר רגעי הוא **לא** התדר מפירוק פורייה $\underset{\text{ןמזב}}{\underbrace{\omega\left(t\right)}}\ne\underset{\text{רדתב}}{\underbrace{\tilde{F}\left(\omega\right)}}$ 
```

נשאלת השאלה מה הוא כן? יש לנו אינטואיציה לגבי זה. היינו רוצים לומר שליצור $\cos\left(\omega_{0}t\right)$ יש תדר קבוע של $\omega_{0}$. 
והיינו רוצים שזאת תהיה תכונה לוקאלית. כלומר שאם באזור מסויים של הפונקצייה היא מתנהגת כמו $\cos\left(\omega_{0}t\right)$ אז נומר שיש לה שם תדר $\omega_{0}$.

נציע הגדרה:

$$\omega\left(t\right)\equiv\frac{d\phi\left(t\right)}{dt}$$

נחזור עוד מעט להבנה טובה יותר של מאיפה הגיע ההגדרה הזו

אבל עכשיו נוכל לדרוש:

$$\omega\left(t\right)=\omega_{0}+mf\left(t\right)$$
$$\phi\left(t\right)=\intop_{0}^{t}\omega_{0}+mf\left(t\right)dt+\phi_{0}$$

וקיבלנו כי:

$$g_{FM}\left(t\right)=\cos\left(\omega_{0}t+\phi_{0}+\intop_{0}^{t}mf\left(t\right)dt\right)$$

```{admonition} הקשר בין PM ל-FM:
:class: tip
אפנון FM הוא אפנון PM של האות $\intop_{0}^{t}mf\left(t\right)dt$
```

 נשווה בין שלושת האפנונים האנלוגים
![AM_FM_PM_ex.png](images/AM_FM_PM_ex.png)

נשים לב שבנקודות שהאות מקבל מקסימום:
* AM מקבל מקסימום אמפליטודה
* FM מקבל תדר רגעי מקסימלי
* PM נמצא בתדר רגעי של הגל הנושא משום שהנגזרת היא 0

### האות האנליטי
ננסה לחשוב קצת יותר על התדר הרגעי. מאיפה הבאנו אותו. הסתכלנו על הפונקצייה $\cos\left(\phi\left(t\right)\right)$ שמלבד לעובדה שהיא חסומה בין מינוס 1 ל-1 אין בה משהו מיוחד.
הסתכלנו על זמן קצר ורשמנו כי:

$$\phi\left(t_{0}+\Delta t\right)=\phi\left(t_{0}\right)+t\left.\frac{d\phi\left(t\right)}{dt}\right|_{t_{0}}$$

 כלומר קירוב סדר ראשון לשינוי בפאזה את מהירות השתנות הפאזה הגדרנו בעזרת התדר הרגעי.
 באיזה עוד דרך ניתן להגיע לזה? אם נוסיף לאות שלנו אות מרוכב $\sin\left(\phi\left(t\right)\right)$
נקבל:
 
$$\cos\left(\phi\left(t\right)\right)+i\sin\left(\phi\left(t\right)\right)=e^{i\phi\left(t\right)}$$

היינו רוצים שתדר רגעי תמיד יהיה חיובי משום שאת כל הסימנים ניתן לבלוע בפאזה $\cos\left(-\omega_{0}t\right)=\cos\left(\omega_{0}t\right),\sin\left(-\omega_{0}t\right)=\sin\left(\omega_{0}t+\pi\right)$
כלומר לא נוכל להבדיל בין תדרים רגעיים שליליים וחיוביים. ולכן נוכל להגדיר את $\phi\left(t\right)$ בתור **פונקציה מונוטונית עולה**
נקבל כי:

$$\left|\frac{de^{i\phi\left(t\right)}}{dt}\right|=\left|\frac{d\phi\left(t\right)}{dt}e^{i\phi\left(t\right)}\right|=\left|\frac{d\phi\left(t\right)}{dt}\right|=\frac{d\phi\left(t\right)}{dt}$$

באופן כללי עבור האות:

$$f_{a}\left(t\right)=\left|A\left(t\right)\right|e^{i\phi\left(t\right)}$$
$$\frac{d\phi\left(t\right)}{dt}=\left|\frac{d}{dt}\left(\frac{f_{a}\left(t\right)}{\left|f_{a}\left(t\right)\right|}\right)\right|$$

מה שדרוש לנו היא דרך לקחת אותות מהצורה $f\left(t\right)=\Re\left[\left|A\left(t\right)\right|e^{i\phi\left(t\right)}\right]$
ולהפוך אותם ל-$f_{a}\left(t\right)=\left|A\left(t\right)\right|e^{i\phi\left(t\right)}$

האות המרוכב $f_{a}\left(t\right)$ נקרא האות האנליטי של $f\left(t\right)$. זה נראה שאנחנו "מוסיפים" מידע שאין לנו אבל האמת היא הפוכה. נסתכל על האות במרחב התדר

$$\tilde{F}_{a}\left(\omega\right)=\mathcal{F}\left[f_{a}\left(t\right)\right]$$
$$\Downarrow$$
$$\tilde{F}\left(\omega\right)=\mathcal{F}\left[\Re\left[f_{a}\left(t\right)\right]\right]=\begin{cases}
\tilde{F}_{a}\left(\omega\right) & \omega>0\\
\tilde{F}_{a}^{\ast}\left(\omega\right) & \omega<0
\end{cases}$$

אבל בגלל שהגדרנו מראש שבפונקציה האנליטית יש רק תדרים חיוביים ברור שאפשר להשיג את הפנוקצייה האנליטית מהפונקציה הממשית.
כל מה שצריך לעשות הוא לרשום כי:

$$f_{a}\left(t\right)=\frac{1}{2}\left[f\left(t\right)+i\mathcal{H}\left[f\left(t\right)\right]\right]$$

כאשר 

$$\mathcal{F}\left[\mathcal{H}\left[f\left(t\right)\right]\right]=\begin{cases}
\tilde{F}_{a}\left(\omega\right) & \omega>0\\
-\tilde{F}_{a}^{\ast}\left(\omega\right) & \omega<0
\end{cases}=sgn\left(\omega\right)\cdot\tilde{F}\left(\omega\right)$$

קיבלנו שהטרנספורם הזה הוא לכפול כל תדר או ב1 או במינוס 1 ולכן זו פעולה שניתן לממש בעזרת מערכת LTI!

נשים לב שלא צריך במציאות אות מרוכב אלא שני ערוצים. אחד שהאות בו הוא החלק הממשי והשני שהאות בו הוא החלק המדומה. את כל הנגזרות והנרמולים אפשר לעשות עם שני החלקים האלו!




