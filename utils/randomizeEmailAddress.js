// randomize email address to make sure the testData is usable over and over again

module.exports = function randomizeEmailAddress(email) {
	const randomCharString = Math.random().toString(36).substr(2, 7);
	const emailSnippetArray = email.split("-");
	emailSnippetArray.splice(1, 0, randomCharString);
	return emailSnippetArray.join('');
}