/* global Chart, ScrollMagic, mixitup */

document.addEventListener("DOMContentLoaded", () => {
  // client-side js
  // run by the browser each time your view template is loaded
  
  
  console.log('hello world, my DOM is loaded :o');
  
  // Header sticky
  console.log('testing to make sure headers.js is linked up');
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
          document.getElementById("header").style.top = "0";
      } else {
          document.getElementById("header").style.top = "-80px";
      }
      prevScrollpos = currentScrollPos;
  }  
  
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
  
 
  
  // Creators data
  fetch('/creators').then(resp => resp.json()).then((data) => {
    console.group('%cResponse from /creators', 'color: #4B9CD3; font-size: large');
    console.log(data);
    console.groupEnd();  
    
    
    var arrName = [];
    var arrComicsStats = [];
    var arrSeriesStats = [];
    var arrStoriesStats = [];
    
    // Map over the Creator data array to grab data for table
    data.map((creator) => {
      var creatorlabel = creator.data.fullName;
      var comicsData = creator.data.comics.available;
      var seriesData = creator.data.series.available;
      var storiesData = creator.data.stories.available;

      arrName.push(creatorlabel);
      arrComicsStats.push(comicsData);
      arrSeriesStats.push(seriesData);
      arrStoriesStats.push(storiesData);
    });
    
    // console.log(arrName);  
    // console.log(arrComicsStats);
    // console.log(arrSeriesStats);
    // console.log(arrStoriesStats);
  
    // Build the chart inside here
    var ctx = document.getElementById("barChart").getContext("2d");
    var creatorData = {
      labels: arrName,
      datasets: [{
        label: "Comics",
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: arrComicsStats
      }, {
        label: "Series",
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        data: arrSeriesStats
      }, {
        label: "Stories",
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: arrStoriesStats
      }]
    };
    console.log(creatorData);  
    
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: creatorData,
      options: {
        barValueSpacing: 10,
        scales: {
            xAxes: [{
                ticks: {
                  autoSkip: false
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0
                }
            }]
        }
      }
    });
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
    html += '<p>Since Spider-Man swung into action in August 1962, he has been a fan favorite in the Marvel Comic Universe. '; 
      html += 'He has been portrayed on the silver screen by three separate actors: ';
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
    html += '</div>';
    
    // Add html to views/index.html
    spideyData.innerHTML = html;  
  });
  
  fetch('/avengers').then(resp => resp.json()).then((data) => {
    console.group('%cResponse from /avengers', 'color: #4B9CD3; font-size: large');
    console.log(data);
    console.groupEnd(); 
    
    // Define the variables
    var html = '';
    var avengersContainer = document.getElementById('marvel-characters');
    
    // Create mixitup buttons
    html += '<div class ="controls buttons flex">';
      html += '<div data-filter="all"><span>All</span></div>';
      html += '<div data-filter=".alive"><span>Alive</span></div>';
      html += '<div data-filter=".died"><span>Died/Disintegrated</span></div>';
    html += '</div>';
    
    // Build a div for the looped data to sit in
    html += '<div class="flex marvel__avengers">'
    // loop through the data
    data.forEach((avenger) => {
      
      // console.log(avenger);
      
      // create each avenger
      html += `<div class="mix ${avenger.status} ${avenger.team} flex-column">`;
      
        // console.log(avenger.data.urls);
        var urls = avenger.data.urls;
        
        // loop over urls to make each Avenger's name a link
        urls.forEach((url) => {
          if (url.type === "wiki") {
            html += `<a href="${url.url}" target="_blank">`;
              html += `<h2>${avenger.name}</h2>`;
            html += '</a>';
          }
        });
      
        var imgSrc = avenger.data.thumbnail.path;
        var imgExt = avenger.data.thumbnail.extension;
        // console.log(avenger.name, imgSrc, imgExt);
      
        // build each Avenger's picture
        html += `<img src="${imgSrc}/standard_xlarge.${imgExt}" />`;
      // close the div
      html += `</div>`;
    });
    
    // close the div containing both the buttons and the items
    html += '</div>';
    
    //send html to views/index.html
    avengersContainer.innerHTML = html
    
    // initialize mixitup
    var mixer = mixitup('#marvel-characters');
  });
 
  // end of Document.addEventlistener
});