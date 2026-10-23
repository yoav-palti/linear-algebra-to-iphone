const {chromium}=require('C:/Users/yoavpa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1100,height:900}});
 await page.goto('file:///C:/Users/yoavpa/OneDrive/Documents/study/linear-algebra-to-iphone/_build/html/LTI/intro_to_LTI.html',{waitUntil:'networkidle'});
 await page.addScriptTag({path:'tmp/pdfs/mathjax.js'});
 await page.evaluate(async()=>{if(window.MathJax?.startup?.promise)await MathJax.startup.promise;await document.fonts.ready;});
 await page.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
 await page.addStyleTag({content:'@media print { .bd-sidebar-primary,.bd-sidebar-secondary,.bd-header,.article-header,.article-footer,.bd-footer,.prev-next-footer,.header-article-items {display:none!important} .bd-main,.bd-content,.bd-article-container,article {width:100%!important;max-width:none!important;margin:0!important} pre,figure,img,.admonition {break-inside:avoid} body{background:white!important} }'});
 await page.pdf({path:'output/pdf/intro-to-LTI.pdf',format:'A4',printBackground:true,margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'}});
 console.log(await page.title());console.log('Math elements: '+await page.locator('mjx-container').count());
 await browser.close();
})();


