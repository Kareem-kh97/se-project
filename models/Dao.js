const dbConnection = require("../config/db");

class Dao {
  constructor(tableName) {
    this.tableName = tableName;
  }

  getById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    return dbConnection.execute(sql, [id]);
  }

  getRowsWithPagination(limit, offset = 0) {
    const sql = `SELECT * FROM ${this.tableName} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
    return dbConnection.execute(sql);
  }

  /*
    fields represent the columns of the newly inserted row
    values represent the values we're putting into those fields
    question marks are created in order to create prepared statements and avoid sql injections
  */
  insertRow(fields, values) {
    const joinedFields = fields.join(",");
    const questionMarks = fields.map(() => "?").join(",");
    const sql = `INSERT INTO ${this.tableName} (${joinedFields}) VALUES (${questionMarks})`;
    return dbConnection.execute(sql, values);
  }

  getByValue(columnName, value) {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnName} = ?`;
    return dbConnection.execute(sql, [value]);
  }
}

module.exports = Dao;
