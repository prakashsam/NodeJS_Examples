var express = require('express'),
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	config = require('./config/config.js'),
	connectMongo = require('connect-mongo')(session),
	mongoose = require('mongoose').connect(config.dbURL),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy; // incorporate the funcionalities of authentication by facebook
	
	
// Tell to express where to find all the view files
app.set('views', path.join(__dirname, 'views'));
// Express by default use the jade engine, in this case we want to use html engine, so we need hogan-express
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
// command to make express find all the static images and files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
var env = process.env.NODE_ENV || 'development';
if(env === 'development'){
	// dev specific settings
	app.use(session({
		secret:config.sessionSecret,
		resave: true,
		saveUninitialized: true
	}));
}
else{
	// production specific settings
	// to make my machine work in production mode, on the terminal I put the command:
	// set NODE_ENV=production
	// The mode printted below will show production
	app.use(session({
		secret:config.sessionSecret,
		store:new connectMongo({
			//url:config.dbURL,
			mongoose_connection:mongoose.connections[0],
			stringify:true
		}),// store session in a new instance of connect mongo
		resave: true,
		saveUninitialized: true
	}));
	// when you try to use session to store variables, the application will show a warning
	// because your machine is not made for production mode, so you need a db, like mongodb
	// to do this work.
}

// The cookie options can be found here https://github.com/expressjs/session
app.use(session({
	secret:'catscanfly',
	resave: true,
	saveUninitialized: true
}));

require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);

require('./routes/routes.js')(express, app);

app.listen(3000, function(){
	console.log("Chat app is running on 3000.");
	console.log('Mode: ', env);
});