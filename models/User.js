const Dao = require("./Dao");

class User extends Dao {
  constructor() {
    //Name of the table we're using, so for movies it would be super("movies")
    super("users");
  }

  getUserById = (id) => {
    return super.getById(id);
  };

  addNewUser = (fields, values) => {
    return super.insertRow(fields, values);
  };

  getUserByEmail = (email) => {
    return super.getByValue("email", email);
  };

  getUserByUsername = (username) => {
    return super.getByValue("username", username);
  };
}

module.exports = new User();
