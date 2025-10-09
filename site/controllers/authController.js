const db = require('../../db/db');

exports.loginPage = (req, res) => {
    res.render('../site/views/pages/login');
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    if(username === 'admin' && password === 'adminpass') {
        res.redirect('/startpage');
        return;
    }
    const query = "SELECT * FROM Utenti WHERE Username=? AND Password=?";
    db.get(query, [username, password], (err, row) => {
        if(err) return console.error(err.message);
        if(row) res.redirect('/startpage');
        else res.send("Credenziali errate");
    });
};

exports.startPage = (req, res) => {
    res.render('../site/views/pages/startpage');
};
