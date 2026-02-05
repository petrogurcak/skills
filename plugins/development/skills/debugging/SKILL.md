---
name: debugging
description: Use when user says "oprav", "nefunguje", "spadá", "chyba", "proč to", "fix", "broken", "error", "crash", "doesn't work" - wrapper for systematic-debugging
---

# Debugging (Czech Wrapper)

Wrapper pro `superpowers:systematic-debugging` s českými triggery.

## Trigger Phrases

**Aktivuj tento skill když uživatel říká:**
- "oprav X" / "fix X"
- "nefunguje X" / "X doesn't work"
- "spadá X" / "X crashes"
- "chyba v X" / "error in X"
- "proč X nefunguje" / "why X doesn't work"
- "nejde X" / "X won't work"
- "pokazilo se X" / "X broke"
- "problém s X" / "problem with X"
- "selhává X" / "X fails"
- "nenahrává se X" / "X won't load"
- "zamrzá X" / "X freezes"
- Any complaint about something not working

## Action

**Immediately invoke:**
```
Skill tool: superpowers:systematic-debugging
```

**Announce:**
"Použiju systematic-debugging pro systematické nalezení příčiny."

## Why Wrapper?

Original `superpowers:systematic-debugging` má anglický popis. Tento wrapper přidává české trigger fráze, aby se skill aktivoval i na "oprav to" místo jen "fix bug".

## The Process (Summary)

1. **Root Cause Investigation** - Najdi PROČ, ne jen CO
2. **Pattern Analysis** - Najdi fungující příklad, porovnej
3. **Hypothesis Testing** - Jedna hypotéza, minimální změna
4. **Implementation** - Test first, pak fix

**Klíčové:** ŽÁDNÉ opravy bez pochopení příčiny!
