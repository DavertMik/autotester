# Autotester
Autotester is chrome extension that allows to develop and run automation tests right in browser.  
Tests are written in javascript and can be executed over another tab of the same browser or any remote browser instance.

## Demo 
<img src="https://vitalets.github.io/autotester/autotester-demo.gif"/>

## Key features
* **Zero setup**  
  The setup is just drag-n-drop extension in chrome. No other stuff like Selenium, Node.js or Chromedriver is needed.
   
* **Convenient development**  
  Developing tests right in browser has some advantages. You can edit tests in first tab and check results in second.
  You can easily run particular test to debug. You can keep tab open after tests to inspect with devtools.

* **Selenium compatible syntax**  
  Tests syntax is compatible with [Selenium Javascript API](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)
  so it can be executed ether in nodejs and visa-versa (except custom commands).

* **Custom commands**  
  Because tests are executed via extension all of rich [chrome extensions API](https://developer.chrome.com/extensions/api_index)
  are available. You can define custom commands to work with cookies, downloads, tabs, history etc and use it in your tests.

* **Capturing network requests**  
  Capturing network requests is working out of box. You can capture page loads, resources (img, script, etc),
  xhr/fetch requests and new tabs. No proxy needed. Please see [example](test/specs/extras/collect_network_requests_test.js).

* **Various places to store tests**  
  Tests can be stored right in browser, loaded from any local or remote http server (for example github) or loaded from local directory. 

* **Running tests on remote server**  
  Besides running tests in the same chrome instance it is possible to route commands to any selenium server.
  It can be [localhost standalone server](https://www.npmjs.com/package/selenium-standalone),
  [saucelabs](https://saucelabs.com), [browserstack](https://www.browserstack.com), etc.

* **Testing other chrome extensions**  
  With Autotester it is possible to attach to other extensions background pages for testing.
  Please see [example](test/specs/extras/extension_switching_test.js).

## Project status
Autotester is in **early beta** now. Not all webdriver commands and features are supported. Yet. And there can be bugs.   
But feel free to try it and share your feedback or ideas in [issues](issues) - help us to make it better!

## Getting started
1. Download latest [autotester.crx](https://vitalets.github.io/autotester/releases/autotester.crx)
2. Open chrome on `chrome://extensions` page
3. Drag-n-drop autotester.crx on that page, confirm permissions dialog
4. Click `A` button in browser panel to open tests management page

## Usage
Start with in-browser snippets using [Selenium Javascript API](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html).  
Have a look on [Autotester self tests](test/specs).  
*More detailed tutorial is coming..*

## Where to store tests
1. You can create as many tests as you like and store them right in browser as snippets.
This is the easiest way but less reliable: if you occasionally remove extension tests will be lost.
2. For more serious things it is recommended to serve tests from local or remote http server
and keep them under version control.
3. The third option is to load tests from local directory without http server.
For that you should install extension as unpacked from [autotester.zip](https://vitalets.github.io/autotester/releases/autotester.zip)
(not crx) and use `/tests` directory inside.

## Roadmap
There are many directions to grow. The current plan is following:

* implement rest of webdriver commands
* improve docs and tutorials
* add capabilities manager to setup targets
* integrate with other webdriver implementations (webdriverio, nightwatchjs, codeceptJS, spectron)
* integrate with Appium
* run tests in parallel
* autocomplete commands in editor
* ...your idea?

## Contribution
If you see how to fix bug, typo or add new feature - you are welcome to contribute.

1. Install [node.js](https://nodejs.org) if not yet
2. Fork the repo and clone it:

   ```bash
   git clone https://github.com/<your_name>/autotester.git
   ```
   
3. Install needed npm packages:

   ```bash
   cd autotester
   npm i
   ```
   
4. Run dev watcher:

   ```bash
   npm run dev
   ```
   
5. Open chrome and load unpacked extension from `dist/unpacked-dev`.
6. Also load unpacked extension from `dist/unpacked-dev-selftest`. This is copy of Autotester needed for self testing.
7. Hack, push and make pull request. 

## License
MIT
