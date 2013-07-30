module.exports = (function () {

	String.prototype.interpolate = function(){
		var matcher = /\#\{([\w-_\.]+)\}/g,
            args = Array.prototype.slice.call(arguments);
		
		return this.replace(matcher, function (str, m) {
	                    return args[m];
	                });
	};
	
})();