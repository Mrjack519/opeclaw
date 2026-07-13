const { execSync } = require("child_process");
const fs = require("fs");
const [,, text] = process.argv;
const voiceId = "pNInz6obpgDQGcFmaJgB";
fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
  method: "POST",
  headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ text: text, model_id: "eleven_multilingual_v2" })
})
  .then(r => r.arrayBuffer())
  .then(buf => {
    fs.writeFileSync("/tmp/voice_reply.mp3", Buffer.from(buf));
    execSync("ffmpeg -y -i /tmp/voice_reply.mp3 -c:a libopus -b:a 64k /tmp/voice_reply.ogg");
    console.log(JSON.stringify({ success: true, path: "/tmp/voice_reply.ogg" }));
  })
  .catch(e => console.error("Error:", e.message));
