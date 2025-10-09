const db = require('../../db/db');

class Risposta {
    static all(callback) {
        db.all("SELECT * FROM Risposte", [], callback);
    }

    static findById(id, callback) {
        db.get("SELECT * FROM Risposte WHERE Id_Risposta=?", [id], callback);
    }

    static create(risposta, fk_domanda, correttezza, callback) {
        db.run("INSERT INTO Risposte(Risposta, Fk_Domanda, Correttezza) VALUES(?, ?, ?)", 
               [risposta, fk_domanda, correttezza], callback);
    }

    static update(id, risposta, fk_domanda, correttezza, callback) {
        db.run("UPDATE Risposte SET Risposta=?, Fk_Domanda=?, Correttezza=? WHERE Id_Risposta=?", 
               [risposta, fk_domanda, correttezza, id], callback);
    }

    static delete(id, callback) {
        db.run("DELETE FROM Risposte WHERE Id_Risposta=?", [id], callback);
    }
}

module.exports = Risposta;
