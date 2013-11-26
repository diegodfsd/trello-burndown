(function () {
	var self = this,
		config = require(__dirname + '../../config/configurations')(),
		Sprint = require(__dirname + '../../models/sprint')
		rest = require('rest'),
		mime = require('rest/interceptor/mime'),
		client = rest.chain(mime);
	
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
	exports.index = function(req, res, next) {

		client({ path: "/boards" }).then(function (response) { 
			var boards = response.entity
						.map( function ( board ) {
							return { id: board.id };
						} );
		
			Sprint
				.find({ active: true, board: { $in: boards } })
				.sort('-startAt')
				.exec(function (err, sprints) {
					if (err) return next(err);

					res.render('index', { sprints: sprints });			
				});	
		});		
	};
	
	// GET: New
	exports.new = function(req, res, next){
		res.render('new');
	}	
	
	// POST: create
	exports.create = function(req, res, next){
		var attributes = req.body.sprint;
		
		sprint = new Sprint({ name: attributes.name,
			 				  createdBy: req.user._id,
						  	  board: attributes.board,
						      doneListName: attributes.done-list,
						  	  workDays: attributes.days });
		
		sprint.save(function(err){
			if (err) {
				return next(err);	
			}
			req.flash('success', 'sprint save successfully');
		});
		
		res.redirect('/dashboard');
	}
})();