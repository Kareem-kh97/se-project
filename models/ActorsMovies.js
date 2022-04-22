const dbConnection = require("../config/db");

//Combines multiple views, so abstraction is not likely,
class ActorsMovies {
  getMoviesAndActors = (id) => {
    const sql = `
        SELECT movie_id, actor_id, fullname AS actorname, title, description, review FROM actors_movies am 
        JOIN actors a ON am.actor_id = a.id 
        JOIN movies m ON am.movie_id = m.id
        WHERE am.movie_id = ?`;

    return dbConnection.execute(sql, [id]);
  };
}

module.exports = new ActorsMovies();
