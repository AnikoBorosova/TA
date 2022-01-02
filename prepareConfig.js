const fs = require("fs");
const path = require("path");
const nconf = require("nconf");

nconf.argv().env().file({ file: './secretConfig' });
let envConfigJson = require("./tests/testData/envConfig");
let testDataJson = require("./tests/testData/userData");

// write env configs and test data into separate folder
const stringedTestDataJson = JSON.stringify(testDataJson);
const stringedEnvConfigJson = JSON.stringify(envConfigJson);

let configDir = path.join(__dirname, "./configs");
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
}

fs.writeFileSync(
    path.join(configDir, "envConfig.json"),
    stringedEnvConfigJson
);

fs.writeFileSync(
    path.join(configDir, "testData.json"),
    stringedTestDataJson
);