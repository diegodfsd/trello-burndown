require(__dirname + '../../extensions/stringExtensions');
	
(function () {
	
	var self = this,
		tokenSecret,
		http = require('http'),
		url = require('url'),
		rest = require('rest'),				  
		mime = require('rest/interceptor/mime'),
		OAuth = require('oauth').OAuth,
		config = require(__dirname + '../../config/configurations')(),
		requestURL = "https://trello.com/1/OAuthGetRequestToken"
		accessURL = "https://trello.com/1/OAuthGetAccessToken"
		authorizeURL = "https://trello.com/1/OAuthAuthorizeToken",
		oauth = new OAuth(requestURL, 
						  accessURL, 
						  config.applicationKey, 
						  config.applicationSecret, 
						  "1.0", 
						  "http://localhost:3000/sessions/callback", 
						  "HMAC-SHA1"),
		User = require(__dirname + '../../models/user');
		
		
	// GET: signin
	exports.signin = function(req, res, next){
		oauth.getOAuthRequestToken(function(error, token, tokenSecret, results) {
			var trelloUrl = "#{0}?oauth_token=#{1}&name=#{2}&expiration=#{3}".interpolate(authorizeURL, token, config.applicationName, config.expirationToken);
			
			self.tokenSecret = tokenSecret;
			
		    res.writeHead(302, { 'Location':  trelloUrl });
		    res.end();
		});
	};	
	
	exports.callback = function(req, res, next){
		var query = url.parse(req.url, true).query,
			token = query.oauth_token,
		    verifier = query.oauth_verifier,
			client = rest.chain(mime),
			user;

			oauth.getOAuthAccessToken(token, self.tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
				var url = "#{0}/members/me/?key=#{1}&token=#{2}".interpolate(config.urlAPI, config.applicationKey, accessToken);

				client({ path: url }).then(function (response) {
					var entity = response.entity;
					
					User.findOne({ username: entity.username }, function (err, usr) {
						if (err) return next(err);

						user = usr;
						if(!user)
						{
							user = new User({ username: entity.username, 
											  name: entity.fullName, 
											  accessToken: accessToken, 
											  accessTokenSecret: accessTokenSecret, 
											  email: entity.email, 
											  gravatarHash: entity.gravatarHash });

	  						user.save(function (err) {
	  							if (err) return next(err);
	  						});
						} else {
							User.update({ username: entity.username }, 
										{ $set: { accessToken: accessToken, accessTokenSecret: accessTokenSecret }}, 
										function change(err, numAffected) { });
						}

						var expiration = config.expirationToken.coerceExpirationCookie();
						res.cookie(config.cookieAuthName, user.username, { maxAge: expiration, httpOnly: true });

						res.redirect('/');
					});
				});
			});
	};	
})();