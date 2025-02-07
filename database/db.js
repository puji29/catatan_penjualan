const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite3');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database opening error:', err);
  } else {
    console.log('Database opened');
  }
});

// db.serialize(() => {  
//   db.run('CREATE TABLE IF NOT EXISTS barang_masuk (id TEXT PRIMARY KEY, name_barang TEXT, price INTEGER, stock INTEGER, created_at TEXT, updated_at TEXT)', (err) => {
//     if (err) {
//       console.error('Table creation error:', err);
//     } else {
//       console.log('Table users created succcessfully');
//     }
//   });
// });

module.exports = db;