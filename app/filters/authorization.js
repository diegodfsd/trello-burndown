(function () {
	var config = require(__dirname + '../../config/configurations')(),
		User = require(__dirname + '../../models/user');

	exports.register = function(app)
	{
			app.all('*', function (req, res, next) {
				// ignored path
				if(!!req.path.match(/(sessions|public)/)){
					return next();
				}

				var username = req.signedCookies[config.cookieAuthName];

				// authenticated
				if(!!username){
					User.findOne({ username: username }, function (err, usr) {
						if (err) return next(err);

						if(!!usr) { req.user = usr; }
						
						return next();
					});
				} else {
					// not authenticated
					res.redirect('/sessions/signin');					
				}
			});	
		}
})();

