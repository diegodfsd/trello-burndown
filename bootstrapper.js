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
			defaultRoutes = [{ method: 'get', path: '/', respondWith : 'index' },
							 { method: 'get', path: '/:id', respondWith : 'show' },
							 { method: 'get', path: '/new', respondWith : 'new' },
							 { method: 'post', path: '/create', respondWith : 'create' },
							 { method: 'get', path: '/edit/:id', respondWith : 'edit' },
							 { method: 'put', path: '/:id', respondWith : 'update' },
							 { method: 'delete', path: '/:id', respondWith : 'destroy' }],
			currentRoutes,
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
		currentRoutes = _.findWhere(routes, { controller: resourceName });
		resources = currentRoutes? currentRoutes.routes : defaultRoutes.map(function(route){
			var relativePath = '/' + resourceName + route.path;
			
			return _.extend(route, { path: relativePath });
		});

		
		if(!!resources){
			resources.forEach(function(resource){
				app[resource.method](resource.path, controller[resource.respondWith]);
			});	
		}

		main.use(app);
	});
};