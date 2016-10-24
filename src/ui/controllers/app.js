/**
 * Main ui entry
 */

const mobx = require('mobx');
const fs = require('bro-fs');
const state = require('../state');
const {APP_STATE, TAB} = require('../state/constants');
const bgApi = require('./bg-api');
const windowApi = require('./window-api');
const testsRun = require('./tests-run');
const testsList = require('./tests-list');
const htmlConsole = require('./html-console');
const setup = require('./setup');
const editor = require('./editor');

/**
 * Start app
 */
exports.start = function() {
  htmlConsole.init();
  testsRun.init();
  testsList.init();
  editor.init();
  bgApi.init();
  windowApi.init();
  return Promise.resolve()
    .then(() => fs.init({type: window.PERSISTENT, requestQuota: false}))
    .then(() => setup.applyOnFirstRun())
    .then(() => state.load())
    .then(mobx.action(ready));
};

function ready() {
  state.appState = APP_STATE.READY;
  state.selectedTab = TAB.TESTS;
}
