---
name: google-trends
description: Check Google search trend/interest data for a product or keyword over time. Use for dropshipping product research to see if interest is rising or falling.
metadata: {"clawdbot":{"emoji":"📈","requires":{"bins":["node"]}}}
---

# Google Trends

Check search interest trends for any keyword (free, no API key needed).

## Usage

Always actually execute this shell command via the bash/shell tool:

node /app/skills-custom/google-trends/check.js "keyword here" "US"

Returns last 8 data points of relative search interest (0-100 scale) over time. Rising values suggest growing product interest; useful for dropshipping product validation.
