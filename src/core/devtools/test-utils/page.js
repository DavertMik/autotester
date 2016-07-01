
window.page = {
  /**
   * Eval wrapper with Promises
   * @param {String} code
   * @param {Boolean} [nolog]
   * @returns {Promise}
   */
  eval(code, nolog) {
    const logCode = code && code.length > 300 ? code.substring(0, 300) + '...' : code;
    if (!nolog) {
      console.log('Evaling in inspected window:', logCode);
    }
    return new Promise((resolve, reject) => {
      chrome.devtools.inspectedWindow.eval(code, (result, exceptionInfo = {}) => {
        if (exceptionInfo.isError) {
          reject(exceptionInfo.description);
        } else if (exceptionInfo.isException) {
          reject(exceptionInfo.value);
        } else {
          resolve(result);
        }
      });
    });
  },

  /**
   * Using eval of text as CSP of target page may reject loading from other domains
   * @param {String} url
   * @returns {Promise}
   */
  loadScript(url) {
    console.log('Loading to inspected page:', url);
    return fetch(url)
      .catch(e => Promise.reject(`Can not fetch url: ${url}`))
      .then(r => r.text())
      .then(code => page.eval(code, true));
  },

  getUrl() {
    return page.eval('window.location.href');
  },

  navigate(url) {
    return BackgroundProxy.call({
      path: 'tabLoader.update',
      args: [chrome.devtools.inspectedWindow.tabId, {url: url}],
      promise: true
    });
  },

  reload() {
    return page.eval('window.location.reload()');
  },

  /**
   * Clicks on element
   * @param {String} selector
   * @param {Number} [index]
   * @returns {Promise}
   */
  click(selector, index = 0) {
    // todo: move elements existance check to separate function
    return page._ensureSyn()
      .then(() => page.eval(`
        (function () {
              const elms = document.querySelectorAll('${selector}');
              if (!elms.length) {
                throw new Error('Elements not found ${selector}');
              } else if (${index} >= elms.length) {
                throw new Error('Elements count ${selector} %i is less than expected index %i',
                  elms.length, ${index});
              } else {
              syn.click(elms[${index}]);
          }
        }());
    `));
  },

  /**
   * Navigates to url in inspected tab
   * @param {String} url
   * @returns {Promise}
   */
  _ensureSyn() {
    return page.eval(`Boolean(window.syn)`)
      .then(res => res ? Promise.resolve() : page.loadScript(chrome.runtime.getURL('libs/syn.js')))
  }
};
