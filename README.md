## Web tests created and executed by using webdriverio, jasmine, chromedriver and JUnit-reporter
## API tests created with Postman and ChaiJS, and executed by using newman and JUnit-reporter
Website being tested: http://automationpractice.com/index.php

---------------------

## How to run the tests locally

### System Requirements:

Browser used: Google Chrome

OS used: Linux/Ubuntu

NodeJS version: ```12.16.1``` or above

### Web tests
Location of the web tests: ```./wdioTests/specs/```

- clone the repository
- make sure you have the latest stable Chrome version: v90.0.4430.212
- if you have an older version and do not wish to upgrade, than change the ```chromedriver``` version within the package.json file accordingly
- do ```npm install```
- start the tests with the command: ```npm run testLocal```
- find the xml report of the results in the ```'./wdioTests/results/'``` folder

### API tests
Location of the web tests: ```./API_tests/APITests.postman_collection.json```

API_tests are usually not placed within the same repository as wdio tests, but for simplicity, I placed them here for this project.
The execution needs the newman npm package, but I did not want to install it within the package.json of the webdriverio tests for the above reason.

- clone the repository
- do ```npm install newman@5.2.2```
- do ```cd API_tests```
- start the tests with the command: ```newman run APITests.postman_collection.json```

or if you wish to generate the xml report of the results:
- use the command: ```newman run APITests.postman_collection.json -r junit --reporter-junit-export ./results/```
- find the xml report of the results in the ```'./API_tests``` folder

## How to run the tests in a CI/CD pipeline
This project is using Jenkins as an automation server.

- First set up a Jenkins job - I chose ```Freestyle project``` as the type of the job
- Use the ```Configure``` menu to add the settings for the job
- Choose the ```This project is parameterized``` checkbox to set up a multi-select menu for the tests
    - As a 'Name', add ```Parameters```
    - Select the ```Extended Choice Parameter``` from the dropdown menu
    - Set the 'Parameter Type' to ```Multi Select```
    - Set the 'Number of Visible Items' and 'Delimiter' as you like
    - Set the 'Value' list based on the ```suites``` array in your ```wdio-remote.conf.js``` file. Here we have only 2 suites (--suite signInTests,--suite purchaseTests), but these can be expanded anytime

![jenkins1](https://user-images.githubusercontent.com/26765655/118711242-a49a3a80-b81f-11eb-955b-7e5760ea8fb5.png)

- In the 'Source Code Management' section choose the option 'Git', than add the link of the repository and the branch name: ```*/main```

![jenkins2](https://user-images.githubusercontent.com/26765655/118711262-a95eee80-b81f-11eb-90d7-339370a05d74.png)

- In the 'Build' section choose 'Execute shell' from the options and add these commands to the shell:

```
npm install
touch PARAMS
echo "$Parameters" > PARAMS
node ./node_modules/.bin/wdio ./wdio-remote.conf.js $(sed 's/,/ /g' PARAMS)
```

- Save the configuration
- Go to the 'Build with Parameters' menu
- Choose the test suites you wish to run from the select menu and hit 'Build'

### Notes
- You can also choose to run the tests periodically and automatically. In this case you need to add a schedule within the 'Build triggers' section in Configuration using cron syntax (e.g. ```H 3,20 * * *```).
- You can also choose the 'GitHub hook trigger' option to trigger builds based on GitHub pushes.
- Or if this project would be part of a development project, there would be an option to build these tests when the website's code is being updated by the development team. In this case you could set up the build rules within the Jenkinsfile of their repository and make the Build as a separate step in their CI/CD pipeline.

## Links to the results in Calliope.pro

- Link to wdioTests results: https://app.calliope.pro/reports/89681
- Link to API tests results: https://app.calliope.pro/reports/89682


## Test scenarios 

### Web testing scenarios
Find the scenarios in ```./wdioTests/specs/```

1. Registration process - positive scenario
- Start from main page
- Navigate to 'Sign in' page
- Register an email address
- Proceed to registration form
- Add correct registration data and validate that the account is created succesfully

2. Login process - positive scenario
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


### API testing scenarios
Find the scenarios in ```./API_tests/```

1. Get status of main page - positive scenario - Expect that response status code is 200
2. POST request with all correct registration data - positive scenario - Expect that response status code is 200
3. POST request with all correct login credentials - positive scenario - Expect that response text includes text snippet 'my personal information' (that is located within a profile page)
4. POST request for adding item in cart with correct data of an item - positive scenario - Expect that response status code is 200


## What you used to select the scenarios, what was your approach?
First I got to know the website by manually checking it. 
Secondly, I checked that the features are working right manually.
When selecting the scenarios to test, I focused on the main features of the website in an order in which the user is most likely to engage with the page.


## Why are these scenarios the most important?
These scenarios are focusing on the main features of the website. 
Correct working of these features are crucial both from the users' and the provider's point of view - because of user experience, customer satisfaction, the provider's operation and income.

The first API test is checking if the response's status code is 200 - so that the website is up and running.

Registration is the first key in a user roadmap, it is unavoidable if a user needs a profile page to make orders and payments, so testing of registration is crucial.
Log-in is also a key point in a website, reasons are similar to the registration process.

Purchasing an item is the main feature of the website, so testing this feature can not be left out. The API test focuses on whether the chosen item can be put to cart, and the web test is focusing on the process of buying the item - whether the user can go through all the steps and the process is successful at the end.


## What could be the next steps to the project?
- test all the other features on the website (buying more than 1 item, checking the validity of all the information within the cart, checking summary details etc.)
- test negative scenarios (registering with incorrect data, log-in attempt with incorrect data etc.)
- the email-address is randomized at the registration process to make sure the tests can be run over and over again - however, this approach can pollute the database in the long run. A different approach can be that the test file is connecting to the database at the beginning and after the test is finished, it should remove the data from the database and close the connection. 
- This particular website does not operate with confirmation emails at registration or purchase process, but most of the modern websites do use this technique to make the process more safe. With a more advanced devops infrastructure (like Rancher, Kubernetes etc.) we can set up an email confirmation service, that mocks a real-life email service and can receive an email from a given source. 
    - Within the test file we can start an express server, that listens to a response, 
    - send out the registration and the email, 
    - the email confirmation service can receive it, parse out the confirmation link and send it back
    - the test can receive the parsed link with the express server and open it to confirm the process
- configure the wdio tests to run on other browsers and OS
- configure the wdio tests to run more than 1 test paralelly on more than 1 browser - this is utilizing the power of the selenium grid
- using Rancher to operate the selenium grid, utilizing various docker images
- using Jenkins in different ways - configuring to run the tests in every new push to the main branch, or run them periodically (e.g. twice a day), or connect them to the CI/CD pipeline of the development team who created the website)
