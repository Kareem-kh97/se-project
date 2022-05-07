const { use } = require("bcrypt/promises");
const dbConnection = require("../config/db");
const Dao = require("./Dao");

class UserBookmarkedMovies extends Dao {
  constructor() {
    super("bookmarked_movies");
  }

  addMovieToBookmakrs(user_id, movie_id) {
    return super.insertRow(["user_id", "movie_id"], [user_id, movie_id]);
  }

  getBookmarkedMoviesByUserId(user_id) {
    const sql = `SELECT * FROM bookmarked_movies bm 
                 JOIN movies m on bm.movie_id = m.id
                 WHERE user_id = ?`;

    return dbConnection.execute(sql, [user_id]);
  }

  checkIfMovieIsBookmarked(user_id, movie_id) {
    const sql = `SELECT * FROM bookmarked_movies WHERE
                 user_id = ? AND movie_id = ?`;

    return dbConnection.execute(sql, [user_id, movie_id]);
  }

  deleteMovieFromBookmarks(movieId) {
    super.deleteRow("movie_id", movieId);
  }
}

module.exports = new UserBookmarkedMovies();
