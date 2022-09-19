// const puppeteer = require("puppeteer");

// (async () => {
//   //   const browser = await puppeteer.launch();
//   //   const page = await browser.newPage();
//   //   page.setViewport({ width: 1920, height: 1080 });
//   //   await page.goto("https://www.agrolink.com.br/cotacoes/graos/soja/");
//   //   await page.screenshot({ path: "example.png", fullPage: true });
//   //   //   const x = await page.waitForXPath(
//   //     `//*href="javascript:navigateToPage( 'frmFiltroGeral-5231', '4')`
//   //   );
//   //   await x.click();
//   //   await x.screenshot({ path: "example2.png", fullPage: true });

//   //   let applicationLink =
//   //     "javascript:navigateToPage( 'frmFiltroGeral-5231', '4')";
//   //   await page.click(`[href='${applicationLink}']`);
//   //   await page.waitForNavigation();
//   //   await page.screenshot({ path: "example2.png", fullPage: true });

//   let browser;
//   (async () => {
//     const html = `
//     <a href="/app/applications/2774009/applicants/3948813">
//     </a>
//   `;
//     const applicationLink = "/app/applications/2774009/applicants/3948813";

//     browser = await puppeteer.launch();
//     const [page] = await browser.pages();
//     await page.setContent(html);
//     await page.waitForSelector(`a[href$="${applicationLink}"]`, {
//       visible: true,
//     });
//     await page.click(`a[href$="${applicationLink}"]`);
//   })()
//     .catch((err) => console.error(err))
//     .finally(async () => await browser.close());

//   await browser.close();
// })();
