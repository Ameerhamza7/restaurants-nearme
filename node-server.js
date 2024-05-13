import puppeteer from 'puppeteer';

async function parsePlaces (page){
let places = [];

const elements = await page.$$('.qBF1Pd')
if(elements && elements.length){
    for (const el of elements){
        const name = await el.evaluate(div => div.textContent)

        places.push({ name })
    }
}
return places;

}

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.google.com/maps/search/restaurant/@33.6079744,73.0180172,16z/data=!3m1!4b1?entry=ttu');

  const places = await parsePlaces(page);
  console.log(places)

})();