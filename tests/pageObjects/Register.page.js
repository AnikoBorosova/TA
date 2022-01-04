const SignInPage = require("./SignIn.page");
const envConfig = require("../../configs/envConfig");
const shortPause = envConfig.pauses.short;

class RegisterPage extends SignInPage {

	get personalInfoHeadline() {
		return this.getElemByText("Your personal information");
	}

	get titleInputMale() {
		return this.getInput("id_gender1");
	}

	get firstNameInput() {
		return this.getInput("customer_firstname");
	}

	get lastNameInput() {
		return this.getInput("customer_lastname");
	}

	get emailInput() {
		return this.getInput("email");
	}

	get passwordInput() {
		return this.getInput("passwd");
	}

	get addressInput() {
		return this.getInput("address1");
	}

	get cityInput() {
		return this.getInput("city");
	}

	getStateListItem(state) {
		return $(`//select[@id='id_state']//option[contains(text(), '${state}')]`);
	}

	get postalCodeInput() {
		return this.getInput("postcode");
	}

	get mobileInput() {
		return this.getInput("phone_mobile");
	}

	get aliasInput() {
		return this.getInput("alias");
	}

	get registerBtn() {
		return this.getBtn("submitAccount");
	}

	doCreateAccount(email) {
		this.registerEmailInput.setValue(email);
		this.createAccountBtn.click();
		this.firstNameInput.waitForExist({ timeout: shortPause });
	}

	setRegistrationData(userData) {
		this.titleInputMale.click();
		this.firstNameInput.setValue(userData.firstName);
		this.lastNameInput.setValue(userData.lastName);
		this.passwordInput.setValue(userData.password);
		this.addressInput.setValue(userData.address);
		this.cityInput.setValue(userData.city);
		this.getStateListItem(userData.state).click();
		this.postalCodeInput.setValue(userData.postalCode);
		this.mobileInput.setValue(userData.mobilePhone);
		this.clearAndSetInputValue(this.aliasInput, userData.addressAlias);
		this.registerBtn.click();
		this.accountHeadline.waitForExist({ timeout: shortPause });
	}
}

module.exports = new RegisterPage();