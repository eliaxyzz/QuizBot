const { db } = require('../../db/db');

async function startSignup(bot, chatId, sessions) {
  sessions[chatId] = { step: 'signup_username' };
  await bot.sendMessage(chatId, "📝 Inserisci il tuo username per registrarti:");
}

async function startLogin(bot, chatId, sessions) {
  sessions[chatId] = { step: 'login_username' };
  await bot.sendMessage(chatId, "👤 Inserisci il tuo username:");
}

// Gestione messaggi testuali per login/signup
function handleAuthMessages(bot, msg, sessions) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const session = sessions[chatId];

  if (!session || !session.step) return;

  if (session.step === 'signup_username') {
    session.username = text;
    session.step = 'signup_password';
    bot.sendMessage(chatId, "🔑 Inserisci una password:");
  } else if (session.step === 'signup_password') {
    const password = text;
    db.run("INSERT INTO Utenti(Username, Password) VALUES(?, ?)", [session.username, password]);
    session.logged = true;
    session.step = null;
    bot.sendMessage(chatId, "✅ Registrazione completata! Puoi iniziare con /avvia");
  }

  if (session.step === 'login_username') {
    session.username = text;
    session.step = 'login_password';
    bot.sendMessage(chatId, "🔑 Inserisci la tua password:");
  } else if (session.step === 'login_password') {
    const password = text;
    db.get("SELECT * FROM Utenti WHERE Username=? AND Password=?", [session.username, password], (err, row) => {
      if (row) {
        session.logged = true;
        session.userId = row.Id_Utente;
        session.step = null;
        bot.sendMessage(chatId, "✅ Accesso effettuato! Pronto per giocare? /avvia");
      } else {
        session.step = null;
        bot.sendMessage(chatId, "❌ Credenziali errate. Riprova con /login");
      }
    });
  }
}

module.exports = { startSignup, startLogin, handleAuthMessages };
