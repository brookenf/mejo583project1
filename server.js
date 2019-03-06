// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

/* 
  File Server https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback 
  
  This is to writeFile to a JSON file after the call is fired so the data will be stored server-side and then able to be fetched
  by the public/client.js through app.get
  
*/
var fs = require("fs");


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
  
  Here is where I learned to write a fs.writeFile as a promise: https://stackoverflow.com/questions/31978347/fs-writefile-in-a-promise-asynchronous-synchronous-stuff,
  though the answer now seems to be to use var fs = require('fs').promises and then use fileHandle.writeFile(data, options) but then you have to write the function as 
  async and I wasn't sure how to do that. The return new Promise with the function seemed to work with no bugs for me
  
*/

// Spider-Man data
/*
  marvel.characters.findByName('spider-man')
    .then(function(res) {
      console.log('Found character ID', res.data[0].id); 
      
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


// Avengers Characters data
let avengers = [{
    "name": "Iron Man",
    "team": "Avengers",
    "status": "alive"
  },
  {
    "name": "Captain America",
    "team": "Avengers",
    "status": "alive"
  },
  {
    "name": "Hulk",
    "team": "Avengers",
    "status": "alive"
  }, 
  {
    "name": "Black Widow",
    "team": "Avengers",
    "status": "alive"
  },
  {
    "name": "Hawkeye",
    "team": "Avengers",
    "status": "alive"
  },
  {
    "name": "Thor",
    "team": "Avengers",
    "status": "alive"
  },
  {
    "name": "Dr. Strange",
    "team": "Avengers",
    "status": "died"
  },
  {
    "name": "Spider-Man",
    "team": "Avengers",
    "status": "died"
  },
  {
    "name": "Black Panther",
    "team": "Avengers",
    "status": "died"
  },
  {
    "name": "Ant-Man",
    "team": "Avengers",
    "status": "alive"
  },
  {
    "name": "Vision",
    "team": "Avengers",
    "status": "died"
  },
  {
    "name": "Scarlet Witch",
    "team": "Avengers",
    "status": "died"
  },
  {
    "name": "Falcon",
    "team": "Avengers",
    "status": "died"
  },                
];

// Create for loop over avengers array
avengers.forEach((avenger) => {
  
  // call Marvel API data
  marvel.characters.findByName(avenger.name)
    .then(function (res) {
     console.log('Found character ID', avenger.name, res.data[0].id);
    })
    .fail(console.error)
    .done();
});



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

app.get('/creators', function(request, response) {
  response.sendFile(__dirname + '/creators.json');
});

// app.get('/stan-lee', function(request, response) {
//   response.sendFile(__dirname + '/stan-lee.json');
// });

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

