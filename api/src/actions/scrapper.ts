import puppeteer from "puppeteer";

async function run({
  parameters: { url, maxDepth = 1 },
}: {
  parameters: {
    url: string;
    maxDepth?: number;
  };
}) {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    headless: true,
  });

  const visited = new Set();
  const results: string[] = [];

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

      results.push(`
        URL: ${pageData.url}
        Title: ${pageData.title}
        Content: ${pageData.content}
      `);

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
    return results.join("\n");
  } finally {
    await browser.close();
  }
}

export default { run };
