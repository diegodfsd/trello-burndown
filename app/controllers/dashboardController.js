(function () {
	var self = this,
		config = require(__dirname + '../../config/configurations')();
	
	// set before filter
	exports.before_filters = function () {
		return [{
			path: '/',
			action: function(req, res, next){
				//is authenticated
				if(!!req.signedCookies[config.cookieAuthName]){
					next();
				}

				//is not authenticated
				res.redirect('/sessions/signin');
			}			
		}];		
	}
	
	// GET: Index
	exports.index = function(req, res, next){
		res.render('index', { message: 'say hello to express mvc' });
	};	
})();