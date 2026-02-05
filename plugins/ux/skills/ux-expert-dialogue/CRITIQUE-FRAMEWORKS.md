# Critique Frameworks - Element by Element

**Comprehensive checklists for expert review of every web element.**

**How to use:** Během review session, expert použije relevantní checklist pro systematickou analýzu každého elementu.

---

## Hero Section (Above-the-Fold)

### Checklist

**Headline:**
- [ ] Benefit-focused (not feature-focused)
- [ ] Konkrétní (not vague/generic)
- [ ] Délka 5-9 slov (optimum 8)
- [ ] Obsahuje číslo (ideálně liché)
- [ ] Bez buzzwordů (AI, revolucí, digitální transformace...)
- [ ] Test autenticity (není použitelný pro konkurenta)
- [ ] BEZ TEČKY na konci

**Value Proposition:**
- [ ] Jasná do 5 sekund (five-second test)
- [ ] Answerable "What's in it for me?"
- [ ] Differentiated od konkurence
- [ ] Viditelné bez scrollování

**CTA (Call to Action):**
- [ ] Above fold (viditelný bez scroll)
- [ ] Konkrétní action ("Start free trial" not "Learn more")
- [ ] Contrast ratio min 4.5:1
- [ ] Velikost min 44x44px (Fitts's Law)
- [ ] Benefit v nebo u buttonu ("Get 30% more leads")

**Visual/Hero Image:**
- [ ] Supports messaging (ne generic stock)
- [ ] Relatable subject (user sees themselves)
- [ ] Caption POD fotkou (not above) - Ogilvy +10%
- [ ] Informační hodnota (not just decoration)

---

### Challenge Questions

1. **"Pokud vidím jen headline + CTA button, vím co děláte?"**
   - Test minimální clarity
   - Pokud NE → headline je příliš vague

2. **"Řekl bys tento headline kamarádovi v hospodě?"**
   - Test natural language
   - Pokud NE → přepsat conversational tónem

3. **"Můžu najít stejný headline u konkurenta?"**
   - Test differentiation
   - Pokud ANO → není dost specific

4. **"Co je primární action a proč bych ji měl udělat TEĎ?"**
   - Test CTA clarity + urgency
   - Pokud nejasné → rewrite CTA

5. **"Pokud odstraním logo, poznám že je to váš web?"**
   - Test brand differentiation
   - Pokud NE → generic messaging

---

### Common Mistakes

**❌ Generic Buzzword Headlines**
- "Nejmodernější AI platforma"
- "Revoluce v digitálním marketingu"
- "Inovativní řešení pro váš byznys"

**Why problematic:**
- Zero konkrétní benefit
- Každý konkurent říká totéž
- No measurable value prop

**✅ Specific Benefit Headlines**
- "Reduce support tickets 60% using conversational AI"
- "Ship features 2x faster without hiring engineers"
- "Odpovězte na 90% dotazů automaticky, 24/7"

---

### Data to Cite

**Headline Research:**
- Liché čísla: +21% CTR vs sudé (Outbrain)
- Optimální délka: 8 slov (The Guardian)
- První 2 slova kritická: ~11 znaků (Nielsen eye-tracking)
- Negative framing: +30% vs neutral (Outbrain)

**Value Prop:**
- 8 z 10 čte headline, jen 2 pokračují (Ilinčev)
- Users decide in 10 seconds (Nielsen)
- Five-second test: 80%+ clarity needed (UsabilityHub standards)

**CTA:**
- Specific beats generic: +90% conversion (UnbounceTest)
- Contrast matters: 21% average conversion lift (VWO study)
- Above fold: +300% visibility vs. below (Nielsen)

**Hero Image:**
- Caption under image: +10% readership (Ogilvy)
- Captions generate 300% more engagement than body text (Ogilvy)

---

## Forms

### Checklist

**Field Count:**
- [ ] Minimální počet polí (každé +1 pole = -10% conversion)
- [ ] Žádné "optional" fields above fold
- [ ] Grouped logically (related fields together)

**Validation:**
- [ ] Inline validation (real-time feedback)
- [ ] Specific error messages (not "Invalid")
- [ ] Green checkmarks pro correct fields
- [ ] Errors near relevant field (not top of page)

**Password Fields:**
- [ ] Show/Hide toggle present
- [ ] Strength meter visible
- [ ] Requirements stated BEFORE attempt
- [ ] No arbitrary complexity (8 chars enough)

**Mobile:**
- [ ] Correct keyboard types (email, tel, number)
- [ ] Labels above fields (not placeholder-only)
- [ ] Touch targets min 44x44px
- [ ] Auto-focus first field (desktop only)

**Social Login:**
- [ ] Offered as option (especially for 18-25 demo)
- [ ] Above traditional form
- [ ] Clear what data is accessed

---

### Challenge Questions

1. **"Je toto pole absolutně nutné pro signup?"**
   - Test každé pole individually
   - Většina není nutná → progressive profiling

2. **"Testoval jsi conversion bez tohoto pole?"**
   - Challenge assumptions
   - Expedia case: -1 field = +$12M/year

3. **"Proč by user vyplnil 12 polí když konkurent má 3?"**
   - Test competitive friction
   - Každé pole = mental cost

4. **"Na mobilu, jaký keyboard se zobrazí?"**
   - Test mobile experience
   - Wrong keyboard = huge friction

5. **"Co se stane když udělám chybu?"**
   - Test error handling
   - Generic errors = abandon

---

### Common Mistakes

**❌ Too Many Fields**
- 12+ fields for simple signup
- Asking for data you don't need
- Phone number for email newsletter

**Why problematic:**
- Each field = -10% conversion (Baymard)
- Cognitive load increases exponentially
- Mobile users especially sensitive

**✅ Minimal Fields**
- 3-5 fields maximum for signup
- Progressive profiling (ask later)
- Smart defaults where possible

---

**❌ Generic Error Messages**
- "Error: Invalid input"
- "Please fix errors"
- Red highlight with no explanation

**Why problematic:**
- User doesn't know WHAT to fix
- Increases frustration
- Leads to abandonment

**✅ Specific Helpful Errors**
- "Email must include @"
- "Password needs at least 8 characters"
- "Phone format: +420 XXX XXX XXX"

---

### Data to Cite

**Field Count:**
- Each additional field: -10% conversion (Baymard Institute)
- Expedia removed 1 field: +$12M annual revenue
- Average form conversion: 13-30% (varies by industry)

**Validation:**
- Inline validation: +22% conversion (Luke Wroblewski study)
- Specific errors: +15-25% vs generic (`ux-optimization` practice #2)

**Password:**
- Show/hide toggle: +10-20% completion (`ux-optimization` practice #3)
- Strength meters: +8% stronger passwords (Carnegie Mellon)

**Social Login:**
- +20-40% conversion for 18-25 demo (`ux-optimization` practice #5)
- Gmail login most trusted (61% vs 42% Facebook - Janrain study)

---

## Navigation & Menu

### Checklist

**Structure:**
- [ ] Max 7 položek (Miller's Law: 7±2)
- [ ] Logické grouping (related items together)
- [ ] Kontakt jako poslední položka vpravo
- [ ] Žádné dropdown > 2 levels
- [ ] Mobile: hamburger nebo priority+ pattern

**Clarity:**
- [ ] Labels jasně popisují destination
- [ ] No buzzwords ("Solutions" → co konkrétně?)
- [ ] Consistent terminology
- [ ] Active state visible

**Accessibility:**
- [ ] Keyboard navigable (Tab order logical)
- [ ] Focus indicators visible
- [ ] ARIA labels kde needed
- [ ] Skip to main content link

---

### Challenge Questions

1. **"Můžeš najít Kontakt do 3 sekund?"**
   - Test findability
   - Users expect right-top

2. **"Co znamená 'Solutions'?"**
   - Test label clarity
   - Generic = confusing

3. **"Kolik kliků do nejdůležitější stránky?"**
   - Test hierarchy
   - Critical pages = 1 click

4. **"Jak to vypadá na mobilu?"**
   - Test responsive
   - Hamburger vs priority+

5. **"Kde očekáváš, že lidi kliknou nejvíc?"**
   - Test against heatmap data
   - Priorities should match behavior

---

### Common Mistakes

**❌ Too Many Menu Items**
- 15+ items in main navigation
- Everything seems equally important
- Overwhelming choice

**Why problematic:**
- Hick's Law: More choices = slower decision
- Analysis paralysis
- Nothing stands out

**✅ Limited Clear Options**
- 5-7 main items
- Mega menu for complex sites
- Priority+ on mobile

---

**❌ Vague Labels**
- "Solutions"
- "Products"
- "Resources"

**Why problematic:**
- User must guess what's inside
- Increases cognitive load
- Reduces findability

**✅ Specific Labels**
- "Email Marketing" (not "Solutions")
- "Pricing" (not hidden in "Products")
- "Case Studies" (not "Resources")

---

### Data to Cite

**Menu Size:**
- 7±2 items: optimal for retention (Miller's Law)
- Each additional item: +10% decision time (Hick's Law)

**Kontakt Placement:**
- Right-top: +40% findability (Nielsen eye-tracking)
- Last menu item: user expectation pattern

**Mobile:**
- Hamburger menu: -25% discoverability but common pattern
- Priority+: Better for content-heavy sites (Nielsen)

---

## CTAs (Calls-to-Action)

### Checklist

**Copy:**
- [ ] Action verb ("Get", "Start", "Download" not "Submit")
- [ ] Benefit included or adjacent ("Get 30% more leads")
- [ ] First-person where appropriate ("Start MY free trial")
- [ ] Creates urgency ("Start now", "Get instant access")

**Design:**
- [ ] High contrast (4.5:1 minimum)
- [ ] Size large enough to notice (Fitts's Law)
- [ ] Plenty whitespace around (isolation effect)
- [ ] Primary CTA only one per section
- [ ] Mobile: min 44x44px touch target

**Placement:**
- [ ] Above fold (hero section)
- [ ] After każdego klíčového benefit
- [ ] At end of page (final decision point)
- [ ] Not competing with navigation

**Frequency:**
- [ ] Homepage: 2-3 CTAs (hero + benefits + footer)
- [ ] Landing page: 3-5 CTAs (repeat throughout)
- [ ] Blog: 1-2 CTAs (subtle, context-relevant)

---

### Challenge Questions

1. **"Jaká je primární action a je viditelná okamžitě?"**
   - Test visibility
   - Should be un-missable

2. **"Proč bych měl kliknout TEĎ vs. později?"**
   - Test urgency
   - No urgency = procrastination

3. **"Co se stane po kliknutí?"**
   - Test expectation clarity
   - Surprise = abandoned flow

4. **"Kolik konkurujících CTA vidím najednou?"**
   - Test focus
   - Multiple CTAs = split attention

5. **"Funguje CTA na mobilu (thumb-friendly)?"**
   - Test mobile usability
   - Bottom-right = prime thumb zone

---

### Common Mistakes

**❌ Generic CTA Copy**
- "Submit"
- "Click Here"
- "Learn More"
- "Get Started"

**Why problematic:**
- No benefit communicated
- Unclear what happens next
- Doesn't create urgency

**✅ Specific Benefit CTAs**
- "Get My Free Trial"
- "Download the Guide"
- "Start Saving 30%"
- "See Pricing (Takes 30 Seconds)"

---

**❌ Low Contrast / Invisible**
- Blue CTA on blue background
- Small text button
- Lost in clutter

**Why problematic:**
- Users literally can't see it
- Fitts's Law: Small + distant = hard to click
- Conversion killer

**✅ High Contrast & Prominent**
- Complementary color (orange on blue)
- Large button (min 44x44px)
- Isolated with whitespace

---

### Data to Cite

**CTA Copy:**
- First-person: +90% conversion vs. second-person (Unbounce)
- Specific vs generic: +213% clicks (Michael Aagaard test)
- Action verbs: +121% (ContentVerve study)

**Contrast:**
- High contrast: +21% average lift (VWO)
- Color psychology: Orange/Green best for CTA (Eyequant study)

**Placement:**
- Above fold: +300% visibility (Nielsen)
- After every major benefit: +60% conversion (Conversion Rate Experts)

**Size/Touch:**
- Min 44x44px: Apple/Google guideline
- Larger buttons: +42% mobile conversion (Google study)

---

## Social Proof & Trust

### Checklist

**Testimonials:**
- [ ] Real names (not "J.K. from Prague")
- [ ] Photos (real, not stock)
- [ ] Specific results ("increased leads 40%" not "great product")
- [ ] Company/title for B2B
- [ ] Video testimonials if possible (highest trust)

**Logos:**
- [ ] Recognizable brands only
- [ ] Recent clients (not from 2015)
- [ ] Relevant to target audience
- [ ] High-quality images (not blurry)

**Numbers/Stats:**
- [ ] Specific (not rounded) - "1,247 companies" not "1000+"
- [ ] Contextualized - "Join 50,000 users" not just "50,000"
- [ ] Up-to-date
- [ ] Believable (not "10M users" if you launched last month)

**Trust Signals:**
- [ ] Security badges (SSL, certifications)
- [ ] Money-back guarantee clearly stated
- [ ] Privacy policy link visible
- [ ] Contact info easily accessible

---

### Challenge Questions

1. **"Jsou testimonials konkrétní nebo generic?"**
   - Test specificity
   - "Great!" = useless, "Increased revenue 40%" = valuable

2. **"Poznám tyto loga?"**
   - Test brand recognition
   - Unknown brands = wasted space

3. **"Jsou čísla believable?"**
   - Test credibility
   - Inflated numbers = distrust

4. **"Kde je důkaz, že tohle není fake?"**
   - Test verification
   - LinkedIn links, video = higher trust

5. **"Vztahuje se social proof k MNĚ?"**
   - Test relevance
   - B2B user doesn't care about B2C logos

---

### Common Mistakes

**❌ Vague Testimonials**
- "Great product, highly recommend!"
- No name, no photo
- No specific results

**Why problematic:**
- Looks fake (could be made up)
- No concrete value demonstrated
- Doesn't overcome objections

**✅ Specific Results**
- "We increased qualified leads by 47% in 3 months using Acme. The inline validation alone saved us 20 hours/week in support." - Jan Novák, CTO at StartupXYZ

---

**❌ Logo Soup**
- 50 tiny logos
- Mix of known + unknown brands
- Outdated clients

**Why problematic:**
- Overwhelming (Hick's Law)
- Dilutes impact of good logos
- Looks desperate

**✅ Selective Quality Logos**
- 5-10 recognizable brands
- Relevant to target audience
- Large enough to see

---

### Data to Cite

**Testimonials:**
- With photo: +45% credibility (Nielsen Norman Group)
- Video testimonials: 2x trust vs. text (Wyzowl)
- Specific results: +62% persuasiveness (BrightLocal)

**Social Proof:**
- "Join X customers": +15% conversion (Social proof principle, Cialdini)
- Odd numbers: +23% believability vs. rounded (Moz study)

**Trust Signals:**
- Security badges: +18% checkout completion (Baymard)
- Money-back guarantee: +25% sales (Harvard Business Review)

---

## E-commerce Product Pages

### Checklist

**Product Images:**
- [ ] Multiple angles (min 3-5 photos)
- [ ] Zoom functionality
- [ ] In-context usage photos
- [ ] High-resolution (but optimized load)
- [ ] 360° view if applicable

**Product Description:**
- [ ] Microbenefit above fold (skenovatelné)
- [ ] Bullet points (not paragraphs)
- [ ] Konkrétní specs, ne marketing fluff
- [ ] Size/fit guide (especially clothing)
- [ ] What's included (removes uncertainty)

**Social Proof:**
- [ ] Ratings visible (4.5+ stars ideal)
- [ ] Review count ("47 reviews" not just stars)
- [ ] Recent reviews (within 3 months)
- [ ] Photos in reviews (UGC = high trust)
- [ ] Response to negative reviews

**CTA/Add-to-Cart:**
- [ ] Button high contrast & large
- [ ] Availability status clear ("In stock")
- [ ] Quantity selector present
- [ ] Size/variant selection obvious
- [ ] "Add to cart" vs "Buy now" clear distinction

---

### Challenge Questions

1. **"Vidím produkt from všech important úhlů?"**
   - Test image coverage
   - Hidden angles = uncertainty

2. **"Vím jestli mi to bude fit?"**
   - Test size clarity
   - Especially clothing/shoes

3. **"Co dostanu exactly?"**
   - Test clarity of package
   - Accessories included?

4. **"Můžu trustovat reviews?"**
   - Test authenticity
   - All 5-star = suspicious

5. **"Co se stane když kliknu Add to Cart?"**
   - Test flow clarity
   - Cart popup vs new page?

---

### Common Mistakes

**❌ Single Product Photo**
- Only front view
- No context/scale
- Can't zoom

**Why problematic:**
- +20-40% lower add-to-cart (`ux-optimization` practice #9)
- Increases returns (didn't match expectations)
- Can't verify quality

**✅ Comprehensive Visuals**
- 5+ angles
- Zoom to see details
- Lifestyle photo showing scale
- User-generated content photos

---

**❌ Paragraph Description**
- Wall of text
- Marketing jargon
- No specs

**Why problematic:**
- Users scan, don't read
- No quick info access
- Frustrates researchers

**✅ Scannable Bullets**
- Short bullet points
- Specs clearly listed
- Highlights key benefits
- Expandable "more info"

---

### Data to Cite

**Product Photos:**
- Multiple angles: +20-40% add-to-cart (`ux-optimization` practice #9)
- Zoom feature: +9% conversion (Salsify study)
- 360° view: +27% engagement (Cappasity)

**Size/Fit:**
- Size guide: +15-25% reduction in returns (`ux-optimization` practice #10)
- Virtual try-on: +36% purchase likelihood (Shopify data)

**Reviews:**
- Presence of reviews: +270% purchase likelihood (Spiegel Research)
- Photos in reviews: +94% more helpful (PowerReviews)
- Response to negative: +33% trust (ReviewTrackers)

---

## Checkout Flow

### Checklist

**Progress Indicator:**
- [ ] Steps clearly labeled (1. Info, 2. Shipping, 3. Payment)
- [ ] Current step highlighted
- [ ] Ability to go back easily
- [ ] Est. time to complete ("2 minutes")

**Form Optimization:**
- [ ] Guest checkout option (not forced account)
- [ ] Saved info for returning users
- [ ] Address autocomplete
- [ ] Credit card type detection
- [ ] CVV tooltip explanation

**Cart Summary:**
- [ ] Always visible (sticky sidebar)
- [ ] Edit option available
- [ ] Shipping cost shown early (no surprises)
- [ ] Total clearly visible
- [ ] Promo code field (but not prominent if not offered)

**Trust:**
- [ ] Security badges visible
- [ ] Accepted payment methods shown
- [ ] Return policy linked
- [ ] Customer support contact available
- [ ] SSL certificate obvious

---

### Challenge Questions

1. **"Můžu checkout jako guest?"**
   - Test friction
   - Forced account = 25% abandonment

2. **"Kdy se dozvím shipping cost?"**
   - Test transparency
   - Late surprise = #1 abandon reason

3. **"Kolik kroků do purchase?"**
   - Test efficiency
   - Each step = drop-off

4. **"Je můj credit card safe?"**
   - Test trust signals
   - Missing badges = hesitation

5. **"Co když udělám chybu?"**
   - Test error recovery
   - Can I go back easily?

---

### Common Mistakes

**❌ Forced Account Creation**
- Must create account before purchase
- Long registration form
- No guest option

**Why problematic:**
- #1 checkout abandonment reason (25%)
- Adds unnecessary friction
- People forget passwords

**✅ Guest Checkout**
- Purchase now, account optional
- "Create account?" after purchase
- Save info without account (browser)

---

**❌ Hidden Shipping Costs**
- Only shown at final step
- Unexpectedly high
- No estimation earlier

**Why problematic:**
- #1 reason for cart abandonment (60%)
- Feels like deception
- Trust damage

**✅ Transparent Costs**
- Shipping calculator on product page
- Free shipping threshold visible
- Costs shown early in checkout

---

### Data to Cite

**Checkout Length:**
- Each additional step: -10-15% completion (Baymard)
- One-page checkout: +21% conversion (Formstack)
- Progress indicator: +11% completion (KoMarketing)

**Guest Checkout:**
- Forced account: +25% abandonment (Baymard)
- Guest option: +45% first-time completion (Forrester)

**Shipping Transparency:**
- Hidden costs: 60% abandonment reason (Baymard)
- Free shipping: +50% cart value (UPS study)
- Early cost display: +35% completion (Conversion Rate Experts)

**Cart Abandonment:**
- Average rate: 69.8% (Baymard 2023)
- Uncertainty about costs: 60% of abandons
- Lack of trust signals: 18% of abandons

---

## Footer

### Checklist

**Content:**
- [ ] Kontakt clearly visible (tel, email, address)
- [ ] Important links (About, Privacy, Terms)
- [ ] Site map or category links
- [ ] Newsletter signup (if relevant)
- [ ] Social media links (but not prominent)

**Design:**
- [ ] Kontrastní background (odliší se od body)
- [ ] Logické grouping (columns organized)
- [ ] Responsive (ne 50 links on mobile)
- [ ] Not too tall (cognitive overload)

**Trust:**
- [ ] Legal info (company registration)
- [ ] Payment methods accepted
- [ ] Security/certification badges
- [ ] Language/currency selector if applicable

---

### Challenge Questions

1. **"Najdu kontakt okamžitě?"**
   - Test visibility
   - Footer = expected location

2. **"Je footer konverzní nebo jen informační?"**
   - Test opportunity
   - Můžeš přidat final CTA

3. **"Je footer overwhelming?"**
   - Test cognitive load
   - 100 links = analysis paralysis

4. **"Funguje na mobilu?"**
   - Test responsive
   - Accordion pattern?

---

### Common Mistakes

**❌ Link Dump**
- 100+ links unsorted
- Tiny text
- No logical organization

**Why problematic:**
- Overwhelming (Hick's Law)
- Users can't find anything
- Looks unprofessional

**✅ Organized Sections**
- 3-5 columns max
- Clear headings
- Most important links only
- Expandable on mobile

---

**❌ Hidden Contact**
- Small text
- Low contrast
- Buried in links

**Why problematic:**
- Users expect contact in footer
- Friction for support seekers
- Looks like hiding

**✅ Prominent Contact**
- Tel & email clearly visible
- Maybe even CTA: "Need help? Call us"
- Operating hours stated

---

### Data to Cite

**Footer Usage:**
- 50% of users scroll to footer (Nielsen)
- Looking for contact, sitemap, legal
- Final decision point for some

**Contact Visibility:**
- Right-top expectation: 72% (Nielsen)
- Footer fallback: 63% look there
- Missing contact: -17% trust

---

**References:**
- Full research database: `EXPERT-KNOWLEDGE.md`
- Implementation code: `ux-optimization/practices/`
- Case studies: `CASE-STUDIES.md` in ux-optimization and uvp-optimization
