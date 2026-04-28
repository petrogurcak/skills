---
name: ig-content
description: Use when writing Instagram copy — posts, captions, carousels, Reels captions. Produces 3-5 ready-to-paste variants in code blocks using Otto Bohuš methodology (concrete numbers over adjectives, banned words removed, sentences under 20 words, triáda). Strict output discipline - NEVER outputs HOOK/SUBSTANCE/PAYOFF labels in final copy. Trigger phrases - "napiš IG post", "create caption", "IG carousel", "Reel caption", "Instagram copy", "post pro Instagram". Do NOT use for IG planning/strategy (use ig-strategy), production setup or filming (use ig-strategy), or non-IG copy (use copywriting-orchestrator to route).
metadata:
  author: Petr
  version: 3.3.0
  ported_from: otto-copywriting-v3.3.skill
---

# 🚨 CRITICAL RULE #1: NO FRAMEWORK LABELS IN OUTPUT

**BANNED WORDS** - Never write these:
`HOOK:` `SUBSTANCE:` `PAYOFF:` `BEFORE:` `AFTER:` `BRIDGE:` `How:` `Result:` `The problem:` `The solution:` `POZNÁMKY:`

**Why:** User needs CLEAN TEXT to copy-paste, not a labeled template.

**Exception:** `Story 1:`, `Story 2:` are OK for carousel posts (content labels, not framework labels).

---

# 📱 POST TYPES

## Single Post (default)

**Trigger:** "post", "caption", or nothing specific  
**Output:** One flowing text block in code block

**Varianta 1 - Problem/Solution**

```
Most café machines break down twice a year.

This one? Zero pump failures.
Because there's no pump to fail.

[...flowing text...]

DM us 📩
```

## Carousel Post

**Trigger:** "carousel", "slides", "swipe post", "[X] slides"  
**Output:** Separate slide blocks in code block

**Varianta 1 - (3 slides)**

```
Story 1:
Most café machines break during rush hour.
Pumps fail. €800 repairs.

Story 2:
Rocket Boxer Evo? Zero pump failures.
Thermosiphon = nothing to break.

Story 3:
Built for cafés that can't afford downtime.
DM us 📩
```

---

# 📝 OUTPUT FORMAT

**Every request must return:**

1. **3-5 complete variants** (not just 1)
2. **Each variant in a visual box** (see format below)
3. **Named clearly:** "Varianta 1 - Problem/Solution (doporučuji)"
4. **Zero framework labels** (HOOK, SUBSTANCE, PAYOFF = forbidden)
5. **Story X: format** only for carousels
6. **Ready to copy-paste** (no placeholders, no [TODO])
7. **Brief recommendation** at end

## 📋 CODE BLOCK FORMAT (CRITICAL!)

**Each variant MUST be wrapped in a code block with copy button:**

Format for EACH variant:

```
**Varianta 1 - Problem/Solution (doporučuji)**

```

Most café machines break down twice a year.

This one? Zero pump failures.
Because there's no pump to fail.

Rocket Boxer Evo uses thermosiphon circulation.
30% quieter than pump-driven machines.

DM us 📩
#rockettespresso

```

```

**Rules for code blocks:**

- ✅ Title OUTSIDE code block: `**Varianta X - Type**`
- ✅ Empty line after title
- ✅ Triple backticks: ` ``` `
- ✅ Copy content INSIDE code block (ready to paste to Instagram)
- ✅ Triple backticks to close: ` ``` `
- ✅ TWO empty lines between variants

**Example output with 3 variants:**

```
**Varianta 1 - Problem/Solution (doporučuji)**

```

Most café machines break down twice a year.

This one? Zero pump failures.
Because there's no pump to fail.

Rocket Boxer Evo uses thermosiphon circulation.
30% quieter than pump-driven machines.

DM us 📩
#rockettespresso

```


**Varianta 2 - Ultra Short**

```

Zero pump failures.
Because there's no pump.

Thermosiphon = no breakdowns.

DM for specs 📩

```


**Varianta 3 - Question Hook**

```

Why does morning espresso taste different?

Same beans. Same barista. Different results.

Temperature inconsistency kills shots.

DM for demo 👇

```


**Moje doporučení:**
Varianta 1 = best storytelling
Varianta 2 = shortest
Varianta 3 = most engagement
```

**Why code blocks?**

- ✅ Copy button appears in corner (one-click copy!)
- ✅ Preserves exact formatting (line breaks, spacing)
- ✅ Easy to see what to copy
- ✅ Professional looking
- ✅ User can click "Copy" and paste directly to Instagram

**Good variant names:**

- "Varianta 1 - Problem/Solution (doporučuji)"
- "Varianta 2 - Ultra Otto (shortest)"
- "Varianta 3 - Question Hook"
- "Varianta 4 - Carousel (5 slides)"

---

# 🎯 OTTO BOHUŠ PRINCIPY (apply to all copy)

### 1. Konkrétní čísla, ne adjektivy

❌ "Kvalitní firma s dlouholetou tradicí"  
✅ "Za 24 hodin opravíme kávovar nebo sleva 50%"

❌ "Velmi tichý provoz"  
✅ "30% tišší než konkurence"

### 2. Benefity, ne vlastnosti

❌ "13.2L měděný bojler"  
✅ "Drží teplotu při 200+shot rushes"

❌ "Termosifon technologie"  
✅ "Žádná čerpadla = žádné poruchy čerpadel"

### 3. Zakázaná slova (odstraň vždy)

❌ kvalitní, profesionální, moderní, inovativní, prémiový, unikátní, nejlepší

### 4. Triáda (groups of 3)

✅ "Tichý. Spolehlivý. Tvůj."  
✅ "Žádné čerpadlo. Žádné poruchy. Žádné starosti."  
✅ "Pastel. Matte. Metallic."

### 5. Krátké věty (<20 slov)

❌ "Náš kávovar používá pokročilou thermosifon technologii, která zajišťuje, že..."  
✅ "Thermosifon cirkulace. Žádné čerpadlo. Nic se nerozbije."

### 5a. Interpunkce - Stories vs Posts (CRITICAL!)

**IG POSTS (feed) - tečky jsou OK:**

```
Most café machines break down twice a year.

This one? Zero pump failures.
Because there's no pump to fail.
```

✅ Souvislý text = tečky pomáhají čitelnosti

**IG STORIES (slides) - minimum teček:**

```
Story 1:
Custom treatment
Not basic service

Story 2:
White. Walnut. Chromium
La Marzocco Strada EP
```

✅ Každý slide = vizuální element
✅ Tečky ruší flow (except triády)

**Výjimka - Triády s tečkami:**

```
White. Walnut. Chromium.
```

✅ Tečky vytváří rhythm v triádě
✅ Ale POUZE pro triády (groups of 3)

**Pravidlo:**

- Posts → tečky jsou součást flow
- Stories → minimum teček (except triády)
- Poslední řádek slide → BEZ tečky (vždy!)

### 6. Psychologické triggery

**Scarcity:**

- "Pouze 3 kusy na skladě"
- "Poslední šance do půlnoci"
- "Pro prvních 10 zákazníků"

**Social Proof:**

- "147 kaváren v Praze používá"
- "Trusted by Cafe Savoy, Manifesto, Kavárna Plavka"
- "4.9/5 z 230+ reviews"

**Reciprocity:**

- "Pošleme ti 3 recepty zdarma"
- "Free delivery při objednávce nad 5000 Kč"
- "Bonus: gratis tamper v hodnotě 890 Kč"

### 7. Jeden jasný CTA

❌ Více CTA v jednom postu  
✅ Jedna hlavní akce: "DM us 📩" nebo "Link v bio" nebo "Rezervuj si demo"

### 8. Konverzační tón

❌ "Naše společnost nabízí špičková řešení"  
✅ "Tohle je nejjednodušší způsob jak..."

### 9. White space (Instagram)

✅ Krátké odstavce (2-3 řádky)  
✅ Mezery mezi sekcemi  
✅ Čitelnost na mobilu

### 10. Emoji strategicky

✅ Na konci (CTA): "DM us 📩"  
✅ Bullet points: 🔸 🔹 ⚡  
❌ V těle textu (ruší flow)

### 11. Hashtag Strategy (CRITICAL!)

**VŽDY přidej 3-5 relevantních hashtagů na konec KAŽDÉHO postu!**

**Mix strategie:**

- 1-2 broad hashtags (100k+ posts): reach
- 2-3 niche hashtags (10k-50k posts): engagement
- 1 brand/unique hashtag: identity

**Jak generovat:**

1. Analyzuj obsah postu (produkt/téma/industry)
2. Identifikuj niche keywords
3. Mix broad + specific
4. Relevance > popularity
5. Lowercase, no spaces: `#keyword`

**Examples by niche:**

**Coffee/Café:**

```
Broad: #coffeeshop #espresso #barista
Niche: #specialtycoffee #lamarzocco #thirdwavecoffee
Brand: #praguespecialtycoffee #coffeeroaster
```

**B2B/Tech:**

```
Broad: #business #technology #saas
Niche: #productmanagement #startuplife #b2bmarketing
Brand: #yourbrandname #industryspecific
```

**Food/Restaurant:**

```
Broad: #foodie #restaurant #finedining
Niche: #farmtotable #cheflife #pragueeats
Brand: #restaurantname #czechcuisine
```

**Rules:**

- ✅ 3-5 hashtags (more = spam look)
- ✅ Relevantní k obsahu
- ✅ Mix broad + niche
- ✅ Na konci (after CTA, before emojis)
- ✅ Lowercase, no emojis in hashtag
- ✅ Research: check if hashtag exists & is active
- ❌ Generic spam (#love #instagood #photooftheday)
- ❌ Nerelevantní hashtags
- ❌ Hashtags v těle textu
- ❌ Banned/spam hashtags

**Format in post:**

```
[Post content with hook-substance-payoff]

DM us 📩

#relevant #niche #hashtags #max5
```

**Stories:** NO hashtags (ruší vizuál, lepší je location tag nebo mention)

---

# 🎬 STORYTELLING FRAMEWORKS (internal use only)

**Never write framework names in output!** Use them to structure your thinking.

### Quick Reference:

**7-Sentence Framework** (daily posts)

- 1 věta: Kontext
- 2 věty: Problém
- 2 věty: Řešení
- 1 věta: Výsledek
- 1 věta: Ponaučení

**Before-After-Bridge** (product launches)

- Before: Current problem state
- After: Ideal state
- Bridge: How to get there

**Problem-Agitate-Solve** (sales)

- Problem: Introduce issue
- Agitate: Make it worse (emotions)
- Solve: Present solution

**For full framework details, see:** `references/storytelling-frameworks.md`

---

# 🔄 WORKFLOW

### Step 1: Identify Post Type

- User said "carousel"/"slides"? → Carousel format
- User said "post"/"caption" or nothing? → Single post

### Step 2: Choose Framework (internal)

- Daily content → 7-Sentence
- Product launch → Before-After-Bridge
- Sales → Problem-Agitate-Solve
- Brand story → Hero's Journey or Pixar
- Values → Golden Circle

### Step 3: Apply Otto Principles (internal)

- Replace adjectives with numbers
- Convert features to benefits
- Remove banned words
- Add triads
- Use psychological triggers
- Keep sentences <20 words

### Step 4: Write Clean Copy

- NO framework labels (HOOK, SUBSTANCE, PAYOFF)
- YES Story 1, 2, 3 if carousel
- **WRAP each variant in code block** (triple backticks)
- Title OUTSIDE code block
- 3-5 complete variants
- Name each variant
- TWO empty lines between variants
- End with recommendation

### Step 5: Final Check

- [ ] Post type correct? (single vs carousel)
- [ ] Zero framework labels?
- [ ] 3-5 variants?
- [ ] **Each variant in code block?** (```)
- [ ] Title OUTSIDE code block?
- [ ] **3-5 relevant hashtags added?** (after CTA)
- [ ] **Interpunkce correct?** (Posts = tečky OK, Stories = minimum)
- [ ] TWO empty lines between variants?
- [ ] All Otto principles applied?
- [ ] Concrete numbers used?
- [ ] Banned words removed?
- [ ] Ready to copy-paste?

---

# 📋 INSTAGRAM BEST PRACTICES

**Hook (first 3-5 lines):**

- Stop the scroll
- Question, bold claim, or conflict
- Examples: "Why do machines break at 8 AM?", "Most baristas waste €500/year", "You're overdosing every shot"

**Substance (75-80% of post):**

- Deliver value promised in hook
- Use specific numbers and facts
- Show transformation or solution
- Keep paragraphs 2-3 lines max

**Payoff (last 2-3 lines):**

- Fulfill hook promise
- Clear CTA
- **3-5 relevant hashtags** (after CTA)

**Interpunkce - Posts vs Stories:**

- **Posts:** Tečky jsou součást flow (OK)
- **Stories:** Minimum teček (ruší vizuál)
- **Výjimka:** Triády s tečkami pro rhythm

**Hashtags:**

- Always include 3-5 relevant hashtags
- Mix broad (reach) + niche (engagement)
- Place at END of post (after CTA)
- Research relevance before using
- NO hashtags in Stories (use location/mention instead)

**Carousel specific:**

- First slide = strongest hook
- Each slide = self-contained idea
- Last slide = clear CTA
- 3-10 slides optimal
- **Stories slides:** Minimize punctuation (except triads)

---

# 🎯 EXAMPLES

### Single Post Example:

**Varianta 1 - Problem/Solution**

```
Your grinder wastes €500 annually.

Every overdose adds up:
0.5g per shot × 200 shots/day × 365 days = 36.5kg wasted.

Built-in scales fix this.
Pay for themselves in 6 months.

Ready to save?
DM us 📩

#coffeeshop #barista #specialtycoffee #coffeeequipment
```

**Varianta 2 - Question Hook**

```
Why does morning espresso taste different?

Same beans. Same barista. Different results.

Temperature inconsistency kills shots.

Strada X1 reads puck 40x/second.
Adjusts automatically.
Perfect extraction. Every time.

DM for demo 👇

#espresso #lamarzocco #coffeepro #baristaskills
```

**Moje doporučení:**
Varianta 1 = best for showing ROI
Varianta 2 = best for engagement

### Carousel Example (Stories format):

**Varianta 1 - (3 slides)**

```
Story 1:
€800 repair bills killing your margin

Pumps fail
Seals leak
Downtime costs more

Story 2:
Rocket Boxer Evo eliminates this

No pump = no failures
Thermosiphon circulation
40% fewer service calls

Story 3:
Built for cafés that can't afford downtime

DM for specs 📩
```

**Moje doporučení:**
Notice: Minimal punctuation in stories for clean visual
Hashtags: Better to use location tag or @mention instead

---

# ⚡ QUICK TIPS

**Iterate easily:**

- "Zkrať to"
- "Přidej více čísel"
- "Změň hook na question"
- "Udělej carousel místo single post"

**Mix & Match:**

- "Vezmi hook z Varianty 1 a substance z Varianty 3"
- "Kombinuj PAS framework s question hookem"

**Specify:**

- "V češtině" / "In English"
- "Přesně 5 slidů"
- "Ultra krátký Otto styl"
- "Více storytelling, méně hard sell"

---

# 🚫 NEVER DO

❌ Output framework labels (HOOK:, SUBSTANCE:, PAYOFF:)  
❌ Only 1 variant (always 3-5)  
❌ **Forget code blocks around variants** (must use triple backticks!)  
❌ **Put title INSIDE code block** (title must be outside!)  
❌ Variants without clear separation (need code blocks!)  
❌ **Posts without hashtags** (always add 3-5 relevant ones!)  
❌ **Generic hashtags** (#love #instagood = spam)  
❌ **Too many periods in stories** (ruší vizuál)  
❌ Placeholders [Your Brand], [TODO], [Fill This]  
❌ Generic words (quality, professional, modern)  
❌ Long sentences (>20 words)  
❌ Multiple CTAs in one post  
❌ Vague claims without numbers

---

# ✅ ALWAYS DO

✅ 3-5 complete variants  
✅ **Wrap each variant in code block** (triple backticks ```)  
✅ **Title OUTSIDE code block** (`**Varianta X - Type**`)  
✅ **TWO empty lines between variants**  
✅ **Add 3-5 relevant hashtags** to EVERY post (after CTA)  
✅ **Posts:** Tečky jsou OK (flow)  
✅ **Stories:** Minimum teček (except triády)  
✅ Zero framework labels  
✅ Concrete numbers instead of adjectives  
✅ Benefits instead of features  
✅ Short sentences (<20 words)  
✅ One clear CTA  
✅ Triads (groups of 3)  
✅ White space (Instagram)  
✅ Conversational tone  
✅ Psychological triggers  
✅ Name each variant clearly  
✅ Brief recommendation at end

---

# 📚 REFERENCE FILES

- **Hook formulas (50+):** [references/hooks.md](./references/hooks.md)
- **Real examples:** [references/examples.md](./references/examples.md)
- **Storytelling frameworks (internal use):** [references/storytelling-frameworks.md](./references/storytelling-frameworks.md)

**Plugin-shared references:**

- **Otto principles (universal):** [../../core-copywriting-principles.md](../../core-copywriting-principles.md)
- **365 copy triků (Mužíková):** [../../365-copy-triky.md](../../365-copy-triky.md) — micro-tipy pro hooks, CTAs, anti-clichés

---

# 🔗 Related Skills

- **`ig-strategy`** — IG planning, formats, technical setup, engagement, monetizace. Invoke when user shifts from writing to "co/kdy točit".
- **`ig-orchestrator`** — IG family router. Auto-invokes ig-content for writing requests.
- **`storytelling`** — generic storytelling frameworks (ABT, SB7, 9 SM frameworks). Used internally for framework selection.
- **`copywriting-orchestrator`** — top-level router for non-IG copy.
- **`marketing:sell-like-crazy`** — when IG post is conversion-driven (DM funnel, link-in-bio sales, launch promo), apply Phase 4 (Godfather Offer compression in caption) and Phase 6 (VSL pattern interrupt + agitation in 3-slide carousel structure). Reference banka with 27 frameworks: `plugins/marketing/sell-like-crazy.md`.

**Future siblings (planned):** `ig-reels`, `ig-stories`, `ig-carousel`, `ig-ads`, `ig-analytics`.

---

**Remember:** Framework = your internal tool. Output = clean copy for user. NEVER confuse the two.
