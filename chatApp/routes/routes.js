module.exports = function(express, app, passaport, config){
	var router = express.Router();
	
	router.get('/', function(req, res){
		res.render('index', {title:'Welcome to ChatApp'});
	});
	
	router.get('/auth/facebook', passaport.authenticate('facebook'));
	
	router.get('/auth/facebook/callback', passaport.authenticate('facebook', {
		successRedirect:'/chatrooms',
		failureRedirect:'/'
	}));
	
	// Defining a middleware (a function)
	function securePages(req, res, next){
		if(req.isAuthenticated()){
			next();
		}
		else{
			res.redirect('/');
		}
	}
	
	router.get('/chatrooms', securePages, function(req, res, next){
		res.render('chatrooms', {title:'Chatrooms', user:req.user, config:config});
	});
	
	router.get('/logout', function(req, res, next){
		req.logout();
		res.redirect('/');
	});
	
	app.use('/', router);
}