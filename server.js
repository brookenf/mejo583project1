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
    "name": "Doctor Strange",
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
    "name": "Ant-Man (Scott Lang)",
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
      // console.log('Found character ID', avenger.name, res.data[0].id);
      
      avenger.data = res.data[0];
      // console.log(avenger.data);
    
    // create a while loop 
    while (avengers.filter(avenger => avenger.data !== undefined).length === avengers.length) {
        // console.log(avengers);
     
      // write the file
      return new Promise(function(resolve, reject) {
        fs.writeFile("./avengers.json", JSON.stringify(avengers, null, 2), (err) => {
          if (err) reject (err);
          else resolve();
          console.log('Avengers file has been created');
        });
      
      });
    }
    
    })
    .fail(console.error)
    .done();
});



// Creators
let creators = [{
    "first": "Stan",
    "last": "Lee"
  },
  {
    "first": "Jason",
    "last": "Aaron"
  },
  {
    "first": "Steve",
    "last": "Ditko"
  },
  {
    "first": "Jack",
    "last": "Kirby"
  },
  {
    "first": "Larry",
    "last": "Lieber"
  }, 
  {
    "first": "Joe",
    "last": "Simon"
  },
  {
    "first": "David",
    "last": "Michelinie"
  }, 
  {
    "first": "John",
    "last": "Byrne"
  },
  {
    "first": "Don",
    "last": "Rico"
  },   
  {
    "first": "Don",
    "last": "Heck"
  }
]

// Create for loop over creators

creators.forEach((creator) => {
  
  // call Marvel API data
  marvel.creators.findByName(creator.first, '', creator.last)
    .then(function (res) {
      console.log('Found creator ID', creator.first, creator.last, res.data[0].id);
      
      creator.data = res.data[0];
      // console.log(creator.data);
    
      // create a while loop 
      while (creators.filter(creator => creator.data !== undefined).length === creators.length) {
          console.log(creators);

        // write the file
        return new Promise(function(resolve, reject) {
          fs.writeFile("./creators.json", JSON.stringify(creators, null, 2), (err) => {
            if (err) reject (err);
            else resolve();
            console.log('Creators2 file has been created');
          });
        });
      }
    })
    .fail(console.error)
    .done();
});
  

//-------------------------------------------------------------//
//------------------------- Get JSON --------------------------//
//-------------------------------------------------------------//

// Get the Spider-Man data
app.get('/spider-man', function(request, response) {
  response.sendFile(__dirname + '/spider-man.json');
});

// Get the creators data
app.get('/creators', function(request, response) {
  response.sendFile(__dirname + '/creators.json');
});

// Get the avengers data
app.get('/avengers', function(request, response) {
  response.sendFile(__dirname + '/avengers.json');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

