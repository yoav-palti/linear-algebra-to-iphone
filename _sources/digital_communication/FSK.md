# FSK - Frequency Shift Keying

נשבור עכשיו את הסכמה של אפנונים לינארים ונשדר על גבי "התדר"

ממש כמו ב-FM אנחנו רוצים להשתמש בשינוי תדר על מנת להעביר
את המידע שלנו.  מעכשיו נכול לרשום גם את הנוסחאות עבור האות ב-baseband :)

$$z_{FSK}\left(t\right)=\sum_{n}e^{i\omega_{n}t}Rect\left(\frac{t-nT_{s}}{T_{s}}\right),\omega_{n}\in\left\{ \omega_{k}\right\} _{k=1}^{K}$$

רק כדי להיות רגילים השידור הזה אחרי תדר נושא הוא:

$$g_{FSK}\left(t\right)=\sum_{n}\left[\Re\left[e^{i\omega_{n}t}\right]\cos\left(\omega_{0}t\right)+\Im\left[e^{i\omega_{n}t}\right]\sin\left(\omega_{0}t\right)\right]Rect\left(\frac{t-nT_{s}}{T_{s}}\right)$$
$$=\sum_{n}\left[\cos\left(\omega_{n}t\right)\cos\left(\omega_{0}t\right)+\sin\left(\omega_{n}t\right)\sin\left(\omega_{0}t\right)\right]Rect\left(\frac{t-nT_{s}}{T_{s}}\right)$$
$$=\sum_{n}\left[\cos\left(\omega_{0}t-\omega_{n}t\right)\right]Rect\left(\frac{t-nT_{s}}{T_{s}}\right)$$

אפשר גם לדאוג שהפאזה תהיה רציפה בין סימבולים אבל זה קצת יותר כאב ראש
לרשום את זה מתמטית...

לדוגמא עבור BFSK נקבל:

$$g_{BFSK}\left(t\right)=b\left(t\right)\cos\left(\left(\omega_{0}+\Delta\omega\right)t\right)+\left(1-b\left(t\right)\right)\cos\left(\left(\omega_{0}-\Delta\omega\right)t\right)$$

כל מה שזה אומר הוא שאנחנו שולחים תדר אחד כאשר אנחנו רוצים לשלוח 1 ותדר אחר
כאשר רוצים לשלוח 0.
תלמדו עוד על אפנון זה בתרגול ונדבר עליו עוד קצת כשנדבר על אורתוגונליות



