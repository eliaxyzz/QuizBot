const TelegramBot = require('node-telegram-bot-api');
const { handleCommands } = require('../bot/handlers/commands');
const { handleQuizCallbacks } = require('../bot/handlers/quiz');
const { sessions } = require('../bot/handlers/session');
const { setCommandList } = require('../bot/utils/setCommands');

const token = 'Your_Token';
const bot = new TelegramBot(token, { polling: true });

// Imposta i comandi suggeriti
setCommandList(bot);

// Gestione comandi testuali (es. /start, /login, /signup, ecc.)
handleCommands(bot, sessions);

// Gestione risposte ai quiz
handleQuizCallbacks(bot, sessions);

console.log("🤖 QuizBot avviato e in ascolto...");

const { handleAuthMessages } = require('../bot/handlers/auth');
bot.on('message', (msg) => handleAuthMessages(bot, msg, sessions));

module.exports = bot;