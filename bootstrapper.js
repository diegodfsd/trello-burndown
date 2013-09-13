var express = require('express'),
	fs = require('fs'),
	_ = require('underscore');

module.exports = function(main){
	// load routes file
	var routes = fs.readFileSync(__dirname + '/app/config/routes.json', "utf8");
	routes = JSON.parse(routes);
	
	fs.readdirSync(__dirname + '/app/controllers').filter(function(name){
		return ~name.indexOf('Controller');
	}).forEach(function(name){
		var controller = require('./app/controllers/' + name),
			app = express(),
			resourceName = name.replace('Controller.js', ''),
			resources,
			path;
		
		// set view path
		app.set('views', __dirname + '/app/views/' + resourceName);
			
		// map before filter	
		if(!!controller.before_filters){
			var filters = controller.before_filters();
			
			filters.forEach(function (filter) {
				app.all(filter.path,  filter.action);
			});
		}
		
		// set routes
		resources = _.findWhere(routes, { controller: resourceName }).routes;
		
		if(!!resources){
			resources.forEach(function(resource){
				app[resource.method](resource.path, controller[resource.action]);
			});	
		}

		main.use(app);
	});
};