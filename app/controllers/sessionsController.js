(function () {
	var self = this;
	
		
	// GET: Index
	exports.signin = function(req, res, next){
		res.render('signin', { message: 'connect to trello' });
	};	
})();