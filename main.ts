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
    await page.goto('https://create.kahoot.it/auth/login');
    await page.waitForNetworkIdle();
    //coockies accept button identifier
    await page.waitForSelector("#onetrust-accept-btn-handler", { visible: true });
    await page.click("#onetrust-accept-btn-handler")
    //username/email and password fields
    await page.waitForSelector('#username', { visible: true });
    await page.type("#username", "email");
    await page.type("#password", "pass");
    await page.click("[type=submit]");

    await page.waitForNavigation();
    //kahoot library url
    await page.goto("LI")
    await page.waitForNetworkIdle();

    // styles_Card__l8c6w42
    await page.waitForSelector("[class^=styles_Title]");
    const elements = await page.$$eval("[class^=styles_Title]", cards => {
      return cards.map(x => x.textContent);
    });
    console.log(elements)

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
