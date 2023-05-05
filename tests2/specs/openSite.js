describe("Test for opening website", () => {

	it("navigates to 'Sign in'page and checks if it opens", () => {
        browser.url('https://webdriver.io');
        console.log('URL LOGEGD ', await browser.getUrl())
	});
});