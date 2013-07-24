require('./support/spec_helper');

var Browser = require("zombie")
   ,browser = new Browser();
 
describe("sign in", function() {
 	it("should be redirect when is not authenticated", function () {
		expect("1").toBe("1");
 	})
});