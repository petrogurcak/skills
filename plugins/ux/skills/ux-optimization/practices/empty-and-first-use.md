# Empty States & First-Use Experience Practices

Onboarding, empty states, and first-use experience patterns. Based on GoodUI.org research. Every new user's first impression determines whether they activate or bounce.

---

## Practice #66: Meaningful Empty States

**PROBLEM:** App shows "No records found" or a blank screen when user has no data yet. Zero guidance = zero activation.

**RESENI:** Design every empty state with illustration + explanation + single clear CTA that guides the user toward their first action.

**PRAVIDLA:**
- Never show raw "No data" or empty tables
- Every empty state needs 3 elements: visual (illustration/icon), copy (what this section is for), CTA (what to do first)
- Tailor empty state per context (dashboard vs. inbox vs. search vs. cart)
- Use the empty state to educate about the feature's value

**IMPLEMENTACE:**

### 4 typy empty states:

| Typ | Priklad | CTA |
|-----|---------|-----|
| **First use** | Empty dashboard | "Create your first project" |
| **Empty results** | Search returns nothing | "Try different keywords" + suggestions |
| **Cleared** | Inbox zero | Celebration + "You're all caught up!" |
| **Error** | Failed to load | "Retry" + explain what happened |

**KOD:**

```html
<!-- Empty state component -->
<div class="empty-state">
  <div class="empty-state-illustration">
    <!-- SVG illustration or icon placeholder -->
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#EEF2FF" />
      <path d="M40 65 L55 80 L80 50" stroke="#6366F1" stroke-width="4" fill="none" stroke-linecap="round" />
    </svg>
  </div>

  <h3 class="empty-state-title">Zatim zadne projekty</h3>

  <p class="empty-state-description">
    Projekty vam pomohou organizovat praci a sledovat pokrok.
    Vytvorte svuj prvni projekt a zacnete.
  </p>

  <button class="btn-primary empty-state-cta">
    + Vytvorit prvni projekt
  </button>

  <a href="/help/projects" class="empty-state-help">
    Jak projekty fungujou?
  </a>
</div>

<!-- Empty search results -->
<div class="empty-state empty-state-search">
  <div class="empty-state-illustration">
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="35" cy="35" r="20" stroke="#9CA3AF" stroke-width="3" fill="none" />
      <line x1="50" y1="50" x2="65" y2="65" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round" />
    </svg>
  </div>

  <h3 class="empty-state-title">Zadne vysledky pro "<span id="search-query">xyz</span>"</h3>

  <p class="empty-state-description">
    Zkuste jiny dotaz nebo provedte tyto akce:
  </p>

  <ul class="empty-state-suggestions">
    <li>Zkontrolujte pravopis</li>
    <li>Pouzijte obecnejsi termin</li>
    <li>Zkuste synonyma</li>
  </ul>

  <div class="empty-state-actions">
    <button class="btn-secondary" onclick="clearSearch()">Zrusit hledani</button>
    <button class="btn-primary" onclick="showAll()">Zobrazit vse</button>
  </div>
</div>

<!-- Empty cart -->
<div class="empty-state empty-state-cart">
  <div class="empty-state-illustration">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <rect x="20" y="30" width="60" height="50" rx="5" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" />
      <circle cx="35" cy="90" r="5" fill="#F59E0B" />
      <circle cx="65" cy="90" r="5" fill="#F59E0B" />
    </svg>
  </div>

  <h3 class="empty-state-title">Vas kosik je prazdny</h3>

  <p class="empty-state-description">
    Vyuzijte nasi aktualni nabidku a nakupte s dopravou zdarma nad 1 000 Kc.
  </p>

  <button class="btn-primary" onclick="location.href='/produkty'">
    Prohlednou produkty
  </button>
</div>
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px;
  max-width: 400px;
  margin: 0 auto;
}

.empty-state-illustration {
  margin-bottom: 24px;
  opacity: 0.8;
}

.empty-state-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px;
}

.empty-state-description {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 24px;
}

.empty-state-cta {
  margin-bottom: 16px;
}

.empty-state-help {
  font-size: 14px;
  color: #6b7280;
  text-decoration: underline;
}

.empty-state-help:hover {
  color: #3b82f6;
}

.empty-state-suggestions {
  text-align: left;
  list-style: disc;
  padding-left: 20px;
  margin: 0 0 24px;
  font-size: 14px;
  color: #6b7280;
}

.empty-state-suggestions li {
  margin: 4px 0;
}

.empty-state-actions {
  display: flex;
  gap: 12px;
}
```

**OCEKAVANY DOPAD:** +30-50% activation rate when empty states guide first action

**CHECKLIST:**
- [ ] Kazdy prazdny stav ma illustration + copy + CTA
- [ ] CTA vede k prvni akci (ne do nastaveni)
- [ ] Search empty state nabizi alternativy
- [ ] Cart empty state motivuje k nakupu
- [ ] Inbox zero oslavuje (celebration state)
- [ ] Konzistentni styl empty states v cele app

---

## Practice #67: Gradual Engagement (Try Before Signup)

**PROBLEM:** Signup wall pred hodnotou = okamzita ztrata uzivatele. User nevi co dostane a nechce investovat effort do registrace.

**RESENI:** Nech uzivatele zazit hodnotu PRED tim nez se pta na registraci. Show, don't gate.

**PRAVIDLA:**
- Value first, registration second
- Signup wall = immediate friction = drop-off
- Kazdy krok pred hodnotou snizuje conversion o 20-30%
- Registraci vyzaduj az kdyz uzivatel MUSI ulozit data

**IMPLEMENTACE:**

### Decision tree: Kdy gatovat vs. kdy ukazat free

| Situace | Approach |
|---------|----------|
| Product configurator | Free - nech konfigurovat, registrace pro ulozeni |
| Content preview | Free prvni 3 clanky, pak wall |
| SaaS tool | Free trial s omezenimi, ne locked screen |
| Interactive demo | Free - nech vyzkousit, registrace pro plnou verzi |
| E-shop | Free - prohlizeni a kosik, registrace az pri checkout |

### Priklady gradual engagement:

1. **Product configurator:** Uzivatel si nakonfiguruje produkt -> "Ulozit konfiguraci? Zaregistrujte se" (uz investoval cas, registrace ma smysl)
2. **Content preview:** Ukazat uvod clanku + blur rest -> "Cist dal" -> registrace
3. **Free tool:** Calculator, generator, analyzer -> vysledek -> "Ulozit nebo sdileni? Registrace"
4. **Interactive demo:** Sandbox prostredi s prefilled daty -> "Chcete vlastni data? Registrace"

**KOD:**

```html
<!-- Gradual engagement: Product configurator -->
<div class="configurator">
  <h2>Nakonfigurujte si svuj plan</h2>

  <!-- Step 1: Free - no registration needed -->
  <div class="config-step" data-step="1">
    <label>Pocet uzivatelu</label>
    <input type="range" min="1" max="100" value="5" id="user-count">
    <span class="range-value" id="user-count-display">5</span>
  </div>

  <div class="config-step" data-step="2">
    <label>Uloziste (GB)</label>
    <input type="range" min="1" max="500" value="10" id="storage">
    <span class="range-value" id="storage-display">10 GB</span>
  </div>

  <!-- Live price preview - no registration needed -->
  <div class="config-result">
    <div class="price-display">
      <span class="price-amount" id="calculated-price">990 Kc</span>
      <span class="price-period">/mesic</span>
    </div>
    <p class="price-detail">5 uzivatelu, 10 GB uloziste, email podpora</p>
  </div>

  <!-- Registration only when user wants to act -->
  <div class="config-actions">
    <button class="btn-primary" id="start-trial">
      Zacit 14denni trial zdarma
    </button>
    <p class="config-note">
      Zadna kreditni karta. Zruseni kdykoliv.
    </p>
  </div>
</div>

<!-- Gradual engagement: Content preview with blur -->
<article class="content-preview">
  <h1>10 Strategii pro Rust Weboveho Obchodu</h1>
  <p class="article-meta">5 min cteni | Marketing</p>

  <div class="content-free">
    <p>Prvni strategie je zamrit se na existujici zakazniky...</p>
    <p>Druha strategie zahrnuje personalizaci emailu...</p>
  </div>

  <!-- Blurred content + CTA overlay -->
  <div class="content-gated">
    <div class="content-blurred" aria-hidden="true">
      <p>Treti strategie je implementovat exit-intent popups...</p>
      <p>Ctvrta strategie vyuziva social proof efektu...</p>
    </div>

    <div class="gate-overlay">
      <h3>Chcete cist dal?</h3>
      <p>Zaregistrujte se zdarma a ziskejte pristup ke vsem clankum.</p>
      <button class="btn-primary">Registrovat se zdarma</button>
      <button class="btn-secondary">Mam ucet - prihlasit</button>
    </div>
  </div>
</article>
```

```css
/* Content blur gate */
.content-gated {
  position: relative;
  margin-top: 24px;
}

.content-blurred {
  filter: blur(5px);
  user-select: none;
  pointer-events: none;
}

.gate-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.85);
  padding: 32px;
  text-align: center;
}

.gate-overlay h3 {
  margin: 0 0 8px;
  font-size: 20px;
}

.gate-overlay p {
  margin: 0 0 20px;
  color: #6b7280;
}

.gate-overlay .btn-primary {
  margin-bottom: 12px;
}

/* Configurator */
.config-result {
  background: #f0fdf4;
  border: 2px solid #86efac;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  margin: 24px 0;
}

.price-amount {
  font-size: 36px;
  font-weight: 700;
  color: #059669;
}

.price-period {
  font-size: 16px;
  color: #6b7280;
}

.config-note {
  font-size: 13px;
  color: #6b7280;
  margin-top: 8px;
}
```

```javascript
// Configurator - live price calculation (no registration needed)
const userCount = document.getElementById('user-count');
const storage = document.getElementById('storage');
const priceDisplay = document.getElementById('calculated-price');

function calculatePrice() {
  const users = parseInt(userCount.value);
  const gb = parseInt(storage.value);

  const basePrice = 490;
  const perUser = 100;
  const perGB = 5;

  const total = basePrice + (users * perUser) + (gb * perGB);

  priceDisplay.textContent = total.toLocaleString('cs-CZ') + ' Kc';
  document.getElementById('user-count-display').textContent = users;
  document.getElementById('storage-display').textContent = gb + ' GB';
}

userCount.addEventListener('input', calculatePrice);
storage.addEventListener('input', calculatePrice);

// Registration only when user is ready
document.getElementById('start-trial').addEventListener('click', () => {
  // Save config to sessionStorage before redirecting to signup
  const config = {
    users: userCount.value,
    storage: storage.value,
    price: priceDisplay.textContent
  };
  sessionStorage.setItem('selected_config', JSON.stringify(config));

  // Now redirect to signup - user already knows the value
  window.location.href = '/signup?from=configurator';
});
```

**OCEKAVANY DOPAD:** +25-40% signups when value shown before registration (GoodUI data: -14% when gating failed to show value first)

**A/B TEST SETUP:**
- Baseline: Registration wall before tool/content access
- Variant: Gradual engagement (value first, registration second)
- Metrika: Signup rate, activation rate post-signup
- Sample: Min 200 visitors per variant

**CHECKLIST:**
- [ ] Uzivatel vidi hodnotu PRED registraci
- [ ] Registrace se pta az kdyz uzivatel MUSI (save, share, full access)
- [ ] SessionStorage uchovava uzivateluv progress pres registraci
- [ ] No credit card required messaging u trial
- [ ] Testnuto: kolik uzivatelu odejde na signup wall vs. gradual

---

## Practice #68: Upfront Progress (Motivation Through Completion)

**PROBLEM:** Uzivatel vidi prazdny progress bar 0% a nema motivaci zacit. Dlouhy proces bez pocatecniho momentu.

**RESENI:** Ukazuj progress jeste pred tim nez uzivatel zacne. Pre-fill prvni krok jako splneny.

**PRAVIDLA:**
- Endowed progress effect (Nunes & Dreze 2006): lide s pre-filled progress dokonci s vyssi pravdepodobnosti
- "You're already 20% done!" je silnejsi nez "Start from 0%"
- Prvni krok = neco co uz uzivatel udelal (registrace, navsteva stranky)
- Nikdy nefejkuj progress pro slozite kroky

**IMPLEMENTACE:**

### Co oznacit jako hotove:

| Pre-filled krok | Kontext |
|-----------------|---------|
| "Ucet vytvoren" | Onboarding po registraci |
| "Profil zahajeny" | Po vyplneni emailu |
| "Plan vybrany" | Po kliknuti na pricing |
| "Navstivili jste nas" | Loyalty program |

**KOD:**

```html
<!-- Onboarding progress with pre-filled step -->
<div class="onboarding-progress">
  <div class="progress-header">
    <h2>Dokonchete nastaveni</h2>
    <span class="progress-text">2 z 5 kroku hotovo</span>
  </div>

  <div class="progress-bar">
    <div class="progress-fill" style="width: 40%"></div>
  </div>

  <div class="onboarding-steps">
    <!-- Pre-filled: already done by signing up -->
    <div class="onboarding-step completed">
      <span class="step-check">&#10003;</span>
      <div class="step-content">
        <span class="step-title">Ucet vytvoren</span>
        <span class="step-subtitle">Hotovo</span>
      </div>
    </div>

    <!-- Pre-filled: email confirmed (if applicable) -->
    <div class="onboarding-step completed">
      <span class="step-check">&#10003;</span>
      <div class="step-content">
        <span class="step-title">E-mail overen</span>
        <span class="step-subtitle">jan@novak.cz</span>
      </div>
    </div>

    <!-- Next step: current action -->
    <div class="onboarding-step current">
      <span class="step-number">3</span>
      <div class="step-content">
        <span class="step-title">Doplnte profil</span>
        <span class="step-subtitle">Zabere ~1 minutu</span>
      </div>
      <button class="btn-primary btn-sm">Vyplnit</button>
    </div>

    <!-- Future steps -->
    <div class="onboarding-step upcoming">
      <span class="step-number">4</span>
      <div class="step-content">
        <span class="step-title">Pozvete tym</span>
        <span class="step-subtitle">Volitelne</span>
      </div>
    </div>

    <div class="onboarding-step upcoming">
      <span class="step-number">5</span>
      <div class="step-content">
        <span class="step-title">Vytvorte prvni projekt</span>
        <span class="step-subtitle">Hlavni cil</span>
      </div>
    </div>
  </div>
</div>
```

```css
.onboarding-progress {
  max-width: 480px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-header h2 {
  font-size: 18px;
  margin: 0;
}

.progress-text {
  font-size: 14px;
  color: #059669;
  font-weight: 500;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 24px;
}

.progress-fill {
  height: 100%;
  background: #059669;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.onboarding-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.onboarding-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.onboarding-step.completed {
  opacity: 0.7;
}

.onboarding-step.current {
  background: #f0fdf4;
  border: 1px solid #86efac;
}

.onboarding-step.upcoming {
  opacity: 0.5;
}

.step-check {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #059669;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.onboarding-step.current .step-number {
  background: #059669;
  color: white;
}

.step-content {
  flex: 1;
}

.step-title {
  display: block;
  font-weight: 500;
  font-size: 15px;
  color: #1f2937;
}

.step-subtitle {
  display: block;
  font-size: 13px;
  color: #6b7280;
}

.onboarding-step.completed .step-title {
  text-decoration: line-through;
  color: #6b7280;
}
```

```javascript
// Onboarding progress tracker
class OnboardingProgress {
  constructor(container) {
    this.container = container;
    this.steps = container.querySelectorAll('.onboarding-step');
    this.progressFill = container.querySelector('.progress-fill');
    this.progressText = container.querySelector('.progress-text');
    this.totalSteps = this.steps.length;
  }

  markComplete(stepIndex) {
    const step = this.steps[stepIndex];
    step.classList.remove('current', 'upcoming');
    step.classList.add('completed');

    // Update step visual
    const numberEl = step.querySelector('.step-number');
    if (numberEl) {
      const checkEl = document.createElement('span');
      checkEl.className = 'step-check';
      checkEl.textContent = '\u2713';
      numberEl.replaceWith(checkEl);
    }

    // Activate next step
    const nextStep = this.steps[stepIndex + 1];
    if (nextStep) {
      nextStep.classList.remove('upcoming');
      nextStep.classList.add('current');
    }

    this.updateProgress();
  }

  updateProgress() {
    const completed = this.container.querySelectorAll('.completed').length;
    const percent = Math.round((completed / this.totalSteps) * 100);

    this.progressFill.style.width = percent + '%';
    this.progressText.textContent = completed + ' z ' + this.totalSteps + ' kroku hotovo';
  }
}

// Init with pre-filled progress
const onboarding = new OnboardingProgress(
  document.querySelector('.onboarding-progress')
);
```

**OCEKAVANY DOPAD:** +15-25% completion rate (endowed progress effect)

**CHECKLIST:**
- [ ] Prvni 1-2 kroky pre-filled jako hotove
- [ ] Pre-filled kroky jsou legitimni (uzivatel je opravdu udelal)
- [ ] Progress bar ukazuje nenulovy stav
- [ ] Aktualni krok je vizualne zvyrazneny
- [ ] Casovy odhad u kroku ("~1 minuta")
- [ ] Volitelne kroky oznaceny jako "Volitelne"

---

## Practice #69: Progressive Reduction (Simplify as Users Learn)

**PROBLEM:** UI je bud prilis jednoduche pro power users (chybi shortcuts, kompaktni view) nebo prilis slozite pro nove uzivatele (zahlteni).

**RESENI:** Redukuj komplexitu UI jak uzivatel ziskava zkusenosti. First visit = guided, returning = compact.

**PRAVIDLA:**
- First visit: tooltips, labels, expanded menus, help text
- Returning user: compact view, shortcuts, hidden help
- Prechod musi byt postupny, ne skokem
- Uzivatel musi mit moznost vratit se k "beginner" modu

**IMPLEMENTACE:**

### Tri urovne UI podle zkusenosti:

| Level | Usage | UI |
|-------|-------|----|
| **Beginner** | 0-5 sessions | Tooltips, expanded sidebar, help badges, full labels |
| **Intermediate** | 5-20 sessions | Icons + labels, collapsed optional help, keyboard hints |
| **Expert** | 20+ sessions | Icons only, compact layout, keyboard shortcuts prominent |

### Feature flags:

| Feature | Beginner | Intermediate | Expert |
|---------|----------|--------------|--------|
| Sidebar labels | Visible | Visible | Hidden (icons only) |
| Tooltips | Auto-show | On hover | Off |
| Help badges | Visible | Hidden | Hidden |
| Keyboard shortcuts | Hidden | Shown in tooltips | Always visible |
| Compact tables | Off | Optional | Default |

**KOD:**

```javascript
// Progressive reduction based on usage tracking
class ProgressiveReduction {
  constructor() {
    this.storageKey = 'ux_experience_level';
    this.sessionCountKey = 'ux_session_count';

    this.incrementSession();
    this.applyLevel();
  }

  incrementSession() {
    const count = parseInt(localStorage.getItem(this.sessionCountKey) || '0');
    localStorage.setItem(this.sessionCountKey, count + 1);
  }

  getLevel() {
    const sessions = parseInt(localStorage.getItem(this.sessionCountKey) || '0');

    // Allow manual override
    const override = localStorage.getItem(this.storageKey);
    if (override) return override;

    if (sessions <= 5) return 'beginner';
    if (sessions <= 20) return 'intermediate';
    return 'expert';
  }

  applyLevel() {
    const level = this.getLevel();
    document.documentElement.setAttribute('data-ux-level', level);
  }

  // Allow user to reset to beginner
  resetLevel() {
    localStorage.setItem(this.storageKey, 'beginner');
    this.applyLevel();
  }

  // Allow user to manually set level
  setLevel(level) {
    localStorage.setItem(this.storageKey, level);
    this.applyLevel();
  }
}

// Init
const uxLevel = new ProgressiveReduction();
```

```css
/* Beginner: full labels, help visible */
[data-ux-level="beginner"] .sidebar-label {
  display: inline;
}

[data-ux-level="beginner"] .help-badge {
  display: inline-flex;
}

[data-ux-level="beginner"] .tooltip-auto {
  opacity: 1;
  visibility: visible;
}

[data-ux-level="beginner"] .shortcut-hint {
  display: none;
}

/* Intermediate: labels visible, help on hover */
[data-ux-level="intermediate"] .sidebar-label {
  display: inline;
}

[data-ux-level="intermediate"] .help-badge {
  display: none;
}

[data-ux-level="intermediate"] .tooltip-auto {
  opacity: 0;
  visibility: hidden;
}

[data-ux-level="intermediate"] .shortcut-hint {
  display: inline;
  opacity: 0.5;
}

/* Expert: icons only, compact, shortcuts prominent */
[data-ux-level="expert"] .sidebar-label {
  display: none;
}

[data-ux-level="expert"] .sidebar {
  width: 64px; /* Compact */
}

[data-ux-level="expert"] .help-badge {
  display: none;
}

[data-ux-level="expert"] .tooltip-auto {
  display: none;
}

[data-ux-level="expert"] .shortcut-hint {
  display: inline;
  opacity: 1;
  font-weight: 500;
}

[data-ux-level="expert"] .table-compact {
  font-size: 13px;
}

[data-ux-level="expert"] .table-compact td {
  padding: 6px 8px;
}
```

```html
<!-- User preference toggle in settings -->
<div class="settings-group">
  <label>Rezim rozhrani</label>
  <select id="ux-level-select" onchange="uxLevel.setLevel(this.value)">
    <option value="">Automaticky (podle pouzivani)</option>
    <option value="beginner">Zacatecnik (vsechny napovedy)</option>
    <option value="intermediate">Pokrocily (mene napoved)</option>
    <option value="expert">Expert (kompaktni rezim)</option>
  </select>
</div>
```

**OCEKAVANY DOPAD:** +20-30% efficiency for power users without hurting new user onboarding

**CHECKLIST:**
- [ ] Session tracking (localStorage / account-level)
- [ ] 3 urovne: beginner, intermediate, expert
- [ ] CSS data-attribute approach (ne JS hide/show)
- [ ] Manual override v nastaveni
- [ ] Moznost "Reset na zacatecnika"
- [ ] Prechod je postupny, ne narazovy
- [ ] A/B test: srovnat fixed UI vs. progressive reduction

---

## Practice #70: Expectation Setting (Tell What's Coming)

**PROBLEM:** Uzivatel nevi jak dlouhy bude proces, co bude potrebovat, nebo kolik kroku zbyva. Nejistota = abandonment.

**RESENI:** Rekni dopredu: pocet kroku, casovy odhad, co bude potreba.

**PRAVIDLA:**
- "Krok 1 ze 3" snizuje anxiety
- "Zabere ~2 minuty" nastavuje ocekavani
- "Budete potrebovat: e-mail, cislo uctu" predchazi frustraci
- Vzdy ukazuj progress a zbyvajici kroky

**IMPLEMENTACE:**

### 3 typy expectation setting:

| Typ | Priklad | Kde |
|-----|---------|-----|
| **Step count** | "Krok 2 ze 4" | Multi-step forms |
| **Time estimate** | "Zabere ~2 minuty" | Onboarding, forms |
| **Requirements** | "Budete potrebovat: OP, cislo uctu" | Complex forms |

**KOD:**

```html
<!-- Multi-step form header with full expectations -->
<div class="form-expectations">
  <!-- Step progress -->
  <div class="step-progress">
    <div class="step-indicator">
      <span class="step-current">Krok 2</span>
      <span class="step-total">ze 4</span>
    </div>

    <div class="step-progress-bar">
      <div class="step-progress-fill" style="width: 50%"></div>
    </div>
  </div>

  <!-- Time estimate -->
  <div class="time-estimate">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#6b7280" stroke-width="1.5"/>
      <path d="M8 4v4l3 2" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <span>Zbyva ~3 minuty</span>
  </div>
</div>

<!-- Requirements banner (shown before complex form) -->
<div class="requirements-banner">
  <div class="requirements-icon">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#3b82f6" stroke-width="1.5"/>
      <path d="M10 6v5M10 13h.01" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="requirements-content">
    <strong>Pred zacatkem si pripravte:</strong>
    <ul>
      <li>Obcansky prukaz nebo pas</li>
      <li>Cislo bankovniho uctu</li>
      <li>Posledni vyuctovani (volitelne)</li>
    </ul>
  </div>
</div>

<!-- Compact inline expectations -->
<form class="form-with-expectations">
  <div class="form-header">
    <h2>Kontaktni udaje</h2>
    <span class="form-meta">3 pole | ~1 minuta</span>
  </div>

  <div class="form-group">
    <label for="name">Jmeno a prijmeni</label>
    <input type="text" id="name" name="name" autocomplete="name" required>
  </div>

  <div class="form-group">
    <label for="email">E-mail</label>
    <input type="email" id="email" name="email" autocomplete="email" required>
  </div>

  <div class="form-group">
    <label for="phone">Telefon</label>
    <input type="tel" id="phone" name="phone" autocomplete="tel" required>
  </div>

  <button type="submit" class="btn-primary">
    Pokracovat na krok 2 ze 4
  </button>
</form>
```

```css
/* Step progress header */
.form-expectations {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 24px;
}

.step-progress {
  flex: 1;
  margin-right: 24px;
}

.step-indicator {
  margin-bottom: 6px;
  font-size: 14px;
}

.step-current {
  font-weight: 600;
  color: #1f2937;
}

.step-total {
  color: #6b7280;
}

.step-progress-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.step-progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.time-estimate {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  white-space: nowrap;
}

/* Requirements banner */
.requirements-banner {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  margin-bottom: 24px;
}

.requirements-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.requirements-content strong {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #1e40af;
}

.requirements-content ul {
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  color: #1e40af;
}

.requirements-content li {
  margin: 4px 0;
}

/* Compact form meta */
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
}

.form-meta {
  font-size: 13px;
  color: #6b7280;
}
```

```javascript
// Dynamic time estimate based on remaining fields
function updateTimeEstimate(form) {
  const emptyFields = form.querySelectorAll('input:required').length;
  const filledFields = form.querySelectorAll('input:required:not(:placeholder-shown)').length;
  const remaining = emptyFields - filledFields;

  // ~20 seconds per field average
  const secondsRemaining = remaining * 20;
  const minutesRemaining = Math.ceil(secondsRemaining / 60);

  const timeEl = form.closest('.form-with-expectations')
    ?.previousElementSibling
    ?.querySelector('.time-estimate span');

  if (timeEl) {
    if (minutesRemaining <= 0) {
      timeEl.textContent = 'Skoro hotovo!';
    } else {
      timeEl.textContent = `Zbyva ~${minutesRemaining} ${minutesRemaining === 1 ? 'minuta' : 'minuty'}`;
    }
  }
}
```

**OCEKAVANY DOPAD:** +15-20% completion rate when expectations set upfront

**A/B TEST SETUP:**
- Baseline: Form bez progress a casoveho odhadu
- Variant: Progress bar + casovy odhad + requirements
- Metrika: Form completion rate, abandonment rate per step
- Sample: Min 100 completions per variant

**CHECKLIST:**
- [ ] Pocet kroku viditeny ("Krok X ze Y")
- [ ] Casovy odhad u kazdeho kroku
- [ ] Requirements banner pred komplexnim formularem
- [ ] Progress bar dynamicky reaguje na vyplneni
- [ ] CTA button ukazuje dalsi krok ("Pokracovat na krok 2 ze 4")
- [ ] Mobile: sticky header s progress

---

## Summary

**5 Empty States & First-Use Practices:**
1. **Meaningful empty states** (+30-50%) - Illustration + copy + CTA, never raw "No data"
2. **Gradual engagement** (+25-40%) - Value before registration, try before signup
3. **Upfront progress** (+15-25%) - Pre-fill first steps, endowed progress effect
4. **Progressive reduction** (+20-30%) - Simplify UI as users gain experience
5. **Expectation setting** (+15-20%) - Step count, time estimate, requirements upfront

**Total potential:** +105-165% improvement in activation and completion

**Priority order (ICE):**
1. Meaningful empty states (high impact, high ease)
2. Expectation setting (high impact, high ease)
3. Gradual engagement (high impact, medium ease)
4. Upfront progress (medium impact, high ease)
5. Progressive reduction (high impact, lower ease - needs tracking)

**See also:**
- `forms.md` Practice #9 - Multi-step forms (progressive disclosure)
- `ecommerce.md` - Cart empty states and checkout flow

**Next:** See practices/micro-interactions.md for transition and feedback patterns
