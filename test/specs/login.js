const SignInPage = require("../pageObjects/SignIn.page");
const signInPage = new SignInPage();

const config = require("../../config");
const mainUrl = config.urls.main;

const userData = require("../testData/userData");
const email = userData.loginData.email;
const password = userData.loginData.password;

describe("Test for login process", () => {

	beforeAll(() => {
		browser.url(mainUrl);
		browser.maximizeWindow();
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