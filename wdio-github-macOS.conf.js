const sharedConfig = require("./wdio-shared.conf");

const drivers = {
	chrome: {
		version: '96.0.4664.45',
		arch: process.arch,
		baseURL: 'https://chromedriver.storage.googleapis.com'
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
			}
		],
		services: [
			['selenium-standalone', {
				logPath: 'logs',
				installArgs: { drivers },
				args: { drivers }
			}]
		],
		reporters: ['spec']
	}
}