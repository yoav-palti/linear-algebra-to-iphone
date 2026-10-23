import fitz
p=fitz.open('output/pdf/intro-to-LTI.pdf')
print('Pages:',len(p))
for i,page in enumerate(p):
 print(i+1,len(page.get_text()),page.get_text()[:80].replace('\n',' '))
 page.get_pixmap(matrix=fitz.Matrix(0.8,0.8)).save(f'tmp/pdfs/page-{i+1}.png')
