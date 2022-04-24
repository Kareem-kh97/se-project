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
}

module.exports = new Movies();
