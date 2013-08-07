require(__dirname + '../../support/spec_helper');

var Browser = require("zombie"),
	browser;

 
describe("sign in", function() {
	
	beforeEach(function () {
		browser = new Browser({site: "http://localhost:3000"});
	});
	
 	it("when is not authenticated should be redirect to signin page", function (next) {
		browser.visit("/", function (err) {
			expect(browser.redirected).toBe(true);
			expect(browser.url).toContain("/sessions/signin");
			next();
		});
 	});

	
	it("should be authenticate with trello", function (next) {
		next();	
	});
});