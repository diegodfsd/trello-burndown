var exec = require('child_process').exec,
	command = ["./node_modules/jasmine-node/bin/jasmine-node", 
			   process.argv[2], 
			   "--verbose --color"].join(' ');


exec(command, function(err, stdout, strerr){
	console.log(stdout);
});