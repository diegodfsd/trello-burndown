var express = require('express'),
	app = express(),
	config = require('./app/config/configurations')()
	mongoose = require('mongoose');
	
	// map .renderFile to ".html" files
	app.engine('html', require('ejs').renderFile);
	
	// make ".html" the default and evict use extensions in render method
	app.set('view engine', 'html');
	
	// log
	// module.parent is a caller
	if (!module.parent) app.use(express.logger('dev'));

	// serve static files
	app.use(express.static(__dirname + '/public'));

	// session support
	app.use(express.cookieParser(config.cookieSecret));
	app.use(express.session());

	// parse request bodies (req.body)
	app.use(express.bodyParser());

	// support _method (PUT in forms etc)
	app.use(express.methodOverride());

	// start mongoose
	mongoose.connect(config.mongodbConnectionString);

	// load controllers
	require('./bootstrapper')(app);
	
	// attach lister to connected event
	mongoose.connection.once('connected', function() {
		console.log("Connected to mongodb");
	});
	

	// run
	if (!module.parent) {
	  app.listen(config.port);
	  console.log('Express server listening on port %d in %s mode', config.port, app.settings.env);
	}