const Risposta = require('../models/Risposta');

exports.index = (req, res) => {
    Risposta.all((err, rows) => {
        if (err) return console.log(err.message);
        res.render('../site/views/pages/indexrisp', { testo: "Elenco Risposte", risps: rows });
    });
};

exports.cerca = (req, res) => {
    Risposta.findById(req.query.id, (err, row) => {
        if (err) return console.log(err.message);
        if (row) res.render('../site/views/pages/cercarisp', { testo: "Risposta cercata", cercaEl: row });
        else res.send("Risposta non trovata!");
    });
};

exports.aggiungi = (req, res) => {
    const { risposta, fk_domanda, correttezza } = req.body;
    Risposta.create(risposta, fk_domanda, correttezza, (err) => {
        if (err) return console.log(err.message);
        res.redirect('/risposte');
    });
};

exports.modifica = (req, res) => {
    const { id, risposta, fk_domanda, correttezza } = req.body;
    Risposta.update(id, risposta, fk_domanda, correttezza, (err) => {
        if (err) return console.log(err.message);
        res.redirect('/risposte');
    });
};

exports.elimina = (req, res) => {
    Risposta.delete(req.body.id, (err) => {
        if (err) return res.send("Risposta non trovata");
        res.redirect('/risposte');
    });
};
