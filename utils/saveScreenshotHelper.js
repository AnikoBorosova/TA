const fs = require("fs");
const path = require("path");

module.exports = function (error) {
    const testFileName = error.stack.split("UserContext")[1].split(/specs[\\|\/]/)[1].split(".")[0].replace(/[\\|\/]/g, "_");

    const screenshotsDir = path.join(__dirname, "../errorScreenshots");
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }
    browser.saveScreenshot("./errorScreenshots/error_" + testFileName + ".png");
}