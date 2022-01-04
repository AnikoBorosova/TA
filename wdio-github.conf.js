const sharedConfig = require("./wdio-shared.conf");

const drivers = {
	chrome: {
		version: 'latest'
	}
}

exports.config = {
	...sharedConfig,
	...{
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
				//browserName: 'edge',
				'ms:edgeOptions': {
					args: ['--start-maximized', '--headless']
				},
			},
		],
		services: [
			['selenium-standalone', {
				logPath: 'logs',
				installArgs: { drivers }, // drivers to install
				args: { drivers } // drivers to use
			}]
		],
		reporters: ['spec']
	}
}