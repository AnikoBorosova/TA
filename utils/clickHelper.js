module.exports = function bgClickByXpath(xpath) {
	document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
}