const vorpal = require('vorpal')();
const colors = require('colors/safe');
const Table = require('cli-table');
const { db, run, all } = require('../db/db');

// --- CLI Admin ---
vorpal
    .command('aggDom [domanda...]', 'Aggiungi una domanda')
    .action(async function (args, callback) {
        const domanda = args.domanda.join(' ');
        await run("INSERT INTO Domande(Domanda) VALUES(?)", [domanda]);
        console.log(colors.green("Domanda inserita!"));
        callback();
    });

vorpal
    .command('aggRisp [fk_domanda] [correttezza] [risposta...]', 'Aggiungi una risposta')
    .action(function (args, callback) {
        const risposta = args.risposta.join(' ');
        const fk_domanda = args.fk_domanda;
        const corret = args.correttezza;
        db.run("INSERT INTO Risposte(Risposta, Fk_Domanda, Correttezza) VALUES(?, ?, ?)", [risposta, fk_domanda, corret], (err) => {
            if (err) console.error(err.message);
            else console.log(colors.green("Risposta inserita!"));
        });
        callback();
    });

vorpal
    .command('elimDom [id_domanda]', 'Elimina la domanda')
    .action(function (args, callback) {
        const id_dom = args.id_domanda;
        db.run("DELETE FROM Domande WHERE Id_Domanda=?", [id_dom], (err) => {
            if (err) console.error(err.message);
            else console.log(colors.yellow(`Domanda Id=${id_dom} eliminata!`));
        });
        callback();
    });

vorpal
    .command('elimRisp [id_risposta]', 'Elimina la risposta')
    .action(function (args, callback) {
        const id_risp = args.id_risposta;
        db.run("DELETE FROM Risposte WHERE Id_Risposta=?", [id_risp], (err) => {
            if (err) console.error(err.message);
            else console.log(colors.yellow(`Risposta Id=${id_risp} eliminata!`));
        });
        callback();
    });

vorpal
    .command('modDom [id_domanda] [domanda...]', 'Modifica la domanda')
    .action(function (args, callback) {
        const dom = args.domanda.join(' ');
        const id_dom = args.id_domanda;
        db.run("UPDATE Domande SET Domanda=? WHERE Id_Domanda=?", [dom, id_dom], (err) => {
            if (err) console.error(err.message);
            else console.log(colors.green(`Domanda Id=${id_dom} modificata!`));
        });
        callback();
    });

vorpal
    .command('modRisp [id_risposta] [fk_domanda] [risposta...]', 'Modifica la risposta')
    .action(function (args, callback) {
        const risp = args.risposta.join(' ');
        const id_risp = args.id_risposta;
        const fk_dom = args.fk_domanda;
        db.run("UPDATE Risposte SET Risposta=?, Fk_Domanda=? WHERE Id_Risposta=?", [risp, fk_dom, id_risp], (err) => {
            if (err) console.error(err.message);
            else console.log(colors.green(`Risposta Id=${id_risp} modificata!`));
        });
        callback();
    });

vorpal
    .command('VisDom', 'Mostra tutte le domande')
    .action(function (args, callback) {
        const table = new Table({ head: ['Id', 'Domanda'], colWidths: [5, 75] });
        db.all("SELECT * FROM Domande", [], (err, rows) => {
            if (err) console.error(err.message);
            rows.forEach(row => table.push([row.Id_Domanda, row.Domanda]));
            console.log('\n');
            console.log(table.toString());
        });
        callback();
    });

vorpal
    .command('VisRispDom [fk_domanda]', 'Mostra tutte le risposte associate a una domanda')
    .action(function (args, callback) {
        const table = new Table({ head: ['Id', 'Risposta', 'Correttezza'], colWidths: [5, 50, 15] });
        db.all("SELECT * FROM Risposte WHERE Fk_Domanda=?", [args.fk_domanda], (err, rows) => {
            if (err) console.error(err.message);
            rows.forEach(row => table.push([row.Id_Risposta, row.Risposta, row.Correttezza]));
            console.log('\n');
            console.log(table.toString());
        });
        callback();
    });

vorpal
    .command('VisUt', 'Mostra tutti gli utenti')
    .action(function (args, callback) {
        const table = new Table({ head: ['Id', 'Nome', 'Cognome', 'Username', 'Password'], colWidths: [5, 20, 20, 20, 20] });
        db.all("SELECT * FROM Utenti", [], (err, rows) => {
            if (err) console.error(err.message);
            rows.forEach(row => table.push([row.Id_Utente, row.Nome, row.Cognome, row.Username, row.Password]));
            console.log('\n');
            console.log(table.toString());
        });
        callback();
    });

vorpal
    .delimiter('Admin> ')
    .show();
    

