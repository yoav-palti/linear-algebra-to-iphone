# תמסורת גלים בחדר

<details>
<summary>אמ;לק</summary>

גלים בחדר מתנהגים לפי משוואת הגלים הלינארית.
 בחלל ריק: תגובת הלם כוללת דיליי ודעיכה לפי מרחק. בחדר עם קירות: נוספות החזרות → פונקציית התמסורת היא סכום דלתות מעוכבות עם מקדמים שונים.
 
$$\tilde{H}\left(\omega\right)=\frac{\alpha_{1}}{\sqrt{2\pi}}e^{i\omega\tau_{1}}+\frac{\alpha_{2}}{\sqrt{2\pi}}e^{i\omega\tau_{2}}$$

  שני נתיבים באותה עוצמה יוצרים התאבכות: מקדמי התמסורת משתנים תקופתית עם התדר. נשמע בדוגמאות: אותו קול בחדרים שונים.

</details>

כאשר אנחנו רוצים להבין איך גלים מתפשטים בחלל ניתן להשתמש במשוואת הגלים (פלוס תנאי שפה)

$$\frac{\partial^{2}u}{\partial t^{2}}-c^{2}\nabla^{2}u=S\left(\vec{r},t\right)$$

* נשים לב כי המשוואה לינארית כי היא מכילה רק נגזרות שהן אופרטור לינארי
* עבור מרחב סטטי ומדידה של $u$ בנקודה מסויימת נקבל גם מערכת אינווריאנטית בזמן

פונקציית התגובה להלם בחלל ריק היא:

$$h_{\vec{r},\vec{r}^{\prime}}\left(t\right)=\frac{\delta\left(t-\frac{\left|\vec{r}-\vec{r}^{\prime}\right|}{c}\right)}{\left|\vec{r}-\vec{r}^{\prime}\right|}$$

כלומר מכילה דיליי ודעיכה: הדלתא המושהית מייצגת זמן הגעה $|\vec r-\vec r'|/c$, והמכנה מציין דעיכה עם מרחק.
בתדר זה נראה ככה:

$$\tilde{H}_{\vec{r},\vec{r}^{\prime}}\left(\omega\right)=\frac{e^{i\omega\frac{\left|\vec{r}-\vec{r}^{\prime}\right|}{c}}}{\left|\vec{r}-\vec{r}^{\prime}\right|}$$

מה קורה כשהחדר לא ריק (קירות, ריהוט)?
נקבל שפונקציית התגובה להלם עכשיו מכילה גם החזרות.
ננתח החזרה בודדת:

$$h\left(t\right)=\alpha_{1}\delta\left(t-\tau_{1}\right)+\alpha_{2}\delta\left(t-\tau_{2}\right)$$
או במילים אחרות

$$\tilde{H}\left(\omega\right)=\frac{\alpha_{1}}{\sqrt{2\pi}}e^{i\omega\tau_{1}}+\frac{\alpha_{2}}{\sqrt{2\pi}}e^{i\omega\tau_{2}}$$

ניקח מקרה פשוט בו $\alpha_{1}=\alpha_{2}$. נראה שמתקבל ביטוי קוסינוסי – זהו חיבור של שני נתיבים שגורם להתאבכות (constructive/destructive) לפי התדר והפרש הזמנים:

$$\tilde{H}\left(\omega\right)=\frac{\alpha_{1}}{\sqrt{2\pi}}e^{i\omega\frac{\tau_{1}+\tau_{2}}{2}}\left(e^{i\omega\frac{\tau_{1}-\tau_{2}}{2}}+e^{-i\omega\frac{\tau_{1}-\tau_{2}}{2}}\right)=\sqrt{\frac{2}{\pi}}\alpha_{1}e^{i\omega\frac{\tau_{1}+\tau_{2}}{2}}\cos\left(\omega\frac{\tau_{1}-\tau_{2}}{2}\right)$$
$$\left|\tilde{H}\left(\omega\right)\right|=\sqrt{\frac{2}{\pi}}\left|\alpha_{1}\right|\cos\left(\omega\frac{\tau_{1}-\tau_{2}}{2}\right)$$
$$\arg\left(\tilde{H}\left(\omega\right)\right)=\arg\left(\alpha_{1}\right)+\omega\frac{\tau_{1}+\tau_{2}}{2}$$

<iframe src="https://www.geogebra.org/material/iframe/id/uxfzrrp5" width="100%" style="border: 1px solid #ccc; aspect-ratio: 2 / 1" frameborder=0></iframe>
<a href="https://www.geogebra.org/material/iframe/id/uxfzrrp5" target="_blank">לפתיחה בחלון נפרד</a>

נראה עכשיו איך זה נשמע

הקלטה מקורית:

[bush1 - original.wav](sounds/bush1-original.wav)

אחרי העברה בפונקציית תמסורת של חדר במימדים 40X40X10

[bush2-bigroom_40_40_10.wav](sounds/bush2-bigroom_40_40_10.wav)

אחרי העברה בפונקציית תמסורת של חדר במימדים 300

[bush3-emptygarage_300_130_5.wav](sounds/bush3-emptygarage_300_130_5.wav)

```{admonition} ויזואליזציה מהירה
:class: tip
דמיינו תרשים זמן שבו מגיעים הד החזק הראשון, ואז הדים חלשים יותר ומאוחרים. כל "קפיצה" בזמן מוסיפה תרומה מדורגת לפלט – זה בדיוק הקונבולוציה עם $h(t)$ של החדר.
```