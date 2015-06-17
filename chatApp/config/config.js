// In this case, we have two types of processes, development and production
// When the this code is running local, in a user machine, the process will be
// delopment (the database that I will use is mongodb installed in my PC), 
// otherwise when it is running in heroku, for instance, the process will be 
// production (I will use mongolab in this case)
module.exports = require('./' + (process.env.NODE_ENV || 'development') + '.json');

// when I deploy to heroku, I will use this url
// "dbURL":"mongodb://serverUser:rootapp@ds047602.mongolab.com:47602/services",