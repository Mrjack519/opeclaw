---
name: brevo-email
description: Send emails via Brevo HTTP API. Use for cold outreach and any email sending task.
metadata: {"clawdbot":{"emoji":"📧","requires":{"bins":["node"]}}}
---

# Brevo Email

Send transactional/outreach emails using the Brevo API (works over HTTPS, not SMTP).

## Usage

Run: `node /app/skills-custom/brevo-email/send.js "recipient@example.com" "Subject line" "<p>HTML body</p>"`

Requires env vars: BREVO_API_KEY, BREVO_SENDER_EMAIL (a verified Brevo sender)
