---
name: voice-reply
description: Generate a spoken voice message (OGG format, Telegram-native) using ElevenLabs TTS. Use when the user asks for a voice reply or audio response.
metadata: {"clawdbot":{"emoji":"🔊","requires":{"bins":["node","ffmpeg"]}}}
---

# Voice Reply (ElevenLabs TTS, OGG output)

Always actually execute this shell command via the bash/shell tool:
node /app/skills-custom/voice-reply/send.js "text to speak here"

This produces /tmp/voice_reply.ogg (Telegram-native voice note format). Send that file to the user as a voice message using the file transfer capability.

Keep text under 300 words. Requires env var (already configured): ELEVENLABS_API_KEY
