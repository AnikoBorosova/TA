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

	getHeadlineElem(text) {
		return this.$(`//*[contains(text(), '${text}')]`);
	}

	setInputValue(inputElement, value) {
		const inputLength = inputElement.getValue().length;
		const backspacesForClearingInput = new Array(inputLength).fill("Backspace");
		inputElement.setValue(backspacesForClearingInput);
		inputElement.setValue(value);
	}

	get welcomeHeadline() {
		return this.getHeadlineElem("Welcome");
	}
}
