require(__dirname + '../../support/spec_helper');

var User = require(__dirname + '../../../app/models/user'),
	mongoose = require("mongoose");

describe("gravatar url", function () {
	it("when gravatar hash is null", function () {
		var usr = new User();
		expect(usr.avatar).toBe("http://www.gravatar.com/avatar/?s=45&d=mm");
	});
	
	it("when gravatar hash is valid", function () {
		var usr = new User({ gravatarHash: "f9879d71855b5ff21e4963273a886bfc" });
		expect(usr.avatar).toMatch(/http:\/\/www.gravatar.com\/avatar\/([a-f0-9]{32})\?s\=45\&d\=mm/);
	});
});