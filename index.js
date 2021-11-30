const { mkdir } = require('fs');
const puppeteer = require('puppeteer');
const _colors = require('colors');
const cliProgress = require('cli-progress');

const { devices, urls } = require('./config');

async function setViewports(device, url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Setup browser
  await page.setViewport({
    width: device.width,
    height: device.height,
    isMobile: device.isMobile ?? false,
    hasTouch: device.hasTouch ?? false,
  });
  if (url.cookies && url.cookies.length) {
    await page.setCookie(...url.cookies);
  }

  // Navigate
  await page.goto(url.link, {waitUntil: 'networkidle0'});
  await page.waitForTimeout(1000); // give time for things to render

  // Screenshot things
  const path = './screenshots/';
  mkdir(path, function (err) {
    if (err.code !== 'EEXIST') {
      console.log(err);
    }
  });
  await page.screenshot({
    path: `${path}/${device.width}x${device.height}-${url.name}.png`,
    fullPage: false,
  });

  // Housekeeping
  browser.close();
}

async function getUrlAndResolutions(devices, urls) {
  for (let device of devices) {
    for (let url of urls) {
      progressBar.increment();
      await setViewports(device, url);
    }
  }
  progressBar.stop();
}

// start execution
const progressBar = new cliProgress.SingleBar({
  format:
    'Taking Screenshots |' +
    _colors.cyan('{bar}') +
    '| {percentage}% || {value}/{total} Screenshots',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
  synchronousUpdate: true,
});

const totalScreenshots = devices.length * urls.length;
progressBar.start(totalScreenshots, 0);

getUrlAndResolutions(devices, urls);
