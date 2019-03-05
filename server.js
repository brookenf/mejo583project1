// server.js
// where your node app starts

// init project
var express = require('express');
var fs = require("fs");
var app = express();
var characters10;

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

// marvel.characters.findByName('spider-man')
//   .then(function(res) {
//     console.log('Found character ID', res.data[0].id);
//     // return marvel.characters.comics(res.data[0].id);
//     return new Promise(function(resolve, reject) { 
//       fs.writeFile("./spider-man.json", JSON.stringify(res.data[0], null, 2), (err) => {
//         if (err) reject(err);
//         else resolve();
//         console.log('Spidey has been made');
//       });
//     });           
//   })
//   .fail(console.error)
//   .done();

// marvel.characters.findAll(100)
//   .then(function(res) {
//     return new Promise(function(resolve, reject) { 
//       fs.writeFile("./characters.json", JSON.stringify(res.data, null, 2), (err) => {
//         if (err) reject(err);
//         else resolve();
//         console.log('Charaters have been made');
//       });
//     });           
//   })
//   .fail(console.error)
//   .done();

//-------------------------------------------------------------//
//------------------------- Get JSON  -------------------------//
//-------------------------------------------------------------//

app.get('/characters', function(request, response) {
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

