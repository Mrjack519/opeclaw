---
name: competitor-tracker
description: Check a competitor's Shopify/ecommerce store page for product pricing, titles, and details using browser automation. Use when the user gives a store URL and wants to see what products/prices are listed.
metadata: {"clawdbot":{"emoji":"🕵️"}}
---

# Competitor Store Tracker

Use the browser tool to visit a competitor's store URL and extract useful business intelligence.

## Instructions

When given a store URL (or product page URL):
1. Use the browser tool to navigate to the URL
2. Extract: product title, price, any discount/sale badges, product description highlights, review count/rating if visible
3. If it's a store homepage, list the top 5-8 featured/bestselling products with prices
4. Note any pricing patterns (e.g., psychological pricing like $29.99, bundle offers, free shipping threshold)
5. Summarize findings in a clean table

## Output format

Present as a short table: Product | Price | Notes
Then a 2-3 sentence summary of pricing strategy observed (useful for competitive positioning).
