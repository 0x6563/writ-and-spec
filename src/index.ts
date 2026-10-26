import { Evaluate } from "./runtime/interpreter.ts";
import { ParseText } from "./util/parse.ts";

 const source= `
 navigate to "http://localhost:4310/example"
 click $(button)
 `;
 const ast = await ParseText(source);
 await Evaluate(ast);
//  (async () => {
//      // Launch the browser. Set headless: false to physically see it open.
//      const browser = await chromium.launch({ headless: false });
//      const page = await browser.newPage();
 
//      // Open the website
//      await page.goto('https://example.com');
 
//      // Optional: keep the browser open for 5 seconds before closing
//      await page.waitForTimeout(5000);
//      await browser.close();
//  })();
 