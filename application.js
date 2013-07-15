var express = require('express'),
	app = express();
	
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
	app.use(express.cookieParser('some secret here'));
	app.use(express.session());

	// parse request bodies (req.body)
	app.use(express.bodyParser());

	// support _method (PUT in forms etc)
	app.use(express.methodOverride());

	// load controllers
	require('./bootstrapper')(app);

	// run
	if (!module.parent) {
	  app.listen(3000);
	  console.log('\n  listening on port 3000\n');
	}