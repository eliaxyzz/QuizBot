const express = require('express');
const router = express.Router();
const risposteController = require('../controllers/risposteController');

// Elenco risposte
router.get('/', risposteController.index);

// Cerca risposta
router.get('/cercarisp', risposteController.cerca);

// Aggiungi risposta
router.route('/aggiungirisp').get((req, res) => res.render('../site/views/pages/aggiungirisp')).post(risposteController.aggiungi);

// Modifica risposta
router.route('/modificarisp').get((req, res) => res.render('../site/views/pages/modificarisp', { testo: "Modifica la risposta" })).post(risposteController.modifica);

// Elimina risposta
router.route('/eliminarisp').get((req, res) => res.render('../site/views/pages/eliminarisp')).post(risposteController.elimina);

module.exports = router;
