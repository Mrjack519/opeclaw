#!/bin/bash
cp -r /app/skills-custom/* ~/.openclaw/workspace/skills/ 2>/dev/null || true
mkdir -p ~/.openclaw/workspace && cat /app/config/AGENTS.md >> ~/.openclaw/workspace/AGENTS.md 2>/dev/null || true
openclaw skills install clawpify --acknowledge-clawhub-risk || true
openclaw skills install solo-review --acknowledge-clawhub-risk || true
openclaw skills install track17 || true
openclaw config set agents.defaults.model '{"primary":"zai/glm-4.5-flash"}' --strict-json --merge || true
openclaw models set-image groq/meta-llama/llama-4-scout-17b-16e-instruct || true
openclaw config set messages.tts '{"auto":"inbound","provider":"elevenlabs","providers":{"elevenlabs":{"apiKey":"${ELEVENLABS_API_KEY}","speakerVoiceId":"pNInz6obpgDQGcFmaJgB","modelId":"eleven_multilingual_v2"}}}' --strict-json --merge || true
exec openclaw gateway --allow-unconfigured
