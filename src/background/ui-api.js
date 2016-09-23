/**
 * Communication with ui page
 */

const messaging = require('../utils/messaging');
const externalEvents = require('./external-events');
const testsList = require('./tests-list');
const testsRun = require('./tests-run');
const {onTestsDone, onReady, onSessionStarted} = require('./internal-channels');

const {
  RELOAD,
  TESTS_LIST_LOAD,
  TESTS_RUN,
  TESTS_DONE,
  SESSION_STARTED,
} = externalEvents;

exports.init = function() {
  messaging.registerEvents(externalEvents);
  messaging.on(TESTS_LIST_LOAD, loadTestsList);
  messaging.on(TESTS_RUN, runTests);
  onReady.addListener(() => messaging.send(RELOAD));
  onTestsDone.addListener(() => messaging.send(TESTS_DONE));
  // todo: make this channeling in more automatic way (e.g. event flag isExternal: true)
  // todo: think also about disabling bi-directional external channels to avoid cyclic flow
  onSessionStarted.addListener(data => messaging.send(SESSION_STARTED, data));
  messaging.start();
};

function loadTestsList({url}) {
  return testsList.load(url);
}

function runTests(data) {
  testsRun.run(data)
}
