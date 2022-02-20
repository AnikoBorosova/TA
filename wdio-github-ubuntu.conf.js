const sharedConfig = require("./wdio-shared.conf");

const drivers = {
    chrome: {
        version: '97.0.4692.99',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    firefox: {
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
                    args: ['-headless']
                }
            }
        ],
        services: [
            ['selenium-standalone', {
                logPath: 'logs',
                version: "3.141.59",
                installArgs: { drivers },
                args: { drivers }
            }]
        ],
        reporters: ['spec', ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]]
    }
}