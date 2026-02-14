# Copy & UX Patterns

UX-level copy patterns that bridge the gap between pure UX optimization and copywriting. Based on GoodUI.org A/B tests, MarketingExperiments research, and conversion copy best practices.

---

## Practice #59: Benefit Buttons (Action + Outcome)

**PROBLEM:** Generic button text ("Submit", "Download", "Click here") tells users WHAT to do but not WHY. Users hesitate because the button doesn't communicate value.

**RESENI:** Replace generic button labels with benefit-focused CTAs that combine action + outcome. "Get free report" instead of "Download". "Save 20% now" instead of "Submit". GoodUI pattern #18 confirms benefit-focused CTAs outperform generic labels.

**PRAVIDLA:**
- Button text = verb + benefit (what they GET, not what they DO)
- First person can increase conversion ("Get MY report" vs "Get your report")
- Specific > vague ("Save $47" > "Save money")
- Keep under 5 words (scannable at a glance)
- MarketingExperiments: benefit-focused CTAs outperform generic by +25-40%

**IMPLEMENTACE:**

### Bad vs Good Button Text

| Context | Bad (generic) | Good (benefit) |
|---------|--------------|----------------|
| Newsletter | "Submit" | "Get weekly tips" |
| Free trial | "Sign up" | "Start free trial" |
| E-book download | "Download" | "Get free guide" |
| Pricing | "Buy" | "Save 20% today" |
| Contact form | "Send" | "Get my free quote" |
| SaaS onboarding | "Next" | "Set up my workspace" |
| Checkout | "Continue" | "Complete my order" |
| Demo request | "Submit form" | "Book my demo" |
| Course | "Enroll" | "Start learning free" |
| Tool | "Click here" | "Analyze my site" |

### KOD:

```html
<!-- Generic (weak) -->
<button class="btn-primary">Submit</button>
<button class="btn-primary">Download</button>
<button class="btn-primary">Sign up</button>

<!-- Benefit-focused (strong) -->
<button class="btn-primary">Get my free report</button>
<button class="btn-primary">Save 20% now</button>
<button class="btn-primary">Start my free trial</button>
```

```html
<!-- Full CTA block with benefit button -->
<div class="cta-block">
  <h2>Stop guessing. Start optimizing.</h2>
  <p>Get a personalized UX audit of your website in 60 seconds.</p>

  <button class="btn-primary btn-benefit">
    <span class="btn-main">Audit my website free</span>
    <span class="btn-sub">Takes 60 seconds. No signup.</span>
  </button>
</div>

<style>
.btn-benefit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
}

.btn-main {
  font-size: 18px;
  font-weight: 700;
}

.btn-sub {
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
  margin-top: 4px;
}
</style>
```

### Button Text Formula

```
FORMULA: [Action verb] + [Specific benefit] + [Timeframe/qualifier]

Examples:
- "Get" + "free audit" + "in 60 seconds"
- "Save" + "20%" + "today"
- "Start" + "free trial" + "(no credit card)"
- "Book" + "my demo" + "for this week"
```

### First Person vs Second Person

```
Second person: "Get your free report"  (standard)
First person:  "Get my free report"    (often +10-15% better)

Why: First person creates ownership before the click.
Test both -- results vary by audience.
```

**OCEKAVANY DOPAD:** +25-40% click-through (MarketingExperiments research)

**A/B TEST SETUP:**
- Baseline: Generic button text ("Submit", "Download")
- Variant A: Benefit-focused ("Get free report")
- Variant B: First person benefit ("Get my free report")
- Sample: Min 200 clicks per variant
- Measure: CTR, form completion rate

**CHECKLIST:**
- [ ] Every CTA button communicates a benefit (not just an action)
- [ ] Under 5 words
- [ ] Specific outcome mentioned
- [ ] First person tested vs second person
- [ ] Sub-text under button for extra reassurance (optional)
- [ ] Consistent across the page (don't mix styles)

---

## Practice #60: Direct & Confident Language

**PROBLEM:** Weak, hedging language ("We try to provide...", "Our product might help you...") signals uncertainty and erodes trust. If YOU are not confident in your product, why should the user be?

**RESENI:** Remove hedging words. Be direct and confident. GoodUI pattern #10: confident language increases trust perception by +15-20%. Say what you DO, not what you "try to" do.

**PRAVIDLA:**
- Remove: "maybe", "might", "we think", "try to", "we believe", "possibly"
- Replace with: direct statements of fact
- Active voice > passive voice ("We build X" not "X is built by us")
- Short sentences > long sentences
- One idea per sentence

**IMPLEMENTACE:**

### Words to Remove

```
WEAK (remove these):                STRONG (use these instead):
"We try to..."                      "We [do]."
"Our product might help..."         "Our product [does]."
"We think this is..."               "This is."
"We believe we can..."              "We [do]."
"Possibly the best..."              "The [best/fastest/etc]."
"We aim to provide..."              "We provide."
"It should work for..."             "It works for."
"We hope you'll enjoy..."           "You'll [enjoy/love/use]."
"We're working on becoming..."      "We are."
"Kind of like..."                   "[Direct comparison]."
```

### Before/After Examples

```
BEFORE (hedging):
"We try to provide the best customer support experience
and we believe our team can help solve most of your issues
in a reasonable amount of time."

AFTER (direct):
"24/7 support. Average response time: 4 minutes.
97% of issues resolved on first contact."
```

```
BEFORE:
"Our software might help you save time on repetitive
tasks that you maybe do every day."

AFTER:
"Automate repetitive tasks. Save 12 hours per week."
```

```
BEFORE:
"We think our pricing is quite competitive compared
to other solutions in the market."

AFTER:
"Half the price of Competitor X. Same features."
```

### KOD:

```html
<!-- Weak copy -->
<section class="hero">
  <h1>We try to help businesses grow their online presence</h1>
  <p>Our platform might be the solution you're looking for.
     We believe we can help you achieve better results
     with our tools and features.</p>
  <button>Try it maybe</button>
</section>

<!-- Strong copy -->
<section class="hero">
  <h1>Grow your online presence 3x faster</h1>
  <p>One platform. SEO, analytics, and content tools.
     Used by 12,000+ businesses to rank higher and convert more.</p>
  <button>Start growing today</button>
</section>
```

### Confidence Audit Checklist

```
Read every sentence on your page and ask:
1. Does this sentence contain "try", "might", "maybe", "believe"?
   -> Rewrite without it.

2. Is this passive voice? ("is provided by", "was built for")
   -> Rewrite as active. ("We provide", "Built for")

3. Is this longer than 20 words?
   -> Split into two sentences.

4. Does this make a specific claim with a number?
   -> If not, add one. ("Fast" -> "4-minute response time")
```

**OCEKAVANY DOPAD:** +15-20% trust perception, +10-15% conversion when combined with specific claims

**A/B TEST SETUP:**
- Baseline: Current copy (with hedging words)
- Variant: Rewritten copy (direct, confident)
- Sample: Min 300 visitors per variant
- Measure: Trust score (survey), bounce rate, conversion rate

**CHECKLIST:**
- [ ] Zero hedging words on landing page ("try", "might", "believe", "maybe")
- [ ] Active voice throughout
- [ ] Sentences under 20 words
- [ ] Specific numbers where possible
- [ ] Reads naturally (not robotic or aggressive)
- [ ] Tone matches brand (confident != arrogant)

---

## Practice #61: Natural Language in Forms

**PROBLEM:** Traditional form labels ("Email:", "Name:", "Phone:") feel bureaucratic and cold. The form experience feels like filling out a government document.

**RESENI:** Use conversational, natural language in form fields. "What's your email?" instead of "Email:". GoodUI pattern #48 shows this can improve completion rates, though results are mixed (+5-15% when done well, negative when forced).

**PRAVIDLA:**
- Works best for short forms (1-4 fields)
- DON'T use for long/complex forms (gets annoying)
- Keep it genuine conversational, not forced ("Yo, what's your name?" = bad)
- Placeholder text should show expected format
- Must still be accessible (proper labels for screen readers)

**IMPLEMENTACE:**

### When to Use Natural Language

```
USE (short, casual forms):
- Newsletter signup
- Contact form
- Simple lead gen
- Feedback forms

DON'T USE (long, complex forms):
- Checkout (address, payment)
- Enterprise forms
- Legal/compliance forms
- Multi-step wizards (progress matters more than tone)
```

### Before/After

```
TRADITIONAL:                    CONVERSATIONAL:
Email:                          What's your email?
Name:                           What should we call you?
Company:                        Where do you work?
Message:                        How can we help?
Phone:                          Best number to reach you?
Budget:                         What's your budget range?
```

### KOD:

```html
<!-- Traditional (cold) -->
<form class="contact-form">
  <label>Name:</label>
  <input type="text" name="name" placeholder="John Doe">

  <label>Email:</label>
  <input type="email" name="email" placeholder="john@example.com">

  <label>Message:</label>
  <textarea name="message" placeholder="Your message..."></textarea>

  <button type="submit">Send</button>
</form>

<!-- Conversational (warm) -->
<form class="contact-form conversational">
  <div class="form-group">
    <label for="name">What should we call you?</label>
    <input type="text" id="name" name="name" placeholder="e.g. Sarah">
  </div>

  <div class="form-group">
    <label for="email">What's your email?</label>
    <input type="email" id="email" name="email"
           placeholder="e.g. sarah@company.com">
    <small>We'll reply here within 24 hours.</small>
  </div>

  <div class="form-group">
    <label for="message">How can we help?</label>
    <textarea id="message" name="message"
              placeholder="Tell us what you're working on..."></textarea>
  </div>

  <button type="submit" class="btn-primary">Send my message</button>
</form>

<style>
.conversational label {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 8px;
  display: block;
}

.conversational input,
.conversational textarea {
  font-size: 16px;
  padding: 12px 16px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  width: 100%;
  transition: border-color 0.2s;
}

.conversational input:focus,
.conversational textarea:focus {
  border-color: #0066CC;
  outline: none;
}

.conversational small {
  color: #888;
  font-size: 13px;
  margin-top: 4px;
  display: block;
}

.conversational .form-group {
  margin-bottom: 24px;
}
</style>
```

### Accessibility Note

```html
<!-- Conversational but accessible -->
<label for="email">What's your email?</label>
<input type="email" id="email" name="email"
       autocomplete="email"
       aria-describedby="email-hint"
       placeholder="e.g. sarah@company.com">
<small id="email-hint">We'll reply here within 24 hours.</small>

<!-- Screen reader reads: "What's your email? We'll reply here within 24 hours." -->
```

**OCEKAVANY DOPAD:** +5-15% form completion (when done well on short forms)

**A/B TEST SETUP:**
- Baseline: Traditional labels ("Email:", "Name:")
- Variant: Conversational labels ("What's your email?")
- Sample: Min 150 form submissions per variant
- Measure: Completion rate, time to complete, error rate
- SEGMENT: By form length (short vs long)

**CHECKLIST:**
- [ ] Only on short forms (1-4 fields)
- [ ] Genuine tone (not forced casual)
- [ ] Proper `<label>` elements for accessibility
- [ ] `aria-describedby` for helper text
- [ ] Autocomplete attributes still present
- [ ] Placeholders show expected format
- [ ] Tested with screen readers

---

## Practice #62: Telling Who It's For (Explicit Targeting)

**PROBLEM:** Generic messaging ("For everyone", "The best solution") doesn't resonate with anyone. Users can't tell if this product is relevant to THEM specifically.

**RESENI:** Explicitly state who the product is for. "Built for SaaS founders", "Designed for teams of 5-50", "Perfect for freelance designers". GoodUI pattern #9: explicit audience targeting creates a sense of exclusivity and relevance.

**PRAVIDLA:**
- Be specific about your target audience (job title, team size, industry)
- Exclusion is as powerful as inclusion ("Not for enterprises" = more credible)
- Place targeting statement early (hero section, above the fold)
- Match the language your audience uses about themselves
- +20-35% relevance perception when audience is explicitly named

**IMPLEMENTACE:**

### Targeting by Business Type

| Business | Generic (weak) | Targeted (strong) |
|----------|---------------|-------------------|
| SaaS | "Project management tool" | "Project management for remote teams of 5-20" |
| Agency | "Marketing services" | "SEO agency for B2B SaaS companies" |
| E-commerce | "Best products online" | "Sustainable home goods for eco-conscious families" |
| Course | "Learn to code" | "Python for data analysts switching from Excel" |
| Freelancer | "Design services" | "Brand identity for tech startups pre-Series A" |

### KOD:

```html
<!-- Generic (nobody feels spoken to) -->
<section class="hero">
  <h1>The best project management tool</h1>
  <p>For teams of all sizes. Manage projects, tasks, and deadlines.</p>
</section>

<!-- Targeted (ideal customer feels seen) -->
<section class="hero">
  <p class="audience-tag">Built for remote teams of 5-20</p>
  <h1>Stop losing tasks in Slack threads</h1>
  <p>Async project management that actually works
     when your team is spread across 4 time zones.</p>
</section>

<style>
.audience-tag {
  display: inline-block;
  background: #E3F2FD;
  color: #1565C0;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}
</style>
```

```html
<!-- Multiple audience segments (use tabs or sections) -->
<div class="audience-segments">
  <div class="segment">
    <h3>For SaaS founders</h3>
    <p>Track MRR, churn, and growth metrics in one dashboard.
       Built by founders who understand your priorities.</p>
    <a href="/saas" class="btn-secondary">See SaaS features</a>
  </div>

  <div class="segment">
    <h3>For agency owners</h3>
    <p>Manage client reporting, campaign performance,
       and team utilization. White-label ready.</p>
    <a href="/agency" class="btn-secondary">See agency features</a>
  </div>

  <div class="segment">
    <h3>For e-commerce teams</h3>
    <p>Revenue attribution, inventory alerts,
       and customer lifetime value tracking.</p>
    <a href="/ecommerce" class="btn-secondary">See e-commerce features</a>
  </div>
</div>

<style>
.audience-segments {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 48px 0;
}

.segment {
  padding: 24px;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  transition: border-color 0.2s;
}

.segment:hover {
  border-color: #0066CC;
}

.segment h3 {
  font-size: 20px;
  margin-bottom: 12px;
}

.segment p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}
</style>
```

### Exclusion as Strategy

```
"Not for everyone" messaging (counterintuitive but effective):

"This is NOT for you if..."
- You want a free tool (we're premium)
- Your team is 100+ people (we're built for small teams)
- You need enterprise compliance (see [Alternative] instead)

Why this works: Exclusion signals confidence and specificity.
People who DO match feel like they found exactly what they need.
```

**OCEKAVANY DOPAD:** +20-35% relevance perception, +10-20% conversion for matching audience

**A/B TEST SETUP:**
- Baseline: Generic messaging ("For everyone")
- Variant: Explicit targeting ("Built for [specific audience]")
- Sample: Min 300 visitors per variant
- Measure: Bounce rate, time on page, conversion rate
- SEGMENT: By actual audience match (are the right people converting?)

**CHECKLIST:**
- [ ] Target audience is explicitly named on the page
- [ ] Placed above the fold (hero or sub-hero)
- [ ] Language matches how the audience describes themselves
- [ ] Specific details (team size, industry, role, stage)
- [ ] Exclusion criteria mentioned (optional but powerful)
- [ ] Different landing pages for different segments (if applicable)

---

## Practice #63: Personality & Human Touch

**PROBLEM:** Corporate, faceless websites feel untrustworthy. Users can't connect with a brand that hides behind stock photos and generic copy. "About us: We are a leading provider of innovative solutions" = zero trust.

**RESENI:** Show real people, real names, real stories. Use team photos, founder stories, hand-written elements, and authentic voice. GoodUI patterns #12 and #65 confirm authenticity increases trust significantly.

**PRAVIDLA:**
- Real team photos > stock photos (always)
- Founder/team names visible on key pages
- Origin story builds emotional connection
- Casual tone where appropriate (match your audience)
- Show imperfections (too polished = suspicious)
- +15-25% trust, +10% conversion with authentic human presence

**IMPLEMENTACE:**

### What to Show

```
SHOW (builds trust):
- Real team photos (natural, not overly staged)
- Founder's name and photo on About page
- Brief origin story ("Why we built this")
- Team size and location ("12-person team in Prague")
- Personal email addresses (founder@company.com)
- Behind-the-scenes content
- Genuine customer photos (not stock)

HIDE (optional):
- Investor names (unless impressive and relevant)
- Exact revenue numbers (unless for social proof)
- Internal team conflicts or pivots (keep positive)
- Personal details unrelated to the product
```

### What NOT to Do

```
DON'T:
- Use stock photos of "diverse business team laughing"
- Write "About us: We are a leading provider..."
- Use corporate jargon ("leveraging synergies")
- Hide behind a logo with no human face
- Create a fictional founder persona
- Over-share personal problems
```

### KOD:

```html
<!-- Founder section (builds immediate trust) -->
<section class="founder-story">
  <div class="founder-photo">
    <img src="/team/founder.jpg" alt="Sarah, Founder">
  </div>
  <div class="founder-text">
    <p class="founder-greeting">Hi, I'm Sarah.</p>
    <p>I built ProductName after spending 3 years manually tracking
       my SaaS metrics in spreadsheets. There had to be a better way.</p>
    <p>Today, 12,000+ founders use ProductName to track what matters.
       We're a team of 8 in Prague, and we answer every support email
       personally.</p>
    <p class="founder-signature">
      <img src="/team/signature.svg" alt="Sarah's signature"
           class="signature-img">
      <span>Sarah, Founder</span>
    </p>
  </div>
</section>

<style>
.founder-story {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  padding: 48px 0;
  max-width: 800px;
  margin: 0 auto;
}

.founder-photo img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
}

.founder-greeting {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.founder-text p {
  font-size: 16px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 12px;
}

.founder-signature {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.signature-img {
  height: 40px;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .founder-story {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
```

```html
<!-- Team grid (compact, human) -->
<section class="team-section">
  <h2>The humans behind ProductName</h2>
  <div class="team-grid">
    <div class="team-member">
      <img src="/team/person1.jpg" alt="Jan">
      <p class="member-name">Jan</p>
      <p class="member-role">Engineering</p>
    </div>
    <div class="team-member">
      <img src="/team/person2.jpg" alt="Eva">
      <p class="member-name">Eva</p>
      <p class="member-role">Design</p>
    </div>
    <!-- More team members... -->
  </div>
</section>

<style>
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.team-member {
  text-align: center;
}

.team-member img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
}

.member-name {
  font-weight: 600;
  font-size: 15px;
}

.member-role {
  font-size: 13px;
  color: #888;
}
</style>
```

### Personality Scale (Match Your Audience)

```
B2B ENTERPRISE         B2B SMB              B2C / STARTUP
Very professional      Friendly but pro     Casual and personal
"Our team"             "We"                 "I" / "Hey, I'm..."
Formal headshots       Casual team photos   Candid/fun photos
No emojis              Occasional emoji     Emoji welcome
Corporate About page   Founder story        Full personality
```

**OCEKAVANY DOPAD:** +15-25% trust perception, +10% conversion with authentic human presence

**A/B TEST SETUP:**
- Baseline: Corporate/stock photo approach
- Variant: Real team photos, founder story, personal tone
- Sample: Min 300 visitors per variant
- Measure: Trust score (survey), time on page, conversion

**CHECKLIST:**
- [ ] Real team photos used (no stock photos)
- [ ] At least one named person visible on key pages
- [ ] Origin story or "Why we built this" section
- [ ] Personal email or direct contact available
- [ ] Tone matches target audience (casual vs professional)
- [ ] Photos are natural (not overly staged)
- [ ] About page has real content (not generic boilerplate)

---

## Practice #64: "You" Over "We" (User-Centric Framing)

**PROBLEM:** Most company websites talk about THEMSELVES. "We provide", "We offer", "We are the leading", "Our product". This is company-centric framing. Users don't care about you -- they care about themselves.

**RESENI:** Reframe all messaging from the user's perspective. Replace "we" with "you". GoodUI pattern #67: putting others first increases engagement +10-15%. The user should be the hero of the story, not your company.

**PRAVIDLA:**
- "You" and "your" should appear 3x more than "we" and "our"
- The user is the hero, your product is the tool
- Start sentences with "You" instead of "We"
- Feature descriptions: benefit to user, not capability of product
- This is one of the simplest and most impactful copy changes

**IMPLEMENTACE:**

### Before/After Rewrites

```
COMPANY-CENTRIC ("We"):               USER-CENTRIC ("You"):
"We offer 24/7 support"               "You get help whenever you need it"
"We built an AI-powered engine"        "Your reports write themselves"
"Our platform integrates with 50+"     "Connect your favorite tools in 1 click"
"We've been in business since 2018"    "You're backed by 8 years of expertise"
"Our team of experts will..."          "You'll work with dedicated experts who..."
"We provide real-time analytics"       "See your metrics update in real time"
"We are proud to announce..."          "You now have access to..."
```

### The Rewrite Formula

```
Step 1: Find every "we", "our", "us" on the page
Step 2: Rewrite from the reader's perspective
Step 3: Start with "you" or the benefit to them
Step 4: Read it aloud -- does it sound like a conversation?
```

### KOD:

```html
<!-- Company-centric (weak) -->
<section class="features">
  <h2>What we offer</h2>

  <div class="feature">
    <h3>We provide real-time analytics</h3>
    <p>Our platform gives you access to dashboards
       that we've designed with our proprietary technology.</p>
  </div>

  <div class="feature">
    <h3>We offer 24/7 support</h3>
    <p>Our team is available around the clock.
       We pride ourselves on fast response times.</p>
  </div>

  <div class="feature">
    <h3>We integrate with 50+ tools</h3>
    <p>Our API connects with the tools our customers use most.
       We're constantly adding new integrations.</p>
  </div>
</section>

<!-- User-centric (strong) -->
<section class="features">
  <h2>Everything you need to grow</h2>

  <div class="feature">
    <h3>See your metrics in real time</h3>
    <p>Your dashboard updates live, so you always know
       exactly where you stand. No more waiting for reports.</p>
  </div>

  <div class="feature">
    <h3>Get help whenever you need it</h3>
    <p>You'll never wait more than 5 minutes for a response.
       24/7, including weekends and holidays.</p>
  </div>

  <div class="feature">
    <h3>Connect your favorite tools in 1 click</h3>
    <p>Your existing workflow stays intact. 50+ integrations
       ready to go -- Slack, Jira, GitHub, and more.</p>
  </div>
</section>
```

### "You" Ratio Check

```
Count on your landing page:
- Number of "you/your/you're": ___
- Number of "we/our/us": ___

Target ratio: 3:1 (you:we) or higher

Example:
  Before: 4 "you" / 12 "we" = 0.3:1 (company-centric)
  After: 15 "you" / 5 "we" = 3:1 (user-centric)
```

**OCEKAVANY DOPAD:** +10-15% engagement, +5-10% conversion

**A/B TEST SETUP:**
- Baseline: Company-centric copy ("We provide...", "Our product...")
- Variant: User-centric copy ("You get...", "Your dashboard...")
- Sample: Min 300 visitors per variant
- Measure: Time on page, scroll depth, conversion rate

**CHECKLIST:**
- [ ] "You/your" appears 3x more than "we/our"
- [ ] Features described as user benefits (not product capabilities)
- [ ] Headlines start with "you" or a verb directed at the user
- [ ] About page STILL uses "we" (appropriate there)
- [ ] Reads naturally (not robotically forced)
- [ ] Consistent throughout the page

---

## Practice #65: Storytelling Over Bullet Points

**PROBLEM:** Bullet points are efficient but emotionally flat. For complex products or premium offerings, a list of features doesn't convey the transformation the user will experience. Features tell, stories sell.

**RESENI:** Use narrative format for emotional engagement on key pages. Transform feature lists into stories about the user's journey: before (pain) -> discovery -> after (transformation). GoodUI pattern #64 shows storytelling increases time on page and conversion for complex products.

**PRAVIDLA:**
- Use stories for: homepage, about page, case studies, complex product pages
- Use bullet points for: feature comparison, pricing, quick reference, docs
- Stories work best for emotional/complex decisions (SaaS, courses, agencies)
- Bullets work best for rational/quick decisions (e-commerce, tools)
- +20-30% time on page with narrative format
- +15% conversion for complex products that benefit from explanation

**IMPLEMENTACE:**

### When to Use Stories vs Bullet Points

| Context | Stories | Bullets |
|---------|---------|---------|
| Homepage hero | Yes | No |
| Feature section | Yes (top), Bullets (details) | Yes (details) |
| Pricing page | No | Yes |
| Case studies | Yes | Summary only |
| Product page (simple) | No | Yes |
| Product page (complex) | Yes | Supporting |
| About page | Yes | No |
| Documentation | No | Yes |
| Email sequences | Yes (narrative) | Supporting |

### Story Framework: Before -> Bridge -> After

```
BEFORE: Describe the user's current pain (they recognize themselves)
BRIDGE: Introduce the product as the solution
AFTER:  Paint the picture of life after the transformation

Example:

BEFORE:
"You're spending 3 hours every Monday morning pulling data
from 5 different tools into a spreadsheet. By the time
you're done, the numbers are already outdated."

BRIDGE:
"ProductName connects all your tools in one dashboard.
Set it up once (takes 10 minutes), and never pull
a manual report again."

AFTER:
"Monday morning: you open your dashboard, everything
is already there. Live data, automatically updated.
You spend those 3 hours on strategy instead."
```

### KOD:

```html
<!-- Bullet points approach (facts, no emotion) -->
<section class="features">
  <h2>Features</h2>
  <ul>
    <li>Real-time dashboard</li>
    <li>50+ integrations</li>
    <li>Automated reports</li>
    <li>Team collaboration</li>
    <li>Custom alerts</li>
  </ul>
</section>

<!-- Storytelling approach (emotion + facts) -->
<section class="story-section">
  <div class="story-block before">
    <span class="story-label">Before ProductName</span>
    <h3>Monday mornings used to look like this:</h3>
    <p>Open Google Analytics. Export CSV. Open Stripe.
       Export another CSV. Open your spreadsheet.
       Copy-paste. Format. Pray nothing breaks.</p>
    <p>By 11am, you have a report. By 2pm, it's already wrong.</p>
  </div>

  <div class="story-block bridge">
    <span class="story-label">Then you set up ProductName</span>
    <h3>10 minutes. That's all it takes.</h3>
    <p>Connect your tools. Pick your metrics.
       Choose how often you want updates. Done.</p>
  </div>

  <div class="story-block after">
    <span class="story-label">Now your Mondays look like this</span>
    <h3>Dashboard is already waiting for you.</h3>
    <p>Live data. Automatically updated.
       Trends highlighted. Anomalies flagged.
       You spend the morning on strategy, not spreadsheets.</p>
  </div>
</section>

<style>
.story-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 0;
}

.story-block {
  padding: 32px;
  margin-bottom: 24px;
  border-radius: 12px;
}

.story-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 12px;
}

.story-block.before {
  background: #FFF3E0;
  border-left: 4px solid #FF9800;
}

.story-block.before .story-label {
  color: #E65100;
}

.story-block.bridge {
  background: #E3F2FD;
  border-left: 4px solid #2196F3;
}

.story-block.bridge .story-label {
  color: #1565C0;
}

.story-block.after {
  background: #E8F5E9;
  border-left: 4px solid #4CAF50;
}

.story-block.after .story-label {
  color: #2E7D32;
}

.story-block h3 {
  font-size: 22px;
  margin-bottom: 12px;
}

.story-block p {
  font-size: 16px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 8px;
}
</style>
```

### Hybrid Approach (Best of Both)

```
For most landing pages, combine both:

1. STORY (hero section): Emotional hook, before/after narrative
2. FEATURES (section 2): Bullet points with brief descriptions
3. CASE STUDY (section 3): Customer story (narrative)
4. COMPARISON (section 4): Feature table (bullets)
5. CTA (final): Story callback ("Ready to reclaim your Mondays?")

Story = WHY (emotional)
Bullets = WHAT (rational)
Both = complete persuasion
```

**OCEKAVANY DOPAD:** +20-30% time on page, +15% conversion for complex products

**A/B TEST SETUP:**
- Baseline: Feature bullet points
- Variant A: Full narrative (before/bridge/after)
- Variant B: Hybrid (story + bullets)
- Sample: Min 300 visitors per variant
- Measure: Time on page, scroll depth, conversion rate
- Duration: 3-4 weeks (stories need more reading time to show effect)

**CHECKLIST:**
- [ ] Story format on homepage hero
- [ ] Before/Bridge/After framework used
- [ ] User is the protagonist (not the company)
- [ ] Specific details (not generic scenarios)
- [ ] Bullet points still available for reference (hybrid approach)
- [ ] Mobile-friendly (stories can be long -- test scroll behavior)
- [ ] Case studies use narrative format
- [ ] CTA references the story ("Ready to [transformation]?")

---

## Summary

**7 Copy & UX Practices:**

1. **#59 Benefit Buttons** (+25-40%) - Action + outcome in CTA text
2. **#60 Direct & Confident Language** (+15-20%) - Remove hedging words
3. **#61 Natural Language in Forms** (+5-15%) - Conversational form labels
4. **#62 Explicit Targeting** (+20-35%) - Tell users who it's for
5. **#63 Personality & Human Touch** (+15-25%) - Real people, real stories
6. **#64 "You" Over "We"** (+10-15%) - User-centric framing
7. **#65 Storytelling Over Bullets** (+20-30%) - Narrative for complex products

**Total potential:** +110-180% combined improvement (not additive -- expect 25-45% real-world combined lift)

**Priority (ICE):**
1. Benefit buttons (high impact, zero effort -- just change button text)
2. "You" over "We" (high impact, low effort -- find/replace exercise)
3. Direct & confident language (medium impact, low effort -- editing pass)
4. Explicit targeting (high impact, medium effort -- requires audience clarity)
5. Personality & human touch (high impact, medium effort -- need real photos)
6. Storytelling (high impact for complex products, medium effort)
7. Natural language forms (low-medium impact, low effort -- only for short forms)

**Key principle:** UX copy is the cheapest optimization you can do. No design changes, no dev work. Just words. And words drive 50%+ of conversion decisions.

**See also:**
- `persuasion-patterns.md` - Behavioral psychology patterns that work with these copy techniques
- `design.md` Practice #13 - CTA button design (pairs with Practice #59)
- `forms.md` - Form optimization practices (pairs with Practice #61)
- `ecommerce.md` - E-commerce copy needs (product descriptions, cart)
