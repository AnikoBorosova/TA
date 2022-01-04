const Page = require("./Page.page");
const SignInPage = require("../pageObjects/SignIn.page");
const signInPage = new SignInPage();
const clickHelper = require("../../utils/clickHelper");

const envConfig = require("../../configs/envConfig");
const shortPause = envConfig.pauses.short;

class PurchasePage extends Page {

	getItemAddBtn(price, itemName) {
		return this.$(`//ul[@id='homefeatured']//*[contains(text(), '${price}')]/ancestor::div[contains(@class, 'product-container')]//a[contains(text(), '${itemName}')]/ancestor::div[contains(@class, 'product-container')]//*[contains(text(), 'Add to cart')]/ancestor::a`)
	}

	get successHeadline() {
		return $("//h2[normalize-space()='Product successfully added to your shopping cart']");
	}

	get proceedBtnOnModal() {
		return $("//*[contains(@class, 'button-container')]//a[contains(@title, 'Proceed to checkout')]")
	}

	get shoppingCartSummaryHeadline() {
		return this.getCartHeadlineElem("Shopping-cart summary");
	}

	getItemInShoppingCart(itemName) {
		return $(`//div[contains(@class, 'shopping_cart')]//*[contains(text(), '${itemName}')]`);
	}

	get proceedBtnAtSummary() {
		return $("//*[contains(@class, 'cart_navigation clearfix')]//a[contains(@title, 'Proceed to checkout')]");
	}

	get authenticationHeadline() {
		return this.getCartHeadlineElem("Authentication");
	}

	get addressesHeadline() {
		return this.getCartHeadlineElem("Addresses");
	}

	get shippingHeadline() {
		return this.getCartHeadlineElem("Shipping");
	}

	get termsOfServiceCheckbox() {
		return $("//p[contains(text(), 'Terms of service')]/following-sibling::p//input[@type='checkbox']");
	}

	get proceedBtn() {
		return $("//*[contains(text(), 'Proceed to checkout')]/ancestor::button");
	}

	get bankWirePaymentBtn() {
		return $("//a[contains(@title, 'Pay by bank wire')]");
	}

	get orderSummaryHeadline() {
		return this.getElemByText("Order summary");
	}

	get confirmOrderBtn() {
		return $("//*[contains(text(), 'confirm my order')]/ancestor::button");
	}

	get orderConfirmationHeadline() {
		return this.getCartHeadlineElem("Order confirmation");
	}

	doAddItemToCart(price, itemName) {
		this.getItemAddBtn(price, itemName).waitForExist({ timeout: shortPause });
		browser.execute(clickHelper, this.getItemAddBtn(price, itemName).xPath);
		this.successHeadline.waitForDisplayed({ timeout: shortPause });;
	}

	doProceedToCartSummary() {
		this.proceedBtnOnModal.click();
		this.shoppingCartSummaryHeadline.waitForDisplayed({ timeout: shortPause });;
	}

	doProceedToSignIn(email, password) {
		this.proceedBtnAtSummary.click();
		this.authenticationHeadline.waitForDisplayed({ timeout: shortPause });;
		signInPage.doLogIn(email, password);
	}

	doProceedToShipping() {
		this.proceedBtn.click();
		this.shippingHeadline.waitForDisplayed({ timeout: shortPause });;
	}

	doProceedToPayment() {
		this.termsOfServiceCheckbox.click();
		this.proceedBtn.click();
		this.bankWirePaymentBtn.waitForClickable({ timeout: shortPause });;
	}

	doChoosePaymentMethod(paymentBtn) {
		paymentBtn.click();
		this.orderSummaryHeadline.waitForDisplayed({ timeout: shortPause });;
	}

	doConfirmOrder() {
		this.confirmOrderBtn.click();
		this.orderConfirmationHeadline.waitForDisplayed({ timeout: shortPause });;
	}
}

module.exports = new PurchasePage;