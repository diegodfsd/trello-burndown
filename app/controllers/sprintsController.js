(function () {
	var self = this,
		config = require(__dirname + '../../config/configurations')(),
		Sprint = require(__dirname + '../../models/sprint');
	
	// set before filter
	exports.before_filters = function () {
		return [{
			path: '/',
			action: function(req, res, next){
				//is authenticated
				if(!!req.signedCookies[config.cookieAuthName]){
					return next();
				}

				//is not authenticated
				res.redirect('/sessions/signin');
			}			
		}];		
	}
	
	// GET: Index
	exports.index = function(req, res, next){
		Sprint
			.find({ active: true })
			.sort('-startAt')
			.exec(function (err, sprints) {
				if (err) return next(err);

				res.render('index', { sprints: sprints });			
			});
	};	
})();