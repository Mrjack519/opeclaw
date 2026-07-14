#!/bin/bash
cp -r /app/skills-custom/* ~/.openclaw/workspace/skills/ 2>/dev/null || true
mkdir -p ~/.openclaw/workspace && cat /app/config/AGENTS.md >> ~/.openclaw/workspace/AGENTS.md 2>/dev/null || true
openclaw skills install clawpify --acknowledge-clawhub-risk || true
openclaw skills install solo-review --acknowledge-clawhub-risk || true
openclaw skills install track17 || true
exec openclaw gateway --allow-unconfigured
