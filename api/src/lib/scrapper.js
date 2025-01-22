/*eslint-disable */

const puppeteer = require("puppeteer");

async function scrapper(url, maxDepth = 1) {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const visited = new Set();
  const results = [];

  async function crawl(pageUrl, currentDepth) {
    if (currentDepth > maxDepth || visited.has(pageUrl)) {
      return;
    }

    visited.add(pageUrl);

    try {
      const page = await browser.newPage();
      await page.goto(pageUrl, { waitUntil: "networkidle0" });

      const data = await page.evaluate(() => {
        const unwanted = document.querySelectorAll(
          "script, style, nav, footer, img"
        );

        unwanted.forEach((elem) => elem.remove());

        const text = document.body.innerText;
        const cleanedText = text
          .replace(/\s+/g, " ")
          .replace(/\n+/g, "\n\n")
          .trim();

        const links = Array.from(document.querySelectorAll("a"))
          .map((link) => ({
            url: link.href,
            text: link.innerText.trim(),
          }))
          .filter((link) => link.url && link.url.startsWith("http"));

        return {
          content: cleanedText,
          urls: links,
        };
      });

      const pageData = {
        url: pageUrl,
        title: await page.title(),
        date: new Date().toISOString(),
        depth: currentDepth,
        content: data.content,
        links: data.urls,
      };

      results.push(pageData);
      await page.close();

      if (currentDepth < maxDepth) {
        for (const link of data.urls) {
          if (!visited.has(link.url)) {
            await crawl(link.url, currentDepth + 1);
          }
        }
      }
    } catch (error) {
      console.error(`Error crawling ${pageUrl}:`, error);
    }
  }

  try {
    await crawl(url, 1);
    return results;
  } finally {
    await browser.close();
  }
}

module.exports = {
  scrapper,
};
