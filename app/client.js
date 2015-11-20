var express 	= require("express");
var bodyParser	=	require("body-parser");
var morgan 		= require(""morgan");
var mongoose	= require("mongoose");
var jwt 		= require("jsonwebtoken");
var app			= express();

var port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(express.static("./app"));

app.get("/", function(req, res){
		res.sendfile("./app/index.html");
		
	});
app.lesten(port, function () {
		console.log("Server listening port" + port);
		});		
