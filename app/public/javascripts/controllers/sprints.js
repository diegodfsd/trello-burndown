;(function ($, app) {
	var sprints;
	sprints = app.Controllers.sprints = {};
	
	sprints.new = function() {
		new AutoComplete($("#board")).Init({ minInputLength: 0, 
											 source: '/boards',
											 multiple: false,
											 propertyName: 'boards'
											});
									
		$(".datepicker").datepicker();

		$("form").submit(function(event){
			$("#title").val( $("#board").select2('data').name );
		});
		
		$("#board").on("change", function(){
					var url = "/boards/" + $("#board").select2('data').id + "/lists";

					new AutoComplete($("#done-list")).Init({ minInputLength: 0, 
														 	 source: url,
														 	 multiple: false,
														 	 propertyName: 'lists'
														   });
					$("#done-list-container").show();
				}).on("select2-removed", function(){
						$("#done-list").select2('destroy');
						$("#done-list-container").hide();				
					  });
	}
})(jQuery, App);