const { db, get, all, run } = require('../../db/db');

/**
 * ==========================
 * 🔹 FUNZIONI DI LOGICA QUIZ
 * ==========================
 */

/**
 * Estrae una domanda casuale non ancora usata nella sessione
 * @param {object} session sessione utente corrente
 * @returns {Promise<{domanda: object, risposte: array}>}
 */
async function generaDomandaCasuale(session) {
  if (!session.domandeUsate) session.domandeUsate = [];

  const totalRow = await get("SELECT COUNT(Id_Domanda) AS cnt FROM Domande");
  if (!totalRow || !totalRow.cnt) throw new Error("Nessuna domanda nel database.");

  // Prendi tutte le domande non ancora usate
  const rows = await all(
    `SELECT * FROM Domande WHERE Id_Domanda NOT IN (${session.domandeUsate.join(',') || '0'})`
  );

  if (!rows.length) throw new Error("Hai esaurito tutte le domande disponibili.");

  // Estrai una domanda casuale
  const randomIndex = Math.floor(Math.random() * rows.length);
  const domanda = rows[randomIndex];

  // Salva l'id della domanda usata nella sessione
  session.domandeUsate.push(domanda.Id_Domanda);

  // Prendi le risposte associate
  const risposte = await all("SELECT * FROM Risposte WHERE Fk_Domanda=?", [domanda.Id_Domanda]);

  return { domanda, risposte };
}

/**
 * Verifica se la risposta fornita è corretta
 */
async function verificaRisposta(id_dom, risposta) {
  const corretto = await get(
    "SELECT * FROM Risposte WHERE Fk_Domanda=? AND Correttezza='True'",
    [id_dom]
  );
  return corretto && corretto.Risposta === risposta;
}

/**
 * Salva il punteggio finale dell'utente
 */
async function salvaPunteggio(userId, punti) {
  const date = new Date().toISOString().split('T')[0];
  await run(
    "INSERT INTO Partite(Fk_Utente, Punteggio, Data) VALUES(?, ?, ?)",
    [userId, punti, date]
  );
}

/**
 * ==========================
 * 🔹 FUNZIONI BOT - QUIZ
 * ==========================
 */

/**
 * Avvia un nuovo quiz per l'utente
 */
async function avviaQuiz(bot, chatId, sessions) {
  const session = sessions[chatId];
  if (!session || !session.logged) {
    return bot.sendMessage(chatId, "❌ Devi effettuare il login prima! Usa /login");
  }

  // Inizializza sessione quiz
  session.quizNum = 0;
  session.punti = 0;
  session.domandeUsate = [];

  await inviaDomanda(bot, chatId, session);
}

/**
 * Invia una domanda con tastiera inline
 */
async function inviaDomanda(bot, chatId, session) {
  try {
    const { domanda, risposte } = await generaDomandaCasuale(session);
    session.currentDomanda = domanda.Id_Domanda;

    const inline_keyboard = risposte.map(r => [{
      text: r.Risposta,
      callback_data: `${r.Risposta}|${domanda.Id_Domanda}`
    }]);

    await bot.sendMessage(
      chatId,
      `❓ <b>Domanda ${session.quizNum + 1}:</b>\n${domanda.Domanda}`,
      { parse_mode: "HTML", reply_markup: { inline_keyboard } }
    );
  } catch (err) {
    console.error("Errore invio domanda:", err.message);
    await bot.sendMessage(chatId, "❌ Errore durante il quiz. Riprova con /avvia");
  }
}

/**
 * Gestione delle risposte del quiz (callback)
 */
function handleQuizCallbacks(bot, sessions) {
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const session = sessions[chatId];
    if (!session || !session.logged) return;

    try {
      const [scelta, id_dom] = query.data.split("|");
      const ok = await verificaRisposta(id_dom, scelta);

      if (ok) session.punti += 1000;

      await bot.answerCallbackQuery(query.id, {
        text: ok
          ? `✅ Corretto! Punti totali: ${session.punti}`
          : `❌ Sbagliato!`,
        show_alert: true
      });

      session.quizNum++;

      if (session.quizNum >= 5) {
        await bot.sendMessage(
          chatId,
          `🎉 Quiz terminato!\nPunteggio finale: <b>${session.punti}</b> punti`,
          { parse_mode: "HTML" }
        );

        await salvaPunteggio(session.userId, session.punti);
      } else {
        await inviaDomanda(bot, chatId, session);
      }
    } catch (err) {
      console.error("Errore callback quiz:", err.message);
      await bot.sendMessage(chatId, "❌ Errore durante il quiz. Riprova con /avvia");
    }
  });
}

module.exports = {
  avviaQuiz,
  handleQuizCallbacks,
  generaDomandaCasuale,
  verificaRisposta,
  salvaPunteggio
};
