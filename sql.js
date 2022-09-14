/* --------------------------------- Imports -------------------------------- */

const mysql = require("mysql");
const dotenv = require("dotenv");

// Enables Env vars
dotenv.config();
/* ------------------------------- Connection ------------------------------- */
console.log(process.env.host, process.env.user);
const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});



con.connect((err) => {
  if (err) console.log(err.message);
});

console.log(con);

/* --------------------------------- Exports -------------------------------- */

module.exports = { con, mysql };
//process.env.URI
