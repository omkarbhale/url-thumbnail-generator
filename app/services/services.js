const puppeteer = require("puppeteer");
const { v4: uuid } = require("uuid");

let browser;

const run = async () => {
	browser = await puppeteer.launch();
	// page = await browser.newPage();
};

const generateThumbnail = async (url, width, height) => {
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle0" });
	await page.setViewport({ width, height });

    const _id = uuid();

	await page.screenshot({ path: `images/${_id}.jpg` });
	return _id;
};

run();
module.exports = { generateThumbnail };
