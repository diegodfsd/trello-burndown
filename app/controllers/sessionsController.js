require(__dirname + '../../helpers/stringExtensions');
	
(function () {
	
	var self = this,
		tokenSecret,
		http = require('http'),
		url = require('url'),
		crypto = require('crypto'),
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
			
			self.tokenSecret = tokenSecret;
			
		    res.writeHead(302, { 'Location':  trelloUrl });
		    res.end();
		});
	};	
	
	exports.callback = function(req, res, next){
		var query = url.parse(req.url, true).query,
			token = query.oauth_token,
		    verifier = query.oauth_verifier,
			hash;

			oauth.getOAuthAccessToken(token, self.tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
				//examplo para pergar dados do usuário logado
				//https://api.trello.com/1/members/me?key=appkey&token=accesstoken
				//accessToken = 79e27a9932487d02d80c9b1b645c6dc86cc3d3dd4d7146b42680764d436c48c8

				//presico persistir o accesstoken e o accesstokensecret associado ao usuario, caso nao exista eu crio e mantenho como chave o hash que é o username do trello e deste modo eu tenho certeza de que se ele limpar os cookies e voltar eu vou saber que ele ja estve por aqui
				hash = crypto.createHash("md5").update("diegodias").digest("hex");
				//res.cookie(config.cookieAuthName, hash, { secure: true });
			});
	};
	
})();