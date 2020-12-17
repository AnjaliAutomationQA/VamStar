const puppeteer= require('puppeteer')
const config=require('./config.js')
const locators = require('./locators.js')
main()
async function main()
{
   var browserObject= await launchBrowser()
   await browserObject.page1.goto(config.url,{ 'waitUntil' : 'networkidle2'})
    var pubDate=(await browserObject.page1.$eval(locators.PubDate,e=>e.innerHTML))
    pubDate=pubDate.split("</span>")[1]
    console.log("Publication Date:"+pubDate)
    var BidDate=(await browserObject.page1.$eval(locators.BidDate,e=>e.innerHTML))
    BidDate=BidDate.split("</span>")[1]
    console.log("Bidding Date:"+BidDate)
    var Object=(await browserObject.page1.$eval(locators.ObjectCSS,e=>e.innerHTML))
    console.log("Object:"+Object)
    await browserObject.page1.click(locators.Link)
    await browserObject.browser.close();
}
async function launchBrowser()
{
    
            const browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeout,
            executablePath: config.chromePath,
            defaultViewport: null,
            args: ['--start-maximized'],
        })
          const pages = await browser.pages()
        const page1 = pages[0]
        page1.setDefaultNavigationTimeout(0); 
        await page1.setViewport({
            width: 1920,
            height: 1080
        })     
        return { 
            page1:page1,
            browser:browser
        }   
}