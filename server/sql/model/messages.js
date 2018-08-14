const fs = require('fs');
const connection = require('../database.js');

function storeMessage (message) {
  // db.msgs.push(message);
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

  const insertMessages = [
    `INSERT INTO messages(message_id, user_id, content) VALUE (0, ${message.user_id}, ${message.message})`
  ];

  insertMessages.forEach(cmd => {
    connection.query(cmd, (err, res) => {
      if (err) throw err;
      console.log('the result:', res);
    });
  });

  connection.end(err => {
    if (err) throw err;
    console.log('connection terminated');
  });
}



function getDatabase () {
  return db.msgs;
}

// setInterval(function () {
//   fs.writeFile(__dirname + '/../data.json',JSON.stringify(db),(err) => {if (err) throw err; });
// },5000);

module.exports = { storeMessage, getDatabase};