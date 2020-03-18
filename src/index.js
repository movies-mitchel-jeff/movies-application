const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie, editMovie, deleteMovie } = require('./api.js');




//This prints existing movie JSON file
getMovies().then((movies) => {
  console.log('Here are all the existing movies:');
  movies.forEach(({title, rating, id, img}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#movies').append(`<div id="${id}" class="col-sm-4">
        <div class="card" style="width: 20rem; background-color: goldenrod">
        <img src="../${img}" alt="poster">
         <div class="card-body text-center">
              <h5 class="card-title">#${id} - ${title}</h5>
             <h5 class="card-text">Rating: ${rating}</h5>
         </div>
        </div>
        </div>`)
  });
}).catch((error) => {
  // alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


$("#loading").ajaxStop(function(){
  $(this).hide();
});




//Adds new movies data to JSON file
$('#add').click(function () {

  postMovie({
    "title": $('#movieTitle').val(),
    "rating": $('#movieRating').val()
  }).then(data => getMovies().then((movie) => {
    console.log('Here are all the new movies:');
    $('#movies').empty();
    movie.forEach(({title, rating, id, img}) => {
      console.log(` id#${id} - ${title} - ${rating}`);
      $('#movies').append(`<div id="${id}" class="col-sm-4">
        <div class="card" style="width: 20rem; background-color: goldenrod">
        <img src="../${img}" alt="poster">
         <div class="card-body text-center">
              <h5 class="card-title">#${id} - ${title}</h5>
             <h5 class="card-text">Rating: ${rating}</h5>
         </div>
        </div>
        </div>`);
      $("#movieTitle").val("");
      $("#movieRating").val("");
    });
  }).catch((error) => {
    alert('Something\'s wrong with the G Diffuser.\nCheck the console for details.');
    console.log(error);
  }));

});




// Updates existing movie list with new user inputs
$("#update").click(function(){

  editMovie($("#chosenTitle").val(), {
    "title": $("#editTitle").val(),
    "rating": $("#editRating").val()
  }).then(data => getMovies().then((movie) => {
    console.log('Here is the edited movie:');
    $("#movies").empty();
    movie.forEach(({title, rating, id, img}) => {
      console.log(`id# ${id} - ${title} - ${rating} `);
      $('#movies').append(`<div id="${id}" class="col-sm-4">
        <div class="card" style="width: 20rem; background-color: goldenrod">
        <img src="../${img}" alt="poster">
         <div class="card-body text-center">
              <h5 class="card-title">#${id} - ${title}</h5>
             <h5 class="card-text">Rating: ${rating}</h5>
         </div>
        </div>
        </div>`);
      $("#editTitle").val("");
      $("#editRating").val("");
      $("#chosenTitle").val("");
    });
  }).catch((error) => {
    alert('Something\'s wrong with the G Diffuser.\nCheck the console for details.');
    console.log(error);
  }));
});




// Deletes specified movie
$("#delete").click(function() {
  console.log($("#removeTitle").attr("id"));
  deleteMovie($("#removeTitle").val()).then(data => getMovies()).then((movies) => {
    // console.log('Here are all the books after the deletion:');
    console.log(movies);
      $('#movies').empty();
    movies.forEach(({title, rating, id, img}) => {
      console.log(`id# ${id} - ${title} - ${rating}.`);
      $('#movies').append(`<div id="${id}" class="col-sm-4">
        <div class="card" style="width: 20rem; background-color: goldenrod">
        <img src="../${img}" alt="poster">
         <div class="card-body text-center">
              <h5 class="card-title">#${id} - ${title}</h5>
             <h5 class="card-text">Rating: ${rating}</h5>
         </div>
        </div>
        </div>`);
      $("#removeTitle").val("");
    });
  }).catch((error) => {
    alert('Something\'s wrong with the G Diffuser.\nCheck the console for details.');
    console.log(error);
  });
});


//Slide down functionality
$("#newMovie").hide();
$("#editMovie").hide();
$("#deleteMovie").hide();

$("#addButton").click(function(){
  $("#newMovie").slideDown();
  $("#editMovie").hide();
  $("#deleteMovie").hide();
});

$("#editButton").click(function(){
  $("#editMovie").slideDown();
  $("#newMovie").hide();
  $("#deleteMovie").hide();
});

$("#deleteButton").click(function(){
  $("#deleteMovie").slideDown();
  $("#newMovie").hide();
  $("#editMovie").hide();
});