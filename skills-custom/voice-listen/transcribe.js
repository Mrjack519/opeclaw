const fs = require("fs");
const [,, audioPath] = process.argv;
const form = new FormData();
form.append("file", new Blob([fs.readFileSync(audioPath)]), "audio.ogg");
form.append("model", "whisper-large-v3");
fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
  method: "POST",
  headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
  body: form
})
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d)))
  .catch(e => console.error("Error:", e.message));
