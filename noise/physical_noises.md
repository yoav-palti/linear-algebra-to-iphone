# רעשים פיזיקלים 

הרבה מערכות פיזיקליות (חשמליות) דומות במקורות הרעש שלהן. ובפרט יהיו
כמעט תמיד שני מקורות רעש שנמצאים שם:

* רעש תרמי - רעש הנובע מתנועה אקראית של האלקטרונים
* רעש שוט - רעש הנוסע מזה שנושאי המטען הם חלקיקים ולא זרם רציף

### shot noise

הזרם שאנחנו מודדים תמיד מורכב מנושאי מטען בודדים (לרוב אלקטרונים אבל יכול להיות גם יונים אחרים).
ולכן אם אנחנו מודדים "זרם" קבוע בפועל הוא לא קבוע. הזרם הוא רק הממוצע
זה אומר שאם נמדוד בזמנים מספיק קטנים נוכל למדוד את המטענים הבודדים.

נניח הנחה שהיא רק קירוב של המציאות:
 **בכל רגע יש הסתברות קבועה למדידה של נושא מטען**

ההנחה הזו אומרת לנו שכמות נושאי המטען שנמדוד בזמן סופי כלשהו
היא פואסונית ואנחנו מניחים שההגעה של אלקטרונים
היא בלתי תלויה. כלומר הרעש לבן.

איך נראה הזרם באמת? כל פעם שמגיע מטען הזרם הוא $\delta$ ובין לבין
הוא פשוט 0. 
זה אומר שהצורה האמיתית של הזרם היא:

$$I\left(t\right)=q\sum_{n}\delta\left(t-t_{n}\right)$$

כאשר הזמנים $t_{n}$ עצמם הם רנדומאלים ודואגים שההתפלגות תהיה פואסונית

למה הכוונה התפלגות פואסונית? הכוונה היא שמספר המטענים
שעברו במוליך (במקום שאנחנו מודדים את הזרם)
בחלון זמן $T$ מתפלג פואסונית.
כמה מטענים עברו במוליך? בזמן $T$? אם נחשב את האינטגרל על
הזרם ונחלק במטען נקבל את התשובה. כלומר:

$$\underset{\text{םינעטמ}\text{סמ}}{\underbrace{N\left(T\right)}}=\frac{1}{q}\intop_{-\frac{T}{2}}^{\frac{T}{2}}I\left(t\right)dt$$

המספר הזה מתפלג פואסונית ולכן אם נגדיר את $\left\langle I\right\rangle _{T}\left(t\right)=q\cdot N\left(t\right)$ נקבל
את הזרם הממוצע בזמן $T$ ואת ההפתלגות שלו:

$$N\left(T\right)\sim Pois\left(\lambda\cdot T\right)\Rightarrow\left\langle I\right\rangle _{T}=\intop_{-\frac{T}{2}}^{\frac{T}{2}}I\left(t\right)dt\sim q\cdot Pois\left(\lambda\cdot T\right)$$

עכשיו ניתן לשאול מה הוא $\lambda$ נרצה
כי הזרם הממוצע יהיה $\left\langle I\right\rangle $ שהוא הזרם שאנחנו מודדים

זה אומר כי:

$$q\lambda T\underset{\mathbb{E}\left[Pois\left(\alpha\right)\right]=\alpha}{\underbrace{=}}\mathbb{E}\left[\left\langle I\right\rangle _{T}\right]=\mathbb{E}\left[\intop_{-\frac{T}{2}}^{\frac{T}{2}}I\left(t\right)dt\right]=T\cdot\left\langle I\right\rangle $$

כלומר:

$$\lambda=\frac{\left\langle I\right\rangle }{q}$$

אנחנו יודעים שהרעש הוא לבן ושעבור רעש לבן ה-PSD הוא קבוע
(אם הממוצע הוא 0) נוכל להסתכל על התהליך המקרי $x\left(t\right)=I\left(t\right)-\left\langle I\right\rangle $ שיש לו
ממוצע 0 והוא גם לבן. נשתמש במשפט וינר חינצ'ין על מנת
לחשב את הערך של PSD עבור ערך ספציפי (זה כמובן לא משנה כי ה-PSD קבוע)

צריך קודם כל להגדיר אות:

$$x_{T}\left(t\right)=Rect\cdot\left(\frac{t}{T}\right)x\left(t\right)$$

ואז נוכל לרשום כי:

$$S_{xx}\left(\omega\right)=S_{xx}\left(0\right)=\lim_{T\rightarrow\infty}\frac{1}{T}\mathbb{E}\left[\left|\mathcal{F}\left[x_{T}\left(t\right)\right]\left(\omega=0\right)\right|^{2}\right]$$

נשים לב שלעשות פורייה ולקחת את המקום ה-0 זה כמו למצע בזמן $\mathcal{F}\left[x_{T}\left(t\right)\right]\left(\omega=0\right)=\intop_{-\infty}^{\infty}Rect\cdot\left(\frac{t}{T}\right)x\left(t\right)dt=\intop_{-\frac{T}{2}}^{\frac{T}{2}}x\left(t\right)dt=\left(\left\langle I\right\rangle _{T}\left(t\right)-T\left\langle I\right\rangle \right)$

זה אומר כי:

$$S_{xx}\left(0\right)=\lim_{T\rightarrow\infty}\frac{1}{T}\mathbb{E}\left[\left(\left\langle I\right\rangle _{T}\left(t\right)-T\left\langle I\right\rangle \right)^{2}\right]=\lim_{T\rightarrow\infty}\frac{1}{T}\left(\mathbb{V}\left[\left\langle I\right\rangle _{T}\left(t\right)\right]\right)=\lim_{T\rightarrow\infty}\frac{1}{T}\left(q^{2}\lambda T\right)=q\left\langle I\right\rangle $$

מה קרה כאן? השתמשנו בכך שהתוחלת על משתנה מקרי $\left\langle I\right\rangle _{T}\left(t\right)$ פחות התוחלת שלו $T\left\langle I\right\rangle $ בריבוע זה פשוט ה-VAR שלו.
בגלל שה-PSD קבוע היה מספיק לנו לחשב נקודה אחת.

קיבלנו כי:

$$\boxed{S_{xx}\left(f\right)=q\left\langle I\right\rangle }$$

מסקנות:
* הרעש יותר גדול ככל שהזרם יותר גדול
* אם יש לנו פילטר לתחום תדרים $\Delta f=f_{2}-f_{1}$ נקבל כי גודל הרעש הוא $S_{xx}\left(f\right)=q\left\langle I\right\rangle \Delta f$
* אם אנחנו מעוניינים לדעת את הספק רעש שוט על נגד בגודל $R$ נקבל פשוט $S_{xx}\left(f\right)=qR\left\langle I\right\rangle \Delta f$

מה הוא ה-SNR של רעש שוט כאשר מודדים על נגד בגודל $R$?

$$SNR=\frac{\left\langle P_{sig}\right\rangle }{\left\langle P_{noise}\right\rangle }=\frac{R\left\langle I\right\rangle ^{2}}{eR\left\langle I\right\rangle \Delta f}=\frac{\left\langle I\right\rangle }{e\Delta f}$$

איך נגדיל את יחס האות לרעש?
* נבחר $\Delta\omega$ כמה שיותר קטן כך שהוא לא מסנן לנו את האות
* נגדיל את הזרם הממוצע שלנו
* נקטין את מטען האלקטרון :)


### רעש תרמי
יש לנו מוליך שמלא באלקטרונים. אבל בגלל שיש תמית תמפרטורה כלשהי
האלקטרונים לא עומדים במקום אלא זורמים לכלל הכיוונים. נגיד שכיוון הזרימה במוליך שלנו הוא $x$. אנחנו מעוניינים לדעת מה המהירות הממוצעת או יותר נכון מה הספק הרעש.

לא נעשה כאן ניתוח שלם אבל רק נבין איך הגדלים נכנסים לבעייה.

הקשר בין טמפרטורה למהירות הוא חוק ידוע בתרמודינמיקה: וביקירוב ניתן לומר כי:

$$\frac{1}{2}mu_{x}^{2}=\frac{1}{2}k_{B}T$$

אנחנו יודעים שהספק האות מתכונתי לזרם בריבוע שמתכונתי למהירות בריבוע:

$$\left\langle P\right\rangle \propto\left\langle I\right\rangle ^{2}\propto\left\langle u_{x}^{2}\right\rangle \propto k_{B}T$$

ניתוח מעמיק יותר של המערכת יתן בדיוק את הקבועים. וכמו קודם נניח שאנחנו מודדים את הרעש במערכת שמסננת את כלל התדרים חוץ מרצועה בגודל $\Delta f$.
נקבל כי:

$$\left\langle P\right\rangle =RS_{II}\left(f\right)=4k_{B}T\Delta f$$

כלומר הספק הרעש לינארי בטמפרטורה.
