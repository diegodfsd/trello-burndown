module.exports = function(environment){
	var environments = {
		development: {
			applicationName: "trello burndown development",
			//expirationToken: "1hour|1day|30days|never",
			expirationToken: "1hour",
			port: 3000,
			cookieSecret:'',
			sessionSecret:'pass1234',
			applicationKey: 'trello_App_Key', //https://trello.com/1/appKey/generate
			applicationSecret: 'trello_App_secret',
			cookieAuthName: 'cookie_name',
			mongodbConnectionString: 'mongodb://localhost/development'
		}
	};

	return environments[environment || 'development'];
};