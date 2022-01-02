const Page = require("./Page.page");
const envConfig = require("../../configs/envConfig");
const shortPause = envConfig.pauses.short;

class SignInPage extends Page {

	get signInBtn() {
		return $("//a[contains(text(), 'Sign in')]");
	}

	get createAccountHeadline() {
		return this.getHeadlineElem("Create an account");
	}

	get emailCreateInput() {
		return this.getInput("email_create");
	}

	get createAccountBtn() {
		return this.getBtn("SubmitCreate");
	}

	get loginHeadline() {
		return this.getHeadlineElem("Already registered");
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
		this.signInBtn.waitForExist(shortPause);
		this.signInBtn.click();
		this.createAccountHeadline.waitForDisplayed(shortPause);
	}

	doLogIn(email, password) {
		this.loginEmailInput.setValue(email);
		this.passwordInput.setValue(password);
		this.logInBtn.click();
	}
}

module.exports = SignInPage;