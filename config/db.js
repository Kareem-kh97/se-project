//Include environment variables
require("dotenv").config();

//Database connection goes here.
const mysql = require("mysql2");

let pool;

try {
  pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });
} catch (error) {
  console.log(error);
}

module.exports = pool.promise();
