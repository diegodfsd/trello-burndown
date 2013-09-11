require(__dirname + '../../support/spec_helper');

var Browser = require("zombie"),
	config = require('./app/config/configurations')(),
	browser;

 
describe("sign in", function() {
	
	beforeEach(function () {
		browser = new Browser({site: "http://localhost:" +  config.port });
	});
	
 	it("when is not authenticated should be redirect to signin page", function (next) {
		browser.visit("/", function (err) {
			expect(browser.redirected).toBe(true);
			next();
		});
 	});
});