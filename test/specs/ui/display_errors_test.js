
test.describe('ui: display errors', function() {
  var driver;

  test.before(function() {
    driver = new Driver();
    driver.get(runContext.selftest.ui);
  });

  test.after(function() {
    // driver.quit();
  });

  test.it('should show error in syntax before driver started', function() {
    runCode(`
      abc()
    `);
    getConsoleLines().then(lines => {
      assert(lines[0]).equalTo('ReferenceError: abc is not defined');
      assert(lines[1]).equalTo('at snippets/test.js:2:7');
    })
  });

  test.it('should show error inside driver flow', function() {
    runCode(`
      const driver = new Driver();
      driver.call(() => {
        abc()
      });
    `);
    getConsoleLines().then(lines => {
      assert(lines[0]).equalTo('ReferenceError: abc is not defined');
      assert(lines[1]).equalTo('at driver.call (snippets/test.js:4:9)');
    })
  });

  test.it('should show syntax error in mocha describe', function() {
    runCode(`
      test.describe('suite', function () {
        abc();
      })
    `);
    getConsoleLines().then(lines => {
      assert(lines[0]).equalTo('ReferenceError: abc is not defined');
      assert(lines[1]).equalTo('at Suite.<anonymous> (snippets/test.js:3:9)');
    })
  });

  test.it('should show syntax error in mocha it', function() {
    runCode(`
      test.describe('suite', function () {
        test.it('test', function () {
          abc();
        })
      })
    `);
    getMochaReportLines().then(lines => {
      assert(lines[0]).equalTo('ReferenceError: abc is not defined');
      assert(lines[1]).equalTo('at Context.<anonymous> (snippets/test.js:4:11)');
    })
  });

  test.it('should show error in driver flow in mocha it', function() {
    runCode(`
      test.describe('suite', function () {
        let driver;
        test.it('test', function () {
          driver = new Driver();
          driver.call(() => {
            abc()
          })
        })
        test.after(function () {
          driver.quit();
        })
      })
    `);
    getMochaReportLines().then(lines => {
      assert(lines[0]).equalTo('ReferenceError: abc is not defined');
      assert(lines[1]).equalTo('at driver.call (snippets/test.js:7:13)');
    })
  });

  function runCode(code) {
    driver.executeScript(tests => {
      runTests(tests);
    }, [{path: 'test.js', code}]);
    driver.wait(until.titleContains('done'));
  }

  function getConsoleLines() {
    return driver.findElement({id: 'console'}).getText().then(text => {
      return text.split('\n').map(line => line.trim());
    });
  }

  function getMochaReportLines() {
    return driver.findElement({css: '#mocha-report .error'}).getText().then(text => {
      return text.split('\n').map(line => line.trim());
    });
  }
});

