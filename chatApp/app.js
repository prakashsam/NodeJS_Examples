var express = require('express'),
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	session = require('express-session');
	//mongodb://serverUser:rootapp@ds047602.mongolab.com:47602/services
// Tell to express where to find all the view files
app.set('views', path.join(__dirname, 'views'));
// Express by default use the jade engine, in this case we want to use html engine, so we need hogan-express
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
// command to make express find all the static images and files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// The cookie options can be found here https://github.com/expressjs/session
app.use(session({
	secret:'catscanfly',
	resave: true,
	saveUninitialized: true
}));

require('./routes/routes.js')(express, app);

app.listen(3000, function(){
	console.log("Chat app is running on 3000.");
});