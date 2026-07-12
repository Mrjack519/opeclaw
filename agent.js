const TelegramBot = require('node-telegram-bot-api');
const { execSync } = require('child_process');
const fs = require('fs');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TOKEN) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN not set!');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

console.log('✓ Bot started');

// Voice reply
function sendVoice(chatId, text) {
  try {
    const file = `/tmp/voice_${Date.now()}.mp3`;
    const cmd = `sag -v Adam --no-play -o "${file}" "${text.replace(/"/g, '\\"')}"`;
    
    execSync(cmd);
    
    if (fs.existsSync(file)) {
      bot.sendAudio(chatId, fs.createReadStream(file));
      setTimeout(() => fs.unlink(file, () => {}), 1000);
    }
  } catch (e) {
    console.error('Voice error:', e.message);
  }
}

// Message handler
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || 'Hello';

  console.log(`Message from ${chatId}: ${text}`);

  // Send text
  bot.sendMessage(chatId, `Salam! Aapne likha: ${text}`);

  // Send voice
  sendVoice(chatId, `Salam! Aapne likha: ${text}`);
});

bot.on('polling_error', (err) => console.error('Polling error:', err));
