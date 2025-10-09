const Utente = require('../models/Utente');

// Mostra tutti gli utenti
exports.index = (req, res) => {
    Utente.all((err, rows) => {
        if (err) {
            console.error("Errore nel recupero utenti:", err.message);
            return res.status(500).send("Errore interno del server");
        }
        res.render('../site/views/pages/indexut', { testo: "Elenco Utenti", users: rows });
    });
};

// Cerca un utente per ID
exports.cerca = (req, res) => {
    const id = req.query.id;
    if (!id) return res.send("ID utente mancante");

    Utente.findById(id, (err, row) => {
        if (err) {
            console.error("Errore nella ricerca utente:", err.message);
            return res.status(500).send("Errore interno del server");
        }

        if (row) {
            res.render('../site/views/pages/cercaut', { testo: "Utente cercato", cercaEl: row });
        } else {
            res.send("Utente non trovato!");
        }
    });
};

// Aggiunge un nuovo utente
exports.aggiungi = (req, res) => {
    const { nome, cognome, username, password } = req.body;

    if (!username || !password || !nome || !cognome)
        return res.send("Tutti i campi sono obbligatori");

    Utente.create(nome, cognome, username, password, (err) => {
        if (err) {
            console.error("Errore nell'aggiunta utente:", err.message);
            return res.status(500).send("Errore interno del server");
        }
        res.redirect('/utenti');
    });
};

// Modifica un utente esistente
exports.modifica = (req, res) => {
    const { id, nome, cognome, username, password } = req.body;

    if (!id) return res.send("ID utente mancante");

    Utente.update(id, nome, cognome, username, password, (err) => {
        if (err) {
            console.error("Errore nella modifica utente:", err.message);
            return res.status(500).send("Errore interno del server");
        }
        res.redirect('/utenti');
    });
};

// Elimina un utente
exports.elimina = (req, res) => {
    const id = req.body.id;
    if (!id) return res.send("ID utente mancante");

    Utente.delete(id, (err) => {
        if (err) {
            console.error("Errore nell'eliminazione utente:", err.message);
            return res.status(500).send("Utente non trovato o errore");
        }
        res.redirect('/utenti');
    });
};
