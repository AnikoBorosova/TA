const saveScreenshotHelper = require("./utils/saveScreenshotHelper");

module.exports = {
	//
	// ====================
	// Runner Configuration
	// ====================
	//
	// WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
	// on a remote machine).
	runner: 'local',
	//hostname: "localhost",
	//port: 4444,
	//path: '/wd/hub',
	//protocol: 'http',
	//
	// ==================
	// Specify Test Files
	// ==================
	// Define which test specs should run. The pattern is relative to the directory
	// from which `wdio` was called. Notice that, if you are calling `wdio` from an
	// NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
	// directory is where your package.json resides, so `wdio` will be called from there.
	//
	specs: [
		'./tests/specs/register.js',
		'./tests/specs/login.js',
		'./tests/specs/purchase.js'
	],
	// Patterns to exclude.
	exclude: [
		// 'path/to/excluded/files'
	],
	suites: {
		signInTests: [
			'./tests/specs/register.js',
			'./tests/specs/login.js'
		],
		purchaseTests: [
			'./tests/specs/purchase.js'
		]
	},
	//
	// ============
	// Capabilities
	// ============
	// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
	// time. Depending on the number of capabilities, WebdriverIO launches several test
	// sessions. Within your capabilities you can overwrite the spec and exclude options in
	// order to group specific specs to a specific capability.
	//
	// First, you can define how many instances should be started at the same time. Let's
	// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
	// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
	// files and you set maxInstances to 10, all spec files will get tested at the same time
	// and 30 processes will get spawned. The property handles how many capabilities
	// from the same test should run tests.
	//
	maxInstances: 3,
	//
	// If you have trouble getting all important capabilities together, check out the
	// Sauce Labs platform configurator - a great tool to configure your capabilities:
	// https://docs.saucelabs.com/reference/platforms-configurator
	//
	capabilities: [],
	// execArgv: ['--inspect'],
	//
	// ===================
	// Test Configurations
	// ===================
	// Define all options that are relevant for the WebdriverIO instance here
	//
	// Level of logging verbosity: trace | debug | info | warn | error
	logLevel: 'error',
	//
	// If you only want to run your tests until a specific amount of tests have failed use
	// bail (default is 0 - don't bail, run all tests).
	bail: 0,
	//
	// Set a base URL in order to shorten url command calls. If your `url` parameter starts
	// with `/`, the base url gets prepended, not including the path portion of your baseUrl.
	// If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
	// gets prepended directly.
	baseUrl: 'http://automationpractice.com/index.php',
	//
	// Default timeout for all waitFor* commands.
	waitforTimeout: 10000,
	//
	// Default timeout in milliseconds for request
	// if Selenium Grid doesn't send response
	connectionRetryTimeout: 120000,
	//
	// Default request retries count
	connectionRetryCount: 3,
	//
	// Test runner services
	// Services take over a specific job you don't want to take care of. They enhance
	// your test setup with almost no effort. Unlike plugins, they don't add new
	// commands. Instead, they hook themselves up into the test process.
	// services: [],
	/*
	services: ['docker'],
	// To use dockerOptions in local:
	// 1. Set up docker on your computer: https://www.docker.com/get-started | https://docs.docker.com/engine/install/ubuntu/
	// 2. Pull the docker image that you want to use, e.g.: docker pull selenium/standalone-chrome:3.141.59-20200719
	// 3. NO need to start selenium with the command 'selenium-standalone start' or run the docker image with the command 'docker run xyz'
	// 4. Instead start your tests immediately with the command 'npm test'
	// Search for docker image tags here: https://hub.docker.com/r/selenium/standalone-chrome/tags?page=1&ordering=last_updated 
	// Older docker images may use older browser versions, therefore make it possible to run your tests in older browser versions
	dockerOptions: {
		image: 'selenium/standalone-chrome:3.141.59-20200719',
		healthCheck: 'http://localhost:4444',
		options: {
			p: ['4444:4444'],
			shmSize: '2g'
		}
	},
	*/
	// Framework you want to run your specs with.
	// The following are supported: Mocha, Jasmine, and Cucumber
	// see also: https://webdriver.io/docs/frameworks.html
	//
	// Make sure you have the wdio adapter package for the specific framework installed
	// before running any tests.
	framework: 'jasmine',
	//
	// Test reporter for stdout.
	// The only one supported by default is 'dot'
	// see also: https://webdriver.io/docs/dot-reporter.html
	// reporters: []
	//
	// Options to be passed to Jasmine.
	jasmineOpts: {
		//
		// Jasmine default timeout
		defaultTimeoutInterval: 999999999,
		failFast: true,
		//
		// The Jasmine framework allows interception of each assertion in order to log the state of the application
		// or website depending on the result. For example, it is pretty handy to take a screenshot every time
		// an assertion fails.
		expectationResultHandler: function (passed, assertion) {

			if (passed) {
				return;
			}

			browser.saveScreenshot("./errorShots/assertionError_" + new Date() + ".png");
			// do something
		}
	},

	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/*
	before: async function () {
		await db.connect();
		await db.insert(dbData);
	},
	*/
	afterHook: function (test, context, { error, result, duration, passed, retries }) {
		if (error) {
			saveScreenshotHelper(error);
		}
	},
	afterTest: function (test, context, { error, result, duration, passed, retries }) {
		if (error) {
			saveScreenshotHelper(error);
		}
	},
	/*
	after: async function () {
		await Promise.all([
			db.removeWorkspaces(dbData.workspaces),
			db.removeUsers(dbData.users),
			db.removeSnapshots(dbData.emails),
		]);
		await db.close();
	}
	*/
}