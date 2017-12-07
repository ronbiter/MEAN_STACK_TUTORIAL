// -- app dependencies -- //
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// -- end app dependencies -- //

// ---- models ---- //
var User = require('./app/models/user');
// -- end models -- //

// -- app variables -- //
var app = express();
var port = process.env.PORT || 8080;
// -- end app variables -- //

// -- apps using -- //
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// -- end apps using -- //

// -- DB connection -- //
mongoose.connect('mongodb://localhost:27017/MEANtutorial', function(err) {
	if (err) {
		console.log('Not connected to the DB: ' + err);
	} else {
		console.log('Succesfully connected to MongoDB');
	}
});
// -- end DB connection -- //

// -- API -- //

// http://localhost:8080/users
app.post('/users', function(req, res) {
	var user = new User();
	console.log(req.body);
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if (req.body.username == null || req.body.username == '') {
		res.send('Please enter Username.');
	}
	else if (req.body.email == null || req.body.email == '') {
		res.send('Please enter Email.');
	}
	else if (req.body.password == null || req.body.password == '') {
		res.send('Please enter Password.');
	}
	else {
		user.save(function(error, user) {
		if (error) {
			res.send('Username/Email already exists.');
		}
		else {
			res.send('user created!');
		}
	});
	}
});
// -- end API -- //


app.listen(port, function() {
	console.log('running the server. on port ' + port);
});