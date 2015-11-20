var express = require('express'),
	mongoStore	=	require('connect-mongo')(express);
	var app express();
	app.use('port' , process.env.PORT || 8000);
	app.use(bodyParse.json())
	var server = http.createServer(app);
	server.listen(app.get('port'), function() {
	})