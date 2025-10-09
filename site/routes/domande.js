const express = require('express');
const router = express.Router();
const domandeController = require('../controllers/domandeController');

router.get('/', domandeController.index);
router.get('/cercadom', domandeController.cerca);
router.route('/aggiungidom').get((req,res)=>res.render('../site/views/pages/aggiungidom')).post(domandeController.aggiungi);
router.route('/modificadom').get((req,res)=>res.render('../site/views/pages/modificadom', { testo: "Modifica la domanda" })).post(domandeController.modifica);
router.route('/eliminadom').get((req,res)=>res.render('../site/views/pages/eliminadom')).post(domandeController.elimina);

module.exports = router;
