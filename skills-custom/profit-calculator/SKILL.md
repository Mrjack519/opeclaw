---
name: profit-calculator
description: Calculate dropshipping profit margins, ROI, and break-even given product cost, selling price, and shipping. Use when the user wants to know if a product is profitable before listing it.
metadata: {"clawdbot":{"emoji":"💰"}}
---

# Dropshipping Profit Calculator

Calculate profit for a dropshipping product given these inputs:
- AliExpress/supplier cost
- Shipping cost (if separate)
- Selling price on Shopify
- Ad spend estimate (optional, default 30% of selling price if not given)
- Payment processing fee (assume 2.9% + $0.30 for Shopify Payments if not specified)

## Calculation

1. Total cost = supplier cost + shipping cost + payment processing fee
2. Gross profit = selling price - total cost
3. Net profit (after ads) = gross profit - ad spend estimate
4. Profit margin % = (net profit / selling price) * 100
5. Recommended minimum selling price for 30% net margin

## Output format

Show a clean breakdown table with all costs, then a clear verdict:
- ✅ Good margin (30%+ net)
- ⚠️ Thin margin (10-30% net)
- ❌ Not profitable (<10% net or negative)

Always do the math yourself using your reasoning — no external tool needed.
