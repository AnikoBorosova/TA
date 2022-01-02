const sharedConfig = require("./wdio-shared.conf");

exports.config = {
	...sharedConfig,
	...{
		hostname: "path/to/your/hostname",
		port: 4444,
		path: '/wd/hub',
		protocol: 'http',
		capabilities: [
			{
				maxInstances: 3,
				browserName: 'chrome',
				'goog:chromeOptions': {
					args: ['--start-maximized', '--headless', '--disable-gpu', '--window-size=1920,1080', '--no-sandbox', '--no-cache']
				}
			},
			{
				maxInstances: 3,
				browserName: 'firefox',
				"moz:firefoxOptions": {
					//flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
					args: ['-headless']
				}
			},
			{
				maxInstances: 3,
				browserName: 'MicrosoftEdge',
			},
		],
		reporters: [['allure', {
			outputDir: 'allure-results',
			disableWebdriverStepsReporting: true,
			disableWebdriverScreenshotsReporting: false,
		}]]
	}
}