# A/B Testing Practices

Evidence-based optimization. 50% of changes hurt metrics without testing.

---

## Practice #16: ICE Prioritization Framework

**PROBLÉM:** Don't know what to test first.

**ŘEŠENÍ:** ICE framework - prioritize by Impact × Confidence × Ease.

**ICE SCORING:**
- **I**mpact (1-10): How much will it improve metric?
- **C**onfidence (1-10): How sure are you it will work?
- **E**ase (1-10): How easy to implement?
- **Score = (I × C × E) / 1000**

**PŘÍKLAD:**
```
Test #1: Change CTA button text
- Impact: 7 (medium impact on conversions)
- Confidence: 8 (similar tests worked)
- Ease: 10 (just text change)
- SCORE: 560 → HIGH PRIORITY

Test #2: Complete homepage redesign
- Impact: 9 (big potential)
- Confidence: 4 (uncertain outcome)
- Ease: 2 (lots of work)
- SCORE: 72 → LOW PRIORITY

Test #3: Add social proof (reviews)
- Impact: 8 (trust = conversions)
- Confidence: 9 (data supports this)
- Ease: 7 (need to collect reviews)
- SCORE: 504 → HIGH PRIORITY
```

**PRIORITY ORDER:**
1. **Quick wins** (high ICE): CTA text, urgency, guarantees
2. **Medium** (medium ICE): Layout, element order, form fields
3. **Big bets** (low ICE): Complete redesign, new features

**OČEKÁVANÝ DOPAD:** Focus on high-ROI tests first

**CHECKLIST:**
- [ ] Score all potential tests with ICE
- [ ] Start with highest score
- [ ] Test one change at a time
- [ ] Document hypothesis before testing

---

## Practice #17: Sample Size & Statistical Significance

**PROBLÉM:** Stopping test too early = invalid results.

**ŘEŠENÍ:** Wait for 95%+ significance AND min 100 conversions per variant.

**PRAVIDLA:**
1. **Min 100 conversions** per variant (not visitors!)
2. **Statistical significance 95%+**
3. **P-value < 0.05**
4. **Min 1-2 full business cycles** (1 week B2C, 1 month B2B)
5. **Sample Ratio Check:** Traffic split should be 50/50 (±5%)

**KALKULACE:**
```javascript
// Simple sample size calculator
function calculateSampleSize(baselineConversion, minDetectableEffect) {
  // baselineConversion = 0.03 (3%)
  // minDetectableEffect = 0.2 (20% relative improvement)

  const p1 = baselineConversion;
  const p2 = p1 * (1 + minDetectableEffect);
  const p_avg = (p1 + p2) / 2;

  const z_alpha = 1.96; // 95% confidence
  const z_beta = 0.84;  // 80% power

  const n = Math.ceil(
    2 * Math.pow(z_alpha + z_beta, 2) * p_avg * (1 - p_avg) /
    Math.pow(p2 - p1, 2)
  );

  return n; // Visitors per variant
}

// Příklad: 3% baseline, 20% improvement
// = ~3900 visitors per variant
// = 7800 total visitors needed
```

**CHECKLIST BEFORE ENDING TEST:**
- [ ] Min 100 conversions per variant
- [ ] Statistical significance 95%+
- [ ] P-value < 0.05
- [ ] Min 1-2 full weeks
- [ ] Sample ratio correct (50/50 ±5%)
- [ ] No external events (Black Friday, holidays)

**COMMON MISTAKES:**
- ❌ Stopping when "looks good" (confirmation bias)
- ❌ Running too short (< 1 week)
- ❌ Not enough conversions (< 100)
- ❌ Testing during atypical period
- ❌ Peeking and stopping early

**OČEKÁVANÝ DOPAD:** Valid test results, avoid false positives

---

## Practice #18: A/B Test Taxonomy (15 Types)

**PROBLÉM:** Not sure which testing approach to use for specific scenario.

**ŘEŠENÍ:** Choose from 15 test types based on traffic, goal, and constraints.

### When A/B Testing Makes Sense

**Threshold:** **Minimum 1,000 conversions per month**

Below this threshold, quantitative A/B testing is unreliable. Use qualitative methods instead (see Practice #19).

---

### Type 1: A/A Test (Validation)

**Purpose:** Validate testing methodology before first A/B test

**How it works:** Compare two identical versions

**When to use:**
- Before launching first A/B test
- Ongoing calibration of testing tool
- Verify false positive rate is <5%

**Checklist:**
- [ ] Run for min 1 week
- [ ] Verify no statistically significant difference detected
- [ ] Check traffic split is 50/50 (±2%)

---

### Type 2: A/B Test (Standard)

**Purpose:** Compare original vs one variant

**When to use:**
- Most common test type for Czech market (conversion volume constraints)
- Testing single element changes
- Multiple simultaneous changes to same element

**Best for:** Headlines, CTAs, images, form fields

**Example:**
- Control: "Get Started"
- Variant: "Start Your Free Trial"

---

### Type 3: A/B/n Test (Multiple Variants)

**Purpose:** Test multiple variants of single element simultaneously

**When to use:**
- Sufficient conversion volume (3,000+ conversions/month)
- Optimizing photos, page structure, headlines
- Want to test 3-5 variations at once

**Statistical adjustment:** Bonferroni correction required (divide significance threshold by number of variants)

**Example:**
- Control: Original product photo
- Variant A: Lifestyle photo
- Variant B: Infographic
- Variant C: Video thumbnail

**CAUTION:** Each variant reduces traffic per variation → longer test duration

---

### Type 4: Multivariate Test (MVT)

**Purpose:** Multiple variants across multiple elements simultaneously

**When to use:**
- RARELY (requires massive traffic)
- Only viable for major platforms (Seznam.cz scale)

**Traffic requirement:** 10,000+ conversions/month minimum

**Example:**
- Element A: Headline (3 variants)
- Element B: CTA button (3 variants)
- Element C: Image (3 variants)
- Total combinations: 3 × 3 × 3 = 27 variants

**Reality check:** Most sites don't have sufficient traffic for valid MVT

---

### Type 5: Multi-Page Test (Funnel)

**Purpose:** Deploy consistent changes across multiple pages in funnel

**When to use:**
- Testing element appearing on multiple pages
- Funnel-wide messaging changes
- Promotional campaigns

**Example (gift promotion):**
- Homepage hero banner
- Pre-cart promotional bar
- Cart summary
- Order confirmation
- Thank-you page

**Benefit:** Multiplies traffic exposure, faster statistical significance

---

### Type 6: Personalization

**Purpose:** Show different content to different user segments

**When to use:**
- Returning vs new visitors
- Geographic targeting
- Device-specific content
- Behavioral segmentation

**CONSIDERATION:** Each personalized version = separate variant with smaller sample size

**Example:**
- New visitors: Educational content + free trial CTA
- Returning visitors: Feature update + upgrade CTA

**CAUTION:** Requires higher total traffic (traffic divided by segments)

---

### Type 7: Bandit Test (Multi-Arm)

**Purpose:** Progressively allocate traffic to best-performing variant in real-time

**How it works:** Algorithm shifts traffic toward winner during test (not 50/50 split)

**When to use:**
- Time-sensitive content (article headlines, limited offers)
- Promotional campaigns with expiration
- Want to maximize performance during test

**Advantage:** Reduces opportunity cost of showing losing variant

**Example:**
- Day 1: 50/50 split
- Day 3: 30/70 split (algorithm favors winner)
- Day 5: 10/90 split (minimal traffic to loser)

**Tools:** Google Optimize (deprecated), VWO Smart Stats

---

### Type 8: Separate URLs

**Purpose:** Test substantially different pages with separate web addresses

**When to use:**
- Complete page redesigns
- Different content structures
- Want easy analytics tracking
- PPC campaign testing

**Approach:** Redirect traffic to two different URLs (e.g., /landing-a vs /landing-b)

**Benefit:** Simple tracking, no tool complexity

**Example:**
- Control: yoursite.com/pricing
- Variant: yoursite.com/pricing-v2

---

### Type 9: Existence Test (Removal)

**Purpose:** Remove element to determine its conversion impact

**When to use:**
- Testing assumption that element helps conversions
- Simplifying page design
- Reducing page clutter

**Common removals:**
- Sidebars
- Benefit bars
- Certification badges
- Widgets
- Footer sections

**Insight:** "Často odhalí, že naše předpoklady o efektivních designových prvcích jsou nesprávné"

**Example (InfusionSoft case study):**
- Removed navigation from landing page → +40.6% conversion

---

### Type 10: False Doors (Mockup Testing)

**Purpose:** Display mockup of unbuilt features to gauge user interest

**When to use:**
- Before building new feature
- Testing product categories
- Service offering validation
- Pricing tier evaluation

**How it works:**
1. Show button/link for unbuilt feature
2. When clicked, show message: "Coming soon! We'll notify you."
3. Measure click rate = interest level

**Applications:**
- New product categories
- Delivery speed options
- Packaging variations
- Feature prioritization

**Adoption rate:** 1-2% users report dissatisfaction (surprisingly low)

**Duration:** Run for several days (not weeks)

**Example:**
- Test "Express Delivery (2 hours)" option before building logistics
- Click rate = demand validation

---

### Type 11: Discovery Test (Radical Variants)

**Purpose:** Explore beyond current boundaries with radically different designs

**Philosophy:** "Ignorujte názory a řiďte se jen daty"

**When to use:**
- Current design plateaued
- Want breakthrough improvement (not incremental)
- Testing fundamentally different approaches

**Approach:**
- Combines A/B/n testing with separate URLs
- 3-5 radically different designs
- Statistical correction for multiple comparisons

**Example:**
- Control: Long-form sales page
- Variant A: Short-form (above fold only)
- Variant B: Video-first page
- Variant C: Interactive product tour

**CAUTION:** Requires Bonferroni correction, higher traffic

---

### Type 12: Iterative Test (Sequential Improvement)

**Purpose:** Progressively refine one element through successive iterations

**Method:** Test → Analyze → Improve → Test again

**When to use:**
- Continuous optimization
- Building on winning variants
- Long-term optimization strategy

**Example (case study):**
- **Test 1:** Original banner → +14% improvement
- **Test 2:** Refined winner → +32% improvement
- **Test 3:** Further refinement → +89.6% improvement (cumulative)

**Process:**
1. Run A/B test
2. Winner becomes new control
3. Create improved variant based on learnings
4. Test again

**Benefit:** Compounds improvements over time

---

### Type 13: Non-Inferiority Test

**Purpose:** Verify new variant performs at least as well as original

**When to use:**
- Cost reduction while maintaining performance
- Politically motivated changes (stakeholder preference)
- Simplification without conversion loss

**Logic:** Success = Equivalence (not superiority)

**Example:**
- Replace premium stock photos with in-house photos
- Goal: Maintain conversion rate while reducing cost
- Hypothesis: "In-house photos perform ≥ stock photos"

**Statistical approach:**
- Test if variant is within 5% of control performance
- Not testing for improvement, just non-degradation

---

### Type 14: Code/Function Test (Technical)

**Purpose:** Test new code versions against current implementations

**When to use:**
- Deploying new algorithms
- Performance optimizations
- Backend changes affecting UX

**Example:**
- New search algorithm
- Updated recommendation engine
- Faster checkout process

**Best practice:** Avoid Friday deployments

**Metrics:**
- Performance (load time, response time)
- Functionality (error rates)
- Conversion impact

---

### Type 15: B/A Test (Quasi-Experiments)

**Purpose:** Analyze before-and-after periods when simultaneous testing impractical

**When to use:**
- Real-world offline changes
- Store hours modifications
- In-store atmosphere changes
- Can't run controlled A/B test

**Adjustment:** Account for seasonal variation using year-over-year comparisons

**Example:**
- Compare January 2024 vs January 2023 (same season)
- Control for external factors (economy, holidays)

**CAUTION:** Less reliable than true A/B test (confounding variables)

---

### Test Type Selection Matrix

| Scenario | Recommended Test Type |
|----------|----------------------|
| First A/B test ever | A/A Test (validation) |
| Low traffic (<3k conversions/month) | Standard A/B |
| Medium traffic (3-10k/month) | A/B or A/B/n |
| High traffic (10k+/month) | A/B/n, MVT, Multi-Page |
| Time-sensitive campaign | Bandit Test |
| Complete redesign | Separate URLs or Discovery Test |
| Feature validation (pre-build) | False Doors |
| Continuous optimization | Iterative Test |
| Cost reduction | Non-Inferiority Test |
| Simplification hypothesis | Existence Test (removal) |
| Multiple funnel pages | Multi-Page Test |
| Segment-specific content | Personalization |

---

## Practice #19: Low-Traffic Testing Strategies

**PROBLÉM:** Website has <1,000 conversions/month → A/B testing unreliable.

**ŘEŠENÍ:** Use qualitative methods and alternative optimization approaches.

### Threshold Decision

**A/B testing makes sense:** ≥1,000 conversions/month

**Below threshold:** Quantitative A/B testing produces invalid results

**Why:**
- Tests take months to reach significance
- High risk of false positives
- Seasonal variation confounds results

---

### Alternative Strategy 1: User Testing (5 Participants)

**Principle:** "5 uživatelů zjistí 80% chyb na webu" (Nielsen Norman Group)

**Method:**
1. Recruit 5 people matching target audience
2. Give them specific tasks ("Find and purchase Product X")
3. Observe completion patterns (screen recording + think-aloud)
4. Identify friction points

**Tools:**
- UserTesting.com
- Lookback.io
- In-person testing (best for local businesses)

**OČEKÁVANÝ DOPAD:** Discover major usability issues before A/B testing

**Cost:** ~$50-100 per participant = $250-500 total

**Checklist:**
- [ ] Define 3-5 key tasks
- [ ] Recruit participants matching persona
- [ ] Record sessions (video + audio)
- [ ] Document friction points
- [ ] Prioritize fixes by severity

---

### Alternative Strategy 2: Behavioral Analytics

**Method:** Analyze mouse tracking and session recordings

**Tools:**
- Hotjar (heatmaps, recordings)
- Microsoft Clarity (free)
- Smartlook
- FullStory

**Sample size:** Analyze 50-100 videos before drawing conclusions

**What to look for:**
- Rage clicks (repeated clicking = frustration)
- Dead clicks (clicking non-interactive elements)
- Excessive scrolling (can't find information)
- Form abandonment points
- Confusion patterns (back-and-forth navigation)

**OČEKÁVANÝ DOPAD:** Identify UX issues without statistical testing

**Checklist:**
- [ ] Install tracking tool
- [ ] Collect 50-100 sessions
- [ ] Filter for key pages (checkout, landing)
- [ ] Document patterns (not individual sessions)
- [ ] Implement highest-impact fixes

---

### Alternative Strategy 3: Performance Optimization

**Principle:** Speed improvements NEVER hurt conversions

**Low-risk optimizations:**
- Image compression
- CSS/JS minification
- Lazy loading
- CDN implementation
- Server response time

**Data:**
- 1-second delay = -7% conversion (Amazon)
- 0.1-second improvement = +1% revenue (Walmart)

**Tools:**
- Google PageSpeed Insights
- WebPageTest
- Lighthouse

**Benefit:** No A/B testing needed (directional improvement guaranteed)

---

### Alternative Strategy 4: Qualitative Surveys

**Method:** Ask users directly about pain points

**Survey types:**

**1. Exit-Intent Survey:**
- "What stopped you from completing your purchase today?"
- Shows when user about to leave
- Captures abandonment reasons

**2. Post-Purchase Survey:**
- "What almost prevented you from buying?"
- Sent after successful conversion
- Identifies friction that didn't stop conversion (but could optimize)

**3. Non-Converter Survey:**
- Email to cart abandoners
- "We noticed you didn't complete checkout. Can you tell us why?"

**Tools:**
- Hotjar Surveys
- Typeform
- Qualaroo

**Sample size:** 30-50 responses for pattern identification

---

### Low-Traffic A/B Testing Modifications

**If you MUST A/B test with low traffic:**

#### Modification 1: Dramatic Design Changes

**Principle:** Test radically different variants (not incremental tweaks)

**Why:** Large effect sizes reach significance faster

**Example:**
- ❌ Don't test: Blue button vs green button (+5% expected)
- ✅ Test: Complete checkout redesign (12 fields → 5 fields, +50% expected)

**Formula:**
- Small effect (5-10%) = 10,000+ visitors needed
- Large effect (30-50%) = 1,000-2,000 visitors needed

---

#### Modification 2: Sitewide Elements

**Principle:** Test components appearing across multiple pages

**Why:** Multiplies traffic exposure

**Examples:**
- Header CTA button (all pages)
- Exit-intent popup (all pages)
- Pricing display (multiple product pages)

**Benefit:** 10 pages × 100 visitors each = 1,000 exposures (vs 100 for single-page test)

---

#### Modification 3: Microconversion Metrics

**Principle:** Track intermediate actions (higher frequency than purchases)

**Examples:**

| Final Conversion | Microconversion |
|-----------------|-----------------|
| Purchase | Add to cart |
| Signup | Email capture |
| Demo request | Pricing page visit |
| Quote request | Contact form start |

**Why:** 10x more microconversions = 10x faster significance

**CAUTION:** Validate that microconversion correlates with final conversion

**Example:**
- Final: 50 purchases/month (too low for testing)
- Micro: 500 add-to-carts/month (testable)
- Test headline impact on add-to-cart rate

---

#### Modification 4: Reduced Confidence Thresholds

**Standard:** 95% confidence (p < 0.05)

**Low-traffic compromise:** 80% confidence (p < 0.20)

**Trade-off:**
- Reduces testing duration ~15%
- Increases false positive risk from 5% → 20%

**When acceptable:**
- Low-risk changes (text, colors)
- Reversible changes
- Continuous monitoring planned

**NOT acceptable for:**
- Major redesigns
- Pricing changes
- Checkout flow modifications

---

#### Modification 5: Paid Traffic Acceleration

**Principle:** Purchase visitors through PPC to accelerate data collection

**Approach:**
1. Calculate required sample size (e.g., 2,000 visitors)
2. Estimate organic timeline (e.g., 6 months)
3. Buy traffic to fill gap faster (e.g., 1,000 visitors via PPC)

**Cost calculation:**
```
Required: 2,000 visitors
Organic: 250/month → 8 months
Buy: 1,750 visitors at $2 CPC → $3,500
Result: Test complete in 1 month instead of 8
```

**CAUTION:**
- Match traffic source to audience (don't buy irrelevant traffic)
- PPC visitors may behave differently than organic
- Validate traffic quality before full investment

---

### Decision Tree: Low-Traffic Optimization

```
START: <1,000 conversions/month

1. Fix obvious UX issues first
   - User testing (5 participants)
   - Session recordings (50-100 videos)
   - Heuristic evaluation
   ↓
2. Implement no-brainer improvements
   - Performance optimization
   - Mobile responsiveness
   - Form field reduction
   ↓
3. IF still need validation:

   Option A: Can you test microconversions?
   - YES → A/B test microconversions
   - NO → Continue to Option B

   Option B: Can you test sitewide elements?
   - YES → A/B test global components
   - NO → Continue to Option C

   Option C: Can you afford paid traffic?
   - YES → Buy traffic to accelerate testing
   - NO → Use qualitative methods only

4. Implement changes
5. Monitor directional trends (not statistical significance)
6. Revisit when traffic grows
```

---

## Summary

**4 A/B Testing Practices:**
1. **ICE prioritization** - Test high-impact, confident, easy changes first
2. **Sample size** - Min 100 conversions, 95% significance, 1-2 weeks
3. **Test taxonomy** - Choose from 15 test types based on scenario
4. **Low-traffic strategies** - Qualitative methods when <1,000 conversions/month

**Key insights:**
- A/B testing threshold: 1,000 conversions/month minimum
- 15 test types for different scenarios
- Qualitative methods beat invalid quantitative tests

**Tools:**
- **A/B Testing:** VWO, Optimizely, AB Tasty
- **User Testing:** UserTesting.com, Lookback.io
- **Analytics:** Hotjar, Microsoft Clarity, FullStory
- **Calculators:** Evan Miller's sample size calculator, ABTestGuide.com

**Next:** See practices/mobile.md for mobile optimization
