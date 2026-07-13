---
name: voice-listen
description: Transcribe an audio/voice file to text using Groq Whisper (free). Use when the user sends a voice message and you need to understand what they said.
metadata: {"clawdbot":{"emoji":"🎙️","requires":{"bins":["node"]}}}
---

# Voice Listen (Groq Whisper STT)

When the user sends a voice message, always actually execute:
node /app/skills-custom/voice-listen/transcribe.js "/path/to/voice/file"

Returns JSON with a "text" field containing the transcription. Requires env var: GROQ_API_KEY (already configured).
