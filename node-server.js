import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const puppeteer = require('puppeteer');

const extractItems = async(page)  => {
    let maps_data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".Nv2PK")).map((el) => {
        const link = el.querySelector("a.hfpxzc").getAttribute("href");
        return {
        title: el.querySelector(".fontHeadlineSmall")?.textContent.trim(),
        avg_rating: el.querySelector(".MW4etd")?.textContent.trim(),
        reviews: el.querySelector(".UY7F9")?.textContent.replace("(", "").replace(")", "").trim(),
        address: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child")?.textContent.replaceAll("·", "").trim(),
        description: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(2)")?.textContent.replace("·", "").trim(),
        website: el.querySelector("a.lcr4fd")?.getAttribute("href"),
        category: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child")?.textContent.replaceAll("·", "").trim(),
        timings: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:first-child")?.textContent.replaceAll("·", "").trim(),
        phone_num: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:last-child")?.textContent.replaceAll("·", "").trim(),
        extra_services: el.querySelector(".qty3Ue")?.textContent.replaceAll("·", "").replaceAll("  ", " ").trim(),
        latitude: link.split("!8m2!3d")[1].split("!4d")[0],
        longitude: link.split("!4d")[1].split("!16s")[0],
        link,
        dataId: link.split("1s")[1].split("!8m")[0],
        };
    });
    });
    return maps_data;
    }

    const scrollPage = async (page, scrollContainer, itemTargetCount) => {
      let items = [];
      let previousHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
      while (itemTargetCount > items.length) {
          items = await extractItems(page);
          await page.evaluate(async () => {
              await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2000 milliseconds (2 seconds)
          });
          await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`);
      }
      return items;
  }
  
  const getMapsData = async () => {
      const browser = await puppeteer.launch({
          headless: false,
          args: ["--disabled-setuid-sandbox", "--no-sandbox"],
      });
      const [page] = await browser.pages();
      await page.setExtraHTTPHeaders({
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4882.194 Safari/537.36",
      });
  
      await page.goto("https://www.google.com/maps/search/restaurant/@33.6079744,73.0180172,16z/data=!3m1!4b1?entry=ttu'", {
          waitUntil: 'domcontentloaded',
          timeout: 60000
      });
  
      let data = await scrollPage(page, ".m6QErb[aria-label]", 10);
  
      console.log(data);
  
      // await browser.close();
  };
  
  getMapsData();

//     (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto('https://www.google.com/maps/search/restaurant/@33.6079744,73.0180172,16z/data=!3m1!4b1?entry=ttu');

//   const places = await extractItems(page);

//   await scrollPage(page);

//   console.log(places)

// })();




// import puppeteer from 'puppeteer';

// async function autoScroll(page) {
//   await page.evaluate(async () => {
//     await new Promise((resolve) => {
//       var totalHeight = 0;
//       var distance = 300;
//       var timer = setInterval(() => {
//         const element = document.querySelector('.aIFcqe'); // Replace '.your-container-selector' with the appropriate CSS selector for your container
//         var scrollHeight =  element.scrollHeight // Scroll the container's content vertically
//         totalHeight += distance;

//         if (totalHeight >= scrollHeight) {
//           clearInterval(timer);
//           resolve();
//         }
//       }, 100);
//     });
//   });
// }

// async function parsePlaces (page){
// let places = [];

// const elements = await page.$$('.qBF1Pd')
// if(elements && elements.length){
//     for (const el of elements){
//         const name = await el.evaluate(div => div.textContent)

//         places.push({ name })
//     }
// }
// return places;

// }

// (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto('https://www.google.com/maps/search/restaurant/@33.6079744,73.0180172,16z/data=!3m1!4b1?entry=ttu');

//   const places = await parsePlaces(page);

//   await autoScroll(page);

//   console.log(places)

// })();