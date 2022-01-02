const SignInPage = require("../pageObjects/SignIn.page");
const signInPage = new SignInPage();

const envConfig = require("../../configs/envConfig");
const homePageUrl = envConfig.urls.homePage;

const userData = require("../../configs/testData");
const email = userData.loginData.email;
const password = userData.loginData.password;

describe("Test for login process", () => {

	beforeAll(() => {
		browser.url(homePageUrl);
	});

	it("navigate to 'Sign in'page and check if it displays", () => {
		signInPage.doOpenSignInPage();
		expect(signInPage.createAccountHeadline.isDisplayed()).toBe(true);
	});

	it("logs in with correct data and validates that the process was successful", () => {
		signInPage.doLogIn(email, password);
		expect(signInPage.welcomeHeadline.isDisplayed()).toBe(true);
	});
});