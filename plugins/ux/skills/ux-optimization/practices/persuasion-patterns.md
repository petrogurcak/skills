# Persuasion & Behavioral Psychology Practices

Based on GoodUI.org research (605 A/B tests), Cialdini's "Influence", and Kahneman's "Thinking, Fast and Slow".

---

## Practice #52: Reciprocity (Give First)

**PROBLEM:** Users won't convert because they don't trust you yet. Cold CTAs ("Buy now", "Sign up") hit a wall of skepticism.

**RESENI:** Give something valuable BEFORE asking for anything. Free tool, content, trial, audit. The principle of reciprocity (Cialdini) creates psychological obligation to return the favor.

**PRAVIDLA:**
- Always give value first, ask second
- The gift must be genuinely useful (not a disguised sales pitch)
- Small tokens create disproportionate obligation (GoodUI pattern #2)
- Works best when the gift is unexpected and personalized

**IMPLEMENTACE:**

### What to Give (by business type)

| Business | Free Gift | Ask |
|----------|-----------|-----|
| SaaS | Free calculator/tool | Sign up for full version |
| Agency | Free audit/report | Book a call |
| E-commerce | Free sample/guide | Purchase |
| Content | Free template/checklist | Email subscription |
| B2B | Free ROI analysis | Demo request |

### Placement Strategy

```
1. Homepage hero: Lead with free tool/resource
2. Blog posts: Content upgrade (checklist, template) at end
3. Exit intent: "Before you go, here's a free X"
4. Email sequence: 3 value emails before any ask
```

### KOD:

```html
<!-- Hero section: Lead with free value -->
<section class="hero">
  <h1>Find out how much you're losing on slow checkout</h1>
  <p>Free checkout audit - takes 30 seconds, no signup required.</p>

  <div class="free-tool">
    <input type="url" placeholder="Enter your website URL" />
    <button class="btn-primary">Analyze Free</button>
  </div>

  <p class="trust-note">
    No credit card. No signup. Instant results.
  </p>
</section>

<!-- After delivering value, THEN ask -->
<section class="results-cta">
  <h2>Your checkout loses ~23% of customers</h2>
  <p>We found 5 issues. Want the full report with fixes?</p>

  <div class="conversion-ask">
    <input type="email" placeholder="Your email for full report" />
    <button class="btn-primary">Send me the report</button>
  </div>
</section>
```

### Common Mistakes

1. **Asking before giving** - "Sign up for free trial" without showing value first
2. **Fake gifts** - "Free ebook" that's a 2-page sales pitch
3. **Too much friction** - Requiring signup before delivering the free thing
4. **Not following up** - Giving the gift but never making the ask

**OCEKAVANY DOPAD:** +20-30% conversion when value is given before asking

**A/B TEST SETUP:**
- Baseline: Direct CTA ("Sign up", "Buy now")
- Variant: Free value first, then CTA
- Sample: Min 200 visitors per variant
- Duration: 2-3 weeks

**CHECKLIST:**
- [ ] Free value is genuinely useful (not a disguised pitch)
- [ ] No signup required to access free value
- [ ] Ask comes AFTER value is delivered
- [ ] Clear connection between gift and paid offer
- [ ] Follow-up sequence in place (email, retargeting)

---

## Practice #53: Loss Aversion Framing

**PROBLEM:** Positive framing ("Get more leads", "Grow your revenue") is weak. Users are skeptical of gain promises because everyone makes them.

**RESENI:** Frame messages around PROTECTING what users already have, not gaining something new. Kahneman's research: losses feel 2x more painful than equivalent gains. GoodUI pattern #30 confirms this in A/B tests.

**PRAVIDLA:**
- Losses weigh ~2x more than equivalent gains (Prospect Theory)
- Frame around what they're LOSING right now, not what they could gain
- Use specific numbers (not vague threats)
- Balance: loss frame for attention, solution frame for CTA
- Outbrain research: negative headlines get +30% higher CTR than positive

**IMPLEMENTACE:**

### Before/After Copy Examples

```
POSITIVE (weak)                    LOSS AVERSION (strong)
-------                            -------
"Get more leads"                   "Stop losing 60% of your leads"
"Increase revenue"                 "You're leaving $4,200/mo on the table"
"Improve conversion"               "Your checkout abandonment costs you $890/day"
"Save time with automation"        "You waste 12 hours/week on manual tasks"
"Get better analytics"             "You're flying blind without proper data"
"Grow your email list"             "347 visitors left without subscribing today"
```

### Framing Framework

```
Step 1: Identify what they're LOSING (money, time, customers)
Step 2: Quantify the loss (specific number)
Step 3: Make it personal ("your", "you")
Step 4: Offer the solution as PROTECTION
```

### KOD:

```html
<!-- POSITIVE framing (weaker) -->
<section class="hero">
  <h1>Grow your SaaS revenue</h1>
  <p>Our tool helps you convert more visitors into customers.</p>
  <button>Start growing</button>
</section>

<!-- LOSS AVERSION framing (stronger) -->
<section class="hero">
  <h1>You're losing 73% of trial users before they convert</h1>
  <p>Most SaaS companies never recover these users.
     We fix the 5 leaks in your onboarding funnel.</p>
  <button>Stop the leak</button>
</section>
```

```html
<!-- Dynamic loss calculator -->
<div class="loss-calculator">
  <h3>How much are you losing?</h3>
  <label>Monthly visitors: <input type="number" id="visitors" value="10000"></label>
  <label>Current conversion rate: <input type="number" id="cvr" value="2" step="0.1">%</label>

  <div class="loss-result">
    <p class="loss-highlight">
      You're losing <strong id="lost-customers">9,800</strong> potential customers every month.
    </p>
    <p>At even 3% conversion, that's <strong id="lost-revenue">$XX,XXX</strong> in lost revenue.</p>
  </div>
</div>

<script>
function calculateLoss() {
  const visitors = parseInt(document.getElementById('visitors').value);
  const cvr = parseFloat(document.getElementById('cvr').value) / 100;
  const lost = Math.round(visitors * (1 - cvr));
  document.getElementById('lost-customers').textContent = lost.toLocaleString();
}

document.querySelectorAll('input').forEach(el =>
  el.addEventListener('input', calculateLoss)
);
</script>
```

### Where to Use Loss Framing

| Page | Positive (weak) | Loss Frame (strong) |
|------|-----------------|---------------------|
| Hero headline | "Grow your business" | "Stop bleeding customers" |
| Email subject | "Tips to improve" | "The mistake costing you $X" |
| CTA button | "Learn more" | "Fix this now" |
| Pricing page | "Get premium features" | "Don't miss out on X" |
| Exit popup | "Wait! Get 10% off" | "Don't leave $X on the table" |

### Balance: Don't Overdo It

- Use loss framing for ATTENTION (headlines, subject lines)
- Use solution framing for ACTION (CTAs, product descriptions)
- Too much negativity = anxiety, not action
- Ratio: ~60% loss frame / 40% solution frame

**OCEKAVANY DOPAD:** +30% CTR with loss/negative framing (Outbrain research), +15-25% conversion on landing pages

**A/B TEST SETUP:**
- Baseline: Positive framing ("Get X", "Improve Y")
- Variant: Loss aversion framing ("Stop losing X", "You're wasting Y")
- Sample: Min 300 visitors per variant
- Measure: CTR, time on page, conversion rate

**CHECKLIST:**
- [ ] Headline uses loss framing (not gain)
- [ ] Loss is quantified with specific numbers
- [ ] Personal pronouns used ("you", "your")
- [ ] CTA transitions to solution/protection frame
- [ ] Not overdone (balance negative/positive)
- [ ] Claims are credible and verifiable

---

## Practice #54: Urgency & Scarcity

**PROBLEM:** Users procrastinate. "I'll come back later" = they never come back. Without a reason to act NOW, conversion drops by 50%+ on first visit.

**RESENI:** Create real reasons to act now: time-limited offers, countdown timers, limited stock indicators. GoodUI patterns #35, #36, #42 all confirm significant conversion lifts.

**PRAVIDLA:**
- Urgency and scarcity MUST be real (not fabricated)
- Fake urgency destroys trust permanently (once caught, brand is damaged)
- Time-based (deadline) + quantity-based (limited stock) can combine
- Always show what happens after the deadline (price goes up, offer disappears)
- GoodUI #42: countdown timers are one of the most tested patterns

**IMPLEMENTACE:**

### Types of Urgency

```
1. TIME-BASED: "Offer ends in 24 hours"
   - Sales, launches, seasonal promotions
   - Countdown timer (visual urgency)

2. QUANTITY-BASED: "Only 3 left in stock"
   - Physical products, event tickets, cohort enrollments
   - Stock indicator (specific number)

3. DEMAND-BASED: "47 people viewing this right now"
   - Hotels, flights, popular items
   - Activity indicators

4. COMMITMENT-BASED: "Price locked for 30 days"
   - SaaS pricing, locked-in offers
   - Grandfather pricing
```

### KOD:

```html
<!-- Countdown Timer Component -->
<div class="urgency-banner" id="countdown-banner">
  <p>
    <strong>Early bird pricing ends in:</strong>
    <span class="countdown" id="countdown">
      <span class="time-unit"><span id="hours">23</span>h</span>
      <span class="time-unit"><span id="minutes">45</span>m</span>
      <span class="time-unit"><span id="seconds">12</span>s</span>
    </span>
  </p>
  <p class="after-deadline">Then price increases from <s>$49</s> to $79/mo</p>
</div>

<style>
.urgency-banner {
  background: #FFF3E0;
  border: 1px solid #FF9800;
  border-radius: 8px;
  padding: 16px 24px;
  text-align: center;
  margin-bottom: 24px;
}

.countdown {
  font-size: 24px;
  font-weight: 700;
  color: #E65100;
  margin: 0 8px;
}

.time-unit {
  background: #E65100;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0 2px;
  font-family: monospace;
}

.after-deadline {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}
</style>

<script>
// Real countdown - must use actual server-side deadline
function initCountdown(deadlineISO) {
  const deadline = new Date(deadlineISO).getTime();

  const timer = setInterval(() => {
    const now = Date.now();
    const remaining = deadline - now;

    if (remaining <= 0) {
      clearInterval(timer);
      const banner = document.getElementById('countdown-banner');
      banner.textContent = 'Early bird pricing has ended. Current price: $79/mo';
      return;
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

// Use real deadline from server
initCountdown('2026-03-01T23:59:59Z');
</script>
```

```html
<!-- Stock Scarcity Component -->
<div class="stock-indicator">
  <span class="stock-dot"></span>
  <span class="stock-text">Only <strong>3 left</strong> in stock</span>
</div>

<style>
.stock-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #D32F2F;
  font-size: 14px;
  font-weight: 500;
}

.stock-dot {
  width: 8px;
  height: 8px;
  background: #D32F2F;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
```

### Ethical Guidelines

**DO:**
- Use real deadlines tied to actual events (launch, sale end date)
- Show real stock levels from your inventory system
- Honor the deadline (actually raise price after)
- Be transparent about why the offer is limited

**DON'T:**
- Fake countdown that resets on page reload
- "Only 2 left!" when you have 2,000
- Evergreen urgency ("Last chance!" every week)
- Pressure tactics on essential services (healthcare, insurance)

### Test: Is Your Urgency Real?

```
1. Does the offer ACTUALLY expire? (yes = real)
2. Would a returning visitor see the same timer? (yes = fake)
3. Is the stock number from your real inventory? (yes = real)
4. Do you honor the deadline? (yes = real)
```

**OCEKAVANY DOPAD:** +10-25% conversion with real urgency/scarcity

**A/B TEST SETUP:**
- Baseline: No urgency elements
- Variant A: Countdown timer only
- Variant B: Stock scarcity only
- Variant C: Combined timer + stock
- Sample: Min 200 conversions per variant
- Measure: Conversion rate, revenue per visitor, return rate

**CHECKLIST:**
- [ ] Urgency is REAL (not fabricated)
- [ ] Countdown uses server-side deadline (not client-side)
- [ ] Timer shows what happens after deadline
- [ ] Stock numbers from real inventory
- [ ] Deadline is honored (price actually goes up)
- [ ] No pressure on essential services
- [ ] Mobile-friendly display
- [ ] Tested: does timer reset on reload? (it shouldn't)

---

## Practice #55: Reaffirming Freedom (Paradox of Choice)

**PROBLEM:** Users hesitate at CTA because they fear commitment. "What if I can't cancel?", "What if it's not for me?", "Am I locked in?"

**RESENI:** Explicitly state that the user has full control and freedom. "You can cancel anytime", "No commitment required", "It's your choice." GoodUI pattern #54 shows this paradoxically INCREASES conversion because removing pressure makes users more willing to commit.

**PRAVIDLA:**
- Place freedom reassurance directly near the CTA (within visual proximity)
- Use plain language, not legal jargon
- Specific > vague ("Cancel in 2 clicks" > "Easy cancellation")
- GoodUI data story #20: +17% sales when freedom is reaffirmed
- Works especially well for subscriptions, trials, and high-commitment CTAs

**IMPLEMENTACE:**

### Reassurance Text Placement

```
[CTA Button: "Start Free Trial"]
   |
   v
"No credit card required. Cancel anytime."  <-- RIGHT HERE
```

### KOD:

```html
<!-- Reassurance near CTA -->
<div class="cta-block">
  <button class="btn-primary btn-large">Start Free Trial</button>

  <ul class="reassurance-list">
    <li>No credit card required</li>
    <li>Cancel anytime in 2 clicks</li>
    <li>Full features for 14 days</li>
  </ul>
</div>

<style>
.cta-block {
  text-align: center;
  padding: 32px;
}

.reassurance-list {
  list-style: none;
  padding: 0;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.reassurance-list li {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
}

.reassurance-list li::before {
  content: '\2713'; /* checkmark */
  color: #28A745;
  font-weight: bold;
}
</style>
```

```html
<!-- Pricing page reassurance -->
<div class="pricing-card">
  <h3>Pro Plan</h3>
  <p class="price">$29/mo</p>

  <button class="btn-primary">Choose Pro</button>

  <p class="freedom-text">
    Switch plans or cancel anytime. No long-term contracts.
    <a href="/cancellation-policy">See our cancellation policy</a>
  </p>
</div>

<style>
.freedom-text {
  font-size: 13px;
  color: #888;
  margin-top: 12px;
  line-height: 1.5;
}

.freedom-text a {
  color: #0066CC;
  text-decoration: underline;
}
</style>
```

### Reassurance Phrases (Ranked by Effectiveness)

| Phrase | Context | Why It Works |
|--------|---------|-------------|
| "No credit card required" | Free trial | Removes financial risk |
| "Cancel anytime" | Subscription | Removes lock-in fear |
| "30-day money-back guarantee" | Purchase | Removes buyer's remorse |
| "No commitment" | Sign-up | Removes obligation anxiety |
| "You can always change later" | Plan selection | Reduces decision paralysis |
| "It's your choice" | Any decision point | Autonomy = action |
| "Unsubscribe in one click" | Email signup | Removes spam fear |

### Where to Place Reassurance

1. **Below CTA buttons** - Most effective position
2. **Pricing page** - Next to each plan
3. **Checkout page** - Before final purchase
4. **Email signup forms** - Below submit button
5. **Trial onboarding** - In welcome email

**OCEKAVANY DOPAD:** +17% sales (GoodUI data story #20), +10-20% trial signups

**A/B TEST SETUP:**
- Baseline: CTA without reassurance text
- Variant: CTA with freedom reassurance
- Sample: Min 200 conversions per variant
- Measure: Click-through rate, signup rate, trial-to-paid conversion

**CHECKLIST:**
- [ ] Reassurance text is within visual proximity of CTA
- [ ] Uses plain language (not legal jargon)
- [ ] Specific claims ("2 clicks", "14 days", "30 seconds")
- [ ] Claims are TRUE (actually easy to cancel)
- [ ] Visible on mobile (not cut off)
- [ ] Link to full policy for transparency

---

## Practice #56: Opt-Out Defaults

**PROBLEM:** Users are lazy (System 1 thinking). If something requires active action to opt IN, most won't bother. This means low participation in newsletters, add-ons, and beneficial features.

**RESENI:** Pre-select beneficial options. Use opt-OUT instead of opt-IN. GoodUI pattern #26 shows opt-out converts 2-3x better than opt-in. Users tend to stick with defaults (Status Quo Bias).

**PRAVIDLA:**
- Default to the option that benefits both user AND business
- LEGAL: GDPR requires opt-IN for marketing communications (not opt-out)
- Opt-out is fine for: feature defaults, UI preferences, non-marketing choices
- Never pre-check marketing consent checkboxes in EU (see `legal-ux.md` Practice #22)
- Be transparent: don't hide what's pre-selected

**IMPLEMENTACE:**

### Where Opt-Out Defaults Are Ethical

```
ETHICAL (can use opt-out):
- Feature activation ("Enable smart notifications" = ON)
- Better defaults ("Show prices in your currency" = ON)
- Beneficial add-ons ("Include free gift wrapping" = ON)
- Account settings ("Receive product updates" = ON) [non-EU or with consent]
- Privacy-enhancing defaults ("Block third-party cookies" = ON)

UNETHICAL / ILLEGAL (must use opt-in):
- Marketing emails in EU (GDPR requires active consent)
- Sharing data with third parties
- Auto-enrolling in paid upgrades
- Hidden recurring charges
- Pre-checked "I agree to receive calls from partners"
```

### KOD:

```html
<!-- Ethical: Feature default (opt-out) -->
<div class="setting-row">
  <label class="toggle-label">
    <input type="checkbox" name="smart_notifications" checked>
    <span class="toggle-switch"></span>
    <span class="toggle-text">
      <strong>Smart notifications</strong>
      <small>Get notified about important updates only (no spam)</small>
    </span>
  </label>
</div>

<!-- Ethical: Beneficial add-on -->
<div class="checkout-addon">
  <label>
    <input type="checkbox" name="gift_wrap" checked>
    Free gift wrapping included
    <small>(uncheck to remove)</small>
  </label>
</div>

<!-- GDPR compliant: Marketing must be opt-IN -->
<div class="newsletter-consent">
  <label>
    <input type="checkbox" name="marketing_consent">
    <!-- NOT checked by default in EU -->
    I want to receive promotional emails and offers
  </label>
  <small>You can unsubscribe anytime. <a href="/privacy">Privacy policy</a></small>
</div>
```

```css
.toggle-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.toggle-label:hover {
  border-color: #0066CC;
}

.toggle-text strong {
  display: block;
  margin-bottom: 4px;
}

.toggle-text small {
  color: #888;
  font-size: 13px;
}

.setting-row {
  margin-bottom: 12px;
}
```

### Decision Framework: Opt-In vs Opt-Out

```
Is it marketing/promotional?
  YES -> Opt-IN (especially in EU/GDPR)
  NO  -> Continue...

Does it benefit the user?
  YES -> Opt-OUT default is ethical
  NO  -> Opt-IN (don't trick users)

Is it transparent?
  YES -> Proceed
  NO  -> Make it visible, then proceed
```

**OCEKAVANY DOPAD:** +100-200% participation (opt-out vs opt-in, 2-3x improvement per GoodUI #26)

**LEGAL NOTE:** See `legal-ux.md` Practice #22 for GDPR-specific consent requirements. Marketing checkboxes in EU MUST be opt-in. Fines for violations can reach 4% of global revenue.

**A/B TEST SETUP:**
- Baseline: Opt-in (unchecked by default)
- Variant: Opt-out (checked by default)
- IMPORTANT: Only test with non-marketing, user-beneficial options
- Sample: Min 300 users per variant
- Measure: Participation rate, complaint rate, unsubscribe rate

**CHECKLIST:**
- [ ] Marketing consent is opt-IN (GDPR)
- [ ] Feature defaults are clearly visible (not hidden)
- [ ] Pre-selected options genuinely benefit the user
- [ ] Easy to change the default (visible toggle/checkbox)
- [ ] No auto-enrollment in paid features
- [ ] Legal review for regional compliance
- [ ] Transparent about what's pre-selected

---

## Practice #57: Variable Rewards & Gamification

**PROBLEM:** Users sign up but don't stick. SaaS retention drops 50%+ after month 1. Users complete onboarding but never form a habit.

**RESENI:** Use variable (unpredictable) rewards and gamification elements to create habit loops. Based on Nir Eyal's "Hooked" model: Trigger -> Action -> Variable Reward -> Investment. GoodUI patterns #55 and #58 (set collections) confirm engagement lifts.

**PRAVIDLA:**
- Variable rewards work better than fixed rewards (slot machine effect)
- Progress visualization is the simplest gamification (and most effective)
- Don't gamify for the sake of it -- the core product must deliver value
- Streaks work for daily-use products (Duolingo, GitHub)
- Badges work for milestone achievements (LinkedIn, Stack Overflow)
- Leaderboards work for competitive contexts (sales teams, fitness)

**IMPLEMENTACE:**

### The Hooked Model (Nir Eyal)

```
TRIGGER (external or internal)
  |
  v
ACTION (simple behavior)
  |
  v
VARIABLE REWARD (unpredictable positive outcome)
  |
  v
INVESTMENT (user puts something in, increasing switching cost)
  |
  v
(loop repeats)
```

### Gamification Elements (Pick 1-3, not all)

| Element | Best For | Complexity |
|---------|----------|------------|
| Progress bar | Onboarding, profile completion | Low |
| Streaks | Daily-use products | Medium |
| Badges/achievements | Milestone recognition | Medium |
| Points/XP | Learning platforms | Medium |
| Leaderboards | Competitive contexts | High |
| Levels/tiers | Loyalty programs | High |
| Set collections | Engagement loops | High |

### KOD:

```html
<!-- Progress Bar (simplest, most effective) -->
<div class="onboarding-progress">
  <div class="progress-header">
    <h4>Account setup</h4>
    <span class="progress-percent">60%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" style="width: 60%"></div>
  </div>
  <ul class="progress-steps">
    <li class="completed">Create account</li>
    <li class="completed">Add profile photo</li>
    <li class="completed">Connect workspace</li>
    <li class="current">Invite team member</li>
    <li>Complete first project</li>
  </ul>
</div>

<style>
.onboarding-progress {
  background: #F8F9FA;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-percent {
  font-weight: 700;
  color: #0066CC;
}

.progress-bar {
  height: 8px;
  background: #E0E0E0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0066CC, #00AA55);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-steps {
  list-style: none;
  padding: 0;
}

.progress-steps li {
  padding: 8px 0;
  padding-left: 28px;
  position: relative;
  font-size: 14px;
  color: #666;
}

.progress-steps li.completed {
  color: #28A745;
  text-decoration: line-through;
}

.progress-steps li.completed::before {
  content: '\2713';
  position: absolute;
  left: 0;
  color: #28A745;
  font-weight: bold;
}

.progress-steps li.current {
  color: #0066CC;
  font-weight: 600;
}

.progress-steps li.current::before {
  content: '\25CB';
  position: absolute;
  left: 0;
  color: #0066CC;
}
</style>
```

```html
<!-- Streak Counter -->
<div class="streak-widget">
  <div class="streak-flame">
    <span class="streak-count">7</span>
  </div>
  <p class="streak-label">day streak</p>
  <p class="streak-motivation">Your longest streak: 12 days. Keep going!</p>
</div>

<style>
.streak-widget {
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, #FFF3E0, #FFECB3);
  border-radius: 12px;
}

.streak-flame {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.streak-count {
  font-size: 48px;
  font-weight: 800;
  color: #E65100;
}

.streak-label {
  font-size: 16px;
  color: #BF360C;
  font-weight: 600;
  margin-top: 4px;
}

.streak-motivation {
  font-size: 13px;
  color: #888;
  margin-top: 8px;
}
</style>
```

### When NOT to Gamify

- **Core product is weak** -- gamification can't fix bad product
- **Users are annoyed** -- not every product needs badges
- **B2B enterprise** -- professionals often find gamification patronizing
- **Sensitive contexts** -- healthcare, finance (be careful)

**OCEKAVANY DOPAD:** +40-60% engagement and retention for SaaS products (when gamification matches product context)

**A/B TEST SETUP:**
- Baseline: No gamification elements
- Variant A: Progress bar only
- Variant B: Progress bar + streak
- Measure: DAU/MAU ratio, feature adoption, retention at 30/60/90 days
- Duration: Min 4 weeks (habit formation takes time)

**CHECKLIST:**
- [ ] Core product delivers value WITHOUT gamification
- [ ] Pick 1-3 elements max (don't over-gamify)
- [ ] Progress bar for onboarding (simplest win)
- [ ] Rewards match user goals (not just vanity metrics)
- [ ] Mobile-friendly display
- [ ] Variable rewards included (not just fixed)
- [ ] Track retention metrics, not just engagement

---

## Practice #58: Social Proof Beyond Testimonials

**PROBLEM:** Testimonials are expected and often feel curated/fake. Users have "testimonial blindness" -- they skip over them because every site has them. You need more credible forms of social proof.

**RESENI:** Use specific, dynamic social proof: customer counts, real-time activity feeds, integration logos, social share counts, case study snippets with exact numbers. GoodUI pattern #4 + evidence #69 show social counts increase conversion by +3.1%. Specific numbers are more credible than vague claims.

**PRAVIDLA:**
- Specific numbers > vague claims ("50,847 users" > "Thousands of users")
- Dynamic/real-time > static ("47 people signed up today" > "Trusted by many")
- Peer proof > celebrity proof (users want to see people like them)
- Odd/precise numbers feel more authentic (50,847 > 50,000)
- GoodUI evidence #69: adding social counts = +3.1% conversion

**IMPLEMENTACE:**

### 6 Types of Social Proof (Beyond Testimonials)

```
1. CUSTOMER COUNT: "Join 50,847+ teams"
2. ACTIVITY FEED: "Sarah from Berlin just signed up 3 min ago"
3. LOGO BAR: "Trusted by [Company] [Company] [Company]"
4. SOCIAL COUNTS: "4,231 shares | 892 likes"
5. USAGE STATS: "2.3M projects created this year"
6. RATINGS AGGREGATE: "4.8/5 from 3,247 reviews"
```

### KOD:

```html
<!-- Customer Counter (Hero section) -->
<div class="social-proof-counter">
  <div class="counter-stat">
    <span class="counter-number">50,847</span>
    <span class="counter-label">teams already using ProductName</span>
  </div>
  <div class="counter-avatars">
    <!-- Show real user avatars (with permission) -->
    <img src="/avatars/user1.jpg" alt="User" class="avatar">
    <img src="/avatars/user2.jpg" alt="User" class="avatar">
    <img src="/avatars/user3.jpg" alt="User" class="avatar">
    <img src="/avatars/user4.jpg" alt="User" class="avatar">
    <span class="avatar-more">+50,843</span>
  </div>
</div>

<style>
.social-proof-counter {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: #F8F9FA;
  border-radius: 12px;
  margin: 24px 0;
}

.counter-number {
  font-size: 28px;
  font-weight: 800;
  color: #1A1A1A;
}

.counter-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-top: 2px;
}

.counter-avatars {
  display: flex;
  align-items: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -10px;
  object-fit: cover;
}

.avatar:first-child {
  margin-left: 0;
}

.avatar-more {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #E0E0E0;
  color: #666;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  border: 2px solid white;
}
</style>
```

```html
<!-- Real-Time Activity Feed -->
<div class="activity-feed" id="activity-feed">
  <!-- Populated dynamically from real backend data -->
</div>

<style>
.activity-feed {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 100;
  max-width: 320px;
}

.activity-item {
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.activity-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.activity-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #28A745;
  border-radius: 50%;
  margin-right: 8px;
}

.activity-item em {
  color: #888;
  font-style: normal;
}
</style>
```

```html
<!-- Logo Bar (Trust indicators) -->
<div class="logo-bar">
  <p class="logo-bar-label">Trusted by teams at</p>
  <div class="logo-bar-logos">
    <img src="/logos/company1.svg" alt="Company 1">
    <img src="/logos/company2.svg" alt="Company 2">
    <img src="/logos/company3.svg" alt="Company 3">
    <img src="/logos/company4.svg" alt="Company 4">
    <img src="/logos/company5.svg" alt="Company 5">
  </div>
</div>

<style>
.logo-bar {
  text-align: center;
  padding: 32px 0;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
}

.logo-bar-label {
  font-size: 14px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.logo-bar-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.logo-bar-logos img {
  height: 28px;
  opacity: 0.5;
  filter: grayscale(100%);
  transition: all 0.2s;
}

.logo-bar-logos img:hover {
  opacity: 1;
  filter: grayscale(0%);
}
</style>
```

### Credibility Hierarchy

```
MOST CREDIBLE:
  1. Specific numbers from real data ("50,847 users")
  2. Named case studies with results ("Acme Inc grew 40%")
  3. Third-party review aggregates ("4.8/5 on G2")
  4. Real-time activity (live signup notifications)

LESS CREDIBLE:
  5. Logo bars (common but expected)
  6. Anonymous testimonials ("A satisfied customer says...")
  7. Vague claims ("Thousands trust us")
  8. Self-awarded badges ("Best of 2025")
```

### IMPORTANT: Activity Feeds Must Be Real

- Use REAL data from your backend (not fabricated names/cities)
- If you don't have enough real activity, DON'T use a fake feed
- Fake activity feeds are worse than no feed (trust destruction)
- Alternative: show aggregate stats instead ("124 signups this week")

**OCEKAVANY DOPAD:** +3.1% conversion with social counts (GoodUI evidence #69), +10-25% with combined social proof strategy

**A/B TEST SETUP:**
- Baseline: No social proof (or testimonials only)
- Variant A: Customer counter + logo bar
- Variant B: Counter + logo bar + activity feed
- Sample: Min 500 visitors per variant
- Measure: Conversion rate, trust perception (survey), time to conversion

**CHECKLIST:**
- [ ] Customer count uses specific number (not rounded)
- [ ] Numbers are REAL (from database, not made up)
- [ ] Logo bar shows recognizable companies (with permission)
- [ ] Activity feed uses real backend data
- [ ] Ratings link to third-party source (G2, Capterra, Trustpilot)
- [ ] Mobile-optimized (activity feed doesn't block content)
- [ ] Numbers updated regularly (stale numbers = distrust)
- [ ] No fake/fabricated social proof elements

---

## Summary

**7 Persuasion & Behavioral Psychology Practices:**

1. **#52 Reciprocity** (+20-30%) - Give free value before asking
2. **#53 Loss Aversion Framing** (+15-30%) - Frame around losses, not gains
3. **#54 Urgency & Scarcity** (+10-25%) - Real deadlines and limited stock
4. **#55 Reaffirming Freedom** (+10-20%) - "Cancel anytime" near CTAs
5. **#56 Opt-Out Defaults** (+100-200%) - Pre-select beneficial options (GDPR-aware)
6. **#57 Variable Rewards & Gamification** (+40-60%) - Progress bars, streaks, badges
7. **#58 Social Proof Beyond Testimonials** (+10-25%) - Specific numbers, activity feeds, logos

**Total potential:** +205-390% combined improvement (not additive -- expect 30-60% real-world combined lift)

**Priority (ICE):**
1. Loss aversion framing (high impact, zero effort -- just rewrite copy)
2. Reaffirming freedom (high impact, low effort -- add text near CTAs)
3. Social proof beyond testimonials (high impact, medium effort)
4. Reciprocity (high impact, medium effort -- need to create free tool/content)
5. Urgency & scarcity (medium impact, low effort -- but must be real)
6. Opt-out defaults (high impact, low effort -- but legal review needed)
7. Variable rewards (high impact, high effort -- full feature build)

**Key principle:** All persuasion patterns must be ETHICAL and REAL. Fake urgency, fabricated social proof, and manipulative defaults destroy trust permanently. These patterns work BECAUSE they're honest.

**See also:**
- `legal-ux.md` Practice #22 - GDPR consent and checkbox compliance
- `design.md` Practice #13 - CTA button design
- `ecommerce.md` Practice #12 - AOV strategies (uses scarcity/urgency)
- `copy-ux-patterns.md` - UX copy practices that complement these patterns
