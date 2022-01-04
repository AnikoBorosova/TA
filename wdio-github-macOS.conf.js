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
				browserName: 'safari'
			},
			{
				maxInstances: 3,
				browserName: 'chrome',
				'goog:chromeOptions': {
					args: ['--start-maximized', '--headless', '--disable-gpu', '--window-size=1920,1080', '--no-sandbox', '--no-cache']
				}
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