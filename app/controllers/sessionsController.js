require(__dirname + '../../helpers/stringExtensions');
	
(function () {
	
	var self = this,
		http = require('http'),
		url = require('url'),
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
						  "HMAC-SHA1");
		
	// GET: Index
	exports.signin = function(req, res, next){		
		oauth.getOAuthRequestToken(function(error, token, tokenSecret, results) {
			var trelloUrl = "#{0}?oauth_token=#{1}&name=#{2}&expiration=#{3}".interpolate(authorizeURL, token, config.applicationName, config.expirationToken);
			
		    res.writeHead(302, { 'Location':  trelloUrl });
		    res.end();
		});
	};	
	
	exports.callback = function(req, res, next){
		console.log('callback');
		var query = url.parse(req.url, true).query,
			token = query.oauth_token,
		    tokenSecret = "",
		    verifier = query.oauth_verifier;
	};
	
})();