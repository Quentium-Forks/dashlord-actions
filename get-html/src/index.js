const puppeteer = require("puppeteer");

const LANGUAGE = process.env.LANGUAGE || "en";

const getHTML = async (url) => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--headless",
      `--lang=${LANGUAGE}`,
    ],
  });
  const userAgent = await browser.userAgent();
  let html = "";
  try {
    const page = await browser.newPage();
    await page.setUserAgent(`${userAgent} - dashlord`);
    await page.goto(url);
    await page.waitForSelector("body", { timeout: 5000 });
    const frame = page.mainFrame();
    html = await frame.content();
  } catch (e) {
    console.error("error", e);
  }

  await browser.close();

  return html;
};

module.exports = { getHTML };
