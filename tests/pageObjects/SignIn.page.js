const Page = require("./Page.page");
const envConfig = require("../../configs/envConfig");
const shortPause = envConfig.pauses.short;

class SignInPage extends Page {

	get signInBtn() {
		return this.getElemByText("Sign in");
	}

	get registerEmailInput() {
		return this.getInput("email_create");
	}

	get createAccountBtn() {
		return this.getBtn("SubmitCreate");
	}

	get loginEmailInput() {
		return this.getInput("email");
	}

	get passwordInput() {
		return this.getInput("passwd");
	}

	get logInBtn() {
		return this.getBtn("SubmitLogin");
	}

	doOpenSignInPage() {
		this.signInBtn.waitForExist({ timeout: shortPause });
		this.signInBtn.click();
		this.logInBtn.waitForDisplayed({ timeout: shortPause });
	}

	doLogIn(email, password) {
		this.loginEmailInput.setValue(email);
		this.passwordInput.setValue(password);
		this.logInBtn.click();
		this.accountHeadline.waitForExist({ timeout: shortPause });
	}
}

module.exports = SignInPage;