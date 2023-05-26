const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  try {
    //open the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.traversymedia.com/");

    //?CREATE THE IMAGES OR PDF

    //   await page.screenshot({ path: "example.png", fullPage: true });
    //   await page.pdf({ path: "example.pdf", format: "A4" });

    //?TO GET ALL THE HTML
    //   const html = await page.content();

    //? get the title
    //   const title = await page.evaluate(() => document.title);

    //?get all the text
    //   const text = await page.evaluate(() => document.body.innerText);

    //?get all the links
    //   const links = await page.evaluate(() =>
    //     Array.from(document.querySelectorAll("a"), (e) => e.href)
    //   );

    //?get all the courses
    const courses = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#cscourses .card"), (e) => ({
        level: e.querySelector(".card-body .level").innerHTML,
        title: e.querySelector(".card-body h3").innerHTML,
        link: e.querySelector(".card-footer a").href,
      }))
    );

    //?add the data to a json file

    // await fs.promises.writeFile("text.json", JSON.stringify(courses));
    console.log(courses);

    await browser.close();
  } catch (err) {
    console.error("An error occurred:", error);
  }
}

run();
