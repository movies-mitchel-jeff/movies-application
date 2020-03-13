const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie, editMovie } = require('./api.js');

$('#movies').html("loading...");


//This prints existing movie JSON file
getMovies().then((movies) => {
  console.log('Here are all the existing movies:');
  $('#movies').html('Here are all the movies: ');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#movies').append(`<div>id#${id} - ${title} - rating: ${rating} <h5>Edit</h5></div>`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


$("#loading").ajaxStop(function(){
  $(this).hide();
});






//Adds new movies data to JSON file
$('#blue').click(function () {

postMovie({
  "title": $('#movieTitle').val(),
  "rating": $('#movieRating').val()
}).then(data => getMovies().then((movie) => {
  console.log('Here are all the new movies:');
  $('#movies').empty();
  movie.forEach(({title, rating, id}) => {
    console.log(` id#${id} - ${title} - ${rating}`);
    $('#movies').append(`<div> id#${id} - ${title} - ${rating} <h5>Edit</h5></div>`)
  });
}).catch((error) => {
  alert('Something\'s wrong with the G Diffuser.\nCheck the console for details.');
  console.log(error);
}));

});


$("#update").click(function(){


editMovie(2, {
  "title": $("#movieTitle").val(),
  "rating": $("#movieRating").val()
}).then(data => getMovies().then((movie) => {
  console.log('Here is the edited movie:');
  $("#movies").empty();
  movie.forEach(({title, rating, id}) => {
    console.log(`id# ${id} - ${title} - ${rating} `);
    $('#movies').append(`<div> id#${id} - ${title} - ${rating} <h5>Edit</h5></div>`)
  });
}).catch((error) => {
  alert('Something\'s wrong with the G Diffuser.\nCheck the console for details.')
  console.log(error);
}));
});
