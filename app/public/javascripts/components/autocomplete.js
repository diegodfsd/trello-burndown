;(function ($, context) {
	context.AutoComplete = function(inputtext) {
		this.$inputtext = inputtext;
		this.defaultOptions = {
			placeholder: 'Search',
			multiple: true,
			dataText: 'name',
			dataValue: 'id'
		}
	}
	
	AutoComplete.prototype.Init = function(options) {		
		options = $.extend({}, this.defaultOptions, options);

		$(this.$inputtext).select2({
					allowClear: true,
		            placeholder: options.placeholder || this.$inputtext.data('placeholder'),
		            minimumInputLength: 3,
					multiple: options.multiple,
		            ajax: {
						contentType: "application/json",
		                url: options.source || this.$inputtext.data('source'),
		                dataType: 'json',
		                data: function (term, page) {
		                    return {
		                        term: term,
		                        page_limit: 10,
		                    };
		                },
		                results: function (data, page) {
							if(!!options.propertyName)
								return {results: data[options.propertyName]};
		                    return {results: data};
		                }
		            },
					formatResult: function (item){
						if (options.template != null)
							return $(options.template).render(item);

		                return $('<span>').html(item[options.dataText]);
		            },
		            formatSelection: function (item) {
		                return item[options.dataText];
		            },
		            id: function (item) {
		                return item[options.dataValue];
		            },
					dropdownCssClass: "bigdrop"
		        });
	}
})(jQuery, window);
