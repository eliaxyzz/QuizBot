const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Static files
app.use('/CSS', express.static(path.join(__dirname, 'public/CSS')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// EJS
app.set('view engine', 'ejs');

// Body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/auth'));
app.use('/startpage', require('./routes/startpage'));
app.use('/domande', require('./routes/domande'));
app.use('/risposte', require('./routes/risposte'));
app.use('/utenti', require('./routes/utenti'));

// Avvio server
app.listen(port, () => {
    console.log(`\nSito attivo su http://localhost:${port}\n`);
    console.log("===================================");
    console.log("                CLI");
    console.log("===================================\n");
});
