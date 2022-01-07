## Automated UI-tests with WebdriverIO - wdio v7 + selenium-standalone service

Website being tested: http://automationpractice.com/index.php

## Run the tests locally

### System Requirements:

Browsers: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Opera
OS: Linux/Ubuntu, Windows10 or MacOS
NodeJS version: ```14.17.0```

- clone the repository
- do ```npm install```
- start the tests with the command: ```npm run testLocal``` to run the locally
- local test results are made with the ```@wdio/spec-reporter```

Optional steps:
- check out the other scripts in package.json. You can find the pre-written commands for each existing test suites and the complete builds as well. Use these commands as `npm run >>script<<` (e.g. 'npm run signInTests').
- the default setting is to run the tests in headless mode. You can easily switch to normal browser by removing the `--headless` flag from the 'args' array of the correspondent browser configuration in the `./test/e2eSpecs/wdio-local.conf.js` file

## Run the tests remotely

### GitHub Actions

- go to https://github.com/AnikoBorosova/Test-Automation/actions
- select any manual workflow on the left (currently configured on windows10 or macOS)
- click `Run workflow` button
- mandatory: select the `branch` you want to run the tests on (default is master)
- optional: add the `test suite` you want to run (e.g. `signInTests`). Leave the input empty if you want to run all tests
  - selectable suites: 
    - signInTests, 
    - purchaseTests

### Jenkins

- First set up a Jenkins job - I chose ```Freestyle project``` as the type of the job
- Use the ```Configure``` menu to add the settings for the job
- Choose the ```This project is parameterized``` checkbox to set up a multi-select menu for the tests
    - As a 'Name', add ```Parameters```
    - Select the ```Extended Choice Parameter``` from the dropdown menu
    - Set the 'Parameter Type' to ```Multi Select```
    - Set the 'Number of Visible Items' and 'Delimiter' as you like
    - Set the 'Value' list based on the ```suites``` array in your ```wdio-shared.conf.js``` file. Here we have only 2 suites (--suite signInTests,--suite purchaseTests), but these can be expanded anytime

- In the 'Source Code Management' section choose the option 'Git', than add the link of the repository and the branch name: ```*/main```

- In the 'Build' section choose 'Execute shell' from the options and add these commands to the shell:

```
npm install
touch PARAMS
echo "$Parameters" > PARAMS
node prepareConfig.js && ./node_modules/.bin/wdio ./wdio-jenkins.conf.js $(sed 's/,/ /g' PARAMS)
```

- Save the configuration
- Go to the 'Build with Parameters' menu
- Choose the test suites you wish to run from the select menu and hit 'Build'

### Notes
- You can also choose to run the tests periodically and automatically. In this case you need to add a schedule within the 'Build triggers' section in Configuration using cron syntax (e.g. ```H 3,20 * * *```).
- You can also choose the 'GitHub hook trigger' option to trigger builds based on GitHub pushes.

## The CI/CD pipeline and all related information
The Jenkins setup runs the tests on `Linux` using the selenium grid with Chrome, Firefox and Microsoft Edge. This setup is determined by the docker image (more info below at the `The Grid Console` and `The docker images behind the Grid Console` section).
The GitHub Actions setup runs the tests on `Windows10`, `Ubuntu` and 'MacOS'. This setup is determined by the .yaml config files (`./github/workflows/*.yaml`).

- Adjust the scheduled time based on Daylight Saving Time - cron syntax uses UTC time, so if you want to run your tests at a given time all the time, make sure to adjust the configuration.
To do so:
  - on Jenkins: Go to the given `Jenkins-job --> Configuration menu --> Build Triggers --> Build periodically --> Schedule`
  - on GitHub Actions: find the `./github/workflows/scheduled_*.yaml file within the repo --> on --> schedule --> cron`

- Store any user-credentials and sensitive data as secrets
To do so on Jenkins:
  - go to the given `Jenkins-job --> Configuration menu --> Build environment --> Use secret text(s) or file(s)`
  - you need to have admin credentials on Jenkins to be able to add new credentials
  - choose the method that best fits you - currently used method is `Username and password (separated)`
  - add credentials and create a new variable (current credentials are already added as a variable and can be used in multiple Jenkins-jobs)
  - use this variable within your build command in the `Execute shell` section

To do so on GitHub Actions:
  - go to `https://github.com/AnikoBorosova/Test-Automation/ --> Settings --> Secrets --> 'Action secrets' section`
  - add new repository secrets or use/update the existing ones (Name/Value pair) (you need to be an admin of the repository to be able to modify secrets)
  - use the secrets within the build command located in your yaml files in the repo (`./github/workflows/*.yaml`)

### If a session is not started after you hit 'Build' on Jenkins
- go to Rancher dashoard --> Workload ---> Deployments
- find the`selenium-selenium-chrome` node or `selenium-selenium-hub` node
- check the logs to find possible errors

### Redeploy the nodes on Rancher
When facing any errors on Rancher, a simple redeploy might solve your issues. To do this:
- open the `selenium-selenium-chrome` node or `selenium-selenium-hub` node
- find the `Redeploy` button within the context menu in the upper right corner
- hit 'Redeploy' and wait until the node re-starts itself
- check out the logs of 'selenium-selenium-hub' node and wait until it says: `Registered a node`
- check out the logs on 'selenium-selenium-chrome' node (currently using 3 pods) and wait until all of them say: `Connected to the hub and ready for use`

### The Grid Console
There is a Selenium Grid Console we can use to visually check the state of the selenium grid on Rancher.
To be able to see the console, you have to add your current IP address first.
- go to `Rancher --> Service Discovery --> Ingresses --> selenium-ingress
- find the `Edit Config` option within the context menu in the upper right corner
- go to `Labels and Annotations` section
- add you IP address into the `nginx.ingress.kubernetes.io/whitelist-source-range` Value field
- hit `Save` and go back to the console url - it might take a few minutes until it refreshes and after that you will be able to see the console.

Useful information on the console: 
- how many Chromes are up and running
- what are their hosts
- what are their capabilities settings
- what is the Chrome version that is used (determined by the docker image used for the selenium grid)
- etc.

### The docker images behind the Grid Console
It is recommended to update the docker image from time to time as the selenium-team releases new versions regularly.
To do so:
- go to `Rancher --> staging --> Workload ---> Deployments
- find `selenium-selenium-chrome` node and `selenium-selenium-hub` node
- find the `Edit Config` option within the context menu in the upper right corner within each node
- change the docker image tag number within the `Container Image` input
- hit `Save` at the bottom of the page and wait until the nodes re-start themselves
- check the logs to see when the process is finished with the `Connected to the hub and ready for use` and `Registered a node` messages. Alternatively, you can follow the process on Grid Console, too.

Search for new docker image tags on these links:
- for the hub: https://hub.docker.com/r/selenium/hub/tags
- for the chrome node: https://hub.docker.com/r/selenium/node-chrome/tags

Older docker images may use older browser versions, therefore make it possible to run your tests in older browser versions.

### The selenium-standalone service and the GitHub Actions
The `selenium-standalone service` is a wdio package that makes possible to run a selenium grid in the background of wdio tests.
The tests on GitHub Actions do not use the above-mentioned docker images, but use the info set in the `wdio-github.conf.js` file and the `workflow yaml files`. Based on these the GitHub Actions starts the selenium server (given in the wdio-github.conf.js) on o given OS (given in the yaml files), and uses the given browsers (configured in the wdio-github.conf.js).
It is possible to expand the wdio-shared.conf.js file with Firefox, IE and Edge browsers, so GitHub Actions would run tests on these browser, too.

## Structure of the repository

### Root level
- `README.md`
- `secretConfig.json`: to store the test user's credentials for local running (currnetly unused).
- `prepareConfig.js`: responsible to build configs based on `envconfig`, `testConfig` and `secretConfig.js`. User-credentials are stored in secrets on Jenkins and on the GitHub repository, or in a secretConfig.json locally.
- `package.json`: find all important build scripts here

### ./.github/workflows/
Contains yaml files needed to run tests on GitHub Actions. There is no need to specify browsers in these files - the wdio-*.conf.js file takes care of that. 

The yaml files for scheduled tests determine the build schedule, run all tests on the corresponding OS and upload error screenshots if any
- `scheduled_mac.yaml`;
- `scheduled_ubuntu.yaml`;
- `scheduled_windows.yaml`;

The yaml files for manual tests run tests on the corresponding OS, make possible to run tests with or without test suite flags and upload error screenshots if any
- `manual_mac.yaml`;
- `manual_windows.yaml`;

### ./tests/
- contains the `test files`
- contains the `PageObjects`

This is the meat of the tests. 
All the element xPaths and test logic is contained in the PageObject files.
The test files themselves only contains the steps and inputs (test data) using the jasmine assert library (https://jasmine.github.io/).

The main PageObject file is the `./tests/pageObjects/Page.page.js`.
All the other PageObjects are inheriting from this one and the common assets (xPaths, functions) are gathered here so the other POs can have access to these.

### The Test Runner
The Test Runner makes it possible to run the tests in different configurations.
Depending on which service we use (selenium-standalone, chromeDriver, appium etc.), wdio sets up the selenium server and basically the selenium grid in the background.

The test runner configuration can be found in these files:
- `./wdio-shared.conf.js`
- `./wdio-local.conf.js`
- `./wdio-staging-github.conf.js`
- `./wdio-staging-github_macOS.conf.js`
- `./wdio-staging.jenkins.conf.js`

Currently we use the `selenium-standalone service` in the local and the GitHub Actions configuration.
The Jenkins configuration uses different setup. (See the differences in the `hostname` and the `services` object.)

We can state within the Test Runner which tests we want to include and exclude in our builds and we can also group certain tests into suites to make it possible to run only certain groups of tests.

The `maxInstances` and `capabilities` section is responsible to tell which browsers and drivers we want to use. The Test Runner makes it easy to run tests simultaneously in more than one session in more than one browser. 
The browsers can also be configured in different ways, such as:
- '--start-maximized'
- '--headless'
- '--disable-gpu'
- '--window-size=1920,1080'
- '--no-sandbox'
- '--no-cache'
- etc.

The `logLevel` can be set up in different ways depending on how detailed logs we need.

The `bail` option is responsible to end tests after a given amount of error. We do not use this feature because it would stop the whole build after a certain amount of error but NOT the exact test file that fails.
Instead of this we use the `failFast: true` option in the jasmine configuration. This stops the test file which fails after the first error and proceeds to the next test file. This is needed to prevent tests from running 2-3 hours unnecessarily, which could have unreasonable costs on GitHub Actions.

The `waitForTimeout` sets the time we wait until a certain element is existing or ready to use (when using wdio's own waitFor... functions). This can be overwritten in the tests and we do overwrite it in our `./tests/testData/envConfig.json` file.

Webdriverio makes it possible to run your test in `docker` using docker images of your choice. There is a detailed guide on how to set this up in the uncommented section within the config file.

The `Reporters` array is used to set the reporting system that summarizes the test results at the end of each run. We use `allure` reporting on Jenkins and `spec` reporting on GitHub Actions and on local runs.

Currently we use `Jasmine` as a test framework for assertions, but wdio can be integrated with Mocha and Cucumber, too.

Webdriverio has handy-dandy `'before' and 'after' hooks` to handle steps in different stages of the test runs.
The whole list of options can be found here: https://webdriver.io/docs/options/#hooks

Currently we use the `afterHook` and `afterTest` hooks to make screenshots about errors and upload them into a separate `errorScreenShots` folder runnig locally and remotely (GitHub Actions, Jenkins). The 'afterHook' hook makes sure to create screenshots of errors happening in Jasmine's before/after hooks, and the 'afterTest' hook is responsible for errors happening in other parts of the test code. 

The 'before' and 'after' hook would be useful to connect to the database and insert or delete userData needed in the tests.
This way we would not have to do these steps in each test file, but the Test Runner would take care of it at one place. This would also be helpful for us to make sure the testData would always be cleared from the database after each test file run. If we would run these steps within the test files, the 'afterAll' hook would not run in case of any error happens during the test and that could affect the upcoming test's testData.

### ./tests/testData/
Contains all testData we use
- `userData.json` fall testData we use in the test files - to gather them together into one file will make it possible to easily change and vary testData and thus have a data-driven approach in our test automation solution
- `envConfig.json`: environment configs only

The before-mentioned `prepareConfig.js` is responsible to prepare the configs for the test. It builds and copies the envConfig.json file and the userData.json file into a separate folder (`./configs/`) and the test files require these configs from this common 'configs' folder.

### ./utils
Contains various util functions used in tests, including
- `clickHelper.js` for clicking on elements hovering over other elements (modals, pop-ups)
- `randomizeEmaulAddress.js`
- `saveScreenshotHelper.js` for creating screenshots in case of errors and putting them into a pre-defined folder

## Naming conventions
The xPaths stored in the pageObject files are stored in getter functions.
The functions stored in pageObjects that are directly called in test files are named as `doXYZ() {}` functions and the validation functions directly called in test files are named `validateXYZ() {}` functions. This convention helps understanding the test steps and debugging.

There are setter functions in pageObjects that's names do not start with 'do...' or 'validate...'. These are usually helper functions that help make do... functions cleaner or we use them in more than one places to prevent repetition in the code. Any inconsistencies you find are probably mistakes, so feel free to fix and make the code cleaner.

## Debugging - best practices
- errors logged during test runs always specify the exact line where the error happens making debugging easier
- an allure-report is created at the end of each test run on Jenkins. This report shows graphs, statistics and if any error happens, the exact logs and screenshots of the errors. 

    Jenkins stores this report at the `Allure report` section of the given Jenkins-job: `https://path-to-your-jenkins/job/selenium-staging/allure/`.

- screenshots are made of each error on both Jenkins and GitHub Actions. 
    
    Jenkins stores these images at each build's `Artifacts (Építőkövek)` section as a downloadable asset (e.g.`https://path-to-your-jenkins/job/selenium-staging/[build_number]/`)

    You can also chech these screenshots within the allure-report that is created on Jenkins
    
    GitHub Actions stores these images at each builds `Artifacts` section as a downloadable asset (e.g. `https://github.com/AnikoBorosova/Test-Automation/actions/runs/[build_number]`)

- if an elem is not displayed or not interactable, check out if something else is not hovering over it e. g. modals, dropdowns etc.

## Test scenarios 

### Web testing scenarios
Find the scenarios in ```./wdioTests/specs/```

1. Registration process - positive scenario
- Start from main page
- Navigate to 'Sign in' page
- Register an email address
- Proceed to registration form
- Add correct registration data and validate that the account is created succesfully

2. Login process

2.a. Login process - negative scenario - no user data added
- Navigate to 'Sign in' page
- Try to log in with adding no credentials and validate that the log-in process is not successful

2.b Login process - negative scenario - invalid email
- Navigate to 'Sign in' page
- Try to log in with adding invalid email/valid password and validate that the log-in process is not successful

2.b Login process - negative scenario - invalid password
- Navigate to 'Sign in' page
- Try to log in with adding valid email/invalid password and validate that the log-in process is not successful

2.d. Login process - positive scenario
- Navigate to 'Sign in' page
- Log in with existing user credentials and validate that the user is getting in their account

3. Item purchase process - positive scenario
- Start from main page
- Add an item to cart 
- Proceed from the 'success' pop-up to 'Cart Summary' page
- Validate that he chosen item is in the cart
- Proceed to 'Log in' page and log in with existing user credentials
- Proceed to 'Addresses' page
- Proceed to 'Shipping' page
- Proceed to 'Payment' page and choose a payment method
- Proceed to 'Order summary' page
- Confirm order and validate that the 'Confirmation' headline appears and the purchase process was successful

## What could be the next steps to the project?
- test all the other features on the website (buying more than 1 item, checking the validity of all the information within the cart, checking summary details etc.)
- test negative scenarios (registering with incorrect data, log-in attempt with incorrect data etc.)
- the email-address is randomized at the registration process to make sure the tests can be run over and over again - however, this approach can pollute the database in the long run. A different approach can be that the test file is connecting to the database at the beginning and after the test is finished, it should remove the data from the database