/**
 * Globals available in tests
 */

const Channel = require('chnl');
const seleniumAssert = require('selenium-webdriver/testing/assert');
const webdriver = require('./selenium-webdriver');
const seleniumTesting = require('./selenium-testing');
const Driver = require('../driver');
const fakeRequire = require('./fake-require');

exports.export = function (target, uiWindow) {
  Object.assign(target, {
    // webdriver
    Driver: Driver,
    By: webdriver.By,
    Key: webdriver.Key,
    until: webdriver.until,
    // for running tests
    test: seleniumTesting,
    assert: seleniumAssert,
    // for custom user data
    runContext: {},
    // for running selenium tests as is
    require: fakeRequire,
    // for debug
    uiConsole: uiWindow.sharedConsole,
    // for custom reporting
    //report: uiWindow.report,
    __onTestFileError: new Channel()
  });
};
