const dbConnection = require("../config/db");

class Dao {
  constructor(tableName) {
    this.tableName = tableName;
  }

  getById(id) {
    const sql = `SELECT * FROM ${this.tableName}`;
    return dbConnection.execute(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
  }

  /*
    fields represent the columns
    values represent the values we're putting into those fields
    question marks are created in order to create prepared statements and avoid sql injections
  */
  insertRow(fields, values) {
    const joinedFields = fields.join(",");
    const questionMarks = fields.map(() => "?").join(",");
    const sql = `INSERT INTO ${this.tableName} (${joinedFields}) VALUES (${questionMarks})`;
    return dbConnection.execute(sql, values);
  }
}

module.exports = Dao;
