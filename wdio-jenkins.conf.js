const sharedConfig = require("./wdio-shared.conf");

exports.config = {
	...sharedConfig,
	...{
		hostname: "path/to/your/hostname",
		port: 4444,
		path: '/wd/hub',
		protocol: 'http',
		reporters: [['allure', {
			outputDir: 'allure-results',
			disableWebdriverStepsReporting: true,
			disableWebdriverScreenshotsReporting: false,
		}]]
	}
}