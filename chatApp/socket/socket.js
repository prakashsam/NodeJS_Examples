module.exports = function(io){
	var chatrooms = io.of('/roomlist').on('connection', function(socket){
		console.log("connection is established on the server!");
	});
}