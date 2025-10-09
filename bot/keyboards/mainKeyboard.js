exports.mainKeyboard = {
  reply_markup: {
    keyboard: [
       [{ text: "📜 /avvia" }],
       [{ text: "🎯 /partite" }],
      [{ text: "🔐 /signup" }, { text: "👤 /login" }],
      [{ text: "🚀 /regole" }, { text: "📚 /aiuto" }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};
