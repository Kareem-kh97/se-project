const dbConnection = require("../config/db");
const Dao = require("./Dao");

class ActorsMovies extends Dao {
  constructor() {
    super("actors_movies");
  }

  getMoviesAndActors = (id) => {
    const sql = `
        SELECT movie_id, actor_id, fullname AS actorname, title, description, review FROM actors_movies am 
        JOIN actors a ON am.actor_id = a.id 
        JOIN movies m ON am.movie_id = m.id
        WHERE am.movie_id = ?`;

    return dbConnection.execute(sql, [id]);
  };

  insertMoviesAndActors = (movie_id, actor_id) => {
    return super.insertRow(["actor_id", "movie_id"], [actor_id, movie_id]);
  };
}

module.exports = new ActorsMovies();
