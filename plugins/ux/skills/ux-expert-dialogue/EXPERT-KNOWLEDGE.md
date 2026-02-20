# Expert Knowledge Database

**Comprehensive research, principles, and data for evidence-based critique.**

**Usage:** Expert cituje z této knowledge base během review sessions pro data-backed arguments.

---

## Cognitive Psychology Principles

### 1. Hick's Law

**Principle:** Decision time increases logarithmically with number of choices.

**Formula:** `T = b × log2(n + 1)`

- T = time to decide
- n = number of choices
- b = empirically derived constant

**Application:**

- Limit menu items to 5-7
- Reduce product options per page
- Simplify checkout steps
- One primary CTA per section

**Data:**

- Each additional menu item: +10% decision time
- 10 choices vs 5 choices: +30% paralysis (Sheena Iyengar study)

**Example critique:**
"Máš 15 menu items. Hick's Law říká že každý additional item zvyšuje decision time o ~10%. User tráví 150% více času než s 7 items → frustrace → bounce."

---

### 2. Fitts's Law

**Principle:** Time to click target depends on distance and size.

**Formula:** `T = a + b × log2(D/W + 1)`

- T = time to move
- D = distance to target
- W = width of target

**Application:**

- CTA buttons large enough (min 44x44px)
- Important elements near cursor path
- Touch targets spaced apart (mobile)
- Reduce distance for frequent actions

**Data:**

- Doubling size: -25% click time
- Min touch target: 44x44px (Apple/Google guidelines)
- Larger CTAs: +42% mobile conversion (Google study)

**Example critique:**
"Tvůj CTA button je 20x20px. Fitts's Law říká že double size = 25% faster clicks. Na mobilu to je literally un-clickable (min 44x44px). Očekávaná ztráta: ~40% mobile conversions."

---

### 3. Miller's Law

**Principle:** Average person can hold 7±2 items in working memory.

**Application:**

- Menu items: 5-9 max
- Form fields per screen: <7
- Bullet points: 3-5 ideal
- Steps in process: <5

**Data:**

- 7±2 items: optimal retention (George Miller, 1956)
- > 9 items: Significant drop in recall
- Chunking improves: Group into 3-4 categories

**Example critique:**
"12 bullet points v benefit section. Miller's Law říká 7±2 max pro retention. User si zapamatuje ~5-7, zbytek ignoruje. Prioritizuj top 5, zbytek schováš pod 'See all features'."

---

### 4. Von Restorff Effect (Isolation Effect)

**Principle:** Items that stand out are remembered better.

**Application:**

- Isolate primary CTA with whitespace
- Use contrasting color for important elements
- One hero element per section
- Make errors visually distinct

**Data:**

- Isolated elements: +94% recall (Von Restorff, 1933)
- Whitespace around CTA: +232% effectiveness (GoodUI)

**Example critique:**
"Tvůj CTA je modrý button mezi dalšími 5 blue buttons. Von Restorff Effect říká že musí stand out. Změň primary CTA na orange (contrast) + přidej whitespace. Expected: +200% clicks."

---

### 5. Serial Position Effect

**Principle:** People remember first and last items best (primacy & recency).

**Application:**

- Most important benefit first
- Strong closing CTA
- Key info at start/end of list
- Bury optional/less important in middle

**Data:**

- First item: +40% recall vs. middle
- Last item: +35% recall vs. middle

**Example critique:**
"Nejsilnější benefit ('Reduce costs 60%') je na 4. pozici. Serial Position Effect říká že první + poslední = best recall. Dej ho na #1 nebo #5 (pokud máš 5 total)."

---

### 6. Cognitive Load Theory

**Principle:** Working memory has limited capacity. Overload causes failure.

**Types:**

- **Intrinsic:** Complexity of task itself
- **Extraneous:** Unnecessary cognitive effort (bad design)
- **Germane:** Mental effort for learning/schema building

**Application:**

- Reduce extraneous load (clear hierarchy, no clutter)
- Progressive disclosure (don't show everything at once)
- Consistency (same patterns = less cognitive effort)
- Clear error messages (reduce problem-solving load)

**Data:**

- Cluttered pages: +35% task completion time (Nielsen)
- Clear hierarchy: +124% scan efficiency (Eyetrack III study)

**Example critique:**
"Homepage má 8 different font sizes, 12 colors, no clear hierarchy. Extraneous cognitive load je massive. User tráví mental energy na 'kde se mám dívat' místo 'chci tohle koupit'. Simplify: 2-3 font sizes, single primary color, clear F-pattern."

---

### 7. Peak-End Rule (Kahneman)

**Principle:** People judge experience by peak moment + end, not average.

**Application:**

- Make checkout final step delightful (not just "Order confirmed")
- Surprise delight moments in flow
- Strong ending to content (CTA + benefit reminder)
- Thank you page = opportunity for positive end

**Data:**

- Peak experience: +300% positive recall (Kahneman & Tversky)
- Negative end: Ruins entire experience perception

**Example critique:**
"Thank you page je generic 'Děkujeme za nákup'. Peak-End Rule říká že tento final moment shapes celkovou perception. Add: unexpected bonus (10% off next), share on social CTA, personalized message. Expected: +40% repeat purchase."

---

## Conversion Rate Research

### Headlines

| Finding                | Impact                | Source               |
| ---------------------- | --------------------- | -------------------- |
| Odd numbers            | +21% CTR vs even      | Outbrain, 2014       |
| Negative framing       | +30% vs neutral       | Outbrain, 2014       |
| Positive framing       | -29% vs neutral       | Outbrain, 2014       |
| Optimal length         | 8 words               | The Guardian         |
| First 2 words critical | ~11 characters decide | Nielsen eye-tracking |
| Specific numbers       | +206% credibility     | Moz study            |
| Question headlines     | +150% engagement      | HubSpot              |
| With numbers           | +73% social shares    | BuzzSumo             |

**Application:**
"Místo 'Get More Leads' (3 slova, positive, generic) zkus '7 Ways to Stop Losing 60% of Leads' (9 slov, odd number, negative framing, specific). Expected: +50% CTR combo effect."

---

### Forms

| Finding                   | Impact                    | Source             |
| ------------------------- | ------------------------- | ------------------ |
| Each additional field     | -10% conversion           | Baymard Institute  |
| Inline validation         | +22% completion           | Luke Wroblewski    |
| Password show/hide        | +10-20% completion        | ux-optimization #3 |
| Social login (18-25)      | +20-40% conversion        | ux-optimization #5 |
| Specific errors           | +15-25% vs generic        | ux-optimization #2 |
| Mobile correct keyboard   | +15-30% mobile conversion | ux-optimization #6 |
| Removed 1 field (Expedia) | +$12M annual revenue      | Baymard case study |
| Labels above fields       | +20% mobile completion    | Google study       |
| Progress indicator        | +11% checkout completion  | KoMarketing        |

**Application:**
"Máš 12 polí. 12-5 = 7 extra polí × 10% = 70% ztráta. Pokud current conversion je 10%, měl by být ~34% s 5 poli. Revenue impact: Massive."

---

### CTAs (Call-to-Action)

| Finding                 | Impact                 | Source          |
| ----------------------- | ---------------------- | --------------- |
| First-person            | +90% conversion vs 2nd | Unbounce        |
| Specific vs generic     | +213% clicks           | Michael Aagaard |
| Action verbs            | +121%                  | ContentVerve    |
| High contrast           | +21% avg lift          | VWO             |
| Above fold              | +300% visibility       | Nielsen         |
| After major benefit     | +60% conversion        | CRE             |
| Larger buttons (mobile) | +42% conversion        | Google          |
| Button vs text link     | +45% clicks            | Paras Chopra    |
| Orange/Green color      | +34% best performing   | Eyequant        |

**Application:**
"'Submit' button text → 'Get My Free Trial' = first-person (+90%) + specific (+213%) + action verb (+121%). Combined expected lift: +150-250%."

---

### E-commerce

| Finding                    | Impact                    | Source              |
| -------------------------- | ------------------------- | ------------------- |
| Multiple product photos    | +20-40% add-to-cart       | ux-optimization #9  |
| Zoom functionality         | +9% conversion            | Salsify             |
| 360° view                  | +27% engagement           | Cappasity           |
| Size guide                 | +15-25% return reduction  | ux-optimization #10 |
| Virtual try-on             | +36% purchase likelihood  | Shopify             |
| Reviews presence           | +270% purchase likelihood | Spiegel             |
| Photos in reviews          | +94% helpful rating       | PowerReviews        |
| Free shipping              | +50% cart value           | UPS                 |
| Transparent shipping costs | +35% completion           | CRE                 |
| Guest checkout             | +45% 1st-time completion  | Forrester           |
| Cart abandonment avg       | 69.8%                     | Baymard 2023        |

---

### Visual Design

| Finding               | Impact                  | Source       |
| --------------------- | ----------------------- | ------------ |
| Caption under image   | +10% readership         | Ogilvy       |
| Captions              | 300% engagement vs body | Ogilvy       |
| Whitespace around CTA | +232% effectiveness     | GoodUI       |
| Clear hierarchy       | +124% scan efficiency   | Eyetrack III |
| F-pattern layout      | Natural scan behavior   | Nielsen      |
| Contrast ratio 4.5:1  | WCAG AA standard        | W3C          |
| Color consistency     | +80% brand recognition  | Loyola Univ  |
| Visual clutter        | +35% task time          | Nielsen      |

---

### Social Proof

| Finding                         | Impact                   | Source                  |
| ------------------------------- | ------------------------ | ----------------------- |
| Testimonials with photo         | +45% credibility         | Nielsen Norman          |
| Video testimonials              | 2x trust vs text         | Wyzowl                  |
| Specific results in testimonial | +62% persuasiveness      | BrightLocal             |
| "Join X customers"              | +15% conversion          | Cialdini                |
| Odd numbers in stats            | +23% believability       | Moz                     |
| Security badges                 | +18% checkout completion | Baymard                 |
| Money-back guarantee            | +25% sales               | Harvard Business Review |
| Trust seals                     | +42% purchase confidence | Baymard                 |

---

## Case Studies Database

### UVP / Messaging

| Company      | Change                                      | Impact                       | Source           |
| ------------ | ------------------------------------------- | ---------------------------- | ---------------- |
| Groove       | Copy-first approach, customer research      | +104% (2.3% → 4.7%)          | uvp-optimization |
| Udemy        | Layout simplification, clear hierarchy      | +246% clicks                 | uvp-optimization |
| HOTH         | Radical simplification (headline+form only) | +844% leads (1.34% → 13.13%) | uvp-optimization |
| SIMS3        | Specific benefits vs vague ("Join fun")     | +128% registrations          | uvp-optimization |
| InfusionSoft | Removed navigation, clearer CTA             | +40.6% conversion            | uvp-optimization |

---

### Forms

| Company    | Change                           | Impact               | Source          |
| ---------- | -------------------------------- | -------------------- | --------------- |
| Expedia    | Removed 1 field ("Company name") | +$12M annual revenue | Baymard         |
| Marketo    | Reduced fields 9 → 5             | +34% conversion      | Marketo blog    |
| ImageScape | Inline validation added          | +22% completion      | Luke Wroblewski |
| Vast       | Multi-step form (vs single page) | +300% completion     | Vast case study |

---

### E-commerce

| Company  | Change                           | Impact                          | Source        |
| -------- | -------------------------------- | ------------------------------- | ------------- |
| Pets.com | Added zoom to product images     | +9% conversion                  | Salsify       |
| ModCloth | Added fit predictor (size guide) | +28% satisfaction, -15% returns | ModCloth data |
| Sephora  | AR virtual try-on                | +36% purchase likelihood        | Shopify       |
| Amazon   | Reviews + Q&A                    | +270% purchase likelihood       | Spiegel       |

---

### Design/Layout

| Company              | Change                          | Impact            | Source          |
| -------------------- | ------------------------------- | ----------------- | --------------- |
| GoodUI               | Simplified homepage, whitespace | +232% signups     | ux-optimization |
| HighRise (37signals) | Removed navigation on landing   | +25% signups      | 37signals blog  |
| Obama Campaign       | "Donate" CTA test               | +49% best variant | Optimizely      |
| Firefox              | Download button size 2x         | +20% downloads    | Mozilla blog    |

---

## Nielsen's 10 Usability Heuristics

### 1. Visibility of System Status

Keep users informed about what's going on through appropriate feedback within reasonable time.

**Application:**

- Loading indicators
- Progress bars in checkout
- "Saving..." feedback
- Confirmation messages

---

### 2. Match Between System & Real World

Speak users' language with words, phrases, and concepts familiar to them.

**Application:**

- No jargon/technical terms
- Natural language ("Add to cart" not "Append to basket")
- Familiar icons (trash = delete)
- Real-world metaphors (shopping cart)

---

### 3. User Control & Freedom

Users need "emergency exit" to leave unwanted state without extended dialogue.

**Application:**

- Undo/Redo options
- Clear "Back" navigation
- Cancel buttons
- Breadcrumbs

---

### 4. Consistency & Standards

Users should not wonder whether different words/actions mean the same thing.

**Application:**

- Consistent button styles
- Same terminology throughout
- Platform conventions (e.g., logo → homepage)
- Pattern library/design system

---

### 5. Error Prevention

Good error message is important, but best design prevents problems from occurring.

**Application:**

- Constraints (quantity selectors, not free input)
- Confirmations for destructive actions
- Disable invalid options
- Inline validation

---

### 6. Recognition Rather Than Recall

Minimize memory load by making objects, actions, options visible.

**Application:**

- Dropdown showing options (not requiring typing exact term)
- Recently viewed items
- Auto-complete/suggestions
- Visual previews

---

### 7. Flexibility & Efficiency of Use

Accelerators for experts while still accommodating novices.

**Application:**

- Keyboard shortcuts
- Search function
- Saved preferences
- Quick add (for repeat customers)

---

### 8. Aesthetic & Minimalist Design

Dialogues should not contain irrelevant or rarely needed information.

**Application:**

- Remove unnecessary elements
- One task per page/section
- Clear visual hierarchy
- Progressive disclosure

---

### 9. Help Users Recognize, Diagnose, Recover from Errors

Error messages should be expressed in plain language, precisely indicate problem, constructively suggest solution.

**Application:**

- "Email must include @" (not "Invalid input")
- Highlight problematic field
- Suggest correction
- Link to help if complex

---

### 10. Help & Documentation

Though better if system doesn't need documentation, may be necessary to provide help.

**Application:**

- Contextual tooltips
- FAQ page
- Searchable help center
- Live chat option

---

## Cialdini's 6 Principles of Persuasion

### 1. Reciprocity

People feel obligated to return favors.

**Application:**

- Free trial before asking purchase
- Free content (ebooks, guides) before email signup
- Free shipping on first order
- Give value upfront

**Data:**

- Free content: +415% email signups (HubSpot)

---

### 2. Scarcity

People want more of things there are less of.

**Application:**

- "Only 3 left in stock"
- "Sale ends in 24 hours"
- "Limited to first 100 customers"
- Waitlist for exclusive access

**Data:**

- Scarcity messages: +226% conversion (Booking.com study)

**Warning:** Must be truthful. Fake scarcity = destroys trust.

---

### 3. Authority

People respect authority and expertise.

**Application:**

- Credentials/certifications displayed
- "As featured in" (media logos)
- Expert testimonials
- Author credentials

**Data:**

- Authority badges: +28% trust (BrightLocal)

---

### 4. Consistency

People like to be consistent with past behavior/commitments.

**Application:**

- Small initial commitment → larger ask
- "You said you wanted X, here's how..."
- Progress tracking (you're 70% complete)
- Surveys before pitch (commitment to answering)

**Data:**

- Small commitment first: +35% follow-through (Freedman study)

---

### 5. Liking

People say yes to those they like.

**Application:**

- About Us page with human faces
- Personal stories/founder narrative
- Shared values/mission
- Friendly tone of voice

**Data:**

- Human photos: +95% trust (UserTesting)

---

### 6. Social Proof

People follow the actions of others.

**Application:**

- "Join 50,000 users"
- Customer logos
- Testimonials
- "Most popular" labels

**Data:**

- Social proof: +15% conversion (Cialdini meta-analysis)

---

## F-Pattern & Z-Pattern Scanning

### F-Pattern (Content-Heavy Pages)

**Nielsen Eye-Tracking Study:**

- Users read in F-shaped pattern
- Horizontal eye movements at top
- Then shorter horizontal scans moving down
- Finally vertical scan on left side

**Application:**

- Most important info top-left
- Headline spans full width
- Subheadings at regular intervals
- Left-align text
- Avoid center-aligned paragraphs

**Data:**

- F-pattern observed in 90%+ sessions (Nielsen)

---

### Z-Pattern (Minimal Content / Landing Pages)

**Usage:** Pages with minimal text, strong visual hierarchy

**Pattern:**

- Top-left (logo) → Top-right (navigation/CTA)
- Diagonal down-left (visual/hero)
- Bottom-right (final CTA)

**Application:**

- Logo top-left
- Primary CTA top-right OR bottom-right
- Hero visual in center-left
- Support visual/proof center-right

---

## Mobile-Specific Guidelines

### Touch Target Sizes

**Apple iOS:** 44x44 points minimum
**Google Material:** 48x48 dp minimum
**Microsoft:** 34x34 pixels minimum

**Optimal:** 44x44px absolute minimum, 60x60px ideal

**Data:**

- Min 44x44px: -72% mis-taps (MIT Touch Lab)
- Larger targets: +42% mobile conversion (Google)

---

### Thumb Zone

**Principle:** Different areas of screen have different ease of reach with thumb.

**Zones:**

- **Easy:** Bottom-center/bottom-right (arc)
- **Okay:** Bottom-left, middle-center
- **Hard:** Top corners, especially top-left

**Application:**

- Primary CTA in bottom-right
- Navigation in easy/okay zones
- Avoid critical actions in hard zones

**Data:**

- Bottom-right placement: +65% one-handed usability (Steven Hoober study)

---

### Mobile Form Guidelines

**Best practices:**

- Labels above fields (not placeholders only)
- Correct keyboard types (email, tel, number, url)
- Large tap targets (min 44x44px)
- Minimal scrolling
- Auto-advance between fields (optional)
- Show password toggle

**Data:**

- Correct keyboard type: +15-30% completion (ux-optimization #6)
- Labels above: +20% completion vs placeholder-only (Google)

---

## Accessibility Quick Reference

### WCAG 2.1 AA Standards

**Color Contrast:**

- Normal text (< 18pt): 4.5:1 minimum
- Large text (≥ 18pt): 3:1 minimum
- UI components: 3:1 minimum

**Keyboard Navigation:**

- All interactive elements accessible via Tab
- Visible focus indicators
- Logical tab order
- Skip to main content link

**Alternative Text:**

- All images have alt text
- Decorative images: alt=""
- Complex images: detailed description

**Form Labels:**

- Every input has associated label
- Error messages programmatically associated
- Required fields indicated

**Data:**

- Accessibility compliance: +13% average conversion (Microsoft study)
- Alt text: +80% SEO visibility for images (MOZ)

---

## Page Load Performance

### Speed Impact on Conversion

| Load Time  | Conversion Impact | Source |
| ---------- | ----------------- | ------ |
| 1 second   | Baseline (100%)   | Google |
| 2 seconds  | -15%              | Google |
| 3 seconds  | -22%              | Google |
| 5 seconds  | -38%              | Google |
| 10 seconds | -83%              | Google |

**Google recommendation:** <3 seconds

---

### Core Web Vitals

**LCP (Largest Contentful Paint):** <2.5 seconds (good)
**FID (First Input Delay):** <100ms (good)
**CLS (Cumulative Layout Shift):** <0.1 (good)

**Data:**

- Good Core Web Vitals: +24% lower abandonment (Google)

---

## Reference Integration

**This knowledge base powers:**

- Expert critique in `SKILL.md`
- Element checklists in `CRITIQUE-FRAMEWORKS.md`
- Review templates in `templates/`

**Cross-skill integration:**

- `uvp-optimization` - Case studies, testing protocols
- `web-copy` - Copy principles, headline formulas
- `ux-optimization` - Specific practices, implementation code

**When expert makes argument:**

1. Cite specific research (this file)
2. Quantify expected impact
3. Reference case study if available
4. Offer data-backed alternatives

**Example:**
"Tvůj headline používá positive framing ('Get more leads'). Outbrain research z 2014 testoval 65,000 headlines - negative framing konvertuje +30% vs neutral, ale positive framing -29% vs neutral. Combined swing = 59%. Case study: Conversion Rate Experts změnil 'Increase revenue' → 'Stop losing 60% of revenue to cart abandonment' = +47% conversion. Zkus: '7 ways you're losing 60% of leads (and how to fix it)' - negative framing + odd number (21% CTR boost) + specific (not vague)."
