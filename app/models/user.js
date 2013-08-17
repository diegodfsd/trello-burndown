require(__dirname + '../../helpers/stringExtensions');

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	userSchema,
	User;
	
userSchema = new Schema({
	username:  { type: String, index: true, lowercase: true, trim: true },
	name: [String],
	accessToken: [String],
	accessTokenSecret: [String],
	createdAt: { type: Date, default: Date.now },
	email: [String],
	gravatarHash: [String]
});

userSchema.virtual('avatar').get(function () {
	return "http://www.gravatar.com/avatar/" + (this.gravatarHash || "") + "?s=45&d=mm";
})

User = mongoose.model('user', userSchema);

module.exports = User;