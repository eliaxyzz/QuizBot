const Domanda = require('../models/Domanda');

exports.index = (req, res) => {
    Domanda.all((err, rows) => {
        if (err) return console.log(err.message);
        res.render('../site/views/pages/indexdom', { testo: "Elenco Domande", doms: rows });
    });
};

exports.cerca = (req, res) => {
    Domanda.findById(req.query.id, (err, row) => {
        if (err) return console.log(err.message);
        if (row) res.render('../site/views/pages/cercadom', { testo: "Domanda cercata", cercaEl: row });
        else res.send("Domanda non trovata!");
    });
};

exports.aggiungi = (req, res) => {
    const { domanda } = req.body;
    Domanda.create(domanda, (err) => {
        if (err) return console.log(err.message);
        res.redirect('/domande');
    });
};

exports.modifica = (req, res) => {
    const { id, domanda } = req.body;
    Domanda.update(id, domanda, (err) => {
        if (err) return console.log(err.message);
        res.redirect('/domande');
    });
};

exports.elimina = (req, res) => {
    Domanda.delete(req.body.id, (err) => {
        if (err) return res.send("Domanda non trovata");
        res.redirect('/domande');
    });
};
