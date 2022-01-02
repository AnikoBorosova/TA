const purchasePage = require("../pageObjects/Purchase.page");

const envConfig = require("../../configs/envConfig");
const homePageUrl = envConfig.urls.homePage;

const userData = require("../../configs/testData");
const price = userData.purchaseData.price;
const itemName = userData.purchaseData.itemName;
const email = userData.loginData.email;
const password = userData.loginData.password;

describe("Test for basic item purchase process", () => {

	beforeAll(() => {
		browser.url(homePageUrl);
	});

	it("adds an item to the cart and checks if it was successful", () => {
		purchasePage.doAddItemToCart(price, itemName);
		expect(purchasePage.successHeadline.isDisplayed()).toBe(true);
	});

	it("proceeds to 'Cart summary' page and validates the chosen item in cart", () => {
		purchasePage.doProceedToCartSummary();
		expect(purchasePage.getItemInShoppingCart(itemName).isExisting()).toBe(true);
	});

	it("Logs in with credentials and proceeds to 'Addresses' page", () => {
		purchasePage.doProceedToSignIn(email, password);
		expect(purchasePage.addressesHeadline.isDisplayed()).toBe(true);
	});

	it("proceeds to 'Shipping' page and checks page headline", () => {
		purchasePage.doProceedToShipping();
		expect(purchasePage.shippingHeadline.isDisplayed()).toBe(true);
	});

	it("proceeds to payment, chooses payment method and proceeds to 'Order summary' page", () => {
		purchasePage.doProceedToPayment();
		purchasePage.doChoosePaymentMethod(purchasePage.bankWirePaymentBtn);
		expect(purchasePage.orderSummaryHeadline.isDisplayed()).toBe(true);
	});

	it("confirms order and checks 'Confirmation' page headline", () => {
		purchasePage.doConfirmOrder();
		expect(purchasePage.orderConfirmationHeadline.isDisplayed()).toBe(true);
	});
});