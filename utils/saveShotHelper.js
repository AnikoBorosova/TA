const fs = require("fs");
const path = require("path");

module.exports = function () {
    const randomCharString = Math.random().toString(36).substr(2, 7);
    const testFileName = randomCharString;

    const screenshotsDir = path.join(__dirname, "../screenshots");
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }
    browser.saveScreenshot("./screenshots/image_" + testFileName + ".png");
}