(function () {
	var self = this;
	
	// set before filter
	exports.before_filters = function () {
		return [{
			path: '/',
			action: function(req, res, next){
				console.log('filter');
				next();
			}			
		}];		
	}
	
	// GET: Index
	exports.index = function(req, res, next){
		res.render('index', { message: 'say hello to express mvc' });
	};	
})();