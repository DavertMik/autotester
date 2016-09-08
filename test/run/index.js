/**
 * Entry point for running self-test on different selenium hubs
 */

'use strict';

const webdriver = require('selenium-webdriver');
const htmlToText = require('html-to-text');
const capabilities = require('./capabilities');
const hub = require('./hubs/' + process.argv[2]);

const AUTOTESTER_UI_URL = 'http://autotester';

// run tests in all capabilities combination
run();

function run() {
  hub.capabilities()
    .then(caps => {
      const capsArray = Array.isArray(caps) ? caps : [caps];
      const tasks = capsArray.map(caps => runForCapabilities(caps));
      Promise.all(tasks)
        .then(res => {
          const errors = res.filter(r => r instanceof Error);
          errors.forEach(e => console.log(`ERROR: ${e.message}`));
          console.log(`FINISHED SESSIONS: ${res.length} (${hub.name})`);
          console.log(`ERRORS: ${errors.length}`);
          process.exit(errors.length ? 1 : 0);
        });
    })
    .catch(throwAsync);
}

// todo: add timeout (check if title not changed for some time)?
function runForCapabilities(caps) {
  const signature = `[${hub.name.toUpperCase()} ${capabilities.signature(caps)}]: `;
  console.log(`${signature}running...`);
  let driver;
  return new Promise((resolve, reject) => {
    const flow = new webdriver.promise.ControlFlow()
      .on('uncaughtException', reject);

    const builder = new webdriver.Builder();
    if (hub.serverUrl) {
      builder.usingServer(hub.serverUrl);
    }
    driver = builder
      .withCapabilities(caps)
      .setControlFlow(flow)
      .build();

    driver.get(AUTOTESTER_UI_URL);
    driver.executeScript(function() {
      return navigator.userAgent + ' ' + navigator.language;
    }).then(res => console.log(`${signature}${res}`));
    driver.findElement({id: 'run'}).click();
    driver.wait(webdriver.until.titleContains('done'));
    // todo: read htmlConsole as there can be errors
    const mochaReport = driver.findElement({id: 'mocha'}).getAttribute('innerHTML');
    const consoleReport = driver.findElement({id: 'console'}).getText();
    Promise.all([mochaReport, consoleReport]).then(([mochaReport, consoleReport]) => {
      console.log(signature + 'finished');
      console.log(consoleReport);
      const hasErrors = processReport(mochaReport);
      trySendSessionStatus(driver, signature, hasErrors);
      driver.quit()
        .then(() => !hasErrors ? resolve() : reject(new Error(`Tests failed`)));
    })
  })
  // catch error and resolve with it to not stop Promise.all chain
  .catch(e => {
    if (driver.getSession()) {
      driver.quit();
    }
    // todo: driver.quit().catch() ?
    const msg = e.message || e.stack;
    e.message = signature + msg;
    return e;
  });
}

function processReport(html) {
  const text = htmlToText.fromString(html, {ignoreHref: true}).substr(1);
  const matches = text.match(/\* duration:.+s/);
  if (!matches) {
    console.log('Empty report!');
    return true;
  }
  const headerEnd = matches.index + matches[0].length + 1;
  const header = text.substr(0, headerEnd);
  const hasErrors = header.indexOf('failures: 0') === -1;
  if (hasErrors) {
    console.log(text);
  }
  console.log(header);
  return hasErrors;
}

function trySendSessionStatus(driver, signature, hasErrors) {
  if (hub.sendSessionStatus) {
    driver.call(() => {
      return driver.session_
        .then(session => hub.sendSessionStatus(session.id_, hasErrors))
        .then(() => console.log(`${signature}session status sent as: ${hasErrors ? 'failed' : 'success'}`))
        .catch(e => console.log(`${signature}session status sending error`, e));
    });
  }
}

function throwAsync(e) {
  setTimeout(() => {
    throw e;
  }, 0);
}
