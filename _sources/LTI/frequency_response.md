# תגובת בתדר

### פירוק לתדרים

עם האינטואיציה שמערכות לינאריות מאפשרות לנו לפרק אות מורכב לסכום (או אינטגרל) של אותות פשוטים פירקנו את האות לפונקציות
דלתא מוזזות בזמן:

$$\underset{\text{תוא}}{\underbrace{x\left(t\right)}}=\intop_{-\infty}^{\infty}\underset{\text{רפסמ}}{\underbrace{x\left(\tau\right)}}\cdot\delta\left(t-\tau\right)d\tau$$

תחת הפירוק הזה מצאנו את פונקציית התגובה להלם. שעבורה:

$$T:\left\{ x\left(t\right)\right\} =\intop_{-\infty}^{\infty}\underset{\text{םדקמ}}{\underbrace{x\left(\tau\right)}}\cdot\underset{\text{םלהל}\text{הבוגת}}{\underbrace{h\left(t,\tau\right)}}d\tau$$

ועבור מערכת שהיא LTI קיבלנו כי

$$T:\left\{ x\left(t\right)\right\} =x\left(t\right)\ast h\left(t\right)$$

זאת התוצאה אולי הכי חשובה בקורס. אבל אין סיבה לעצור כאן. פונקציות ניתן לפרק בהרבה צורות שונות. דרך נוספת שאתם מכירים
מקורסים אחרים היא פירוק טיילור:

$$x\left(t\right)=\sum_{n=0}^{\infty}a_{n}t^{n}$$

הפירוק הזה לא יהיה לנו מאוד שימושי משום שפולינומים לא חסומים ולכן אם נדמיין שהאות שלנו הוא אחד הפולינומים האלו ונגדיר
אנרגיה (בהרבה אותות) כ$E\propto\intop_{-\infty}^{\infty}\left|x\left(t\right)\right|^{2}dt$ נקבל כי האות לא פיזיקאלי

איזה פירוק כדאי לשקול? נתחיל מפשוט לגלות את התשובה ולאט לאט נבין למה בחרנו דווקא את הפירוק הזה.
התשובה תהיה טרנספורם פורייה:

$$x\left(t\right)=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}\underset{\text{םימדקמ}}{\underbrace{\tilde{X}\left(\omega\right)}}e^{i\omega t}dt$$

למי שכבר יצא לראות את הנוסחה הזו הוא יזהה את זה דווקא בתור טרנספורם פורייה ההפוך אבל שימו לב שכל מה שכתבנו כאן הוא שהאות
שלנו ניתן לכתיבה כסכום של הפונקציות $e^{i\omega t}$ ולכל פונקצייה יש מקדם $X\left(\omega\right)$ אשר מכפיל אותה. איך
נמצא את המקדמים? נתן כאן את הנוסחה בלי להסביר ובהמשך זה יתבהר:

$$\mathcal{F}\left[x\left(t\right)\right]\equiv\tilde{X}\left(\omega\right)=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}x\left(t\right)e^{-i\omega t}dt$$

זה טרנספורם פורייה (לא ההפוך) כמו שלרוב מכירים. כלומר טרנספורם פורייה הוא דרך לחשב את מקדמי הפריסה של האות.

נבדוק שהנוסחא באמת נכונה:

$$\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}\underset{\text{םימדקמ}}{\underbrace{\tilde{X}\left(\omega\right)}}e^{i\omega t}dt=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}\left(\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}x\left(\tau\right)e^{-i\omega\tau}d\tau\right)e^{i\omega t}dt=$$
$$\underset{\text{היצרגטניא}-\text{רדס}-\text{ףילחנ}}{\underbrace{=}}\frac{1}{2\pi}\intop_{-\infty}^{\infty}x\left(\tau\right)\left(\intop_{-\infty}^{\infty}e^{i\omega\left(t-\tau\right)}dt\right)d\tau=\frac{1}{2\pi}\intop_{-\infty}^{\infty}x\left(\tau\right)\left(2\pi\delta\left(t-\tau\right)\right)d\tau=x\left(t\right)$$

```{admonition} נשים לב
:class: tip
האינטגרל $\intop_{-\infty}^{\infty}e^{i\omega\left(t-\tau\right)}dt$ שווה 0 כאשר $t\ne\tau$ ואינסוף אחרת. כלומר:

$$\intop_{-\infty}^{\infty}e^{i\omega\left(t-\tau\right)}dt=\begin{cases}
0 & t\ne\tau\\
\infty & t=\tau
\end{cases}\propto\delta\left(t-\tau\right)$$

מאיפה מגיע פאקטור ה$2\pi$? צריך כבר לחשב בזהירות ולהבין מה השטח מתחת לפונקצייה הזו
```

### תגובת מערכת LTI בפירוק תדרי

נשאל מה אם אנחנו מסתכלים על הפעולה של מערכת LTI על אות כאשר אנחנו מייצגים אותו בעזרת המקדמים במרחב התדר
![freq_lti_response.png](images/freq_lti_response.png)

נבדוק מהו $\tilde{Y}\left(\omega\right)\equiv\mathcal{F}\left[x\left(t\right)\ast h\left(t\right)\right]$:

$$\tilde{Y}\left(\omega\right)=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}y\left(t\right)e^{-i\omega t}dt=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}x\left(t\right)\ast h\left(t\right)e^{-i\omega t}dt$$
$$=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(t-\tau\right)d\tau e^{-i\omega t}dt=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(t-\tau\right)e^{-i\omega t}dtd\tau$$
$$\underset{u=t-\tau}{\underbrace{=}}\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}\intop_{-\infty}^{\infty}x\left(\tau\right)h\left(u\right)e^{-i\omega\left(u+\tau\right)}dud\tau=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}\intop_{-\infty}^{\infty}x\left(\tau\right)e^{-i\omega\tau}h\left(u\right)e^{-i\omega u}dtd\tau$$
$$=\frac{1}{\sqrt{2\pi}}\left(\intop_{-\infty}^{\infty}h\left(u\right)e^{-i\omega u}dt\right)\left(\intop_{-\infty}^{\infty}x\left(\tau\right)e^{-i\omega\tau}d\tau\right)=\sqrt{2\pi}\tilde{H}\left(\omega\right)\tilde{X}\left(\omega\right)$$

בקצרה קיבלנו כי:

$$\boxed{y\left(t\right)=x\left(t\right)\ast h\left(t\right)\Longleftrightarrow\tilde{Y}\left(\omega\right)=\sqrt{2\pi}\tilde{X}\left(\omega\right)\tilde{H}\left(\omega\right)}$$
(את הכיוון ההפוך אתם מוזמנים לעשות וזה חישוב מאוד דומה)

נקרא לפונקציה זו פונקציית התמסורת:

$$\underset{\text{תרוסמתה}-\text{תייצקנופ}}{\underbrace{\tilde{H}\left(\omega\right)}}\equiv\mathcal{F}\left[h\left(t\right)\right]=\mathcal{F}\left[T:\left\{ \delta\left(t\right)\right\} \right]$$

נשים לב שהרבה פעמים לא נרשום את הפקטור של ה-$\sqrt{2\pi}$ וכל עוד לא עובדים עם עוצמות אבסולוטיות (ולא יחסיות) הוא לא
ישנה.
נרשום את זה בדיאגרמה כמו מקודם
![lti_freq_diagram.png](images/lti_freq_diagram.png)

קיבלנו שמערכת LTI היא equalizer. היא מגבירה או מנמיכה תדרים מסויימים.

כמה מסקנות חשובות נובעות מזה:

* אין יצירת תדרים חדשים: $\tilde{X}\left(\omega_{0}\right)=0\Rightarrow\tilde{Y}\left(\omega_{0}\right)=0$
* משפט הקונבולוציה: קונבולוציה בזמן היא מכפלה בתדר והפוך
* ניתן לעבוד לגמרי במרחב התדר. כל מערכת LTI ניתן לאפיין לחלוטין במרחב התדר

### תכונות של פונקציית התמסורת

* בגלל שאנחנו מניחים שפונקציית התגובה להלם קוזאלית ניתן להראות שיש קשר
  בין $\mathcal{\Re}\left[\tilde{H}\left(\omega\right)\right]$ ובין $\Im\left[\tilde{H}\left(\omega\right)\right]$ אנחנו
  לא ניכנס לזה מעבר לכך ומי שמעוניין מוזמן לקרוא
  על [Kramers–Kronig relations](https://en.wikipedia.org/wiki/Kramers%E2%80%93Kronig_relations)
* פונקציית התגובה להלם ממשית ולכן: $\tilde{H}\left(-\omega\right)=\tilde{H}^{\ast}\left(\omega\right)$

### דוגמא לפונקציית התמסורת

ניקח (איך לא) את הדוגמא של המיקרופון!!!

$$Ap\left(t\right)=m\ddot{x}+\gamma\dot{x}+kx$$
נחשב פורייה לשני הצדדים:

$$\mathcal{F}\left[Ap\left(t\right)\right]=A\tilde{P}\left(\omega\right)$$
$$\mathcal{F}\left[m\ddot{x}+\gamma\dot{x}+kx\right]=m\left(i\omega\right)^{2}\tilde{X}\left(\omega\right)+\gamma\left(i\omega\right)\tilde{X}\left(\omega\right)+k\tilde{X}\left(\omega\right)$$
$$=\left(-m\omega^{2}+i\gamma\omega+k\right)\tilde{X}\left(\omega\right)$$
קיבלנו כי:

$$A\tilde{P}\left(\omega\right)=\left(-m\omega^{2}+i\gamma\omega+k\right)\tilde{X}\left(\omega\right)$$
כלומר:

$$\tilde{H}\left(\omega\right)=\frac{\tilde{X}\left(\omega\right)}{\tilde{P}\left(\omega\right)}=\frac{A}{-m\omega^{2}+i\gamma\omega+k}$$

<iframe src="https://www.geogebra.org/material/iframe/id/ydttts6y" width="100%" style="border: 1px solid #ccc; aspect-ratio: 2 / 1" frameborder=0></iframe>

נסו לשחק קצת עם האילוסטרציה. מה ה-ם הפרמטרים הכי טובים אם אנחנו רוצים לתכנן מיקרופון?
נסו לגרום לרוחב של התמסורת להיות כמה שיותר רחבה

* אם רוצים למקסם את התגובה בתדרים נמוכים נרצה $A$ גדול ו$k$ קטן
* אם רוצים למקסם את התגובה בתדרים גבוהים נרצה $\sqrt{\frac{k}{m}}$ גדול
* ומה עם רוחב הסרט? לא נראה את זה כאן אבל ניתן לראות שרוחב הסרט נשלט על ידי $\gamma$. כאשר $\gamma$ גדול
  יתן $\Delta\omega$ גדול ולהפך. כאשר תהיה לנו ב-$\gamma$ גדול הבעיה של ריסון גדול מקריטי

### לכסון מערכות

נחזור עכשיו לשאלה למה הפריסה על $e^{i\omega t}$ כל כך מוצלחת
מה יקרה אם נכניס למערכת לינארית $x\left(t\right)=e^{i\omega_{0}t}$?
אנחנו יודעים שכל תדר מוכפל במספר אבל יש לנו רק תדר אחד. כלומר התוצאה
תהיה: $y\left(t\right)=\tilde{H}\left(\omega_{0}\right)e^{i\omega_{0}t}$

או בדיאגרמה:
![LTI_exp_input.png](images/LTI_exp_input.png)

כלומר שיש לנו שתי דרכים למדוד את $\tilde{H}\left(\omega_{0}\right)$

* להכניס $\delta\left(t\right)$ למערכת ולעשות פורייה טרנספורם
* להכניס למערכת  $\cos\left(\omega_{0}t\right)$ ולאות את שינוי האמפליטודה והפאזה

איך נראית המערכת כשאנחנו מכניסים אליה קוסינוס?

$$y\left(t\right)=T:\left\{ x\left(t\right)\right\} =T:\left\{ \cos\left(\omega_{0}t\right)\right\} =T:\left\{ \frac{e^{i\omega_{0}t}-e^{-i\omega_{0}t}}{2}\right\} =$$
$$=\frac{1}{2}\left(T:\left\{ e^{i\omega_{0}t}\right\} -T:\left\{ e^{-i\omega_{0}t}\right\} \right)=\frac{1}{2}\left(\tilde{H}\left(\omega_{0}\right)e^{i\omega_{0}t}-\tilde{H}\left(-\omega_{0}\right)e^{-i\omega_{0}t}\right)$$
$$=\frac{1}{2}\left(\tilde{H}\left(\omega_{0}\right)e^{i\omega_{0}t}-\tilde{H}^{\ast}\left(\omega_{0}\right)e^{-i\omega_{0}t}\right)\underset{\varphi=\arg\left(\tilde{H}\left(\omega_{0}\right)\right)}{\underbrace{=}}\frac{1}{2}\left(\left|\tilde{H}\left(\omega_{0}\right)\right|e^{i\varphi}e^{i\omega_{0}t}-\left|\tilde{H}\left(\omega_{0}\right)\right|e^{-i\varphi}e^{-i\omega_{0}t}\right)$$
$$=\frac{\left|\tilde{H}\left(\omega_{0}\right)\right|}{2}\left(e^{i\left(\omega_{0}t+\varphi\right)}-e^{-i\left(\omega_{0}t+\varphi\right)}\right)=\left|\tilde{H}\left(\omega_{0}\right)\right|\cos\left(\omega_{0}t+\varphi\right)$$

קיבלנו ש-$\cos\left(\omega_{0}t\right)$ צובר פאזה והאמפליטודה שלו משתנה
נשים לב שהמערכת היא Time Invariant ולכן:

$$T:\left\{ \cos\left(\omega_{0}t+\phi_{0}\right)\right\} =T:\left\{ \cos\left(\omega_{0}\left(t+\frac{\phi_{0}}{\omega_{0}}\right)\right)\right\} \underset{Time-Invariant}{\underbrace{=}}\left|\tilde{H}\left(\omega_{0}\right)\right|\cos\left(\omega_{0}\left(t+\frac{\phi_{0}}{\omega_{0}}\right)+\varphi\right)$$

מסקנות:

* $\cos\left(\omega_{0}t+\phi_{0}\right)$ נשאר באותו תדר אך משנה פאזה ואמפליטודה
* קונבולוציה של $\cos\left(\omega_{0}t+\phi_{0}\right)$ עם כל פונקציה (ממשית) נותן קוסינוס באותו תדר
* אין יצירת תדרים חדשים במערכות LTI
* מערכת LTI היא מסנן (filter) תדרים אשר משנה גם את האמפליטודה וגם את הפאזה

### הקשר לאלגברה לינארית

כבר התחלנו לעשות את ההקבלה כשלמדנו על פונקציית תגובה להלם אבל עכשיו אנחנו כבר יכולים ממש לבנות "אנלוגיה" שלמה בראש

|                                      |                                                                      בסיס סופי                                                                      |                                                                            מערכות לינאריות                                                                            |
|:------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                וקטור                 |                                                                      $\vec{v}$                                                                      |                                                                                  $x$                                                                                  |
|               אופרטור                |                                                                 $T:V\rightarrow V$                                                                  |                                                          $y\left(t\right)=T:\left\{ x\left(t\right)\right\}$                                                          |
|               לינאריות               |                  $T\left(\alpha\vec{v_{1}}+\beta\vec{v_{2}}\right)=T\left(\alpha\vec{v_{1}}\right)+T\left(\beta\vec{v_{2}}\right)$                  |                              $T:\left\{ \alpha x_{1}+\beta x_{2}\right\} =\alpha T:\left\{ x_{1}\right\} +\beta T:\left\{ x_{2}\right\}$                              |
|          קורדינטות של וקטור          |                                                                        $v_i$                                                                        |                                                                                $x(t)$                                                                                 |
|            פריסה על דלתא             |                                       $\left[\vec{v}\right]_{j}=\sum_{i}\left[\vec{v}\right]_{i}\delta_{ij}$                                        |                                   $x\left(t\right)=\intop_{-\infty}^{\infty}x\left(\tau\right)\cdot\delta\left(t-\tau\right)d\tau$                                    |
|              תגובה להלם              |                                   $\left[T\left(\vec{v}\right)\right]_{i}=\sum_{j}h_{ij}\left[\vec{v}\right]_{j}$                                   |                            $T:\left\{ x\left(t\right)\right\} =\intop_{-\infty}^{\infty}x\left(\tau\right)\cdot h\left(t,\tau\right)d\tau$                            |
|             מכפלה פנימית             |                 $\left\langle \vec{v}\|\vec{u}\right\rangle =\sum_{i}\left[\vec{v}\right]_{i}\cdot\left[\vec{u}\right]_{i}^{\ast}$                  |                 $\left\langle x\left(t\right)\|g\left(t\right)\right\rangle =\intop_{-\infty}^{\infty}x\left(t\right)\cdot g^{\ast}\left(t\right)dt$                  |
|                 בסיס                 |                                                $\vec{v}=\sum_{i}\left[\vec{v}\right]_{i}\vec{b_{i}}$                                                |                                    $x\left(t\right)=\intop_{-\infty}^{\infty}X\left(\alpha\right)g_{\alpha}\left(t\right)d\alpha$                                     |
|        אורתונורמליות של בסיס         |                                          $\left\langle \vec{b_{i}}\|\vec{b_{j}}\right\rangle =\delta_{ij}$                                          |                       $\intop_{-\infty}^{\infty}g_{\alpha}\left(t\right)\cdot g_{\beta}^{\ast}\left(t\right)dt=\delta\left(\alpha-\beta\right)$                       |
| חישוב מקדמי פריסה בבסיס אורתונורמאלי | $\left[\vec{v}\right]_{i}=\left\langle \vec{v}\|\vec{b_{i}}\right\rangle =\sum_{j}\left[\vec{v}\right]_{j}\cdot\left[\vec{b}_{i}\right]_{j}^{\ast}$ | $X\left(\alpha\right)=\left\langle x\left(t\right)\|g_{\alpha}\left(t\right)\right\rangle =\intop_{-\infty}^{\infty}x\left(t\right)g_{\alpha}^{\ast}\left(t\right)dt$ |
|              וקטור עצמי              |                                                 $T\left(\vec{v}_{i}\right)=\lambda_{i}\vec{v}_{i}$                                                  |                                   $T:\left\{ x_{\alpha}\left(t\right)\right\} =\lambda\left(\alpha\right)x_{\alpha}\left(t\right)$                                    |
|              בסיס התדר               |                                                                 ספויילר לסוף הקורס                                                                  |                                                     $g_{\omega}\left(t\right)=\frac{1}{\sqrt{2\pi}}e^{i\omega t}$                                                     |
|      בסיס התדר הוא ארתונורמאלי       |                                                                 ספויילר לסוף הקורס                                                                  |                             $\intop_{-\infty}^{\infty}e^{i\omega_{i}t}\cdot e^{-i\omega_{j}t}dt=\delta\left(\omega_{i}-\omega_{j}\right)$                             |
|     חישוב מקדמי פריסה בבסיס התדר     |                                                                 ספויילר לסוף הקורס                                                                  |                                 $F\left(\omega\right)=\frac{1}{\sqrt{2\pi}}\intop_{-\infty}^{\infty}f\left(t\right)e^{-i\omega t}dt$                                  |
|      בסיס התדר מלכסן מערכות LTI      |                                                                 ספויילר לסוף הקורס                                                                  |                                        $T:\left\{ e^{i\omega_{0}t}\right\} =\tilde{H}\left(\omega_{0}\right)e^{i\omega_{0}t}$                                         |

### הפיכות מערכות LTI
מתי מערכת LTI היא הפיכה? כלומר מתי ניתן לשרשר שתי מערכות כך שהתגובה הכוללת היא כלום.
באופן מפתיע התשובה היא אף פעם. זה נובע מהרצון שלנו שהתגובה בזמן תהיה קוזאלית. מה כן אפשר לעשות?
אפשר לשרשר שתי מערכות ככה שהתגובה הסופית תהיה התגובה בכניסה עד כדי דיליי.

באלגברה לינארית מטריצה היא הפיכה אם הדטרמיננטה שלה היא לא 0 או שאין לה אף וקטור עצמי עם ערך עצמי 0.
באופן דומה נדרוש כי:

$$\forall\omega\in\mathbb{R}:\underset{\text{ימצע}-\text{ךרע}}{\underbrace{\tilde{H}\left(\omega\right)}}\ne0$$

ואז נוכל לעצב מערכת נוספת שהתגובה שלה לתדר היא :

$$\tilde{H}_{inv}\left(\omega\right)=\frac{1}{\tilde{H}\left(\omega\right)}$$

אבל כאן נכנסת הבעיה. מי אמר שההופכי הוא קוזאלי? מה שאפשר לעשות הוא "להקל על עצמנו" ולהזיז את $h_{inv}\left(t\right)$ קדימה בזמן ככה שמה שיהיה בזמן שלילי זניח. נקבל כי:

$$\tilde{H}_{inv}\left(\omega\right)=\frac{1}{\tilde{H}\left(\omega\right)}\underset{\text{הזזה}}{\underbrace{e^{i\omega\tau}}}$$

עוד בעיה שלרוב קיימת היא רעש. אנחנו נגיע לזה בהמשך הקורס.

