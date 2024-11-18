# מעגלי RLC

כדוגמה מובילה נתחיל לחקור מעגלי RLC ונבין איך אנחנו יכולים לאפיין אותם עם החוקים שפיתחנו עד עכשיו
ניקח את החוקים שאנחנו מכירים מחשמל. אם מודדים מתח במקביל לרכיבים מקבלים:

* חוק אוהם - $V_{R}\left(t\right)=R\cdot I\left(t\right)$
* קבל - $V_{C}\left(t\right)=\frac{1}{C}\cdot Q\left(t\right)=\frac{1}{C}\cdot\intop_{-\infty}^{t}I\left(\tau\right)d\tau$
* חוק לנץ - $V_{L}\left(t\right)=L\frac{d}{dt}I\left(t\right)$

אפשר להסתכל על הנוסחאות הללו במחרב התדר:
* $\tilde{V_{R}}\left(\omega\right)=R\cdot\tilde{I}\left(\omega\right)\Rightarrow Z_{R}=R$
* $\tilde{V_{C}}\left(\omega\right)=\frac{1}{i\omega C}\tilde{I}\left(\omega\right)\Rightarrow Z_{C}=\frac{1}{i\omega C}$
* $\tilde{V_{L}}\left(\omega\right)=i\omega L\tilde{I}\left(\omega\right)\Rightarrow Z_{L}=i\omega L$

קיבלנו שכל אחר מהרכיבים האלו הוא מערכת LTI שממירה זרם למתח
![RLC_system.png](images/RLC_system.png)

קיבלנו שהעכבה (אימפדנס) $Z\left(\omega\right)$ היא מקרה פרטי של פונקציית תמסורת ושרכיבי RLC הם מערכות LTI

| רכיב | $-h\left(t\right)$                                                                                 | $Z\left(\omega\right)=\tilde{H}\left(\omega\right)$ |
|------|----------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| R    | $R\delta\left(t\right)$                                                                            | $R$                                                 |
| L    | $L\frac{d}{dt}\delta\left(t\right)$                                                                | $i\omega L$                                         |
| C    | $\frac{1}{C}\cdot\intop_{-\infty}^{t}\delta\left(\tau\right)d\tau=\frac{1}{C}\theta\left(t\right)$ | $\frac{1}{i\omega C}$                               |