const puppeteer = require('puppeteer');



(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
  
    await page.goto('https://loterias.caixa.gov.br/Paginas/default.aspx');
    await page.waitForSelector('.no-title > div:nth-child(2)')
  
    const datadoproximosorteio = await page.evaluate(() => {
        const dataproximamega = document.getElementsByClassName('texto-valor-estimado ng-binding')[0].innerText.replace('Estimativa de prêmio do próximo concurso. Sorteio em ','').replace(':','')   
        return dataproximamega
    });

    const numerosdamegasena = await page.evaluate(() => {
        const numerosmegasena = document.getElementsByClassName('resultado-loteria mega-sena')[0].innerText.replace(/[^0-9]/g,'')
        return numerosmegasena
    })

    console.log(numerosdamegasena)
    console.log(datadoproximosorteio);


    await browser.close();
})();