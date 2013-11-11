(function () {
	var config = require(__dirname + '../../config/configurations')(),
		rest = require('rest'),				  
		mime = require('rest/interceptor/mime'),
		client = rest.chain(mime);
	
	// GET: Get
	exports.list = function(req, res, next){
		var accessToken = req.user.accessToken,
			url = "#{0}/members/me/boards/?key=#{1}&token=#{2}".interpolate(config.urlAPI, config.applicationKey, accessToken);
		
		client({ path: url }).then(function (response) { 
			var boards = response.entity
						.filter( function onlyOpen( board ) {
							return !board.closed;
						} )
						.map( function convert( board ) {
							return { id: board.id, name: board.name, url: board.url };
						} );
		
			res.json({ boards });
		});
	};	
})();