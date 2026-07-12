const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

console.log('Token:', TOKEN ? 'Set ✓' : 'NOT SET ✗');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg) => {
  console.log('Message:', msg.text);
  bot.sendMessage(msg.chat.id, 'Salam! Bot working!');
});

console.log('Bot running...');
