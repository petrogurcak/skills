# Accessibility Practices

WCAG 2.1 AA compliance = better UX for everyone. **EAA deadline: June 28, 2025.**

**CRITICAL:** See `legal-ux.md` Practice #20 for complete EAA compliance framework (mandatory June 2025 deadline, penalties, priority fixes).

This file covers advanced accessibility patterns beyond legal minimums.

---

## Practice #22: Contrast Ratios (WCAG)

**PROBLÉM:** Text hard to read.

**ŘEŠENÍ:** Min 4.5:1 contrast for text, 3:1 for large text.

**WCAG Standards:**
- Normal text (< 18px): 4.5:1
- Large text (≥ 18px bold or 24px): 3:1
- UI components (buttons): 3:1

**GOOD COMBINATIONS:**
```
✅ #000000 on #FFFFFF = 21:1 (perfect)
✅ #555555 on #FFFFFF = 8.59:1 (good)
✅ #FFFFFF on #FF6B00 = 4.54:1 (passes)

❌ #999999 on #FFFFFF = 2.32:1 (fails)
❌ #FFEB3B on #FFFFFF = 1.88:1 (fails)
```

**Tools:** WebAIM Contrast Checker, Chrome DevTools

---

## Practice #23: Keyboard Navigation

**PROBLÉM:** Can't use site with keyboard only.

**ŘEŠENÍ:** All interactive elements focusable, visible focus state.

**KÓD:**
```css
/* Visible focus */
button:focus-visible {
  outline: 3px solid #FF6B00;
  outline-offset: 2px;
}

input:focus {
  border: 2px solid #0066CC;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}
```

**CHECKLIST:**
- [ ] Tab through all interactive elements
- [ ] Focus visible on all elements
- [ ] Logical tab order
- [ ] Skip links for main content
- [ ] ARIA labels where needed

---

---

## Practice #24: Semantic HTML & ARIA

**PROBLÉM:** Screen readers can't understand page structure.

**ŘEŠENÍ:** Use semantic HTML5 elements + ARIA when necessary.

### Semantic HTML (Preferred)

**Use built-in semantic elements FIRST:**

```html
<!-- ✅ GOOD: Semantic HTML -->
<header>
  <nav aria-label="Hlavní navigace">
    <ul>
      <li><a href="/">Domů</a></li>
      <li><a href="/produkty">Produkty</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Nadpis článku</h1>
    <p>Obsah...</p>
  </article>

  <aside aria-label="Související články">
    <h2>Mohlo by vás zajímat</h2>
  </aside>
</main>

<footer>
  <p>&copy; 2025 Firma</p>
</footer>
```

**Benefits:**
- Screen readers announce landmarks automatically
- Better SEO
- Easier to maintain
- No ARIA needed in most cases

---

### ARIA Patterns (When Semantic HTML Insufficient)

**ARIA Rule #1:** "No ARIA is better than bad ARIA"

**When to use ARIA:**
- Custom interactive widgets (dropdowns, tabs, accordions)
- Dynamic content updates
- State communication (expanded/collapsed, selected)

**Common ARIA patterns:**

#### Pattern 1: Tabs

```html
<div class="tabs">
  <div role="tablist" aria-label="Nastavení účtu">
    <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
      Profil
    </button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
      Bezpečnost
    </button>
  </div>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    <h2>Profil</h2>
    <!-- Panel content -->
  </div>

  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    <h2>Bezpečnost</h2>
    <!-- Panel content -->
  </div>
</div>
```

**JavaScript requirements:**
- Arrow keys navigate between tabs
- Tab key moves to panel
- Enter/Space activates tab

---

#### Pattern 2: Modal Dialog

```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Potvrzení objednávky</h2>

  <p>Opravdu chcete objednat tento produkt?</p>

  <div class="dialog-actions">
    <button onclick="confirm()">Ano, objednat</button>
    <button onclick="close()">Zrušit</button>
  </div>

  <button aria-label="Zavřít dialog" onclick="close()">×</button>
</div>
```

**JavaScript requirements:**
- Trap focus inside dialog (Tab cycles within)
- Esc closes dialog
- Focus returns to trigger element after close

---

#### Pattern 3: Accordion

```html
<div class="accordion">
  <h3>
    <button
      aria-expanded="false"
      aria-controls="section1"
      id="accordion1">
      Otázka 1: Jak dlouho trvá doručení?
    </button>
  </h3>
  <div id="section1" role="region" aria-labelledby="accordion1" hidden>
    <p>Doručení trvá 2-3 pracovní dny.</p>
  </div>

  <h3>
    <button
      aria-expanded="false"
      aria-controls="section2"
      id="accordion2">
      Otázka 2: Jaké jsou platební možnosti?
    </button>
  </h3>
  <div id="section2" role="region" aria-labelledby="accordion2" hidden>
    <p>Přijímáme karty, bankovní převod, PayPal.</p>
  </div>
</div>
```

**JavaScript requirements:**
- Toggle `aria-expanded` on click
- Show/hide panel
- Optional: Arrow keys navigate between headers

---

#### Pattern 4: Live Regions (Dynamic Updates)

```html
<!-- Shopping cart: Updates announce to screen readers -->
<div aria-live="polite" aria-atomic="true" class="cart-status">
  <p>V košíku: <strong>3 položky</strong></p>
</div>

<!-- Form errors: Immediate announcement -->
<div role="alert" aria-live="assertive">
  <p>Email je povinné pole</p>
</div>
```

**aria-live values:**
- `off`: Default, no announcement
- `polite`: Announce when user idle (cart updates)
- `assertive`: Announce immediately (errors)

**aria-atomic:**
- `true`: Read entire region
- `false`: Read only changes

---

### ARIA Labels & Descriptions

**When visible label insufficient:**

```html
<!-- Icon-only button -->
<button aria-label="Zavřít">×</button>

<!-- Multiple "Edit" buttons need context -->
<button aria-label="Upravit jméno">Upravit</button>
<button aria-label="Upravit email">Upravit</button>

<!-- Additional description -->
<button aria-label="Smazat účet" aria-describedby="delete-warning">
  Smazat
</button>
<p id="delete-warning" class="warning">
  Pozor: Tato akce je nevratná!
</p>
```

---

### Checklist

- [ ] Use semantic HTML first (`<nav>`, `<main>`, `<aside>`, `<article>`)
- [ ] Add ARIA only when semantic HTML insufficient
- [ ] Test with screen reader (NVDA, VoiceOver)
- [ ] Interactive widgets have correct ARIA roles
- [ ] Dynamic updates use `aria-live`
- [ ] Icon-only buttons have `aria-label`
- [ ] Focus management in modals (trap focus)

---

## Practice #25: Alt Text & Images

**PROBLÉM:** Screen readers can't "see" images without alt text.

**ŘEŠENÍ:** Descriptive alt text for meaningful images, empty alt for decorative.

### Alt Text Rules

#### Rule 1: Meaningful Images = Descriptive Alt

**Purpose:** Describe what image conveys

```html
<!-- ❌ BAD: Useless alt -->
<img src="product.jpg" alt="Image">
<img src="person.jpg" alt="IMG_2847.jpg">

<!-- ✅ GOOD: Descriptive alt -->
<img src="product.jpg" alt="MacBook Pro 16-inch with M3 chip, space gray">
<img src="person.jpg" alt="Sarah Johnson, CEO, speaking at conference">
```

**Best practices:**
- Describe what's important (not every detail)
- Skip "image of" / "picture of" (redundant)
- Include text visible in image
- Max ~150 characters (screen readers pause)

---

#### Rule 2: Decorative Images = Empty Alt

**Purpose:** Tell screen readers to skip image

```html
<!-- ✅ GOOD: Empty alt for decoration -->
<img src="decorative-divider.svg" alt="">
<img src="background-pattern.png" alt="" role="presentation">
```

**When image is decorative:**
- Purely visual styling
- Adds no information
- Redundant with adjacent text

---

#### Rule 3: Functional Images = Describe Function

**Purpose:** Explain what happens on click

```html
<!-- ❌ BAD: Describes appearance -->
<a href="/search">
  <img src="magnifying-glass.svg" alt="Magnifying glass icon">
</a>

<!-- ✅ GOOD: Describes function -->
<a href="/search">
  <img src="magnifying-glass.svg" alt="Vyhledávání">
</a>

<!-- ✅ BETTER: Icon + visible text (no alt needed on icon) -->
<a href="/search">
  <img src="magnifying-glass.svg" alt="" aria-hidden="true">
  <span>Vyhledávání</span>
</a>
```

---

#### Rule 4: Complex Images = Alt + Long Description

**Purpose:** Short alt + detailed description for charts/diagrams

```html
<!-- Infographic: Short alt + longdesc -->
<img
  src="sales-chart.png"
  alt="Prodeje 2024: Nárůst o 45%"
  aria-describedby="chart-description">

<div id="chart-description" class="sr-only">
  <p>Graf ukazuje prodeje po měsících v roce 2024:</p>
  <ul>
    <li>Leden: 100 000 Kč</li>
    <li>Únor: 120 000 Kč</li>
    <li>Březen: 145 000 Kč</li>
    <!-- ... -->
  </ul>
  <p>Celkový nárůst: 45% oproti roku 2023.</p>
</div>
```

**Note:** Screen reader only class:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

### E-Commerce Product Images

**Hero image:**
```html
<img
  src="backpack-hero.jpg"
  alt="Modrý turistický batoh North Explorer 40L, pohled zepředu">
```

**Detail shots:**
```html
<img
  src="backpack-zipper.jpg"
  alt="Detail vodotěsného zipu s gumovým těsněním">
```

**Lifestyle images:**
```html
<img
  src="backpack-hiking.jpg"
  alt="Turista s modrým batohem North Explorer při výstupu na horu">
```

---

### Image Checklist

- [ ] All meaningful images have descriptive alt text
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Functional images describe function (not appearance)
- [ ] Complex images have long description (`aria-describedby`)
- [ ] Product photos describe product + view
- [ ] No "image of" / "picture of" phrases
- [ ] Test with screen reader (alt text makes sense in context)

---

## Practice #26: Form Accessibility

**PROBLÉM:** Forms are #1 accessibility barrier. Users can't complete without proper labels/structure.

**ŘEŠENÍ:** Explicit labels, error messages, logical structure.

**See also:** `legal-ux.md` Practice #20 (EAA forms requirements)

### Label Association (CRITICAL)

```html
<!-- ❌ BAD: No label association -->
<label>Jméno</label>
<input type="text" name="name">

<!-- ❌ BAD: Placeholder as label -->
<input type="text" placeholder="Vaše jméno">

<!-- ✅ GOOD: Explicit association -->
<label for="name">Jméno</label>
<input type="text" id="name" name="name">

<!-- ✅ ALSO GOOD: Implicit association -->
<label>
  Jméno
  <input type="text" name="name">
</label>
```

**Why explicit better:**
- Works with all assistive tech
- Larger clickable area (click label = focus input)
- More flexible styling

---

### Required Fields

```html
<!-- ✅ GOOD: Multiple indicators -->
<label for="email">
  Email
  <span class="required" aria-label="povinné">*</span>
</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-required="true">
```

**Why multiple indicators:**
- Visual: `*` or "povinné"
- Semantic: `required` attribute
- ARIA: `aria-required="true"` (redundant but helpful)

---

### Error Messages

```html
<!-- ✅ GOOD: Linked error message -->
<label for="email">Email</label>
<input
  type="email"
  id="email"
  name="email"
  aria-invalid="true"
  aria-describedby="email-error">

<p id="email-error" class="error" role="alert">
  Zadejte platnou emailovou adresu
</p>
```

**JavaScript to announce errors:**

```javascript
function showError(inputId, errorMessage) {
  const input = document.getElementById(inputId);
  const errorId = `${inputId}-error`;

  // Create/update error element
  let errorEl = document.getElementById(errorId);
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.id = errorId;
    errorEl.className = 'error';
    errorEl.setAttribute('role', 'alert'); // Announces to screen reader
    input.parentNode.appendChild(errorEl);
  }

  errorEl.textContent = errorMessage;

  // Mark input as invalid
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', errorId);
}
```

---

### Grouped Fields (Radio, Checkbox)

```html
<!-- ✅ GOOD: Fieldset + legend -->
<fieldset>
  <legend>Způsob dopravy</legend>

  <label>
    <input type="radio" name="shipping" value="post">
    Česká pošta (2-3 dny)
  </label>

  <label>
    <input type="radio" name="shipping" value="courier">
    Kurýr (1 den)
  </label>
</fieldset>
```

**Why fieldset:**
- Screen readers announce "Způsob dopravy" before reading options
- Groups related inputs visually + semantically

---

### Autocomplete Attributes

```html
<!-- ✅ GOOD: Autocomplete hints -->
<label for="name">Jméno a příjmení</label>
<input
  type="text"
  id="name"
  name="name"
  autocomplete="name">

<label for="email">Email</label>
<input
  type="email"
  id="email"
  name="email"
  autocomplete="email">

<label for="cc-number">Číslo karty</label>
<input
  type="text"
  id="cc-number"
  name="cc-number"
  autocomplete="cc-number">
```

**Benefits:**
- Browsers can autofill correctly
- Assistive tech can suggest values
- Faster checkout

**Common autocomplete values:**
- `name`, `given-name`, `family-name`
- `email`, `tel`
- `street-address`, `postal-code`, `country`
- `cc-number`, `cc-exp`, `cc-csc`

---

### Form Checklist

- [ ] All inputs have explicit labels (`for="id"`)
- [ ] Required fields marked (`required`, `aria-required`)
- [ ] Error messages linked (`aria-describedby`)
- [ ] Errors announced (`role="alert"`)
- [ ] Invalid inputs marked (`aria-invalid="true"`)
- [ ] Grouped inputs use `<fieldset>` + `<legend>`
- [ ] Autocomplete attributes on personal data fields
- [ ] Keyboard-accessible (Tab through all fields)
- [ ] Visible focus states

---

## Practice #27: Screen Reader Optimization

**PROBLÉM:** Site works visually but screen reader experience is confusing.

**ŘEŠENÍ:** Test with screen reader + optimize content order and announcements.

### Skip Links

**Purpose:** Let screen reader users skip to main content

```html
<!-- Place at very top of <body> -->
<a href="#main-content" class="skip-link">
  Přeskočit na hlavní obsah
</a>

<header>
  <nav><!-- Long navigation --></nav>
</header>

<main id="main-content">
  <!-- Main content -->
</main>
```

**Styling (visible on focus only):**

```css
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  transform: translateY(-100%);
  transition: transform 0.2s;
}

.skip-link:focus {
  transform: translateY(0);
}
```

---

### Heading Hierarchy

**Purpose:** Screen readers navigate by headings

```html
<!-- ✅ GOOD: Logical hierarchy -->
<h1>Název produktu</h1>

<h2>Popis</h2>
<p>...</p>

<h2>Specifikace</h2>
<h3>Rozměry</h3>
<p>...</p>
<h3>Materiál</h3>
<p>...</p>

<h2>Recenze</h2>
<h3>Hodnocení zákazníků</h3>

<!-- ❌ BAD: Skipped levels -->
<h1>Název</h1>
<h3>Popis</h3> <!-- Skipped h2 -->
```

**Rules:**
- One `<h1>` per page
- Don't skip levels (h1→h2→h3, not h1→h3)
- Use headings for structure (not just styling)

---

### Visually Hidden Content (Screen Reader Only)

**Use cases:**
- Additional context for screen readers
- Icon button labels
- Skip links

```html
<!-- Example: Icon button -->
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  <span class="sr-only">Zavřít</span>
</button>
```

**CSS (from Practice #25):**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

### Content Order

**Visual order ≠ DOM order can confuse screen readers**

```html
<!-- ❌ BAD: Visual order (CSS) differs from DOM order -->
<div class="product-page">
  <div class="price" style="order: 1">299 Kč</div>
  <div class="title" style="order: 0">Produkt</div>
  <div class="description" style="order: 2">Popis...</div>
</div>

<!-- Screen reader reads: Price → Title → Description (confusing) -->

<!-- ✅ GOOD: DOM order matches logical reading order -->
<div class="product-page">
  <h1 class="title">Produkt</h1>
  <p class="price">299 Kč</p>
  <div class="description">Popis...</div>
</div>
```

**Rule:** If visual order matters, DOM order should match

---

### Landmarks

**Purpose:** Screen readers can jump to regions

```html
<header role="banner"><!-- redundant but explicit --></header>
<nav role="navigation" aria-label="Hlavní navigace"></nav>
<main role="main"></main>
<aside role="complementary" aria-label="Související produkty"></aside>
<footer role="contentinfo"></footer>
```

**Note:** HTML5 elements imply roles, but explicit ARIA helps older screen readers

**Multiple landmarks need labels:**

```html
<nav aria-label="Hlavní navigace">...</nav>
<nav aria-label="Patička">...</nav>

<aside aria-label="Související produkty">...</aside>
<aside aria-label="Reklama">...</aside>
```

---

### Screen Reader Testing

**Basic test (5 minutes):**
1. Enable screen reader (NVDA/VoiceOver)
2. Close eyes (or look away from screen)
3. Navigate homepage using only keyboard + audio
4. Try completing task (find product, add to cart)

**Questions to answer:**
- Can I understand page structure from headings?
- Are all images described adequately?
- Do forms announce labels + errors correctly?
- Can I navigate main sections easily?
- Is anything confusing/redundant?

---

## Summary

**7 Accessibility Practices:**
1. **Contrast ratios** (Practice #22) - Min 4.5:1 for text, 3:1 for UI
2. **Keyboard navigation** (Practice #23) - Tab-accessible, visible focus
3. **Semantic HTML & ARIA** (Practice #24) - Structure, roles, states
4. **Alt text & images** (Practice #25) - Descriptive for meaningful, empty for decorative
5. **Form accessibility** (Practice #26) - Explicit labels, error messages, autocomplete
6. **Screen reader optimization** (Practice #27) - Skip links, heading hierarchy, landmarks

**Critical deadline:** June 28, 2025 - EAA compliance mandatory (see `legal-ux.md` Practice #20)

**Tools:**
- **Testing:** WAVE, Lighthouse, axe DevTools
- **Screen readers:** NVDA (Windows), VoiceOver (Mac), JAWS
- **Contrast:** WebAIM Contrast Checker, Chrome DevTools

**Priority fixes (from legal-ux.md):**
1. Forms (explicit labels, keyboard nav)
2. Color contrast (4.5:1 minimum)
3. Text size (16px minimum)
4. Interactive targets (44×44px)
5. Keyboard navigation (visible focus states)

**Impact:**
- Legal compliance (avoid EAA fines)
- SEO boost (accessible = crawlable)
- Better UX for everyone (15% population + temporary disabilities)
- Lower support costs (fewer accessibility-related issues)

**Next:** See legal-ux.md for EAA compliance checklist and GDPR requirements
