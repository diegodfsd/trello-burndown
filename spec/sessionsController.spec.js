require('./support/spec_helper');

var Browser = require("zombie"),
	browser;

 
describe("sign in", function() {
	
	before(function () {
		this.browser = new Browser();
	});
	
 	it("should be redirect to signin page when is not authenticated", function (next) {
		browser.visit('http://localhost:3000/', function (err) {
			expect(browser.url).toBe("http://localhost:3000/account/signin");
			next();
		});
 	});
});