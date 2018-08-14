const db = {msgs: []};
// var mysql = require('koa-mysql');
const mysql = require('mysql');
 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'db'
});

connection.connect(err => {
  if (err) throw new Error(err);
  console.log('connected as id' + connection.threadId);
});


const createUserTable = `CREATE TABLE if not exists users(
  user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL UNIQUE
);`;

connection.query(createUserTable, (err, res) => {
  if (err) throw err;
  console.log('the result: ', res);
});

const createMessageTable = `CREATE TABLE if not exists messages(
  message_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  content VARCHAR(255) NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);`;

connection.query(createMessageTable, (err, res) => {
  if (err) throw err;
  console.log('the result: ', res);
});


connection.end(err => {
  if (err) throw err;
  console.log('connection terminated');
});




// // Create a MySQL connection pool (do this once)
//  db = mysql.createPool({ user: 'root', password: '', database: 'test', host: 'localhost' });

// // Execute a sample query (with params)
// var rows = yield db.query("select ? + ? as test", [1, 2]);

// // Output test result (3)
// this.body = { test: rows[0].test };




module.exports = connection;