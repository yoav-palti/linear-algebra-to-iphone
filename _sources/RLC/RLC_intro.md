# מעגלי RLC

### בניית פילטר רדיו
המטרה עכשיו היא להצליח לתכנן מסנן אנלוגי לקליטה של גלגלץ

$$f_{0}=91.8MHz,\Delta f=100kHz$$

איך נראה המעגל שלנו?
![RLC_diagram.png](images/RLC_diagram.png)

כמו במעגל RC נרשום:

$$V_{in}\left(t\right)=V_{R}\left(t\right)+V_{C}\left(t\right)+V_{L}\left(t\right)=RI\left(t\right)+L\frac{d}{dt}I\left(t\right)+\frac{1}{C}\intop_{-\infty}^{t}I\left(t^{\prime}\right)dt^{\prime}$$

ונעבור למרחב התדר

$$\tilde{V}_{in}\left(\omega\right)=\underset{Z\left(\omega\right)}{\underbrace{\left(R+i\omega L+\frac{1}{i\omega C}\right)}}\tilde{I}\left(\omega\right)$$
$$\tilde{V}_{out}\left(\omega\right)=\tilde{V_{R}}\left(\omega\right)=R\tilde{I}\left(\omega\right)=\frac{R}{R+i\omega L+\frac{1}{i\omega C}}\tilde{V}_{in}\left(\omega\right)$$
$$\tilde{H}\left(\omega\right)=\frac{R}{R+i\omega L+\frac{1}{i\omega C}}$$

נשים לב שבמעגל יש תדר רזוננס בו אין הפרש פאזה בין המתח לזרם (למה זה? רמז, הספק). זהו התדר אשר בו אנחנו מקבלים אימפדנס ממשי כלומר:

$$\Im\left[Z\left(\omega_{res}\right)\right]=0$$
$$\Downarrow$$
$$\left(\omega_{res}L-\frac{1}{\omega_{res}C}\right)=0$$
$$\omega_{res}=\frac{1}{\sqrt{LC}}$$

נראה את זה בגרף

<iframe src="https://www.geogebra.org/material/iframe/id/fsmc5gwz" width="100%" style="border: 1px solid #ccc; aspect-ratio: 2 / 1" frameborder=0></iframe>
<a href="https://www.geogebra.org/material/iframe/id/fsmc5gwz" target="_blank">לפתיחה בחלון נפרד</a>

נסתכל על קצת גבולות של פונקציית התמסורת:
* $\tilde{H}\left(0\right)=0$
* $\tilde{H}\left(\omega\right)\underset{\omega\ll\frac{R}{L},\frac{1}{RC},}{\underbrace{\approx}}RC\cdot i\omega$ - קיבלנו מעגל גזירה עם הקבל והנגד
* $\tilde{H}\left(\omega\right)\underset{\frac{1}{RC},\frac{R}{L}\ll\omega}{\underbrace{\approx}}\frac{R}{L}\frac{1}{i\omega}$ - קיבלנו מעגל אינטגרציה עם הסליל והנגד 

בסרטוט רשום רוחב סרט שמחושב כרוחב הפונקציה עבור ירידה של התמסורת $\sqrt{2}$ בגובה. זה מקביל לירידה של חצי בהספק. זה מה שנקרא רוחב סרט בירידה של 3dB כלומר:

$$P_{-3dB}=\frac{1}{2}P_{max}\Rightarrow V_{-3dB}=\frac{1}{\sqrt{2}}V_{max}$$

בתרגיל תחשבו את רוחב הסרט כלומר לפתור בקירוב את המשוואה:

$$\omega_{\pm}=\omega_{res}\pm\frac{\Delta\omega}{2},\left|\tilde{H}\left(\omega_{\pm}\right)\right|=\frac{1}{\sqrt{2}}$$

כאשר חשוב לשים לב ש:$\tilde{H}\left(\omega_{res}\right)=1$

מקבלים כי:

$$\Delta\omega\approx\frac{R}{L}$$

לדוגמה עבור הרדיו שלנו נרצה כי $\omega_{0}=2\pi f_{0}=576.8\cdot10^{6},\Delta\omega=628\cdot10^{3}$

נבחר באופן שרירותי כי $C=1nF$

$$L=\frac{1}{C\cdot\omega_{res}^{2}}=3\cdot10^{-9}=3nH\Rightarrow R=L\cdot\Delta\omega=1.9m\Omega$$

### הקבלה לאוסילטור הרמוני
מעגל RLC טורי מזכיר אוסילטור הרמוני ולא סתם. הוא נראה מה ההקבלה:

|                   מעגל RLC                   |                     אוסילטור הרמוני                    |
|:--------------------------------------------:|:------------------------------------------------------:|
| $F\left(t\right)=kx+\gamma\dot{x}+m\ddot{x}$ | $V_{in}\left(t\right)=\frac{1}{C}q+R\dot{q}+L\ddot{q}$ |
|            $V_{in}\left(t\right)$            |                    $F\left(t\right)$                   |
|               $q\left(t\right)$              |                    $x\left(t\right)$                   |
|               $I\left(t\right)$              |                 $\dot{x}\left(t\right)$                |
|                 $\frac{1}{C}$                |                           $k$                          |
|                      $L$                     |                           $m$                          |
|                      $R$                     |                        $\gamma$                        |

### Q-factor
במעגל שעושה Band Pass Filter (BPF) יש שני מספרים חשובים $\omega_{0}$ (לפעמים יסומן כ-$\omega_{res}$) ו-$\Delta\omega$ אשר קובעים את טיב הפילטר
ליחס בינהם יש שם מיוחד:

$$Q=\frac{\omega_{0}}{\Delta\omega}$$

אתם יכולים לחשוב על זה בתור "צרות יחסית" או תוחלת חלקי סטיית תקן עבור משתנים סטטיסטים.

לדוגמא עבור רדיו FM נקבל כי:

$$Q=\frac{100\cdot10^{6}}{100\cdot10^{3}}=1000$$

נשים לב שערך ה-Q חייב להתאים לצורך:
* במקלט רדיו כדי שיהיה לנו $Q\approx10^{3}$
* אם אנחנו רוצים מערכת רחבת סרט אנחנו חייבים לקבל  $Q<1$
  * למשל ברמקול אנחנו רוצים $\omega_{0}=2\pi\cdot\underset{10KHz}{\underbrace{10^{4}}},\Delta\omega=2\pi\cdot\underset{20KHz}{\underbrace{20\cdot10^{3}}}$ ולכן נקבל כי $Q=\frac{1}{2}$

במעגל RLC טורי נקבל כי:

$$Q=\frac{1}{R}\sqrt{\frac{L}{C}}$$

### תגובה להלם של מעגל RLC ומספר אוסילציות בזמן מחזור
עשינו כבר את ההקבלה לאוסילטור הרמוני ולכן נוכל לנחש יחסית בקלות כי:

$$h\left(t\right)=A\frac{d}{dt}\left(\theta\left(t\right)e^{-\frac{t}{\tau}}\sin\left(\omega_{D}t\right)\right)$$

ננסה להבין מה הם שלושת הקבועים שלנו:

$$H\left(\omega\right)=iA\omega\left(\mathcal{F}\left[\theta\left(t\right)e^{-\frac{t}{\tau}}\right]\ast\frac{1}{2i}\left(\delta\left(\omega-\omega_{D}\right)-\delta\left(\omega+\omega_{D}\right)\right)\right)$$
$$=iA\omega\left(\frac{1}{\sqrt{2\pi}}\frac{1}{\frac{1}{\tau}+i\omega}\ast\frac{1}{2i}\left(\delta\left(\omega-\omega_{D}\right)-\delta\left(\omega+\omega_{D}\right)\right)\right)$$
$$=\frac{A\omega}{2\sqrt{2\pi}}\left(\frac{1}{\frac{1}{\tau}+i\left(\omega-\omega_{D}\right)}-\frac{1}{\frac{1}{\tau}+i\left(\omega+\omega_{D}\right)}\right)$$
$$=\frac{A\omega}{2\sqrt{2\pi}}\left(\frac{\frac{1}{\tau}+i\left(\omega+\omega_{D}\right)-\frac{1}{\tau}-i\left(\omega-\omega_{D}\right)}{\left(\frac{1}{\tau}+i\left(\omega-\omega_{D}\right)\right)\left(\frac{1}{\tau}+i\left(\omega+\omega_{D}\right)\right)}\right)$$
$$=\frac{A\omega}{2\sqrt{2\pi}}\left(\frac{2i\omega_{D}}{\frac{1}{\tau^{2}}+\frac{i}{\tau}\left[\left(\omega-\omega_{D}\right)+\left(\omega+\omega_{D}\right)\right]-\left(\omega-\omega_{D}\right)\left(\omega+\omega_{D}\right)}\right)$$
$$=\frac{A\omega}{\sqrt{2\pi}}\left(\frac{i\omega_{D}}{\frac{1}{\tau^{2}}+\frac{2i\omega}{\tau}-\omega^{2}+\omega_{D}^{2}}\right)=\frac{A\omega}{\sqrt{2\pi}}\frac{i\omega_{D}\frac{1}{i\omega}}{\frac{2}{\tau}-\frac{\omega^{2}}{i\omega}+\frac{\frac{1}{\tau^{2}}+\omega_{D}^{2}}{i\omega}}$$
$$=\frac{A\omega_{D}}{\sqrt{2\pi}}\frac{1}{\frac{2}{\tau}-\frac{\omega^{2}}{i\omega}+\frac{\frac{1}{\tau^{2}}+\omega_{D}^{2}}{i\omega}}=\frac{AL\omega_{D}}{\sqrt{2\pi}}\frac{1}{\frac{2L}{\tau}+i\omega L+\frac{\left(\frac{1}{\tau^{2}}+\omega_{D}^{2}\right)L}{i\omega}}$$

נדרוש שהקבועים יתנו לנו את פונקציית התמסורת שאנחנו מכירים ולכן:

$$\frac{2L}{\tau}=R\Rightarrow\boxed{\tau=\frac{2L}{R}}$$
$$\left(\frac{1}{\tau^{2}}+\omega_{D}^{2}\right)L=\frac{1}{C}\Rightarrow\boxed{\omega_{D}=\sqrt{\frac{1}{LC}-\frac{R^{2}}{4L^{2}}}}$$
$$\frac{AL\omega_{D}}{\sqrt{2\pi}}=R\Rightarrow\boxed{A=\frac{2\sqrt{2\pi}}{\tau\omega_{D}}}$$

כלומר קיבלנו שהסינוס לא מתנדנד בדיוק בתדר הרזוננס אבל עבור שיכוך מספיק קטן זה כן נכון. בנוסף קיבלנו כי הפונקצייה דועכת בקצב אופייני של $\tau=\frac{2L}{R}$
נשים לב לעובדה חשובה. בחישוב של פונקציית התמסורת הסינוס רק נתן את שני השכפולים בשני הצדדים בעוד "צורת" הפונקצייה קיבלנו מהפונקצייה $\theta\left(t\right)e^{-\frac{t}{\tau}}$ שקבעה את הרוחב
נשים לב שהפורייה שלה בערך מוחלט הוא:

$$\left|\mathcal{F}\left[\theta\left(t\right)e^{-\frac{t}{\tau}}\right]\right|^{2}=\left|\frac{1}{\frac{1}{\tau}+i\omega}\right|^{2}=\frac{1}{\frac{1}{\tau^{2}}+\omega^{2}}$$

כלומר היא יורדת לחצי גובה עבור: $\omega_{\pm}=\frac{1}{\tau}\Rightarrow\Delta\omega\approx2\frac{1}{\tau}=\frac{R}{L}$
יבלנו בדרך נוספת את העבודה שהרוחב הוא שאנחנו מצפים. 

בנוסף אם יש שיכוך קטן נקבל כי הפונקצייה מתנדנדת בתדר $\omega_{D}\approx\omega_{0}=\frac{1}{\sqrt{LC}}$ולכן נקבל כי:

$$Q=\frac{\omega_{0}}{\Delta\omega}\approx\frac{\omega_{D}}{2\frac{1}{\tau}}=\frac{2\pi\frac{1}{T}}{2\frac{1}{\tau}}=\underset{\text{הכיאד}-\text{ןמזב}-\text{תויצליסוא}-\text{תומכ}}{\pi\underbrace{\frac{\tau}{T}}}$$

קיבלנו עוד "הגדרה" ל-Q אשר אומרת שהוא מתאר (עד כדי פקטור) את מספר האוסילציות שהתגובה להלם עושה לפני שהיא דועכת. אנחנו יכולים לשים לב שאם אנחנו רוצים מערכת "רחבת סרט" אנחנו צריכים Q נמוך כלומר מערכת שנמצאת בריסון משמעותי.

### הגדרה אנרגטית ל-Q factor

ישנה הגדרה נוספת ל-Q-factor אשר מגיע מאנרגיה:

$$Q\equiv2\pi\frac{E_{store}}{E_{lost-per-T}}$$

נסתכל שוב על תגובת המעגל להלם
נשים לב שבמעגל המתח על הקבל תמיד בהפרש פאזה של $\frac{\pi}{2}$ ביחס לזרם (רמז - אימפדנס של קבל). ולכן כאשר הזרם מקסימלי המתח הוא אפס וכל האנרגיה אגורה בסליל. לכן נוכל לרשום:  

$$Q=2\pi\frac{E_{store}}{E_{lost-per-cycle}}=\frac{2\pi\frac{1}{2}LI_{max}^{2}}{TRI_{rms}^{2}}=\frac{2\pi L}{TR}=\frac{\omega_{0}}{\Delta\omega}$$





