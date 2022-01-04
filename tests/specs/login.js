const SignInPage = require("../pageObjects/SignIn.page");
const signInPage = new SignInPage();

const envConfig = require("../../configs/envConfig");
const homePageUrl = envConfig.urls.homePage;

const userData = require("../../configs/testData");
const email = userData.loginData.email;
const password = userData.loginData.password;

const unregisteredEmail = userData.unregisteredData.email;
const unregisteredPassword = userData.unregisteredData.password;

const loginErrorMessage = userData.errorMessage.authentication;

describe("Test for login process", () => {

	beforeAll(() => {
		browser.url(homePageUrl);
	});

	describe("unsuccessful login - incorrect email address", () => {

		it("navigate to 'Sign in'page and check if it opens", () => {
			signInPage.doOpenSignInPage();
			expect(signInPage.createAccountBtn.isExisting()).toBe(true);
		});

		it("adds incorrect data (email) and validates that the login was unsuccessful", () => {
			signInPage.doLogIn(unregisteredEmail, password);
			expect(signInPage.getErrorMessageElem(loginErrorMessage).isExisting()).toBe(true);
		});
	});

	describe("unsuccessful login - incorrect password", () => {

		it("adds incorrect data (password) and validates that the login was unsuccessful", () => {
			signInPage.doLogIn(email, unregisteredPassword);
			expect(signInPage.getErrorMessageElem(loginErrorMessage).isExisting()).toBe(true);
		});
	});

	describe("successful login", () => {

		it("logs in with correct data and validates that the process was successful", () => {
			signInPage.doLogIn(email, password);
			expect(signInPage.accountHeadline.isExisting()).toBe(true);
		});
	});
});