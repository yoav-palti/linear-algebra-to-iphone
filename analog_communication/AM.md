# אפנון AM

### יצוג בזמן

אנחנו צריכים שיטה לקחת אות $f\left(t\right)$ ולאפנן אותו. הנוסחה תהיה:

$$g_{AM}\left(t\right)=\underset{A\left(t\right)}{\underbrace{\left[1+mf\left(t\right)\right]}}\cos\left(\omega{}_{0}t\right)$$

למספר $m$ נקרע עומק המודולציה או באנגלית modulation index

להמחשה:
![AM_fig.png](images/AM_fig.png)

ההנחות שלנו הן:
* האות "משתנה לאט" ביחס ל-$\frac{2\pi}{\omega_{0}}$ ניתן לחשוב על זה ככה שהתדר המקסימלי של המידע קטן משמעותית מהתדר הנושא. $\omega_{0}\gg\omega_{max}$
  * האם זה נכון לגלי רדיו שתדר השידור המקסימלי שלהם הוא: $\omega_{max}=2\pi\cdot20KHz\approx120\cdot10^{3}$
* האמפליטודה צריכה להיות תמיד גדולה מאפס - $1+mf\left(t\right)>0$

מה קורה אם ההנחה השנייה לא מתקיימת?

![AM_crossings.png](images/AM_crossings.png)
חשוב לזכור שאנחנו קולטים רק את האות האדום

נקבל שאנחנו צריכים בכל חילוף סימן "להחליף" את הסימן של המעטפת שאנחנו עוקבים אחריה

מטרת המקלט שלנו היא לשחזר את האות הכחול (בגרף העליון) מתוך האות האדום

### יצוג בתדר
ננסה להבין איך נראה האות בתדר אחרי האפנון

$$\tilde{G}\left(\omega\right)=\mathcal{F}\left[\left(1+mf\left(t\right)\right)\cos\left(\omega{}_{0}t\right)\right]$$
$$=\mathcal{F}\left[1+mf\left(t\right)\right]\ast\mathcal{F}\left[\cos\left(\omega{}_{0}t\right)\right]$$
$$=\left(\delta\left(\omega\right)+m\tilde{F}\left(\omega\right)\right)\ast\frac{1}{2}\left(\delta\left(\omega-\omega_{0}\right)+\delta\left(\omega+\omega_{0}\right)\right)$$
$$\Downarrow$$
$$\boxed{\tilde{G}\left(\omega\right)=\frac{1}{2}\left[\left(\delta\left(\omega-\omega_{0}\right)+m\tilde{F}\left(\omega-\omega_{0}\right)\right)+\left(\delta\left(\omega+\omega_{0}\right)+m\tilde{F}\left(\omega+\omega_{0}\right)\right)\right]}$$

קיבלנו שכפול (שזה לא מפתיע כי אנחנו תמיד משדרים משהו ממשי) של האות סביב תדר $\omega_{0}$ וסביב $-\omega_{0}$ כאשר בנוסף לזה קיבלנו דלתא בכל אחד מהתדרים האלו

![AM_frequency.png](images/AM_frequency.png)

חשוב לשים לב לסימטריה הכפולה. בגלל שאנחנו משדרים אות ממשי שני הצדדים הם הצמוד אחד של השני
אבל גם סביב תדר הגל הנושא יש לנו סימטריה כי כבר במקור המידע שלנו היה ממשי!

מסקנות:
* רוחב הסרט (רוחב הפס) של שידור AM הוא $\Delta\omega=2\omega_{max}$
* עומק המודולציה משפיע על **יעילות השידור** כלומר כמה מהסספק הוא המידע ואיזה הוא רק הגל הנושא
* נשים לב שאידאלית אנחנו רוצים לשדר "בלי הגל הנושא" כלומר בלי ה-$+1$ ובנוסף רק עונה אחת מתוך השתיים