module.exports = {           //exporting each function to be accessed by index.js
  getMovies: () => {        //function that pulls information and converts it to JSON
    return fetch('/api/movies')
        .then(response => response.json());
  },
  postMovie: (newMovie) => {
    return fetch('/api/movies',{       //function that adds new data to JSON file.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie)
    })
        .then(response => response.json());
  },
  editMovie: (id, movie) => {
    return fetch(`api/movies/${id}`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    })
        .then(response => response.json());
  },
  deleteMovie: (id) => {
    return fetch(`api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then(response => response.json());
  }
};