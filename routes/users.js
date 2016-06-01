var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController');
var tokenController = require('../controllers/tokenController');
var jwt = require('jwt-simple');
var moment = require('moment');
var app = require('../app');
// localhost:3001/users/
router.get('/', function(req, res, next) {

	var paranoid = req.params.paranoid || false;

	controller.getAll(
		function(result) {
			res.json({"status":true,"result":result});
		},function(error) {
			res.status(500);
			res.json({"status":false,"result":error});
		}
	);
});


router.post('/login',function(req, res, next) {
	console.log(req.body);
	controller.authenticate(req.body,
		function(user){
			if(user) {
				console.log(user.username + " " + user.password);
				var expires = new Date().getTime() + (24 * 3600 * 1000);
				//jwtSecretToken

				console.log(expires);
				var accessToken = jwt.encode({
				  	iss: user.username,
				  	exp: expires
					}, 'secretcode' //app.get('jwtSecretToken')
				);



				var token = {
					username : user.username,
					tokenString : accessToken,
					expires : expires
				};
				tokenController.add(token,
					function(token){
						res.setHeader('x-access-token',token.tokenString);
						res.json({"status" : true , "result" : user});
					},
					function(error) {
						res.status(500);
						res.json({"status":false,"result":error, "message" : "Error while generating token"});
					}
				);
			} else {
				res.status(401);
				res.json({"status":false,"message":"Invalid username or password"});
			}
		},
		function(error){
			console.log("error");
			res.status(500);
			res.json({"status":false,"result":error, "message" : "Somthing went wrong"});
		}
	);
});

// localhost:3001/users/add
router.post('/add', function(req, res, next){

	controller.add(req.body,
		function(result) {
			res.json({"status":true,"result":result});
		},function(error) {
			res.status(500);
			res.json({"status":false,"result":error});
		}
	);
});

// localhost:3001/users/authenticate
router.get('/authenticate', function(req, res, next){

	controller.authenticate(req.body,
		function(result) {
			res.json({"status":true,"result":result});
		},function(error) {
			res.status(500);
			res.json({"status":false,"result":error});
		}
	);
});

// localhost:3001/users/update/:id
router.put('/update/:id', function(req,res,next){

	controller.update(req.params.id,req.body,
		function(result) {
			res.json({"status":true,"result":result});
		},function(error) {
			res.status(500);
			res.json({"status":false,"result":error});
		}
	);
});

// localhost:3001/users/delete/:id
router.delete('/delete/:id', function(req, res, next){

	console.log(req.params);

	controller.delete(req.params.id,
		function(result) {
			res.json({"status":true,"result":result});
		},function(error) {
			res.status(500);
			res.json({"status":false,"result":error});
		}
	);
});

module.exports = router;
