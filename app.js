// Avvia il sito e il bot
const site = require('./site/index');
const bot = require('./bot/bot');

// Delay prima di avviare la CLI (per sicurezza)
setTimeout(() => {
    require('./cli/cli');
}, 300);
