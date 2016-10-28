# Autotester

[![Build Status](https://travis-ci.org/vitalets/autotester.svg?branch=master)](https://travis-ci.org/vitalets/autotester)
[![Sauce Test Status](https://saucelabs.com/buildstatus/vitalets1)](https://saucelabs.com/u/vitalets1)
[![GitHub version](https://badge.fury.io/gh/vitalets%2Fautotester.svg)](https://github.com/vitalets/autotester/releases/latest)

Autotester is chrome extension that allows to develop and run automation tests right in browser.  
Tests are written in javascript and can be executed over another tab of the same chrome or any remote browser.

Tested in:  
[![Sauce Test Status](https://saucelabs.com/browser-matrix/vitalets1.svg)](https://saucelabs.com/u/vitalets1)

## Contents
* [Demo](#demo)
* [Features](#features)
* [Project status](#project-status)
* [Installation](#installation)
* [Getting started](#getting-started)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contribution](#contribution)
* [FAQ](#faq)
* [Links](#links)
* [License](#license)

## Demo 
<img src="https://cloud.githubusercontent.com/assets/1473072/19283567/0763a4b4-8ffb-11e6-8c82-8ab266df7a4e.gif"/>

## Features
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

* **Capture network requests**  
  Capturing network requests is working out of box. You can capture page loads, resources (img, script, etc),
  xhr/fetch requests and new tabs. No proxy needed. Please see [example](test/specs/extras/collect_network_requests_test.js).

* **Load tests from anywhere**  
  Tests can be stored right in browser, local directory or loaded from any local/remote http server (for example GitHub). 

* **Run tests on remote servers**  
  Besides running tests in the same chrome instance it is possible to route commands to any selenium server.
  It can be [localhost](https://www.npmjs.com/package/selenium-standalone),
  [saucelabs](https://saucelabs.com), [browserstack](https://www.browserstack.com), etc.

* **Test other chrome extensions**  
  With Autotester it is possible to attach to other extensions background pages for testing.
  Please see [example](test/specs/extras/extension_switching_test.js).

## Project status
Autotester is under **active development** now. Not all webdriver commands are supported. Yet.
And there can be bugs.
But feel free to try it and share your feedback or ideas in [issues](issues) - help us to make it better!

## Installation
1. Download and unpack latest [autotester.zip][1]
2. Drag-n-drop unpacked *autotester* directory on `chrome://extensions` page

## Getting started
Click extension button `A` in browser panel to open Autotester app.
Select `google_search` in dropdown and press **Run** to execute test. Look at the report.
Next, you can change test code or create new file and re-run again.

## Usage
Autotester supports [Selenium Javascript API](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)
for writing tests. Have a look on [Autotester self tests](test/specs).  
Also there are some pre-defined globals available in tests for conveniency:
 * `Driver`
 * `By`
 * `until`
 * `Key`
 * `webdriver`
 * `console`
 * `require`
 
*More detailed tutorial is coming..*

## How does Autotester work?
When executing tests in the another tab of the same browser Autotester is utilizing 
[Chrome Debugging Protocol](https://chromedevtools.github.io/debugger-protocol-viewer/1-2/) available via
[chrome.debugger.*](https://developer.chrome.com/extensions/debugger) extensions API.
It intercepts http requests going from [Selenium Javascript package](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)
to [W3C Webdriver endpoints](https://w3c.github.io/webdriver/webdriver-spec.html#list-of-endpoints) and loops them back to browser.  
When executing tests over remote browser Autotester does not intercept http requests
letting them reach remote Selenium Server and waits for the results.

## Roadmap
There are many directions to grow. The current plan is following:

* implement rest of webdriver commands
* improve docs and tutorials
* add capabilities manager to visually configure targets
* integrate with other webdriver implementations (webdriverio, nightwatchjs, codeceptJS, spectron)
* integrate with Appium
* run tests in parallel
* improve tests editor: autocomplete, breakpoints, etc
* create tests automatically via recording user actions
* ...your idea?

## Contribution
If you have an idea how to fix bug or implement new feature - you are welcome to contribute.  
Please see [CONTRIBUTING.md](CONTRIBUTING.md). Thanks for your support!

## FAQ

<details>
  <summary>Where to store tests?</summary>
  
1. You can create as many tests as you like and store them right in browser as snippets.
   This is the easiest way but less reliable: if you occasionally remove extension tests will be lost.
2. For more serious things it is recommended to serve tests from local or remote http server
   and keep them under version control.
3. The third option is to load tests from local directory without http server.
   For that you should create tests inside `/tests` directory of unpacked extension.
   
</details>

## Links
* [Selenium Javascript API](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)
* [W3C Webdriver](https://w3c.github.io/webdriver/webdriver-spec.html)
* [Chrome Debugger Protocol](https://chromedevtools.github.io/debugger-protocol-viewer)
* [Awesome Javascript Test Automation](https://github.com/atinfo/awesome-test-automation/blob/master/javascript-test-automation.md)
* [Awesome Selenium](https://github.com/christian-bromann/awesome-selenium)

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[1]: https://github.com/vitalets/autotester/releases/download/v0.1.2/autotester.zip
