exports.setCommandList = (bot) => {
  bot.setMyCommands([
    { command: "start", description: "Avvia il bot" },
    { command: "signup", description: "Registrati al quiz" },
    { command: "login", description: "Accedi al tuo account" },
    { command: "avvia", description: "Inizia una partita" },
    { command: "partite", description: "Mostra le tue partite" },
    { command: "regole", description: "Leggi le regole del quiz" },
    { command: "aiuto", description: "Mostra i comandi disponibili" },
    { command: "logout", description: "Esci dal quiz" }
  ]);
};
