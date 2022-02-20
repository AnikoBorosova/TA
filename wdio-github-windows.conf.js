const sharedConfig = require("./wdio-shared.conf");

const drivers = {
	chrome: {
		version: '98.0.4758.102',
		arch: process.arch,
		baseURL: 'https://chromedriver.storage.googleapis.com'
	},
	firefox: {
		version: 'latest'
	},
	chromiumedge: {
		version: '98.0.1108.56',
		arch: process.arch,
		acceptInsecureCerts: true,
		baseURL: "https://msedgedriver.azureedge.net"  // from here: "https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver"
	}
	/*
	opera: {
		version: 'latest'
	}
	*/
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
					args: ['-headless']
				}
			},
			{
				maxInstances: 3,
				browserName: 'MicrosoftEdge',
				'ms:edgeOptions': {
					args: ['--start-maximized']
				},
			}
			/*
			{
				maxInstances: 3,
				browserName: 'opera',
				'goog:chromeOptions': {
					args: [],
					extensions: []
				}
			}
			*/
		],
		services: [
			['selenium-standalone', {
				logPath: 'logs',
				version: "3.141.59",
				installArgs: { drivers },
				args: { drivers }
			}]
		],
		seleniumArgs: {
			javaArgs: [
				'-Dwebdriver.edge.driver=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
				//'-Dwebdriver.opera.driver=C:\\Program Files (x86)\\Opera\\42.0.2393.94\\opera.exe'
			]
		},
		reporters: ['spec']
	}
}