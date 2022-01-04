module.exports = class Page {

	$(xPath) {
		const element = $(xPath);
		element.xPath = xPath;
		return element;
	}

	getInput(id) {
		return this.$(`//input[@id='${id}']`);
	}

	getBtn(id) {
		return this.$(`//button[@id='${id}']`);
	}

	getElemByText(text) {
		return this.$(`//*[contains(text(), '${text}')]`);
	}

	getErrorMessageElem(errorMessage) {
		return this.$(`//*[contains(@class, 'alert-danger')]//li[contains(text(), '${errorMessage}')]`);
	}

	get accountHeadline() {
		return this.getElemByText("My account");
	}




	getCartHeadlineElem(text) {
		return $(`//div[@id='center_column']//*[contains(text(), '${text}')]`);
	}

	clearAndSetInputValue(inputElement, value) {
		const inputLength = inputElement.getValue().length;
		const backspacesForClearingInput = new Array(inputLength).fill("Backspace");
		inputElement.setValue(backspacesForClearingInput);
		inputElement.setValue(value);
	}
}
