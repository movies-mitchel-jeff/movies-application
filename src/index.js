const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie } = require('./api.js');

$('#movies').html("loading...");

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $('#movies').html('Here are all the movies: ');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#movies').append(`id#${id} - ${title} - rating: ${rating}`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


// $('#loading').hide();
// $('#loading').(function(){
//   $(this).show();
//   //console.log('shown');
// });
$("#loading").ajaxStop(function(){
  $(this).hide();
});

//take the information from the form on click
//use PATCH to append to movie list object
//update should occur without refresh.


// $("#newMovieButton").click(function(){
//   $("#movies").
// })

// const newMovie = {title: "test", rating: 'Are a fun way to use JS!'};
// const url = '/api/movies';
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(newMovie),
// };
// fetch(url, options)
//   .then(response => db.JSON;

postMovie({
  "title": "Notre-Dame de Paris",
  "rating": 3
}).then(data => getMovies().then((movie) => {
  console.log('Here are all the books:');
  movie.forEach(({title, rating}) => {
    console.log(`id# ${id} - ${title} - ${rating}`);
  });
}).catch((error) => {
  alert('Something\'s wrong with the G Diffuser.\nCheck the console for details.')
  console.log(error);
}));