$(document).ready(function(){
	var paths = location.pathname.split('/').filter(Boolean),
		path = [ paths[0], paths[1] || 'index' ].join("#");

	App.init( path );
});