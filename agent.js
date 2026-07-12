const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');

const TOKEN = process.env.TELEGRAM_TOKEN;

if (!TOKEN) {
  console.error('TELEGRAM_TOKEN not set!');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

async function sendVoiceReply(chatId, message) {
  const audioFile = `/tmp/voice_${Date.now()}.mp3`;
  
  exec(`sag -v Adam --no-play -o "${audioFile}" "${message}"`, (err) => {
    if (!err) {
      bot.sendAudio(chatId, fs.createReadStream(audioFile));
      fs.unlink(audioFile, () => {});
    }
  });
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  bot.sendMessage(chatId, "Salam! Main Adam hon.");
  sendVoiceReply(chatId, "Salam! Main Adam hon. Kya help chahiye?");
});

console.log('Bot running...');
