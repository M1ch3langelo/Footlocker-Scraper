const puppeteer = require('puppeteer');

async function getShoes() {
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: null  
    });
   
    const page = await browser.newPage();

    const url = 'https://www.footlocker.com/category/mens/shoes.html';

    await page.goto(url)

    await page.waitForTimeout('product-container col');

    const results = await page.$$eval('product-container col', rows =>  {
        return rows.map(row => {
            const properties = {};
            const titleElement = row.querySelector('ProductName-primary');
            properties.title = titleElement.innerText;
            properties.url = titleElement.getAttribute('href');
            return properties;
        });
    })

     console.log(results);

}

getShoes();