module.exports = function(express, app){
	var router = express.Router();
	
	router.get('/', function(req, res){
		res.render('index', {title:'Welcome to ChatApp'});
	});
	
	router.get('/chatrooms', function(req, res){
		res.render('chatrooms', {title:'Chatrooms'});
	});
	
	router.get('/setcolor', function(req, res){
		req.session.favColor = "Red";
		res.send('Setting favourite color!');
	});
	router.get('/getcolor', function(req, res){
		// If favColor be setted in the function above, you will not get Not found, instead will get the color requested
		console.log("Session: ", req.session);
		res.send('Favourite color: ' + (req.session.favColor===undefined?"Not found":req.session.favColor));
	});
	
	app.use('/', router);
}