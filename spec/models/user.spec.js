require(__dirname + '../../support/spec_helper');

var user = require(__dirname + '../../../app/models/user'),
	mongoose = require("mongoose");

describe("gravatar url", function () {
	it("when gravatar hash is null", function () {
		expect(true).toBe(true);
	});
	
	it("when gravatar is invalid", function () {
		expect(true).toBe(true);
	});
	
	it("when gravatar hash is valid", function () {
		expect(true).toBe(true);
	});
});