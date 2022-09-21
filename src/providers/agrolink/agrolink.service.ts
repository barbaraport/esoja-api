import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tesseract = require('node-tesseract-ocr');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

@Injectable()
export class AgrolinkService {
  constructor() {
    setTimeout(async () => {
      // console.log('start');
      // await this.printScreen();
      // await this.ocr();
    }, 2000);
  }

  async printScreen() {
    console.log('printScreen');

    const html = `
    <a href="/app/applications/2774009/applicants/3948813">
    </a>
  `;

    const applicationLink = '/app/applications/2774009/applicants/3948813';

    try {
      const browser = await puppeteer.launch();

      const [page] = await browser.pages();

      await page.goto('https://www.agrolink.com.br/cotacoes/graos/soja/');
      await page.screenshot({ path: __dirname + '/example.png', fullPage: true });

      // await page.setContent(html);
      // await page.waitForSelector(`a[href$="${applicationLink}"]`, { visible: true });
      // await page.click(`a[href$="${applicationLink}"]`);

      await browser.close();
    } catch (error) {
      console.log('printScreen', error);
    }
  }

  async ocr() {
    console.log('ocr');

    const config = {
      lang: 'por',
      oem: 3,
      psm: 3,
    };

    // const img = 'https://www.agrolink.com.br/Content/cotacoes/C-MFSNVU-2.png';

    try {
      //descobrir como instalar o tesseract no servidor
      const text = await tesseract.recognize(__dirname + '/example.png', config);

      console.log('Result:', text);
    } catch (error) {
      console.log('ocr', error.message);
    }
  }
}
