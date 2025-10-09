const db = require('../../db/db');

class Domanda {
    static all(callback) {
        db.all("SELECT * FROM Domande", [], callback);
    }

    static findById(id, callback) {
        db.get("SELECT * FROM Domande WHERE Id_Domanda=?", [id], callback);
    }

    static create(domanda, callback) {
        db.run("INSERT INTO Domande(Domanda) VALUES(?)", [domanda], callback);
    }

    static update(id, domanda, callback) {
        db.run("UPDATE Domande SET Domanda=? WHERE Id_Domanda=?", [domanda, id], callback);
    }

    static delete(id, callback) {
        db.run("DELETE FROM Domande WHERE Id_Domanda=?", [id], callback);
    }
}

module.exports = Domanda;
