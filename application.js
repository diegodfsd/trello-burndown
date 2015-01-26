var express = require('express'),
	app = express(),
	config = require('./app/config/configurations')(),
	mongoose = require('mongoose'),
	exphbs  = require('express3-handlebars'),
	sass = require('node-sass'),
	path = require('path'),
	flash = require('connect-flash'),
	helpers = require('./app/helpers/dynamicHelpers');
	
	// set handlebar as view engine
	app.engine('.hbs', exphbs({ defaultLayout: '../../app/views/layouts/layout', extname: '.hbs' }));
	app.set('view engine', '.hbs');

	// log
	// module.parent is a caller
	if (!module.parent) app.use(express.logger('dev'));

	// set log request
	//app.use(express.logger());
	
	// set sass middleware
	app.use(sass.middleware({
	     src: __dirname + '/app/public/sass',
	     dest: __dirname + '/app/public', 
	     debug: true
	  }));
	  
  	// serve static files
  	app.use(express.static(__dirname + '/app/public'));

	// session support
	app.use(express.cookieParser(config.cookieSecret));
	app.use(express.session({secret: config.sessionSecret, cookie: { maxAge: 15 * 60 * 1000 }}));
	
	
	// set support to flash message
	app.use(flash());

	// parse request bodies (req.body)
	app.use(express.bodyParser());

	// support _method (PUT in forms etc)
	app.use(express.methodOverride());

	// set error handler
	app.configure('development', function(){
	  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
	  app.use(express.errorHandler());
	});
	
	// register all dynamic helpers
	helpers.registerAll(app);
		
	// load controllers
	require('./bootstrapper')(app);

	// start mongoose
	mongoose.connect(config.mongodbConnectionString);
	
	// attach lister to connected event
	mongoose.connection.once('connected', function() {
		console.log("Connected to mongodb");
	});	

	// run
	if (!module.parent) {
	  app.listen(config.port);
	  console.log('Express server listening on port %d in %s mode', config.port, app.settings.env);
	}