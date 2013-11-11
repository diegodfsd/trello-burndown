(function () {
	exports.registerAll = function(app)
	{
		app.use(function(req, res, next){
			console.log('dynamic helper');

			res.locals.current_user = req.user;
			res.locals.info = 'information';//req.flash('info');
			next();
		});
	}
})();