const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Pagina login
router.get('/', authController.loginPage);

// Login post
router.post('/', authController.login);

// Pagina start dopo login
router.get('/startpage', authController.startPage);

module.exports = router;
