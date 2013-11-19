module.exports = (function () {

	String.prototype.interpolate = function() {
		var matcher = /\#\{([\w-_\.]+)\}/g,
            args = Array.prototype.slice.call(arguments);
		return this.replace(matcher, function (str, m) {
	                    return args[m];
	                });
	};
	
	String.prototype.coerceExpirationCookie = function() {
		if( !this ) {
			throw new Error('invalid expiration token');
		}
		
		if( this === '1hour' )
			return 60 * 60 * 1000;
		if( this === '1day' )
			return 24 * 60 * 60 * 1000;
		if( this === '30days' )
			return 30 * 24 * 60 * 60 * 1000;

		return 180 * 24 * 60 * 60 * 1000; // 6 months
	}
})();