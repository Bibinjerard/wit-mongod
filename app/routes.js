var jwt = require('jsonwebtoken');  											
var db = require('../server/schema');

module.exports = {
	register : function (req, res) {

		var username = req.body.username || '';
		var password = req.body.password || '';
		var email = req.body.email || '';
		var passwordConfirmation = req.body.passwordConfirmation || '';

		if (username == '' || password == '' || password != passwordConfirmation) {
			return res.status(400).send("Registration error");
		}

		else {

			UserModel.findOne({username: req.body.username}, function (err, user) {
				
				if (err) {
					console.log(err);
					res.status(401).send("error finding username in DataBase");
				}

				else if(user) {
					res.status(409).send("username already exists");
				}

				else if (user == undefined) {
				
					var newUser = new UserModel( {
						username : req.body.username,
						password : req.body.password,
						is_admin : true,
						email : req.body.email
					})

					newUser.save(function(err) {
						if (err) {
							console.log(err);
							res.status(500).send("Error: problem saving user to Database");
						}
						else {
							return res.status(200).send("New user saved to Database");
						}
					});	
				}

			})
		};		
	},


	login : function (req, res) {
	  	var username = req.body.username || '';
		var password = req.body.password || '';
		
		if (username == '' || password == '') { 
			return res.status(401).send("username or password fields are empty"); 
		}
		else {

			db.UserModel.findOne({username: req.body.username}, function (err, user) {
				
				if (err) {
					console.log(err);
					return res.status(401).end();
				}

				if (user == undefined) {
					return res.status(401).send("User undefined");
				}
				
				user.comparePassword(req.body.password, function(err, isMatch) {
					if (!isMatch) {					
						console.log("Attempt failed to login with " + user.username);
						return res.status(401).send("Password does not match");
		            }

		           	var userProfile = {
						username: user.username,
						admin: user.is_admin,
						created: user.created,
						email: user.email
					};
					res.json({ token: token });
				});
			});
		};

	},
	logout : function(req, res) {
		res.status(200).end();
	},
	
	getAdmin : function (req, res) {
	  console.log('user ' + req.username + ' is calling /admin');
	  console.info("req token=" +JSON.stringify(req.headers));
	  res.send(req.username);
	}

};