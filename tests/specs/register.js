const registerPage = require("../pageObjects/Register.page");
const envConfig = require("../../configs/envConfig");
const homePageUrl = envConfig.urls.homePage;

const userData = require("../../configs/testData").registerData;
const randomizeEmailAddress = require("../../utils/randomizeEmailAddress");

// randomize email address to make sure the testData is usable over and over again
userData.email = randomizeEmailAddress(userData.email);

describe("Test for registration process", () => {

	beforeAll(() => {
		browser.url(homePageUrl);
	});

	describe("successful registration", () => {
		it("navigates to 'Sign in'page and checks if it opens", () => {
			registerPage.doOpenSignInPage();
			expect(registerPage.createAccountBtn.isExisting()).toBe(true);
		});

		it("creates account and check if it proceeds to registration form", () => {
			registerPage.doCreateAccount(userData.email);
			expect(registerPage.personalInfoHeadline.isDisplayed()).toBe(true);
		});

		it("adds correct registration data and validates that the registration was successful", () => {
			registerPage.setRegistrationData(userData);
			expect(registerPage.accountHeadline.isExisting()).toBe(true);
		});
	});
});