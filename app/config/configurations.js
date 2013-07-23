module.exports = function(environment){
	var environments = {
		development: {
			cookieSecret: '356a07b766feed481fc32b0a5ed5954f8d629abf8e6000851953c28864eb9b215108ae4123d47de69c023cb43396c98b98d35c9e0af31a21535c4e3fe9e27ace',
			port: 3000
		}
	};

	return environments[environment || 'development'];
};