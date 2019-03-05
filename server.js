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

// Spider-Man data
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


// Marvel Characters data
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

// Creators
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

/*
  marvel.creators.findByName('Jason', '', 'Aaron')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./jason-aaron.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('Jason Aaron JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('Steve', '', 'Ditko')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./steve-ditko.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('Steve Ditko JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('Jack', '', 'Kirby')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./jack-kirby.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('Jack Kirby JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('Larry', '', 'Lieber')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./larry-lieber.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('Larry Lieber JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('Joe', '', 'Simon')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./joe-simon.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('Joe Simon JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('David', '', 'Michelinie')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./david-michelinie.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('David Michelinie JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('John', '', 'Byrne')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./john-byrne.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('John Byrne JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('Don', '', 'Rico')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./don-rico.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('Don Rico JSON has been made');      
        });
      });

    })
    .fail(console.error)
    .done();
*/

/*
  marvel.creators.findByName('Don', '', 'Heck')
    .then(function(res) {

      return new Promise(function(resolve, reject) {
        fs.writeFile("./don-heck.json", JSON.stringify(res.data, null, 2), (err) => { 
          if (err) reject (err);
          else resolve();
          console.log('Don Heck JSON has been made');      
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
  response.sendFile(__dirname + '/spider-man.json');
});

// app.get('/creators', function(request, response) {
//   response.sendFile(__dirname + '/creators.json');
// });

app.get('/stan-lee', function(request, response) {
  response.sendFile(__dirname + '/stan-lee.json');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

