const Dao = require("./Dao");
const dbConnection = require("../config/db");

class User extends Dao {
  constructor() {
    //Name of the table we're using, so for movies it would be super("movies")
    super("users");
  }

  getUserById = (id) => {
    return super.getById(id);
  };

  getUserByPasswordResetToken = (token) => {
    const sql =
      "SELECT id,username, passwordToken, UNIX_TIMESTAMP(tokenCreatedAt) AS tokenCreatedAt FROM users WHERE passwordToken = ?";
    return dbConnection.execute(sql, [token]);
  };

  addNewUser = (fields, values) => {
    return super.insertRow(fields, values);
  };

  addPasswordResetToken = (token, timestamp, id) => {
    const sql =
      "UPDATE users SET passwordToken = ?, tokenCreatedAt = FROM_UNIXTIME(?) WHERE id = ?";
    return dbConnection.execute(sql, [token, timestamp, id]);
  };

  setTokenDataToNull = (token) => {
    const sql =
      "UPDATE users SET passwordToken = NULL, tokenCreatedAt = NULL WHERE passwordToken = ?";
    return dbConnection.execute(sql, [token]);
  };

  changeUserPassword = (password, token) => {
    return super.updateRowById(
      ["password"],
      [password],
      token,
      "passwordToken"
    );
  };

  getUserByEmail = (email) => {
    return super.getByValue("email", email);
  };

  getUserByUsername = (username) => {
    return super.getByValue("username", username);
  };
}

module.exports = new User();
