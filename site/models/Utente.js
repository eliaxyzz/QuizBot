const db = require('../../db/db');

class Utente {
    static all(callback) {
        db.all("SELECT * FROM Utenti", [], callback);
    }

    static findById(id, callback) {
        db.get("SELECT * FROM Utenti WHERE Id_Utente=?", [id], callback);
    }

    static create(nome, cognome, username, password, callback) {
        db.run("INSERT INTO Utenti(Nome, Cognome, Username, Password) VALUES(?,?,?,?)", 
               [nome, cognome, username, password], callback);
    }

    static update(id, nome, cognome, username, password, callback) {
        db.run("UPDATE Utenti SET Nome=?, Cognome=?, Username=?, Password=? WHERE Id_Utente=?", 
               [nome, cognome, username, password, id], callback);
    }

    static delete(id, callback) {
        db.run("DELETE FROM Utenti WHERE Id_Utente=?", [id], callback);
    }
}

module.exports = Utente;
