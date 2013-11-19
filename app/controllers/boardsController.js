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
		
			res.json({ boards: boards });
		});
	};	
})();

//https://api.trello.com/1/search?query=portal&key=ff7de69eeeb64f13b5265d9d11cd0db9&token=32f799f4686460ec5bf98ff0540fb9addeffbc0e5b76d4d5571b643d7ac82522

//http://jsfiddle.net/LUsMb/16/