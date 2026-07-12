const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// Voice reply function
async function sendVoiceReply(chatId, message) {
  const audioFile = `/tmp/voice_${Date.now()}.mp3`;

  return new Promise((resolve, reject) => {
    exec(`sag -v Adam --format mp3_44100_128 --no-play -o "${audioFile}" "${message}"`, (err) => {
      if (err) {
        console.error('Sag error:', err);
        reject(err);
        return;
      }

      const fileStream = fs.createReadStream(audioFile);
      bot.sendAudio(chatId, fileStream, {})
        .then(() => {
          fs.unlink(audioFile, () => {});
          resolve();
        })
        .catch(reject);
    });
  });
}

// Bot handlers
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const reply = "Salam! Main Adam hon. Kya help chahiye?";
  
  await bot.sendMessage(chatId, reply);
  await sendVoiceReply(chatId, reply);
});

bot.onText(/(.+)/, async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;
  
  const aiReply = `Aapne likha: ${userMessage}`;
  
  await bot.sendMessage(chatId, aiReply);
  await sendVoiceReply(chatId, aiReply);
});

console.log('Bot started...');
