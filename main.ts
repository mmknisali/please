import puppeteer from "npm:puppeteer-core";

async function run() {
  const browser = await puppeteer.launch({
    browser: Deno.env.get("PUPPETEER_BROWSER"),
    executablePath: Deno.env.get("PUPPETEER_EXECUTABLE_PATH"),
    headless: false,
    dumpio: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.screenshot({ path: 'google.webp' });
    const title = await page.title();
    console.log(`Page title: ${title}`);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

if (import.meta.main) {
  await run();
}
