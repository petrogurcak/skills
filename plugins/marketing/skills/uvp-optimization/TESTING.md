# UVP Testing Methodologies

**Purpose:** Validate clarity and conversion impact before full deployment.

**Critical principle:** What people SAY ≠ How they BEHAVE

Don't ask: "Would you buy this?"
Do measure: "Did they actually buy?"

**Test hierarchy:**
1. **Clarity first** (do they understand?)
2. **Relevance second** (does it solve their problem?)
3. **Conversion third** (do they take action?)

Without #1, #2 and #3 are impossible.

---

## Test 1: Five-Second Clarity Test

**Goal:** Validate comprehension

**Critical stat:** If users don't understand your offer in 5 seconds, they leave.

---

### Method

**Setup:**
1. Show homepage/landing page for exactly 5 seconds
2. Hide the page
3. Ask participant: "What does this company do?"
4. Record their answer verbatim

**Success criteria:**
- 80%+ can explain accurately in their own words
- No confusion about category ("Is this software or consulting?")
- No responses like "I'm not sure" or "Maybe it's about..."

**Failure indicators:**
- <60% accuracy = complete messaging rewrite needed
- 60-79% accuracy = headline/subheading needs clarification
- Confusion about WHO it's for = targeting problem
- Confusion about WHAT it does = category problem

---

### Tools

**Moderated (higher quality, slower):**
- Zoom/Meet with screen share
- Show page, then hide (cover screen or switch tab)
- Interview 10-20 participants

**Unmoderated (faster, lower cost):**
- **UsabilityHub** (usabilityhub.com) - 5-second test feature
- **Lyssna** (lyssna.com) - formerly UsabilityHub
- **Maze** (maze.co) - includes 5-second tests
- **UserTesting** (usertesting.com) - full platform

**Cost:**
- DIY with friends/colleagues: Free (but biased)
- UsabilityHub: ~$1-3 per response
- Full service (UserTesting): ~$50-100 per participant

---

### Sample Size

**Minimum:** 20 participants
**Recommended:** 50 participants
**Segmented testing:** 20 per customer segment

**Why 20 minimum:**
- 80% success rate = 16 people understanding, 4 confused
- Enough to identify patterns in confusion
- Small enough to run quickly

---

### Questions to Ask

**Primary question (always):**
"What does this company do?"

**Secondary questions (optional):**
- "Who is this product for?"
- "What problem does it solve?"
- "What would you get if you signed up?"
- "How is this different from [competitor]?"

**Don't ask:**
- "Would you buy this?" (hypothetical, unreliable)
- "Do you like this?" (opinion, not behavior)
- "Is this clear?" (people say yes even when confused)

---

### Analyzing Results

**Pattern identification:**

**If 40%+ say "I don't know what they do":**
→ Headline is too vague or clever. Rewrite for direct clarity.

**If participants describe FEATURES instead of OUTCOMES:**
→ Your copy is feature-focused. Reframe around benefits.

**If descriptions vary wildly (no consensus):**
→ Messaging is scattered. Pick ONE core message.

**If they confuse you with competitor:**
→ Differentiation is weak. Add unique mechanism or approach.

**If they understand WHAT but not WHO it's for:**
→ Add targeting clarity ("for small businesses" or "for designers")

---

### Example Analysis

**Test results (20 participants):**
- 8 said: "Some kind of software for teams"
- 5 said: "Not sure, maybe project management?"
- 4 said: "Helps teams communicate"
- 3 said: "I don't know"

**Diagnosis:**
- 0% mentioned specific outcome → Outcome clarity missing
- "Some kind of software" → Too generic, no differentiation
- "Maybe" responses → Uncertainty means failure
- No consensus → Message is scattered

**Fix:**
Rewrite headline from "Teamwork made simple" (vague)
To: "Ship projects 2x faster with async video standups" (specific outcome + mechanism)

---

## Test 2: A/B Testing (Conversion)

**Goal:** Measure which UVP variant drives more conversions

**When to use:** After passing five-second test (clarity validated)

---

### Prerequisites

**Before A/B testing:**
- ☐ Traffic: Minimum 100 conversions/week (or 2+ weeks to reach significance)
- ☐ Clarity: 80%+ five-second test pass rate
- ☐ Variants: 2-3 versions maximum (not 10)
- ☐ Hypothesis: Clear prediction about why variant will win

**Don't A/B test if:**
- Traffic is too low (<1000 visitors/week)
- Clarity isn't validated (you're testing unclear messages)
- You're testing 10 things at once (can't identify winner)

---

### What to Test

**High-impact elements:**
1. **Headline** (biggest impact)
2. **Subheading** (second biggest)
3. **Benefit order** (in bullet points)
4. **Social proof placement** (above/below fold)
5. **CTA copy** ("Start free trial" vs "Get started")

**Test one at a time** or use multivariate testing (requires more traffic).

---

### Platforms

**Free/Cheap:**
- **Google Optimize** - Free (being discontinued, check alternatives)
- **Microsoft Clarity** - Free, basic A/B testing
- **Plausible** - Privacy-focused, simple A/B testing

**Professional:**
- **Optimizely** - Industry standard ($2,000+/year)
- **VWO** (Visual Website Optimizer) - Full suite ($200+/month)
- **Convert** - Privacy-focused A/B testing ($100+/month)
- **AB Tasty** - Enterprise solution

**Developer-friendly:**
- **GrowthBook** - Open source, self-hosted
- **Split.io** - Feature flags + A/B testing
- **LaunchDarkly** - Feature management + experimentation

---

### Setup Process

**1. Define hypothesis**

Bad: "Let's test a new headline"
Good: "Benefit-focused headline will beat feature-focused headline because customers care about outcomes, not specs"

**Format:** "Changing [X] to [Y] will increase [metric] because [reason]"

---

**2. Define success metric**

**Primary metric (only one):**
- Conversion rate (signups, purchases, leads)

**Not:**
- Clicks (doesn't matter if they don't convert)
- Time on page (doesn't matter if they don't convert)
- "Engagement" (vague, not business outcome)

**Secondary metrics (watch for regressions):**
- Lead quality (if optimizing for lead volume)
- Revenue per conversion (if optimizing for conversion rate)
- Customer satisfaction (if optimizing aggressively)

---

**3. Calculate sample size**

Use **sample size calculator** (Optimizely, VWO, or Evan Miller's tool).

**Example:**
- Current conversion rate: 2%
- Minimum detectable effect: 20% (2% → 2.4%)
- Statistical power: 80%
- Significance level: 95%
- **Required sample:** ~19,000 visitors per variant

**Reality check:** If you need 19k visitors and get 1k/week, test will take 19 weeks per variant. Consider:
- Smaller segment testing (PPC traffic only)
- Larger detectable effect (accept 50% change minimum)
- Sequential testing (Bayesian methods)

---

**4. Run test to completion**

**Minimum duration:** 7 days (captures weekly patterns)
**Ideal duration:** 2-4 weeks
**Maximum duration:** 6-8 weeks (diminishing returns)

**Don't stop early because:**
- Monday traffic differs from Saturday
- Payday cycles affect B2C purchases
- Business cycles affect B2B decisions
- Early results often mislead

**Statistical significance checklist:**
- ☐ 95%+ confidence level
- ☐ Minimum 7 days runtime
- ☐ Reached planned sample size
- ☐ No external factors (press coverage, seasonal events)

---

**5. Analyze results**

**Conversion rate example:**

| Variant | Visitors | Conversions | Rate | Change |
|---------|----------|-------------|------|--------|
| Control (A) | 10,000 | 230 | 2.30% | - |
| Variant (B) | 10,000 | 285 | 2.85% | +23.9% |

**Significance:** 96% confidence → Winner!

**But also check:**
- Did lead quality change?
- Did revenue per customer change?
- Did support requests increase? (sign of poor qualification)

---

**6. Implement winner**

**Don't:**
- Implement without reaching significance
- Run test forever (decide and move on)
- Test same thing repeatedly (iteration, not repetition)

**Do:**
- Document learnings (why did it win?)
- Share with team (build knowledge base)
- Plan next test (continuous improvement)

---

### Common A/B Testing Mistakes

1. **Peeking at results early and stopping**
   - Day 1: Variant B winning by 50%!
   - Day 7: Actually no difference
   - Problem: Early results are noisy

2. **Testing too many variants**
   - 10 headlines tested simultaneously
   - Each needs full sample size
   - Test takes forever, results unclear

3. **Changing test mid-flight**
   - Week 1: Testing headline
   - Week 2: Someone changes CTA button too
   - Now you don't know what caused change

4. **Testing during unusual events**
   - Product Hunt launch week
   - Black Friday sale
   - Press coverage spike
   - Results won't replicate

5. **Ignoring segment differences**
   - Variant B wins overall (+10%)
   - But loses badly for returning visitors (-30%)
   - Need segment-level analysis

---

## Test 3: PPC Campaign Testing (Quick Validation)

**Goal:** Validate UVP angles quickly before committing to full website redesign

**Advantage:** Fast feedback (days vs. weeks)

**Trade-off:** Tests ad click behavior, not full conversion funnel

---

### When to Use

**PPC testing is ideal when:**
- You need quick directional feedback (not final proof)
- You have marketing budget ($200-1000 for test)
- You're testing multiple positioning angles
- Full A/B test would take too long (low traffic)

**Not ideal when:**
- Your product is entirely organic/word-of-mouth
- Budget constraints prevent meaningful test
- Ad click behavior differs dramatically from website behavior

---

### Method

**1. Create 3-5 ad variants**

Each variant tests different UVP angle.

**Example for project management tool:**

**Variant A: Speed focus**
"Ship Projects 2x Faster | Async Standups for Remote Teams"

**Variant B: Simplicity focus**
"Simple Project Management | No Complexity, Just Results"

**Variant C: Integration focus**
"One Tool for Everything | Slack, GitHub, Calendar in One Place"

**Variant D: Outcome focus**
"Stop Missing Deadlines | Project Tracking That Actually Works"

**Variant E: Social proof focus**
"Trusted by 1,000+ Remote Teams | Try Free for 14 Days"

---

**2. Setup campaign structure**

**Budget per variant:** $50-200 minimum
**Total budget:** $250-1000 for meaningful test
**Duration:** 7-14 days
**Platform:** Google Ads, Facebook Ads, or LinkedIn Ads (match your audience)

**Campaign structure:**
```
Campaign: UVP Testing
├─ Ad Group 1: Speed Focus
│  └─ Ad Variant A
├─ Ad Group 2: Simplicity Focus
│  └─ Ad Variant B
├─ Ad Group 3: Integration Focus
│  └─ Ad Variant C
└─ ...
```

**Equal budget split** (not algorithm-optimized yet)

---

**3. Use identical settings except messaging**

**Keep constant:**
- Targeting (same audience for all variants)
- Landing page (same destination)
- Bid strategy (manual CPC recommended for testing)
- Schedule (all variants run simultaneously)

**Vary only:**
- Ad headline
- Ad description
- (Optional) Ad image if relevant to UVP angle

---

**4. Measure metrics**

**Primary metric:** Click-through rate (CTR)
- Shows which UVP resonates most
- Higher CTR = more compelling promise

**Secondary metrics:**
- Cost per click (CPC) - Lower is better
- Conversion rate (if landing page tracks)
- Cost per conversion

---

**5. Analyze results**

**Example results:**

| Variant | Impressions | Clicks | CTR | CPC | Conv. Rate | Insight |
|---------|------------|--------|-----|-----|-----------|---------|
| A: Speed | 5,000 | 150 | 3.0% | $2.50 | 8% | Strong resonance |
| B: Simple | 5,000 | 75 | 1.5% | $3.00 | 10% | Lower volume, higher quality |
| C: Integration | 5,000 | 100 | 2.0% | $2.75 | 5% | Medium interest |
| D: Outcome | 5,000 | 180 | 3.6% | $2.25 | 7% | **WINNER** |
| E: Social proof | 5,000 | 90 | 1.8% | $2.90 | 9% | Decent quality |

**Winner:** Variant D (Outcome focus)
- Highest CTR (3.6%)
- Lowest CPC ($2.25)
- Decent conversion rate (7%)

**Insight:** Outcome-focused UVP ("Stop Missing Deadlines") resonates most with this audience.

---

**6. Apply to website**

**Use winning angle for:**
- Homepage headline
- Landing page primary message
- Email campaign subject lines
- Social media copy

**But remember:** Ad click ≠ website conversion. Still validate with full A/B test.

---

### PPC Testing Pro Tips

1. **Match intent to search keywords**
   - High-intent keywords: "buy project management software"
   - Test UVP angles that close (social proof, outcome)
   - Low-intent keywords: "what is project management"
   - Test UVP angles that educate (simplicity, approach)

2. **Audience segmentation**
   - Test same UVP angles on different audiences
   - "Speed" might win with startups
   - "Integration" might win with enterprises
   - Adjust website UVP per traffic source

3. **Landing page alignment**
   - If ad says "Ship 2x faster," landing page should lead with speed
   - Misalignment kills conversion
   - Create variant landing pages for each angle

4. **Statistical significance**
   - Aim for 100+ clicks per variant minimum
   - Use A/B test calculator for CTR differences
   - Don't declare winner with only 20 clicks

5. **Qualitative feedback**
   - Read ad comments (Facebook/LinkedIn)
   - Monitor brand mentions during test
   - Survey people who clicked

---

## Test 4: Non-Converter Feedback Loop

**Goal:** Understand why people DON'T convert

**Critical insight:** People who convert tell you what worked. People who don't convert tell you what's missing.

---

### Method

**1. Install exit survey tool**

**Tools:**
- **Qualaroo** - Targeted surveys on exit intent
- **Hotjar** - Heatmaps + exit surveys
- **Usabilis** - Exit surveys + recordings
- **SurveyMonkey** - Generic but works

**Trigger:** User shows exit intent (mouse moves toward browser close/back button)

---

**2. Target non-converters specifically**

**Segment logic:**
- Visited pricing/product pages (showed interest)
- Did NOT sign up/convert
- Spent >60 seconds on site (engaged, not bounced)

**Don't survey:**
- Everyone (too noisy)
- Customers (different question set)
- Immediate bouncers (not interested in product)

---

**3. Ask ONE focused question**

**Recommended questions:**

**Option 1: Open-ended (higher quality, lower volume)**
"What stopped you from signing up today?"

**Option 2: Multiple choice + Other (higher volume, structured)**
"What's the main reason you didn't sign up?"
- [ ] Price is too high
- [ ] Not sure it solves my problem
- [ ] Need to discuss with team
- [ ] Trying competitor first
- [ ] Missing features I need
- [ ] Other: _______________

**Option 3: Clarity check**
"What's unclear or confusing about our product?"

**Don't ask:**
- "Did you like our website?" (not actionable)
- 10 questions (no one will answer)
- "What would make you buy?" (hypothetical, unreliable)

---

**4. Set response rate target**

**Realistic rates:**
- Exit surveys: 5-15% response rate
- 1,000 non-converting visitors = 50-150 responses

**If rate <5%:**
- Survey is intrusive (bad timing/placement)
- Question is unclear or too long
- Incentive may help (but introduces bias)

---

**5. Analyze patterns (not individual responses)**

**After 50+ responses, categorize:**

**Example analysis:**

| Issue | Count | % | Priority |
|-------|-------|---|----------|
| "Price too high" | 28 | 35% | **HIGH** |
| "Not sure it fits my workflow" | 20 | 25% | **HIGH** |
| "Need to try competitor first" | 15 | 19% | Medium |
| "Missing feature X" | 10 | 13% | Medium |
| "Just browsing" | 7 | 9% | Low |

**Action items:**
1. **Price objection (35%)** → Add pricing clarity, show ROI calculator, test lower tier
2. **Workflow fit (25%)** → Improve "How it works" section, add use case examples, create demo video

**Don't:**
- Build every feature request (13% is small)
- Worry about "just browsing" (they're not your customer)
- React to single complaints (look for patterns)

---

**6. Fix and re-test**

**Iteration cycle:**
1. Identify top 2 objections
2. Update messaging/positioning to address
3. Run for 2 weeks
4. Check if new responses shift

**Example outcome:**
- Before: 35% said "price too high"
- Added ROI calculator + comparison chart
- After: 18% said "price too high" (halved!)
- New top issue emerges: "setup seems complicated"
- Now optimize for that

---

### Advanced: Segment-Level Analysis

**Don't treat all non-converters equally:**

**Segment 1: Bounced from homepage**
- Issue: Clarity (they don't understand offer)
- Fix: Headline/subheading optimization

**Segment 2: Viewed pricing, left**
- Issue: Price objection or missing plan
- Fix: Pricing structure, ROI justification

**Segment 3: Started signup, abandoned**
- Issue: Form friction or trust
- Fix: Reduce form fields, add security badges

**Segment 4: Viewed features, left**
- Issue: Missing feature or complexity
- Fix: Feature clarity, comparison table

**Each segment needs different fix.**

---

## Testing Checklist

**Before launching ANY UVP:**

☐ **Clarity validated**
   - 80%+ five-second test pass rate
   - Participants can explain in own words

☐ **Relevance validated**
   - Customer interviews confirm problem/solution fit
   - Benefits match actual purchase motivations

☐ **Conversion tested**
   - A/B test shows statistical improvement
   - 95%+ confidence level
   - Minimum 7 days runtime

☐ **Feedback loop established**
   - Non-converter surveys collecting responses
   - Patterns identified and addressed

☐ **Segment testing complete**
   - New vs. returning visitors
   - Traffic sources (organic, paid, referral)
   - Customer types (if B2B: company size, industry)

---

## Common Testing Mistakes

1. **Testing without baseline**
   - Don't know current performance
   - Can't measure improvement

2. **Confusing correlation with causation**
   - Conversion went up during test
   - But also: seasonal spike, press coverage, pricing change
   - Can't isolate UVP impact

3. **Testing opinions instead of behavior**
   - Surveying: "Would you buy this?"
   - Should measure: Did they actually buy?

4. **Stopping at "statistical significance"**
   - 95% confidence is great
   - But did lead quality drop?
   - Check business metrics, not just conversion rate

5. **Testing everything simultaneously**
   - Changed headline, CTA, layout, pricing
   - Now you don't know what worked
   - Test systematically, one change at a time

6. **Ignoring qualitative feedback**
   - Numbers say variant B won
   - But comments show confusion
   - Need both quantitative and qualitative

7. **Analysis paralysis**
   - Endless testing, never launching
   - Perfectionism prevents progress
   - 80% confidence + good qualitative feedback = ship it

---

## Testing Prioritization

**If you can only do ONE test:**
→ Five-second clarity test (fastest, cheapest, highest impact)

**If you can do TWO tests:**
→ Five-second test + A/B test (clarity + conversion)

**If you have resources for complete testing:**
→ All four tests in sequence:
1. Five-second test (clarity)
2. PPC campaign test (quick validation of angles)
3. A/B test (full conversion validation)
4. Non-converter feedback (ongoing optimization)

---

## Next Steps After Testing

**When tests pass:**
- Deploy winning UVP across all pages (not just homepage)
- Update ad copy, email campaigns, social media
- Train sales team on new messaging
- Document learnings for future reference

**When tests fail:**
- Don't panic
- Review research (did you talk to customers?)
- Check positioning (is it believable?)
- Simplify message (are you saying too much?)
- Try different framework (see FRAMEWORKS.md)

**Continuous improvement:**
- Re-test every 6-12 months
- Market changes, messaging should too
- New competitors require new differentiation
- Customer language evolves

---

**Related files:**
- Return to: `SKILL.md` (Phase 3: TEST)
- See also: `CASE-STUDIES.md` (real testing examples)
- See also: `FRAMEWORKS.md` (what to test)

**External resources:**
- Sample size calculator: https://www.evanmiller.org/ab-testing/sample-size.html
- Statistical significance calculator: https://abtestguide.com/calc/
