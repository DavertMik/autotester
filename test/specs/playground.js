
'use strict';


// let driver = new Driver();
//
// driver.get('https://google.ru');
// // // driver.findElement(By.name('q')).sendKeys('yandex')//.then(() => wwww())
// // // driver.findElement(By.name('btnG')).click();
// //
// driver.getCurrentUrl().then(result => {
//   console.log('result1:', result)
// });
//
// //driver.findElement({css: '.__altsearch_ext_root__'}).then(() => console.log('found!'))
//
// driver.navigate().newTab('http://mail.ru');
//
// driver.getCurrentUrl().then(result => {
//   console.log('result2:', result)
// });
//
// driver.quit();

// demo



test.describe('demo', function() {
  let driver;

  test.before(function() {
    driver = new Driver();
    dfgdf()
  });

  test.after(function() {
    driver.quit();
  });

  // altsearch
  test.it('should show panel on google result page', function() {
    console.log(this.runnable().fullTitle())
  });
});



/*
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('http://www.google.com/ncr');
driver.findElements(By.name('q')).then(res => console.log(res))
//driver.findElement(By.name('q')).sendKeys('webdriver')//.then(() => wwww())
// driver.findElement(By.name('btnG')).click();

//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.getCurrentUrl().then(res => {
//   console.log('res', res)
// });
driver.quit();
*/


/*
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until,
  Browser = webdriver.Browser,
  assert = require('selenium-webdriver/testing/assert'),
  test = require('selenium-webdriver/lib/test');

test.suite(function(env) {
  var driver;

  test.before(function () {
    driver = env.builder().build();
  });

  test.after(function () {
    driver.quit();
  });

  test.beforeEach(function () {
    driver.get(test.Pages.echoPage);
  });

  describe('executeScript;', function () {

    test.it('should append query to title', function() {

      driver.get('http://www.google.com/ncr').then(() =>  qqq())
      assert(driver.getTitle()).equalTo('Google');
    });

  });

});
*/
