# סינון רעש

איך אנחנו מסננים רעש על מנת להשיג את ה-SNR הכי טוב שאנחנו יכולים? נניח שאנחנו משתמשים רק בפילטרים לינארים. כלומר מסננים את הרעש (ואת האות) בתדר.

מה הסינון האופטימלי? ובאיזה מובן הוא אופטימלי?

נתחיל מכמה מקרים פשוטים:

### רעש ואות לא חופפים

במקרה הזה ברור שמה שצריך לעשות הוא BPF מסביב לאות
ולסנן את כל הרעש.

אין הרבה מה לעשות מעבר ורק צריך לומר שהסיטואציה הזו היא לא באמת פיזיקאלית אבל היא יכולה להיות התמונה בקירוב

### רעש לבן
כאן זה גם קצת יותר טריקי אבל גם כאן יחסית ברור שמה שצריך לעשות הוא BPF מסביב לאות. אבל לא ברור האם צריך להשתמש בפילטר מלבני או לא. מה אם יש תדרים בהם האות הוא מאוד נמוך?

### שחזור אופטימלי - wiener filter

אם אנחנו רוצים לשחזר את האות ולא רק להבין אם הוא שם נרצה פילטר שמסנן לנו תדרים בהם ה-SNR הוא נמוך ומעביר תדרים בהם ה-SNR הוא גבוה.

יש כל מיני שיטות לעשות את זה אבל אחת מהן היא לומר שאנחנו רוצים למנם את האנרגיה של השגיאה בין האות המקורי ובין האות המסונן. כלומר:

$$\min_{\tilde{H}\left(\omega\right)}\intop_{-\infty}^{\infty}\left(y\left(t\right)-s\left(t\right)\right)^{2}dt=\min_{\tilde{H}\left(\omega\right)}\intop_{-\infty}^{\infty}\left|\tilde{Y}\left(\omega\right)-\tilde{S}\left(\omega\right)\right|^{2}d\omega=\min_{\tilde{H}\left(\omega\right)}\intop_{-\infty}^{\infty}\left|\tilde{H}\left(\omega\right)\left(\tilde{S}\left(\omega\right)+\tilde{N}\left(\omega\right)\right)-\tilde{S}\left(\omega\right)\right|^{2}d\omega$$

מכאן די ברור שהנוסחא שלנו צריכה להיות:

$$\tilde{H}\left(\omega\right)=\frac{\tilde{S}\left(\omega\right)}{\tilde{S}\left(\omega\right)+\tilde{N}\left(\omega\right)}=\frac{1}{1+\frac{\tilde{N}\left(\omega\right)}{\tilde{S}\left(\omega\right)}}=\frac{1}{1+\frac{1}{SNR\left(\omega\right)}}$$

* עבור $SNR\left(\omega\right)\gg1$ נקבל $\tilde{H}\left(\omega\right)=1$
* עבור $SNR\left(\omega\right)\ll1$ נקבל $\tilde{H}\left(\omega\right)=0$

נשים לב שממש איפטמנו על להיות כמה שיותר קרובים לסיגנל המקורי כך שבתקווה נקבל באמת אות דומה ככל האפשר.

### גילוי אופטימלי - match filter
אם אנחנו רוצים רק לדעת אם האות קיים או לא קיים ולא לשחזר אותו אז יש דרך יותר טובה מאשר wiener filter.
ננסה לפתור את הבעיה עבור רעש לבן

