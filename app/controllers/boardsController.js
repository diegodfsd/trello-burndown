(function () {
	var config = require(__dirname + '../../config/configurations')(),
		rest = require('rest'),				  
		mime = require('rest/interceptor/mime'),
		client = rest.chain(mime);
	
	// GET: Get
	exports.all = function(req, res, next){
		var accessToken = req.user.accessToken,
			url = "#{0}/members/me/boards/?key=#{1}&token=#{2}&lists=all&fields=name,closed,url".interpolate(config.urlAPI, config.applicationKey, accessToken);

		client({ path: url }).then(function (response) { 
			var boards = response.entity
						.filter( function onlyOpen( board ) {
							return !board.closed;
						} )
						.map( function convert( board ) {
							return { id: board.id, name: board.name, url: board.url, lists: board.lists };
						} );
		
			res.json({ boards: boards });
		});
	};
	
	exports.lists = function(req, res, next){
		console.log( req.params.id );
		var accessToken = req.user.accessToken,
			url = "#{0}/boards/#{1}/lists/?key=#{2}&token=#{3}".interpolate(config.urlAPI, req.params.id, config.applicationKey, accessToken);

		client({ path: url }).then(function (response) { 
			var lists = response.entity
						.map( function convert( list ) {
							return { id: list.id, name: list.name };
						} );

			res.json({ lists: lists });
		});		
	}	
})();

//http://jsfiddle.net/LUsMb/16/