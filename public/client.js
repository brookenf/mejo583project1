// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// our default array of dreams
const dreams = [
  'Find and count some sheep',
  'Climb a really tall mountain',
  'Wash the dishes'
];

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};

// let the editor know that `Chart` is defined by some code
// included in another file (in this case, `index.html`)
// Note: the code will still work without this line, but without it you
// will see an error in the editor
/* global Chart */

// create an object with world population data
const data = {
  'Africa': 1216,
  'Asia': 4436,
  'Europe': 738,
  'North America': 579,
  'Oceania': 39.9,
  'South America': 422
};

// create an array of continents to use as labels for the charts
const continents = Object.keys(data);

// create an array of populations to use as data values by looping
// through the continents and adding each new value to the array
const populations = [];
continents.forEach((continent) => {
  populations.push(data[continent]);
});

// initialize a chart and put it in the 'barChart' div
const bar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(bar, {
  type: 'bar', // make it a bar chart
  data: {
    labels: continents, // use the array of continents as labels
    datasets: [{
      label: 'Population (in millions)',
      data: populations, // use the array of populations to draw bars
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // make the bars translucent red
      borderColor: 'rgba(255, 99, 132, 1)', // make the borders of the bars opaque red
      borderWidth: 1 // set the border width to 1 pixel
    }]
  },
  options: {
    // the y-axis should start at 0
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    },
  }
});

// initialize a chart and put it in the 'pieChart' div
const pie = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pie, {
  type: 'pie', // make it a pie chart
  data: {
    labels: continents, // use the array of continents to label each 
    datasets: [{
      data: populations, // use the array of populations to draw pie slices
      // set each pie slice to a translucent color
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      // set the border of each pie slice to the same color as the background
      // of the slice but opaque
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1 // set border width to 1 pixel
    }]
  }
});
