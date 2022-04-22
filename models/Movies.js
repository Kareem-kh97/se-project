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
}

module.exports = new Movies();
