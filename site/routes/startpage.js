const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../site/views/pages/startpage');
});

module.exports = router;
