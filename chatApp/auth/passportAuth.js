module.exports = function(passport, FacebookStrategy, config, mongoose){
	
	var chatUser = new mongoose.Schema({
		profileID:String, // facebookID
		fullname:String,
		profilePic:String
	});
	
	var userModel = mongoose.model('chatUser', chatUser);
	
	passport.serializeUser(function(user, done){
		done(null, user.id);
	}); // when the fb autorizes the data is stored on a session, especifically the user.id
	// not from the fb, but the mongodb id created
	// store a particular use in the session
	
	passport.deserializeUser(function(id, done){
		userModel.findById(id, function(err, user){
			done(err, user);
		});
	}); // find the user stored in the database and returns back
	
	passport.use(new FacebookStrategy({
		clientID:config.fb.appID,
		clientSecret:config.fb.appSecret,
		callbackURL:config.fb.callbackURL,
		profileFields:['id','displayName', 'photos'] // this field is what the facebook will return to our request
	}, function(accessToken, refreshToken, profile, done){
		// Check if the user exists in our MongoDB DB
		// if not , create one and return the profile
		// if the user exists, simply return the profile
		userModel.findOne({'profileID':profile.id}, function(err, result){
			if(result){
				done(null, result);
			}
			else{
				// create a new user in mongodb account
				var newChatUser = new userModel({
					profileID:profile.id,
					fullname:profile.displayName,
					profilePic:profile.photos[0].value || '' // facebook return a photos array
				});
				
				newChatUser.save(function(err){
					done(null, newChatUser);
				});
			}
		});
	}));
}