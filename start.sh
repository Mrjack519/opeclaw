#!/bin/bash
set -e

mkdir -p ~/.openclaw/agents/main/agent

printf '{"profiles":{"zai:default":{"provider":"zai","type":"api_key","key":"%s"}},"order":{"zai":["zai:default"]}}' "$ZAI_API_KEY" \
> ~/.openclaw/agents/main/agent/auth-profiles.json

openclaw onboard \
  --non-interactive \
  --accept-risk \
  --mode local \
  --auth-choice zai-global \
  --zai-api-key "$ZAI_API_KEY" \
  --gateway-bind auto \
  --skip-bootstrap \
  --skip-health \
  --skip-skills

mkdir -p ~/.openclaw/workspace/skills

cp -r /app/skills-custom/brevo-email ~/.openclaw/workspace/skills/ 2>/dev/null || true
cp -r /app/skills-custom/google-trends ~/.openclaw/workspace/skills/ 2>/dev/null || true
cp -r /app/skills-custom/youtube ~/.openclaw/workspace/skills/ 2>/dev/null || true
cp -r /app/skills-custom/product-description ~/.openclaw/workspace/skills/ 2>/dev/null || true

openclaw skills install youtube || true

openclaw config set agents.defaults.model.primary "zai/glm-4.5-flash"
openclaw config set models.providers.groq.baseUrl "https://api.groq.com/openai/v1"
openclaw config set models.providers.groq.api "openai-completions"
openclaw config set models.providers.groq.apiKey '${GROQ_API_KEY}'
openclaw config set agents.defaults.imageModel "groq/meta-llama/llama-4-scout-17b-16e-instruct"
openclaw config set channels.telegram.enabled true
openclaw config set channels.telegram.botToken "$TELEGRAM_BOT_TOKEN"
openclaw config set channels.telegram.dmPolicy pairing
openclaw config set tools.profile "full"

exec openclaw gateway \
  --allow-unconfigured \
  --bind auto \
  --port "$PORT" \
  --auth token \
  --token "$OPENCLAW_GATEWAY_TOKEN" \
  --verbose
