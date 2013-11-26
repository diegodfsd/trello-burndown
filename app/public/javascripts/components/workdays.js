;(function ($, context) {	
	context.Workdays = function(inputStart, inputEnd, table) {
		this.$start = inputStart;
		this.$end = inputEnd;
		this.$tableContainer = table;
		this.$tbodyContainer = $("tbody", table);
	}
	
	Workdays.prototype.Init = function() {
		var self = this;

		this.$tableContainer.hide();
		this.$end.change(function(){
			build.call(self);
			self.$tableContainer.show();
		});
	};
	
	function build() {
		var day = (24*3600*1000),
			start = toDate( this.$start.val() ),
			end = toDate( this.$end.val() ),
			totalDays = parseInt( (end.getTime() - start.getTime()) /  day ),
			day = 0;
		
		this.$tbodyContainer.empty();

		for(;day <= totalDays;day++) {
			
			var $input = $("<input />")
						.attr("type", "checkbox")
						.attr("value", start.getTime() ),
				$td1 = $("<td />").html( start.toString('yyyy-MM-dd') ),
				$td2 = $("<td />").append( $input );
			
			this.$tbodyContainer.append( $("<tr />").append( $td1 ).append( $td2 ) );
			
			start.setDate(start.getDate() + 1);
		}
	}
	
	function toDate(value)
	{
		var values = value.split('/');
		return new Date(values[2], values[0]-1, values[1]);
	}
})(jQuery, window);