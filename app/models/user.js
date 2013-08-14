require(__dirname + '../../helpers/stringExtensions');

var mongoose = require('mongoose'),
	userSchema,
	User;
	
userSchema = new mongoose.Schema({
	username:  { type: String, index: true },
	name: String,
	accessToken: String,
	accessTokenSecret: String,
	createAt: { type: Date, default: Date.now },
	email: String,
	gravatarHash: String
});

userSchema.virtual('avatar').get(function () {
	return "http://www.gravatar.com/avatar/" + (this.gravatarHash || "") + "?s=45&d=mm";
})

User = mongoose.model('user', userSchema);

module.exports = User;