;(function($, context){
	var App = context.App = {};
	App.Controllers = {};

	// Initialize App Javascript
	// required to definy global settings
	App.init = function( path )
	{
		generateCurrentPath( path );
	};
	
})(jQuery, window);

// Utils
function generateCurrentPath( path ) {
	$('head').append($('<meta />').attr('name', 'current_page').attr('content', path));
}