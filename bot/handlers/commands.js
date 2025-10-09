const { mainKeyboard } = require('../keyboards/mainKeyboard');
const { startSignup, startLogin } = require('./auth');
const { avviaQuiz } = require('./quiz');
const { all } = require('../../db/db'); // importa funzione per query multiple


function handleCommands(bot, sessions) {
  // /start
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id,
      "👋 <b>Benvenuto in QuizBot!</b>\n\n" +
      "Usa i pulsanti qui sotto o digita un comando per iniziare 👇",
      { parse_mode: "HTML", ...mainKeyboard }
    );
  });

  // /aiuto
  bot.onText(/\/aiuto/, (msg) => {
    bot.sendMessage(msg.chat.id,
      "📖 <b>Comandi disponibili:</b>\n" +
      "/signup - Registrati\n" +
      "/login - Accedi\n" +
      "/logout - Esci\n" +
      "/avvia - Inizia il quiz\n" +
      "/partite - Le tue partite\n" +
      "/regole - Come funziona il quiz",
      { parse_mode: "HTML" }
    );
  });

  // /regole
  bot.onText(/\/regole/, (msg) => {
    bot.sendMessage(msg.chat.id,
      "📝 <b>Regole del Quiz:</b>\n" +
      "• 5 domande di cultura generale\n" +
      "• Ogni risposta corretta vale 1000 punti\n" +
      "• Il punteggio viene salvato nel tuo profilo",
      { parse_mode: "HTML" }
    );
  });

  // /signup e /login
  bot.onText(/\/signup/, (msg) => startSignup(bot, msg.chat.id, sessions));
  bot.onText(/\/login/, (msg) => startLogin(bot, msg.chat.id, sessions));

  // /avvia quiz
  bot.onText(/\/avvia/, (msg) => avviaQuiz(bot, msg.chat.id, sessions));

   // /partite
  bot.onText(/\/partite/, async (msg) => {
    const chatId = msg.chat.id;
    const session = sessions[chatId];

    if (!session || !session.logged) {
      bot.sendMessage(chatId, "❌ Devi essere loggato per vedere le tue partite. Usa /login");
      return;
    }

    try {
      // Recupera le ultime 10 partite dell’utente
      const partite = await all(
        "SELECT Punteggio, Data FROM Partite WHERE Fk_Utente = ? ORDER BY Data DESC LIMIT 10",
        [session.userId]
      );

      if (!partite || partite.length === 0) {
        bot.sendMessage(chatId, "😕 Non hai ancora giocato nessuna partita. Usa /avvia per iniziare!");
        return;
      }

      // Formatta l’elenco delle partite
      let testo = "🏆 <b>Le tue ultime partite:</b>\n\n";
      partite.forEach((p, i) => {
        testo += `#${i + 1} • <b>${p.Punteggio} punti</b> - 📅 ${p.Data}\n`;
      });

      bot.sendMessage(chatId, testo, { parse_mode: "HTML" });
    } catch (err) {
      console.error("Errore nel comando /partite:", err.message);
      bot.sendMessage(chatId, "❌ Errore nel recupero delle partite. Riprova più tardi.");
    }
  });
}

module.exports = { handleCommands };
