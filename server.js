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

/* 
  I've commented these out because I've gotten the data and pushed them into a json file which I'm pulling from (see the GET JSON part below). 
  
  I've also commented them out so they don't continuously run and use up my 3000 per day limit 

*/

/*

marvel.characters.findByName('spider-man')
  .then(function(res) {
    console.log('Found character ID', res.data[0].id);
    // return marvel.characters.comics(res.data[0].id);
    return new Promise(function(resolve, reject) { 
      fs.writeFile("./spider-man.json", JSON.stringify(res.data[0], null, 2), (err) => {
        if (err) reject(err);
        else resolve();
        console.log('Spidey has been made');
      });
    });           
  })
  .fail(console.error)
  .done(); 

*/

/* 

marvel.characters.findAll(100)
  .then(function(res) {
    return new Promise(function(resolve, reject) { 
      fs.writeFile("./characters.json", JSON.stringify(res.data, null, 2), (err) => {
        if (err) reject(err);
        else resolve();
        console.log('Charaters have been made');
      });
    });           
  })
  .fail(console.error)
  .done();
  
*/


/* 

marvel.creators.findByName('Stan', '', 'Lee')
  .then(function(res) {
    console.log(res.data);
  
    return new Promise(function(resolve, reject) {
      fs.writeFile("./stan-lee.json", JSON.stringify(res.data, null, 2), (err) => { 
        if (err) reject (err);
        else resolve();
        console.log('Stan Lee JSON has been made');      
      });
    });
  
  })
  .fail(console.error)
  .done();
  
*/

//-------------------------------------------------------------//
//------------------------- Get JSON  -------------------------//
//-------------------------------------------------------------//

// Get the general Characters Data
app.get('/characters', function(request, response) {
  response.sendFile(__dirname + '/characters.json');
});

// Get the Spider-Man data
app.get('/spider-man', function(request, response) {
  response.sendFile(__dirname + 'spider-man.json');
});

app.get('/creators', function(request, response) {
  response.sendFile(__dirname + 'creators.json');
  response.sendFile(__dirname + 'creators2.json');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

