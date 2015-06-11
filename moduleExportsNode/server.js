var express = require('express');
var app = express();

// created by me
var router = require('./router');

app.get('/', router.index);

app.listen(3000, function(){
    console.log("Server on!");
});