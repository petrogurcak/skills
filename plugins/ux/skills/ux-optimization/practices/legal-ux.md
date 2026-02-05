# Legal UX & Compliance Practices

Compliance requirements that directly impact UX design. June 2025 EAA deadline = critical.

---

## Practice #20: EAA Accessibility Compliance (June 2025 Deadline)

**PROBLÉM:** European Accessibility Act (EAA) mandates web accessibility by June 2025. Non-compliance = "draconian fines" + legal disputes.

**ŘEŠENÍ:** Implement WCAG-compliant accessibility across all critical user flows.

### Legal Context

**Deadline:** June 28, 2025 (MANDATORY for EU businesses)

**Scope:** All e-commerce, banking, transportation, and public services websites/apps

**Penalties:**
- Draconian fines (amounts TBD by member states)
- Legal disputes from users unable to access services
- Google Quality Score reduction (increased ad costs)

**Business impact beyond compliance:**
- Better accessibility = better UX for ALL users
- SEO benefits (screen-reader-friendly = search-engine-friendly)
- Larger addressable market (15% EU population has disabilities)

---

### Critical Accessibility Issues (Priority Fixes)

#### Issue #1: Forms (Highest Impact)

**Problem:**
- Users cannot complete forms using keyboard only
- Missing/unclear field labels
- Placeholder text inside fields (violates standards)

**Solution:**

```html
<!-- ❌ BAD: Placeholder as label, no keyboard nav -->
<input type="text" placeholder="Vaše jméno">

<!-- ✅ GOOD: Explicit label, keyboard accessible -->
<label for="name">Vaše jméno</label>
<input type="text" id="name" name="name" aria-required="true">
```

**Checklist:**
- [ ] Every field has explicit `<label>` element
- [ ] Labels associated via `for="id"` attribute
- [ ] Required fields marked with `aria-required="true"`
- [ ] Error messages linked with `aria-describedby`
- [ ] Tab order follows logical flow
- [ ] All fields keyboard-accessible (no mouse-only)

**Impact:** Forms are #1 accessibility barrier. Fixing = immediate compliance gain.

---

#### Issue #2: Color Contrast (Most Prevalent)

**Problem:** Insufficient contrast between text and background

**Standard:** WCAG AA requires:
- **4.5:1** minimum for normal text
- **3:1** minimum for large text (18pt+ or 14pt+ bold)
- **3:1** minimum for UI components (buttons, inputs)

**Example violations:**
- Light gray text on white background (#999 on #FFF = 2.8:1 ❌)
- Tested homepage: **144+ contrast violations**

**Solution:**

```css
/* ❌ BAD: Insufficient contrast */
.text-muted {
  color: #999; /* 2.8:1 on white */
}

/* ✅ GOOD: WCAG AA compliant */
.text-muted {
  color: #595959; /* 7:1 on white */
}
```

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Inspect element → Accessibility pane shows contrast ratio
- Wave Browser Extension: Highlights violations

**Checklist:**
- [ ] All text meets 4.5:1 minimum (normal) or 3:1 (large)
- [ ] Button text has 4.5:1 contrast
- [ ] Form field borders have 3:1 contrast
- [ ] Icons/graphics have 3:1 contrast
- [ ] Don't rely on color alone (use icons + text)

---

#### Issue #3: Text Size (Readability)

**Problem:** Text smaller than 13px violates accessibility standards

**Standard:**
- **Minimum:** 13px (but not recommended)
- **Recommended:** 16px for body text, form fields
- **Large text:** 18pt (24px) or 14pt bold (18.67px bold)

**Why:** Smaller text = readable only with perfect vision

**Solution:**

```css
/* ❌ BAD: Too small */
body { font-size: 12px; }
input { font-size: 13px; }

/* ✅ GOOD: Accessible */
body { font-size: 16px; }
input { font-size: 16px; }
h1 { font-size: 32px; }
```

**Checklist:**
- [ ] Body text min 16px
- [ ] Form fields min 16px (prevents mobile zoom)
- [ ] Footnotes/captions min 13px (sparingly)
- [ ] Headings use relative sizing (em, rem)

---

#### Issue #4: Interactive Element Size (Touch Targets)

**Problem:** Buttons/links too small to click reliably

**Standard:**
- **Minimum clickable target:** 7×7mm (approx 44×44px)
- **Minimum spacing:** 2mm between targets

**Why:** Motor disabilities, touch screen users, mobile users

**Solution:**

```css
/* ❌ BAD: Too small, too close */
.icon-button {
  width: 20px;
  height: 20px;
  margin: 2px;
}

/* ✅ GOOD: Accessible size + spacing */
.icon-button {
  min-width: 44px;
  min-height: 44px;
  margin: 8px; /* 2mm+ spacing */
  padding: 12px;
}
```

**Checklist:**
- [ ] All buttons min 44×44px
- [ ] Links have min 44px height (padding if needed)
- [ ] Icon buttons meet 44×44px
- [ ] Adjacent clickable elements have 8px+ gap
- [ ] Mobile: Larger targets (48×48px recommended)

---

#### Issue #5: Keyboard Navigation

**Problem:** Users cannot navigate site using keyboard alone (Tab, Arrow keys, Enter, Space)

**Essential keyboard patterns:**
- **Tab / Shift+Tab:** Navigate between interactive elements
- **Arrow keys:** Navigate within dropdowns, radio groups
- **Spacebar:** Toggle checkboxes
- **Enter:** Activate buttons, submit forms
- **Esc:** Close modals, dialogs

**Solution:**

```html
<!-- ✅ Keyboard-accessible dropdown -->
<select name="country" id="country">
  <option value="cz">Česká republika</option>
  <option value="sk">Slovensko</option>
</select>

<!-- ✅ Keyboard-accessible custom modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Potvrzení objednávky</h2>
  <button aria-label="Zavřít">×</button>
</div>
```

**Common keyboard issues:**
- Missing focus states (user doesn't know where they are)
- Tab order skips critical fields
- Custom dropdowns not keyboard-accessible
- Modals trap focus (can't tab out)

**Checklist:**
- [ ] All interactive elements keyboard-accessible
- [ ] Visible focus states (outline, border, background change)
- [ ] Logical tab order (top→bottom, left→right)
- [ ] Modals trap focus until closed (Tab cycles within modal)
- [ ] Skip-to-content link for screen readers
- [ ] No keyboard traps (can always navigate away)

**Focus state example:**

```css
/* ❌ BAD: No visible focus */
button:focus {
  outline: none; /* NEVER DO THIS */
}

/* ✅ GOOD: Clear focus indicator */
button:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

---

### Testing Methods

#### Method 1: Manual Keyboard Testing (CRITICAL)

**Process:**
1. Disconnect mouse (or don't use it)
2. Navigate entire site using only keyboard
3. Try completing critical flows (register, purchase, contact)
4. Document where you get stuck

**Test scenarios:**
- [ ] Homepage → Product page → Add to cart → Checkout → Purchase (all via keyboard)
- [ ] Registration form completion
- [ ] Search → Results → Filter → Product
- [ ] Open modal → Read content → Close modal
- [ ] Navigate menu → Submenu → Page

**Success criteria:** 100% of functionality accessible via keyboard

---

#### Method 2: Automated Tools (Fast Diagnosis)

**Wave (Browser Extension):**
- Install: wave.webaim.org
- Run on each page type
- Fix all "Errors" (critical violations)
- Review "Alerts" (potential issues)

**Lighthouse (Chrome DevTools):**
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility"
4. Run audit
5. Fix issues scoring <90

**Common automated findings:**
- Missing alt text on images
- Form inputs without labels
- Insufficient color contrast
- Missing ARIA attributes
- Improper heading hierarchy

**Checklist:**
- [ ] Wave shows 0 errors on all page types
- [ ] Lighthouse accessibility score ≥90 on all pages
- [ ] Fix all contrast violations
- [ ] All images have alt text
- [ ] Heading hierarchy logical (h1→h2→h3, no skipping)

---

#### Method 3: Screen Reader Testing (Comprehensive)

**Screen readers:**
- **NVDA** (Windows, free): nvaccess.org
- **JAWS** (Windows, commercial): freedomscientific.com
- **VoiceOver** (Mac, built-in): Cmd+F5
- **TalkBack** (Android, built-in)

**Basic test:**
1. Enable screen reader
2. Navigate site using only keyboard + screen reader
3. Verify all content is announced correctly
4. Check form labels read properly
5. Ensure images have descriptive alt text

**Success criteria:**
- All text content is read aloud
- Images have descriptive alt text (not "image123.jpg")
- Form fields announce labels + required status
- Error messages are announced
- Page structure is clear (headings, landmarks)

---

### EAA Compliance Checklist

**Critical (Fix by June 2025):**
- [ ] All forms keyboard-accessible with explicit labels
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Text size min 16px (13px absolute minimum)
- [ ] Interactive elements min 44×44px
- [ ] Visible focus states on all interactive elements
- [ ] Alt text on all meaningful images
- [ ] Keyboard navigation works for all functionality
- [ ] Screen reader announces content correctly

**Important (High priority):**
- [ ] Logical heading hierarchy (h1→h2→h3)
- [ ] Skip-to-content link for screen readers
- [ ] ARIA labels for complex interactions
- [ ] Video captions/transcripts
- [ ] Error messages clear and actionable

**Recommended (Best practice):**
- [ ] High contrast mode support
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] Responsive text sizing (em/rem, not px)
- [ ] Multiple ways to navigate (menu, search, sitemap)

---

### Business Impact

**Positive outcomes:**
- **Compliance:** Avoid fines + legal disputes
- **SEO:** Better accessibility = better Google rankings
- **UX:** Keyboard users, mobile users, elderly users all benefit
- **Market:** 15% EU population has disabilities = larger audience
- **Performance:** Accessibility fixes often improve page speed

**Google Quality Score impact:**
- Accessibility violations reduce Quality Score
- Lower Quality Score = higher PPC costs
- CPC increase: 10-30% for poor accessibility

---

## Practice #21: GDPR Cookie Consent (2022+ Requirements)

**PROBLÉM:** Czech law (effective January 1, 2022) requires active opt-in for tracking cookies. Poor implementation = 28% consent rate. Good implementation = 70-90%.

**ŘEŠENÍ:** Compliant cookie banner with optimized UX for higher consent rates.

### Legal Requirements (Czech Republic)

**Mandatory:**
1. **Active opt-in** before collecting analytics/marketing data
2. **"Accept All" must pair with "Reject All"** options
3. **No pre-checked boxes** for optional cookies
4. **Cannot block site access** (no cookie wall)
5. **Clear dismissal mechanism** required

**Enforcement:**
- Max Schrems' noyb.eu automated compliance checking
- Correction notices sent before regulatory complaints
- Czech enforcement less aggressive than Germany/Austria (but risk exists)

---

### Consent Rate Optimization (DHL Case Study)

**A/B Test Results:**

| Implementation | Consent Rate | Notes |
|----------------|--------------|-------|
| Left corner, 3 buttons | 28.7% | Worst performer |
| Pop-up, "Accept All" + settings | 70% | Best performer |
| ČSOB banking sector | 90% | Industry-leading |

**Key insights:**
- Prominent placement > unobtrusive placement
- Detailed descriptions in side panels outperform minimalist
- "If banner is too subtle, no one interacts" (designer quote)

---

### Best Practices (Compliant + High Conversion)

#### Structure: Three-Button Approach

**Recommended:**
1. **Accept All** (primary button, prominent)
2. **Essential Only** (secondary button, equal prominence)
3. **Customize** (link/tertiary button)

```html
<div class="cookie-banner" role="dialog" aria-label="Cookie nastavení">
  <p>
    Používáme cookies pro analytics a personalizaci.
    <a href="/cookies-policy">Více informací</a>
  </p>

  <div class="cookie-buttons">
    <button class="btn-primary" onclick="acceptAll()">
      Přijmout vše
    </button>
    <button class="btn-secondary" onclick="rejectOptional()">
      Pouze nezbytné
    </button>
    <button class="btn-text" onclick="customize()">
      Přizpůsobit
    </button>
  </div>
</div>
```

---

#### Visual Design Rules

**Legal perspective (strict compliance):**
- Minimal banner prominence
- Neutral button colors (no manipulation via design)
- All options equally visible

**UX perspective (balanced with data needs):**
- Banner visible but not blocking content
- "Accept All" can be more prominent (larger, colored)
- "Reject"/"Essential Only" equally accessible (same size)

**Balance:**
- ✅ Primary button for "Accept All" (larger, colored)
- ✅ Secondary button for "Essential Only" (same size, neutral color)
- ✅ Both above fold, equal accessibility
- ❌ Don't hide "Reject" in small text
- ❌ Don't make "Reject" multi-step (must be 1-click like "Accept")

---

#### Cookie Categories (Consent Management)

**Essential (No consent needed):**
- Session cookies
- Shopping cart persistence
- Authentication tokens
- Security cookies

**Optional (Require consent):**
- Analytics (Google Analytics, Hotjar)
- Marketing (Facebook Pixel, Google Ads)
- Personalization (recommendations based on behavior)

**Customization UI:**

```html
<div class="cookie-settings">
  <h3>Nastavení cookies</h3>

  <!-- Essential: Always on, no toggle -->
  <div class="cookie-category">
    <h4>Nezbytné cookies</h4>
    <p>Nutné pro fungování webu (přihlášení, košík)</p>
    <span class="always-on">Vždy zapnuto</span>
  </div>

  <!-- Analytics: Toggle -->
  <div class="cookie-category">
    <label>
      <input type="checkbox" name="analytics" value="1">
      <h4>Analytické cookies</h4>
      <p>Pomáhají nám zlepšovat web (Google Analytics)</p>
    </label>
  </div>

  <!-- Marketing: Toggle -->
  <div class="cookie-category">
    <label>
      <input type="checkbox" name="marketing" value="1">
      <h4>Marketingové cookies</h4>
      <p>Personalizované reklamy (Facebook, Google Ads)</p>
    </label>
  </div>

  <button onclick="savePreferences()">Uložit nastavení</button>
</div>
```

---

#### Placement & Timing

**Placement options (from worst to best per DHL study):**

| Placement | Consent Rate | Notes |
|-----------|--------------|-------|
| Left corner, small | 28.7% | Too subtle, often ignored |
| Bottom bar, full width | 45-55% | Standard, non-intrusive |
| Center modal, overlay | 60-70% | High attention, can feel pushy |
| Floating bar + detailed panel | 70-90% | Best balance (Amazon, ČSOB) |

**Recommended: Floating bar + side panel**
1. Initial view: Floating bottom bar with 3 buttons
2. "Customize" opens side panel with detailed categories
3. Panel doesn't block entire site (can still browse)

**Timing:**
- Show immediately on first visit
- Don't show again after choice made
- Re-show after 6-12 months (consent refresh)

---

### Examples from Major Sites

**Amazon.de:**
- Prominent "Accept" button
- Allows rejecting only marketing cookies (analytics opt-out requires settings)
- High consent rate via UX optimization

**ČSOB (Czech bank):**
- 90% consent rate
- Detailed explanations
- Trust factor: Banking sector = users expect privacy respect

**Zalando:**
- Floating bar
- Distinct "Accept All" vs "Settings" buttons
- Clear visual hierarchy

---

### Consent Management Tools

**Cookiebot:**
- Automated cookie scanning
- Categorization (essential, analytics, marketing)
- Multi-language support
- Consent logging (proof of compliance)
- **Cost:** ~1,000 CZK/month

**OneTrust:**
- Enterprise solution
- More features, higher cost

**CookieYes:**
- Budget-friendly alternative

**DIY Option:**
- Build custom banner (examples above)
- Store consent in localStorage
- Block tracking scripts until consent given

---

### Technical Implementation

**Pattern: Block scripts until consent**

```javascript
// Don't load GA until consent
function acceptAll() {
  // Set consent cookie
  document.cookie = "cookie-consent=all; max-age=31536000; path=/";

  // Load analytics
  loadGoogleAnalytics();
  loadFacebookPixel();

  // Hide banner
  hideCookieBanner();
}

function rejectOptional() {
  // Set consent cookie (essential only)
  document.cookie = "cookie-consent=essential; max-age=31536000; path=/";

  // Don't load tracking
  hideCookieBanner();
}

function loadGoogleAnalytics() {
  // Standard GA code
  (function(i,s,o,g,r,a,m){...})(window,document,'script',...);
}
```

**Important:** Scripts must NOT load before consent obtained

---

### Checklist

**Legal compliance:**
- [ ] Active opt-in required (no pre-checked boxes)
- [ ] "Accept All" paired with "Reject All" / "Essential Only"
- [ ] No cookie wall (site accessible without consent)
- [ ] Clear dismissal mechanism
- [ ] Consent stored + logged (proof of compliance)
- [ ] Re-prompt after 6-12 months

**UX optimization:**
- [ ] Banner visible on first visit
- [ ] 3-button structure (Accept All, Essential Only, Customize)
- [ ] "Accept" and "Reject" equally accessible (1-click each)
- [ ] Detailed explanations available (side panel)
- [ ] Mobile-optimized (buttons large enough)
- [ ] Doesn't block critical content

**Technical:**
- [ ] Tracking scripts blocked until consent
- [ ] Consent choice stored in cookie/localStorage
- [ ] Works without JavaScript (graceful degradation)
- [ ] Respects Do Not Track header (optional but nice)

---

## Practice #22: Checkbox & Form Consent UX

**PROBLÉM:** Excessive checkboxes frustrate users. GDPR requires specific consent patterns. Poor implementation = legal risk + low conversion.

**ŘEŠENÍ:** Use appropriate consent mechanisms (not always checkboxes) based on legal basis.

### Legal Basis for Data Processing

**Two primary bases:**

#### 1. Opt-Out (Legitimate Interest)

**Definition:** No active consent needed; users can opt out later

**When applicable:**
- Account creation (basic functionality)
- Order confirmation emails
- Service-related communications

**UI pattern:** No checkbox needed (action = consent)

**Example:**
```html
<!-- Registration form: No checkbox needed -->
<form action="/register">
  <label for="email">Email</label>
  <input type="email" id="email" required>

  <button type="submit">Vytvořit účet</button>

  <p class="legal-text">
    Vytvořením účtu souhlasíte s našimi
    <a href="/terms">obchodními podmínkami</a>.
    Můžete se kdykoli odhlásit v nastavení.
  </p>
</form>
```

**Key:** User initiates action (enters email in signup field) = clear intent

---

#### 2. Opt-In (Explicit Consent)

**Definition:** Requires affirmative user action before processing

**When required:**
- Marketing emails
- Third-party data sharing
- Personalization based on behavioral profiling
- Newsletter subscriptions (if not core to service)

**UI pattern:** Unchecked checkbox OR toggle switch

**Example:**
```html
<!-- Checkout form: Optional marketing consent -->
<form action="/checkout">
  <!-- ... order fields ... -->

  <label class="checkbox-label">
    <input type="checkbox" name="marketing-consent" value="1">
    <span>
      Chci dostávat nabídky a slevy emailem
      <a href="/privacy">(Zásady ochrany osobních údajů)</a>
    </span>
  </label>

  <button type="submit">Dokončit objednávku</button>
</form>
```

**CRITICAL:** Checkbox must be **UNCHECKED by default**

---

### Common Consent Scenarios

#### Scenario 1: Newsletter Signup (Dedicated Form)

**Legal basis:** Action = intent (no checkbox needed)

**Implementation:**

```html
<!-- ✅ GOOD: Signup field = clear intent -->
<form action="/subscribe">
  <label for="newsletter-email">Odebírat newsletter</label>
  <input type="email" id="newsletter-email" placeholder="vas@email.cz">
  <button type="submit">Přihlásit se</button>
</form>
```

**Why no checkbox?** "The action itself demonstrates clear intent" — user actively enters email into newsletter field

---

#### Scenario 2: Newsletter Opt-In (During Checkout)

**Legal basis:** Opt-in required (not core to checkout)

**Implementation:**

```html
<!-- ✅ GOOD: Unchecked by default -->
<label class="checkbox-label">
  <input type="checkbox" name="newsletter" value="1">
  Chci dostávat novinky a slevy (můžete se kdykoli odhlásit)
</label>
```

**Why checkbox?** Newsletter not essential to checkout = requires separate consent

---

#### Scenario 3: Account Creation

**Legal basis:** Legitimate interest (no checkbox needed)

**Implementation:**

```html
<!-- ✅ GOOD: No consent checkbox, just legal text -->
<form action="/register">
  <input type="email" name="email" required>
  <input type="password" name="password" required>

  <button>Vytvořit účet</button>

  <p class="terms-notice">
    Registrací souhlasíte s
    <a href="/terms">obchodními podmínkami</a> a
    <a href="/privacy">zásadami ochrany osobních údajů</a>.
  </p>
</form>
```

**Why no checkbox?** Basic account creation = legitimate interest for providing service

---

#### Scenario 4: E-commerce Checkout (Terms & Conditions)

**Legal basis:** Contractual necessity (consent to T&C required for purchase)

**GDPR insight:** "Consent to terms doesn't necessarily require checkbox UI"

**Option A: Clear button design (no checkbox)**

```html
<!-- ✅ GOOD: Button text = clear consent -->
<form action="/purchase">
  <!-- ... order details ... -->

  <button type="submit" class="btn-purchase">
    Objednat a souhlasím s
    <a href="/terms" target="_blank">obchodními podmínkami</a>
  </button>
</form>
```

**Option B: Single checkbox (if legal team insists)**

```html
<!-- ✅ ACCEPTABLE: Single T&C checkbox -->
<label class="checkbox-label required">
  <input type="checkbox" name="terms" required>
  Souhlasím s
  <a href="/terms">obchodními podmínkami</a>
</label>

<button type="submit">Dokončit objednávku</button>
```

**❌ AVOID: Multiple mandatory checkboxes**

```html
<!-- ❌ BAD: Checkbox overload -->
<input type="checkbox" required> Obchodní podmínky
<input type="checkbox" required> Zásady ochrany údajů
<input type="checkbox" required> Souhlas se zpracováním
<input type="checkbox" required> Potvrzuji že jsem starší 18 let
```

**Why bad?** Overwhelming, slows checkout, unnecessary legal CYA

---

#### Scenario 5: Review Collection (Post-Purchase)

**Legal basis:** Opt-in for third-party sharing

**GDPR recommendation:** Collect review on-site first, THEN ask about third-party sharing

**Implementation:**

```html
<!-- Step 1: On-site review (no third-party yet) -->
<form action="/submit-review">
  <textarea name="review" placeholder="Jak hodnotíte produkt?"></textarea>
  <button>Odeslat recenzi</button>
</form>

<!-- Step 2: After submission, optional third-party sharing -->
<div class="review-sharing">
  <p>Děkujeme! Můžeme vaši recenzi sdílet na Heureka.cz?</p>

  <label>
    <input type="checkbox" name="share-heureka">
    Ano, sdílet na Heureka.cz
  </label>

  <button>Uložit preference</button>
</div>
```

**Why two-step?** On-site review = service improvement (legitimate interest). Third-party sharing = requires explicit consent.

---

#### Scenario 6: Personalization

**Legal basis:** Opt-in when profiling based on behavior

**GDPR requirement:** "Personalization requires separate consent when system profiles users based on behavior"

**Implementation:**

```html
<!-- Account settings: Personalization toggle -->
<div class="settings-section">
  <h3>Personalizace</h3>

  <label class="toggle-switch">
    <input type="checkbox" name="personalization" value="1">
    <span class="slider"></span>
    Personalizovat obsah na základě mého chování
  </label>

  <p class="help-text">
    Ukážeme produkty a obsah přizpůsobený vašim preferencím.
    <a href="/privacy#personalization">Jak funguje personalizace?</a>
  </p>
</div>
```

**Why toggle instead of checkbox?** Toggle = more intuitive for on/off settings

---

### UI Alternatives to Checkboxes

**When to use each:**

| UI Element | Use Case | Example |
|------------|----------|---------|
| **No UI element** | Action = clear intent | Newsletter signup field, account creation |
| **Checkbox** | Binary opt-in for optional feature | Marketing emails, third-party sharing |
| **Toggle switch** | On/off setting (account preferences) | Personalization, notifications |
| **Radio buttons** | Choose one of multiple options | Email frequency (daily/weekly/monthly) |
| **Button text** | Action includes consent | "Objednat a souhlasím s podmínkami" |

---

### UX Best Practices

**Checkbox design:**

```css
/* ✅ GOOD: Large clickable area, clear visual */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  min-height: 44px; /* Accessibility: 44×44px touch target */
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px; /* Align with first line of text */
}

.checkbox-label:hover {
  background: #f5f5f5;
}
```

**Text best practices:**
- ✅ Single-line text if possible (easier to scan)
- ✅ Link to full policy ("Zásady ochrany údajů")
- ✅ Plain language (avoid legalese)
- ❌ Don't bury important info in tiny text

**Example:**

```html
<!-- ❌ BAD: Unclear, tiny text -->
<label>
  <input type="checkbox">
  <small>
    Odesláním tohoto formuláře souhlasíte se zpracováním osobních údajů
    v souladu s nařízením GDPR 2016/679 a zákonem č. 110/2019 Sb...
  </small>
</label>

<!-- ✅ GOOD: Clear, concise, linked details -->
<label class="checkbox-label">
  <input type="checkbox">
  <span>
    Chci dostávat nabídky emailem.
    <a href="/privacy">Zásady ochrany údajů</a>
  </span>
</label>
```

---

### Checklist

**Legal compliance:**
- [ ] Opt-in checkboxes UNCHECKED by default
- [ ] Required checkboxes only for contractual necessity (T&C)
- [ ] Marketing/profiling = separate, optional consent
- [ ] Clear language (what user consents to)
- [ ] Link to full privacy policy

**UX optimization:**
- [ ] Minimize checkbox count (max 1-2 per form)
- [ ] Large clickable areas (44×44px minimum)
- [ ] Single-line text when possible
- [ ] Test alternatives (toggles, button text, no UI)
- [ ] Mobile-friendly (checkboxes big enough to tap)

**Avoid:**
- [ ] Pre-checked boxes for optional consent (GDPR violation)
- [ ] Sequential checkbox stacking (5+ checkboxes)
- [ ] Tiny legal text (must be readable)
- [ ] Checkboxes when action = intent (unnecessary friction)

---

## Summary

**3 Legal UX Practices:**
1. **EAA Accessibility (June 2025)** - WCAG compliance, keyboard nav, contrast, forms
2. **GDPR Cookie Consent** - 3-button approach, 70-90% consent optimization
3. **Checkbox & Consent UX** - Use appropriate mechanism per legal basis

**Critical deadlines:**
- **June 28, 2025:** EAA accessibility compliance mandatory
- **Ongoing:** GDPR cookie consent enforcement

**Priority actions:**
1. Audit accessibility (Wave, Lighthouse) → Fix critical issues
2. Test keyboard navigation → Ensure all functionality accessible
3. Implement compliant cookie banner → 3-button structure
4. Review checkout flow → Minimize checkboxes, clear consent

**Tools:**
- **Accessibility:** Wave, Lighthouse, NVDA screen reader
- **Cookie consent:** Cookiebot (~1,000 CZK/month), OneTrust
- **Testing:** Manual keyboard nav, contrast checkers

**Next:** See practices/accessibility.md for deep-dive accessibility practices
