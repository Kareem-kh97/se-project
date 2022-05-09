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

  addMovie = (columnNames, values) => {
    return super.insertRow(columnNames, values);
  };

  deleteMovieById = (movieId) => {
    return super.deleteRow("id", movieId);
  };

  updateMovieById = (columnNames, values, movieId) => {
    return super.updateRowById(columnNames, values, movieId);
  };

  getMovieByTitleWithPattern(movieTitle) {
    return super.getRowsWithPattern("title", movieTitle);
  }
}

module.exports = new Movies();
