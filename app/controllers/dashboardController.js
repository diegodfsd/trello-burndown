(function () {
	var self = this,
		config = require(__dirname + '../../config/configurations')();


	// GET: Index
	exports.index = function(req, res, next){
		req.flash('info', 'Hello there!');
		res.render('index', { message: 'say hello to express mvc' });
	};	
})();