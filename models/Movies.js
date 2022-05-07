const Dao = require("./Dao");

class Movies extends Dao {
  constructor() {
    super("movies");
  }

  getMovies = () => {
    return super.getRowsWithPagination(10);
  };

  getMovieById = (id) => {
    return super.getById(id);
  };

  addMovie = (fields, values) => {
    return super.insertRow(fields, values);
  };

  deleteMovieById = (movieId) => {
    return super.deleteRow("id", movieId);
  };

  getMovieByTitleWithPattern(movieTitle) {
    return super.getRowsWithPattern("title", movieTitle);
  }
}

module.exports = new Movies();
