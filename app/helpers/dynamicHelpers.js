(function () {
	exports.registerAll = function(app)
	{
		app.use(function(req, res, next) {
		    res.locals.flash = function(name) { return req.flash(name); };
		    next();
		});
	}
})();