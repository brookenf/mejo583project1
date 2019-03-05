/* global Chart, ScrollMagic */

document.addEventListener("DOMContentLoaded", () => {
  // client-side js
  // run by the browser each time your view template is loaded

  console.log('hello world :o');

  // let the editor know that `Chart` is defined by some code
  // included in another file (in this case, `index.html`)
  // Note: the code will still work without this line, but without it you
  // will see an error in the editor
  
  // Creators data
  fetch('/creators').then(resp => resp.json()).then((data) => {
    console.group('%cResponse from /creators', 'color: #4B9CD3; font-size: large');
    console.log(data);
    console.groupEnd();  
    
    // build the chart inside here
    var names = data.fullName;
    console.log(names);
    var data = [];
  
  });
  

  // create an object with world population data
//   const data = {
//     'Africa': 1216,
//     'Asia': 4436,
//     'Europe': 738,
//     'North America': 579,
//     'Oceania': 39.9,
//     'South America': 422
//   };

//   // create an array of continents to use as labels for the charts
//   const continents = Object.keys(data);

//   // create an array of populations to use as data values by looping
//   // through the continents and adding each new value to the array
//   const populations = [];
//   continents.forEach((continent) => {
//     populations.push(data[continent]);
//   });

  // Scroll Magic
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });

  // get all slides
  var slides = document.querySelectorAll("section.panel");

  // create scene for every slide
  for (var i=0; i<slides.length; i++) {
    new ScrollMagic.Scene({
        triggerElement: slides[i]
      })
      .setPin(slides[i])
      .addTo(controller);
  }
  
  
  // Marvel API data
  fetch('/characters').then(resp => resp.json()).then((data) => {
    console.group('%cResponse from /characters', 'color: #4B9CD3; font-size: large');
    console.log(data);
    console.groupEnd();  
    
    var html = '';
    var char = document.getElementById('marvel-characters');
    
        
    for(var i = 0; i < data.length; i ++) {
      html += '<div class="flex-column character__card">';      
        html += `<h1>${data[i].name}</h1>`;
       
        // Get the images
        var ext = data[i].thumbnail.extension;
        html += `<img src="${data[i].thumbnail.path}/standard_medium.${ext}" alt="${data[i].name}">`;
        html += `<p>${data[i].description}</p>`;
      html += '</div>'
    }
    
    char.innerHTML = html;
     
  });
  
  // Spider-Man
  fetch('/spider-man').then(resp => resp.json()).then((data) => {
    console.group('%cResponse from /spider-man', 'color: #4B9CD3; font-size: large');
    console.log(data);
    console.groupEnd();  
    
    // Define Variables
    var html = '';
    var spideyData = document.getElementById('spidey-data');
    var urls = data.urls;
    
    urls.forEach((url) => {
      if(url.type === "wiki") {
       html += `<a href="${url.url}" target="_blank">`;
        // Get Spider-Man's photo
        html += `<img src="${data.thumbnail.path}/standard_xlarge.${data.thumbnail.extension}" alt="${data.name}"/>`;
       html += `</a>`;
      }    
    });
    
    // Get Spider-Man's description
    html += `<p>${data.description}</p>`;
    
    // Write a little paragrah about Spider-Man on the big screen
    html += '<p>Since Spider-Man swung into action in August 1962, he has been a fan favorite in the Marvel Comic Universe.'; 
    html += 'He has been portrayed by three separate actors:';
    html += '<a href="https://www.imdb.com/name/nm0001497/" target="_blank">Tobey Maguire</a>, ';
    html += '<a href="https://www.imdb.com/name/nm0001497/" target="_blank">Andrew Garfield</a> and most recently, '; 
    html += '<a href="https://www.imdb.com/name/nm0001497/" target="_blank">Tom Holland.</a>';
    html += '</p>';
    
    // Get series, events, comics data
    html += '<div class="spidey-stats flex">';
      html += `<h2>Appeared in <br/><span class="big-num">${data.comics.available}</span> comics</h2>`;
      html += `<h2>Appeared in <br/><span class="big-num">${data.events.available}</span> events</h2>`;
      html += `<h2>Appeared in <br/><span class="big-num">${data.series.available}</span> series</h2>`;
      html += `<h2>Appeared in <br/><span class="big-num">${data.stories.available}</span> stories</h2>`;
    
    html += '</div>'
    
    
    
    spideyData.innerHTML = html;
  
  
  });
    
  
  

  // end of Document.addEventlistener
});