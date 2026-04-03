---
name: finance-ops
description: Tracks unit economics, hidden costs, and margins across projects. Use when calculating CAC, LTV, margin analysis, cost breakdowns, or comparing profitability between projects. Trigger phrases — "unit economics", "kolik nas stoji zakaznik", "marze", "hidden costs", "kolik vydelavame", "cost per project", "financni prehled", "burn rate", "runway".
metadata:
  author: Petr
  version: 1.0.0
---

# Finance Ops — Unit Economics & Cost Tracking

## Overview

Framework pro sledovani unit economics, skrytych nakladu a marzi across multiple projektu. Ne ucetnictvi — to dela Fakturoid. Tohle je analyticka vrstva nad financnimi daty.

**Announce:** "I'm using finance-ops to analyze unit economics and cost structure."

## When to Use

**USE this skill:**

- "Kolik nas stoji zakaznik?" (CAC)
- "Kolik vydelavam na projektu X?"
- "Kde unikaji penize?"
- Multi-projekt porovnani marzi
- Rozhodovani o alokaci casu/penez mezi projekty
- Kvartalni financni review

**DON'T use this skill:**

- Pricing strategy → `marketing:pricing`
- SaaS metriky (MRR, churn) → `growth:saas-bootstrap`
- Investicni rozhodnuti → ne automatizovat, konzultovat

## Step 1: Project Inventory

Seber data pro kazdy aktivni projekt:

```markdown
## Project: {name}

### Revenue
- MRR/revenue: {castka}/mesic
- Zdroj revenue: {subscription / one-time / commission / mixed}
- Pocet platících zákazníků: {count}
- ARPU (Average Revenue Per User): {MRR / pocet zakazniku}

### Costs — Direct
- Hosting/infra: {castka}/mesic
- API costs (AI, email, SMS): {castka}/mesic
- Domain + SSL: {castka}/rok → {mesicne}
- SaaS nastroje specifické pro projekt: {list + castky}

### Costs — Indirect (alokované)
- Petrův čas: {hodiny/mesic} × {hodinova sazba}
- AI tools (Claude, Gemini): poměrný podíl dle usage
- Sdílená infrastruktura (server, CDN): poměrný podíl

### Costs — Hidden (často přehlížené)
- Support čas (odpovídání na emaily, bug fixy)
- Context switching cost (přepínání mezi projekty)
- Opportunity cost (co by ten čas vydělal jinde)
- Technical debt servicing (workaroundy, manuální procesy)
```

## Step 2: Unit Economics Výpočet

Pro každý projekt spočítej:

### Klíčové metriky

| Metrika | Vzorec | Zdravý benchmark |
|---------|--------|------------------|
| **Gross Margin** | (Revenue - Direct Costs) / Revenue | > 70% pro SaaS |
| **Net Margin** | (Revenue - All Costs) / Revenue | > 20% pro bootstrapped |
| **CAC** | Marketing spend / New customers (měsíc) | < 1/3 LTV |
| **LTV** | ARPU × Average Customer Lifetime (months) | > 3× CAC |
| **LTV:CAC Ratio** | LTV / CAC | 3:1 až 5:1 optimální |
| **Payback Period** | CAC / ARPU | < 12 měsíců |
| **Revenue per Hour** | Net Revenue / Hours Invested | Porovnej s consulting rate |

### Break-even analýza

```
Break-even zákazníci = Fixed Costs / (ARPU - Variable Cost per User)
```

Pokud projekt nedosáhl break-even, spočítej:
- Kolik zákazníků chybí
- Při současném growth rate, kdy dosáhne break-even

## Step 3: Multi-Project Srovnání

```markdown
## Portfolio Overview — {měsíc/kvartál}

| Projekt | Revenue | Costs | Net Margin | Rev/Hour | LTV:CAC | Trend |
|---------|---------|-------|------------|----------|---------|-------|
| ...     | ...     | ...   | ...        | ...      | ...     | ...   |

### Alokace času
| Projekt | Hodiny/měsíc | % času | Revenue/hour |
|---------|-------------|--------|-------------|
| ...     | ...         | ...    | ...         |

### Rozhodovací matice
| Projekt | Margin | Growth | Strategic Value | Effort | Verdict |
|---------|--------|--------|-----------------|--------|---------|
| ...     | H/M/L  | H/M/L  | H/M/L           | H/M/L  | Scale/Maintain/Wind down |
```

## Step 4: Cost Leaks Detection

Systematicky hledej kde unikají peníze:

### Checklist skrytých nákladů

1. **SaaS subscriptions** — Nepoužívané nebo duplikátní nástroje?
2. **Over-provisioned infra** — Platíš za kapacitu kterou nevyužíváš?
3. **Manual processes** — Děláš ručně něco co jde automatizovat? Kolik hodin/měsíc?
4. **Support burden** — Který projekt generuje nejvíc support požadavků per zákazník?
5. **API waste** — Zbytečné API cally, neoptimalizované prompty (AI costs)?
6. **Zombie features** — Udržuješ kód/infra pro feature co nikdo nepoužívá?
7. **Context switching** — Kolikrát denně přepínáš mezi projekty? (každé přepnutí = ~25 min ztráta)
8. **Opportunity cost** — Hodina na projektu s margin 10% vs projekt s margin 40%

### Akční výstup

Pro každý nalezený leak:

```markdown
### Leak: {název}
- **Projekt:** {který}
- **Náklad:** {kolik měsíčně / ročně}
- **Fix:** {konkrétní akce}
- **Effort:** {hodiny na fix}
- **ROI fixu:** {ušetřeno za rok / effort na fix}
```

## Step 5: Doporučení

Na základě analýzy doporuč:

1. **Scale** — Projekty s vysokou margin + growth potenciálem → přidat čas/investici
2. **Maintain** — Projekty s OK margin, stabilní → automatizovat a minimalizovat effort
3. **Wind down** — Projekty s nízkou margin, žádný growth → exit strategie
4. **Fix** — Konkrétní cost leaky s vysokým ROI fixu

### Decision Framework

```
Stojí za to investovat další hodinu do projektu X?

1. Jaká je Revenue/Hour pro tento projekt? → Porovnej s alternativami
2. Je projekt v growth fázi (investment) nebo harvest fázi (profit)?
3. Má strategickou hodnotu beyond revenue? (learning, portfolio, brand)
4. Mohl bych tu hodinu investovat do projektu s vyšší margin?
```

## Output Format

```markdown
# Finance Ops Report — {období}

**Datum:** {date}
**Projekty:** {seznam}

## Executive Summary
{2-3 věty — celkové zdraví portfolia, top insight}

## Portfolio Metrics
{tabulka z Step 3}

## Per-Project Detail
{detail z Step 2 pro každý projekt}

## Cost Leaks
{findings z Step 4}

## Doporučení
{akční body z Step 5}

## Příští review
{kdy, co sledovat}
```

## Zdroje dat

- **Fakturoid** — faktury, příjmy (export CSV)
- **Bankovní výpisy** — reálné cash flow
- **Stripe** — SaaS subscription revenue
- **Google Analytics** — pro CAC výpočet (traffic → conversion)
- **Time tracking** — pokud existuje. Jinak odhad hodin/měsíc per projekt.
- **SaaS subscriptions** — projít email za posledních 12 měsíců pro subscription receipts

## Periodicita

- **Měsíčně:** Quick check Revenue/Hour per projekt (15 min)
- **Kvartálně:** Full unit economics review (1-2h)
- **Ad-hoc:** Před rozhodnutím o novém projektu nebo exit z existujícího
