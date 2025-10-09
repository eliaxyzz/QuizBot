const express = require('express');
const router = express.Router();
const utenteController = require('../controllers/utentiController');

// Lista utenti
router.get('/', utenteController.index);

// Cerca utente per ID
router.get('/cercaut', utenteController.cerca);

// Aggiungi utente
router.route('/aggiungiut')
    .get((req, res) => res.render('../site/views/pages/aggiungiut', { testo: "Aggiungi Utente" }))
    .post(utenteController.aggiungi);

// Modifica utente
router.route('/modificaut')
    .get((req, res) => res.render('../site/views/pages/modificaut', { testo: "Modifica Utente" }))
    .post(utenteController.modifica);

// Elimina utente
router.route('/eliminaut')
    .get((req, res) => res.render('../site/views/pages/eliminaut', { testo: "Elimina Utente" }))
    .post(utenteController.elimina);

module.exports = router;
