const [,, to, subject, ...bodyParts] = process.argv;
const html = bodyParts.join(" ");
fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: {
    "accept": "application/json",
    "api-key": process.env.BREVO_API_KEY,
    "content-type": "application/json"
  },
  body: JSON.stringify({
    sender: { name: "OpenClaw", email: process.env.BREVO_SENDER_EMAIL },
    to: [{ email: to }],
    subject: subject,
    htmlContent: html
  })
}).then(r => r.json()).then(r => console.log(JSON.stringify(r))).catch(e => console.error(e.message));
