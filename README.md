# QuizBot

**QuizBot** è un progetto educativo completo che combina un **bot Telegram interattivo**, un **sito web di gestione** e una **CLI per amministratori**, permettendo di creare, giocare e gestire quiz di cultura generale.

---

## Funzionalità

### Bot Telegram
- Registrazione e login degli utenti con `/signup` e `/login`.
- Quiz interattivi con **5 domande casuali**.
- Inline keyboard per le risposte multiple.
- Visualizzazione del punteggio finale.
- Comandi principali:
  - `/start` – Avvia il bot
  - `/signup` – Registrati
  - `/login` – Login
  - `/avvia` – Inizia un quiz
  - `/partite` – Visualizza le partite giocate
  - `/regole` – Mostra le regole
  - `/aiuto` – Mostra tutti i comandi
  - `/logout` – Esci dal bot
 
Per far funzionare il bot Telegram è necessario creare un bot su Telegram e ottenere il **token**.

#### Passaggi:

1. Apri Telegram e cerca il bot **BotFather**.
2. Avvia una chat e invia il comando: \newbot
3. Segui le istruzioni per dare un **nome** e uno **username** al tuo bot.
4. BotFather ti restituirà un **token** simile a questo: 123456789:AAHxxxxxx-xxxxxxx_xxxxxxx
5. Inserisci il token nel tuo progetto (in `bot/bot.js`).
   
### Sito Web
- Realizzato con **Express.js** e **EJS**.
- Pagine per login, registrazione e visualizzazione del profilo.
- Permette agli amministratori di:
  - Creare, modificare ed eliminare domande e risposte.
  - Visualizzare gli utenti registrati.
  - Monitorare le partite e i punteggi.
Il sito sarà disponibile su http://localhost:3000

### CLI Admin
- Interfaccia a riga di comando basata su **Vorpal.js**.
- Comandi principali:
  - `aggDom` – Aggiunge una domanda
  - `aggRisp` – Aggiunge una risposta
  - `elimDom` – Elimina una domanda
  - `elimRisp` – Elimina una risposta
  - `modDom` – Modifica una domanda
  - `modRisp` – Modifica una risposta
  - `VisDom` – Visualizza tutte le domande
  - `VisRispDom` – Visualizza risposte associate a una domanda
  - `VisUt` – Visualizza tutti gli utenti registrati

---

## Tecnologie utilizzate
- **Node.js** – runtime
- **SQLite3** – database locale
- **Express.js** – server web
- **EJS** – templating
- **node-telegram-bot-api** – integrazione con Telegram
- **Vorpal.js** – CLI interattiva
- **cli-table** – visualizzazione tabelle in CLI

---

## Installazione

1. Clona il repository:
```bash
git clone https://github.com/tuo-username/QuizBot.git
cd QuizBot
```
2. Installa le dipendenze:
```bash
npm install
```
3. Avvia il progetto:
```
node app.js
```
---

## Autore

Elia Dallanoce - Creatore e manutentore del progetto
