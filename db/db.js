const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Percorso assoluto al database dentro /db
const dbPath = path.join(__dirname, 'QuizBot.db'); // db.js si trova in /db

// Crea o apre il database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Errore apertura DB:', err.message);
});

module.exports = {
    db,
    run: (sql, params = []) =>
        new Promise((res, rej) => {
            db.run(sql, params, function (err) {
                if (err) rej(err);
                else res(this);
            });
        }),
    get: (sql, params = []) =>
        new Promise((res, rej) => {
            db.get(sql, params, (err, row) => {
                if (err) rej(err);
                else res(row);
            });
        }),
    all: (sql, params = []) =>
        new Promise((res, rej) => {
            db.all(sql, params, (err, rows) => {
                if (err) rej(err);
                else res(rows);
            });
        }),
};
