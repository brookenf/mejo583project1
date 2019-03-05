// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


//-------------------------------------------------------------//
//----------------------- AUTHORIZATION -----------------------//
//-------------------------------------------------------------//

//Initialize Marvel wrapper
var api = require('marvel-api');

var marvel = api.createClient({
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey
});

//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//
app.get('/characters', function (request, response) {
  marvel.characters.findAll(10)
    .then((data) => {
    characters10.push(data.data);
    response.send(data.data);
    
    }, function(err) {
      console.error(err);
    });    
});

// write to a file 
    var fs = require("fs");
    var characters10 = [];
    fs.writeFile("./charaters.json", JSON.stringify(characters10), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

