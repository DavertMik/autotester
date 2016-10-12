/**
 * List of props fully describing ui state.
 * Default values are required to render layout before any communication
 * persistance flag defned whether to load/save prop in storage
 */

const {APP_STATE, TESTS_SOURCE_TYPE, SETTINGS_MENU} = require('./constants');

module.exports = {
  appState: {
    defaultValue: APP_STATE.LOADING,
    persistent: false,
  },
  tests: {
    defaultValue: [],
    persistent: false,
  },
  testsSetup: {
    defaultValue: [],
    persistent: false,
  },
  selectedTest: {
    defaultValue: '',
    persistent: true,
  },
  snippets: {
    defaultValue: [],
    // todo: save snippets code in separate keys
    persistent: true,
  },
  selectedSnippet: {
    defaultValue: '',
    persistent: true,
  },
  targets: {
    defaultValue: [],
    persistent: true,
  },
  selectedTarget: {
    defaultValue: 0,
    persistent: false,
  },
  hubs: {
    defaultValue: [],
    persistent: true,
  },
  testsSourceType: {
    // for dev builds make default tests source - built-in
    defaultValue: window.__buildInfo.isDev ? TESTS_SOURCE_TYPE.BUILT_IN : TESTS_SOURCE_TYPE.SNIPPETS,
    persistent: true,
  },
  testsSourceUrl: {
    defaultValue: 'https://raw.githubusercontent.com/vitalets/autotester/master/examples/index.js',
    persistent: true,
  },
  testsSourceBuiltInPath: {
    defaultValue: chrome.runtime.getURL('/tests/index.js'),
    persistent: false,
  },
  selectedTab: {
    defaultValue: -1, // better set -1 to avoid flushing content on start,
    persistent: false,
  },
  selectedSettingsMenuItem: {
    defaultValue: SETTINGS_MENU.TESTS_SOURCE,
    persistent: true,
  },
  stopOnError: {
    defaultValue: false,
    persistent: false,
  },
  error: {
    defaultValue: '',
    persistent: false,
  },
};
