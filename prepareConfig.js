const fs = require("fs");
const path = require("path");
const nconf = require("nconf");

nconf.argv().env().file({ file: './secretConfig' });
let testDataJson = require("./tests/testData/userData");

// write configs and data into separate folder
const stringedTestDataJson = JSON.stringify(testDataJson);

let configDir = path.join(__dirname, "./configs");
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
}

fs.writeFileSync(
    path.join(configDir, "testConfig.json"),
    stringedTestDataJson
);