(function () {
	var self = this,
		config = require(__dirname + '../../config/configurations')();


	// GET: Index
	exports.index = function(req, res, next){
		res.render('index', { message: 'say hello to express mvc', user: req.user });
	};	
})();