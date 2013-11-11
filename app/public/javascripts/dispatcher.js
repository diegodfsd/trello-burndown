;(function (controllers, $) {
	$(document).ready(function(){
	    var currentPage = $("meta[name='current_page']").attr('content'),
			parameters = (currentPage || "").split('#'),
			controllerName = parameters[0],
	        actionName = parameters[1];

	    if (controllerName && actionName) {
			controllers[controllerName][actionName]();
	    }
	});
})(App.Controllers, jQuery);