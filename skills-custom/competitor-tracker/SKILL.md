---
name: competitor-tracker
description: Get REAL product pricing data from any Shopify competitor store using their public products.json endpoint. Use when the user gives a Shopify store domain and wants actual current product/price data.
metadata: {"clawdbot":{"emoji":"🕵️"}}
---

# Competitor Store Tracker (Shopify)

Most Shopify stores publicly expose a JSON product feed. Use this to get REAL data — never guess or use memory.

## Instructions

Given a store domain (e.g. "gymshark.com"), always actually execute this shell command via the bash/shell tool — never just describe it or guess data from memory:

node -e 'fetch("https://STORE_DOMAIN/products.json?limit=20").then(r=>r.json()).then(d=>console.log(JSON.stringify(d.products.map(p=>({title:p.title,price:p.variants[0].price,vendor:p.vendor})),null,2))).catch(e=>console.error("Error:",e.message))'

Replace STORE_DOMAIN with the actual domain (no https://, no trailing slash).

If this returns an error or empty data, tell the user the store has disabled public JSON access — do not fabricate data.

## Output format

Present real results as a table: Product | Price | Vendor
Then summarize pricing patterns from the ACTUAL data returned.
