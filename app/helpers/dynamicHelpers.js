(function () {
	exports.registerAll = function(app)
	{
		app.use(function(req, res, next) {
			console.log( JSON.stringify(req.app.routes) );
		    res.locals.flash = function(name) { return req.flash(name); };
		    next();
		});
	}
})();