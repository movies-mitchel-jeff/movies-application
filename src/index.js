const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

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

