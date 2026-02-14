# Design Optimization Practices

Visual hierarchy, whitespace, CTA buttons.

---

## Practice #13: CTA Buttons (Contrast & Size)

**PROBLÉM:** Users miss main action button.

**ŘEŠENÍ:** ONE primary CTA, contrasting color, min 44×44px (ideally 48×48px).

**PRAVIDLA:**

- 1 primary CTA per page (max 2)
- Contrasting color
- Min 44×44px (Apple HIG), ideal 48×48px
- Text = action ("Koupit", NOT "Kliknout zde")
- 8px whitespace around

**KÓD:**

```css
.btn-primary {
  background: #ff6b00;
  color: #ffffff;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  min-width: 200px;
  min-height: 48px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #e55f00;
  transform: translateY(-2px);
}
```

**OČEKÁVANÝ DOPAD:** +25-50% click-through

---

## Practice #14: Visual Hierarchy

**PROBLÉM:** Everything looks equally important.

**ŘEŠENÍ:** 3 levels of importance via size, color, position.

**IMPLEMENTACE:**

```css
h1 {
  font-size: 48px;
  font-weight: 700;
} /* Most important */
h2 {
  font-size: 36px;
  font-weight: 600;
}
h3 {
  font-size: 24px;
  font-weight: 600;
}
p {
  font-size: 18px;
  line-height: 1.6;
} /* Body */
.caption {
  font-size: 14px;
  color: #888;
} /* Least important */
```

**F-Pattern:** Users read in F shape (horizontal top, shorter middle, vertical left)

**OČEKÁVANÝ DOPAD:** +15-30% engagement

---

## Practice #15: Whitespace System

**PROBLÉM:** Cluttered page, hard to read.

**ŘEŠENÍ:** Consistent spacing system (4px, 8px, 16px, 24px, 32px, 48px, 64px).

**KÓD:**

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}

.section {
  padding: var(--space-2xl) 0;
}
.cta-section {
  padding: var(--space-3xl) 0;
}
p {
  margin-bottom: var(--space-md);
  line-height: 1.6;
}
.btn {
  padding: var(--space-md) var(--space-xl);
  margin-top: var(--space-lg);
}
```

**60-30-10 Rule:**

- 60% dominant color (background)
- 30% secondary (content blocks)
- 10% accent (CTA, links)

**OČEKÁVANÝ DOPAD:** +10-20% readability & engagement

---

## Practice #83: Fewer Borders (Proximity Over Lines)

**PROBLEM:** Borders add visual clutter. Every line is a visual element competing for attention. Pages with many bordered cards/sections feel heavy and cramped.

**RESENI:** Use proximity, background color, or typography to group elements instead of borders. Reduce borders by 50%+ where possible.

**Reference:** GoodUI #23

### Techniques

1. **Whitespace grouping** - Elements close together are perceived as related (Gestalt proximity)
2. **Subtle background cards** - Light gray/blue background instead of border
3. **Typographic hierarchy** - Bold headings + indentation to show grouping
4. **Shadows instead of borders** - Subtle `box-shadow` lifts elements without hard lines
5. **Dividers only when needed** - Use thin lines sparingly between truly distinct sections

### When Borders ARE Appropriate

- Form input fields (users expect visible text fields)
- Tables with dense data
- Interactive cards that need clear click target boundary
- Selected/active states (highlight border)

### KOD

```css
/* BAD: Bordered card */
.card-bordered {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
}

/* GOOD: Background card (no border) */
.card-clean {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
}

/* GOOD: Shadow card (no border) */
.card-elevated {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* BAD: List with borders between items */
.list-bordered li {
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 0;
}

/* GOOD: List with spacing only */
.list-clean li {
  padding: 8px 0;
  /* Proximity alone groups items */
}

/* GOOD: List with subtle background alternation */
.list-zebra li:nth-child(even) {
  background: #f9fafb;
  border-radius: 4px;
}
```

### OCEKAVANY DOPAD

- **Perceived cleanliness:** +10-15%
- **Visual noise reduction:** significant (fewer visual elements to process)
- **Scan speed:** +5-10% (less clutter = faster comprehension)
- **Modern feel:** Borderless designs feel more contemporary

### CHECKLIST

- [ ] Audit existing borders: which can be replaced with spacing/background?
- [ ] Remove decorative borders (keep functional ones: forms, tables)
- [ ] Use background color or shadow instead of border for cards
- [ ] Group related elements via proximity (Gestalt principle)
- [ ] Keep borders for form inputs and interactive elements
- [ ] A/B test: bordered vs borderless card layouts

---

## Practice #84: Exposing Options (Dropdowns Are Hidden)

**PROBLEM:** Dropdowns hide choices behind 2 clicks. Users can't compare options without clicking. High friction for simple selections (< 5 options).

**RESENI:** Show radio buttons or toggles instead of dropdowns for small option sets. Dropdowns only for 7+ options.

**Reference:** GoodUI #14

### Rules

| Number of Options                  | Component                         | Why                             |
| ---------------------------------- | --------------------------------- | ------------------------------- |
| 2                                  | Toggle / Switch                   | Binary choice, instant          |
| 3-5                                | Radio buttons / Segmented control | All visible, comparable         |
| 5-7                                | Radio OR Dropdown                 | Test which works better         |
| 7+                                 | Dropdown / Searchable select      | Too many to show at once        |
| Well-known values (country, state) | Dropdown always                   | Users expect it, know the value |

### When Dropdowns ARE Appropriate

- Country/state/language selectors (100+ options)
- Date pickers (structured, expected)
- Any list where user already knows their answer
- 7+ options that aren't comparative

### KOD

```html
<!-- BAD: Dropdown for 3 options -->
<select name="plan">
  <option>Basic</option>
  <option>Pro</option>
  <option>Enterprise</option>
</select>

<!-- GOOD: Radio group for 3 options -->
<fieldset class="radio-group">
  <legend>Vyberte plan</legend>
  <label class="radio-option">
    <input type="radio" name="plan" value="basic" />
    <span class="radio-label">
      <strong>Basic</strong>
      <span>199 Kc/mes</span>
    </span>
  </label>
  <label class="radio-option">
    <input type="radio" name="plan" value="pro" checked />
    <span class="radio-label">
      <strong>Pro</strong>
      <span>499 Kc/mes</span>
    </span>
  </label>
  <label class="radio-option">
    <input type="radio" name="plan" value="enterprise" />
    <span class="radio-label">
      <strong>Enterprise</strong>
      <span>999 Kc/mes</span>
    </span>
  </label>
</fieldset>
```

```css
.radio-group {
  border: none;
  padding: 0;
  display: flex;
  gap: 12px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
}

.radio-option:has(input:checked) {
  border-color: #ff6b00;
  background: #fff7ed;
}

.radio-option input {
  accent-color: #ff6b00;
}

.radio-label {
  display: flex;
  flex-direction: column;
}

.radio-label strong {
  font-size: 16px;
}

.radio-label span {
  font-size: 14px;
  color: #6b7280;
}
```

### OCEKAVANY DOPAD

- **Interaction rate:** +15-25% when options are visible
- **Selection speed:** +30-50% (no click-to-reveal)
- **Form completion:** +10-15% (less friction)
- **Error reduction:** Users can compare all options at once

### CHECKLIST

- [ ] Audit all dropdowns: how many options does each have?
- [ ] Replace dropdowns with < 5 options with radio buttons/toggles
- [ ] Keep dropdowns for 7+ options and well-known values
- [ ] Radio options show enough info to compare (not just label)
- [ ] Segmented control for 2-3 mutually exclusive options
- [ ] Test: visible options vs dropdown for 5-7 option edge case

---

## Practice #85: Icon + Label (Always)

**PROBLEM:** Icons without text labels are ambiguous. Users guess wrong, miss features, or don't click. Only a handful of icons are universally understood.

**RESENI:** Always pair icons with text labels. Icon-only is acceptable only for universally understood symbols.

**Reference:** GoodUI #47

### Rules

**Always pair with text:**

- Navigation icons (settings, profile, notifications)
- Feature icons (share, bookmark, filter, sort)
- Action icons (edit, delete, archive, download)
- Any icon specific to your product

**Icon-only acceptable (universally understood):**

- Close (X)
- Hamburger menu (three lines)
- Search (magnifying glass)
- Play/pause (media controls)
- Back arrow
- Home

**The 80% Test:** Can 80% of users identify the action without a label? If unsure, add a label. When in doubt, always add text.

### KOD

```html
<!-- BAD: Icon-only navigation -->
<nav>
  <button>
    <svg><!-- gear icon --></svg>
  </button>
  <button>
    <svg><!-- bell icon --></svg>
  </button>
  <button>
    <svg><!-- chart icon --></svg>
  </button>
</nav>

<!-- GOOD: Icon + label navigation -->
<nav>
  <button>
    <svg><!-- gear icon --></svg>
    <span>Nastaveni</span>
  </button>
  <button>
    <svg><!-- bell icon --></svg>
    <span>Oznameni</span>
  </button>
  <button>
    <svg><!-- chart icon --></svg>
    <span>Statistiky</span>
  </button>
</nav>

<!-- ACCEPTABLE: Icon-only for universal symbols -->
<button aria-label="Zavrit">
  <svg><!-- X icon --></svg>
</button>
```

```css
/* Icon + label button */
.icon-label-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
}

.icon-label-btn svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.icon-label-btn span {
  font-size: 14px;
}

/* Mobile: Stack icon above label */
@media (max-width: 640px) {
  .icon-label-btn {
    flex-direction: column;
    gap: 4px;
    padding: 8px;
  }

  .icon-label-btn span {
    font-size: 11px;
  }
}
```

### OCEKAVANY DOPAD

- **Feature discovery:** +20-30%
- **Misclicks:** -15% (users click the right thing)
- **Task completion:** +10-20% (no guessing)
- **Onboarding time:** -25% (new users understand UI faster)

### CHECKLIST

- [ ] Audit all icon-only buttons/links in the UI
- [ ] Add text labels to all non-universal icons
- [ ] Universal icons still have `aria-label` for accessibility
- [ ] Mobile: stack icon above label or use tooltip
- [ ] Consistent icon style across app (outline OR filled, not mixed)
- [ ] Test with new users: can they identify actions without guidance?

---

## Practice #86: Distinct Clickable & Selected States

**PROBLEM:** Interactive elements look the same in all states. Users can't tell what's clickable, what's hovered, what's active, or what's currently selected.

**RESENI:** Every interactive element needs clear hover, active, focus, and selected states. Consistent visual language across the entire app.

**Reference:** GoodUI #6

### State System

| State            | Visual Treatment                         | Purpose             |
| ---------------- | ---------------------------------------- | ------------------- |
| Default          | Base style                               | Resting state       |
| Hover            | Subtle background change, cursor pointer | "This is clickable" |
| Active/Pressed   | Darker/pressed-in effect                 | "I'm clicking this" |
| Focus            | Visible outline (keyboard nav)           | Accessibility       |
| Selected/Current | Strong highlight (fill, border)          | "This is active"    |
| Disabled         | Reduced opacity, no pointer              | "Not available"     |

### Consistency Rules

1. **Same blue for all active states** (or your brand color)
2. **Same hover treatment** across similar components
3. **Current nav item** highlighted differently from links
4. **Focus rings** visible for keyboard users (never `outline: none` without replacement)

### KOD

```css
/* Button state system */
.btn {
  background: #3b82f6;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn:active {
  background: #1d4ed8;
  transform: translateY(0);
  box-shadow: none;
}

.btn:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
  box-shadow: none;
}

/* Navigation: current item */
.nav-link {
  color: #6b7280;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}

.nav-link:hover {
  color: #111827;
  background: #f9fafb;
}

.nav-link[aria-current="page"] {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  font-weight: 600;
}

/* List item: selected state */
.list-item {
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.list-item:hover {
  background: #f3f4f6;
}

.list-item.selected {
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
}
```

### OCEKAVANY DOPAD

- **Perceived quality:** significant increase (polished feel)
- **Click confidence:** +10-15% (users know what's interactive)
- **Navigation errors:** -15-20% (clear current location)
- **Accessibility compliance:** improved (focus states for keyboard users)

### CHECKLIST

- [ ] Every button has hover, active, focus, disabled states
- [ ] Every link has hover and focus states
- [ ] Current navigation item is clearly highlighted
- [ ] Focus-visible outline on all interactive elements
- [ ] Consistent state colors across the app
- [ ] Selected items in lists/grids clearly marked
- [ ] Disabled elements have reduced opacity + `cursor: not-allowed`
- [ ] Test with keyboard-only navigation

---

## Practice #87: Attention Hierarchy (Primary/Secondary/Tertiary Actions)

**PROBLEM:** Multiple CTAs compete for attention. Everything looks equally important. Users don't know what to click first.

**RESENI:** Strict visual weight hierarchy: 1 primary CTA (full color), 1-2 secondary (outlined), tertiary (text-only). Remove competing links above primary CTA.

**Reference:** GoodUI #56 + #16 (Keeping Focus)

### Hierarchy Rules

| Level     | Style                   | Usage               | Max per view |
| --------- | ----------------------- | ------------------- | ------------ |
| Primary   | Full color, bold, large | Main desired action | 1            |
| Secondary | Outlined or muted fill  | Alternative action  | 1-2          |
| Tertiary  | Text-only (link style)  | Low-priority action | As needed    |

### Key Principles

1. **One primary CTA** - If everything is bold, nothing is bold
2. **Remove distractions above primary CTA** - Links, secondary actions above the CTA steal attention
3. **Squint test** - Blur your eyes: primary CTA should be the first thing visible
4. **Color weight** - Filled > Outlined > Text-only
5. **Size weight** - Larger > Smaller

### KOD

```css
/* Primary: Full attention */
.btn-primary {
  background: #ff6b00;
  color: #fff;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
}

/* Secondary: Visible but not competing */
.btn-secondary {
  background: transparent;
  color: #ff6b00;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  border: 2px solid #ff6b00;
  border-radius: 8px;
}

/* Tertiary: Minimal visual weight */
.btn-tertiary {
  background: none;
  color: #6b7280;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  text-decoration: underline;
}

/* Layout: Primary always at the end / bottom */
.action-group {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

/* Stack on mobile: primary at bottom (thumb zone) */
@media (max-width: 640px) {
  .action-group {
    flex-direction: column-reverse;
  }

  .action-group .btn-primary {
    width: 100%;
  }
}
```

### OCEKAVANY DOPAD

- **Primary CTA clicks:** +20-35% when distractions removed
- **Decision speed:** +15-25% (clear hierarchy = faster action)
- **Conversion:** +10-20% (users complete intended action)
- **Cognitive load:** reduced (less visual noise)

### CHECKLIST

- [ ] Only 1 primary CTA per page section
- [ ] Secondary actions are outlined or muted
- [ ] Tertiary actions are text-only
- [ ] No competing links/buttons above primary CTA
- [ ] Squint test passes (primary CTA stands out when blurred)
- [ ] Mobile: primary CTA full-width at bottom
- [ ] Consistent hierarchy across all pages

---

## Practice #88: Bigger Click/Touch Areas

**PROBLEM:** Small click targets cause misclicks, frustration, and rage taps (especially on mobile). Links and buttons too small to tap accurately.

**RESENI:** Minimum 44x44px touch targets (48x48px recommended). Full-row clickable in lists. Generous padding around links.

**Reference:** GoodUI #38 + Apple HIG

### Size Rules

| Context         | Minimum         | Recommended        |
| --------------- | --------------- | ------------------ |
| Buttons         | 44x44px         | 48x48px            |
| Nav links       | 44px height     | 48px height        |
| List items      | 44px row height | 56-64px row height |
| Icon buttons    | 44x44px total   | 48x48px total      |
| Form checkboxes | 24x24px visual  | 44x44px tap area   |

### Key Principles

1. **Padding IS the click area** - Small visual element + large padding = good
2. **Full-row clickable** - In lists, the entire row should be clickable (not just text)
3. **Space between targets** - Min 8px between adjacent tap targets
4. **Thumb zone** - Primary actions in bottom-center of mobile screen

### KOD

```css
/* Small visual, large tap area */
.icon-button {
  /* Visual: 24px icon */
  width: 24px;
  height: 24px;
  /* Tap area: 48px total */
  padding: 12px;
  /* The clickable area = 24 + 12 + 12 = 48px */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Full-row clickable list */
.list-item-link {
  display: flex;
  align-items: center;
  padding: 16px;
  min-height: 56px;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
  /* Entire row is clickable */
}

.list-item-link:hover {
  background: #f9fafb;
}

/* Nav links with generous padding */
.nav-link {
  display: block;
  padding: 12px 16px; /* Creates min 44px height */
  text-decoration: none;
}

/* Checkbox with larger tap area */
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  min-height: 44px;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #3b82f6;
}

/* Spacing between adjacent targets */
.button-group {
  display: flex;
  gap: 8px; /* Min 8px between tap targets */
}
```

### OCEKAVANY DOPAD

- **Tap accuracy:** +15-25% (especially mobile)
- **Rage taps/misclicks:** -20-30%
- **Mobile task completion:** +10-15%
- **Accessibility:** improved for motor-impaired users

### CHECKLIST

- [ ] All buttons min 44x44px (48x48px preferred)
- [ ] All nav links min 44px height
- [ ] List items: full row clickable
- [ ] Min 8px space between adjacent tap targets
- [ ] Checkboxes/radios: tap area 44x44px (even if visual is 20px)
- [ ] Test on real mobile devices (not just browser simulator)
- [ ] Primary CTAs in mobile thumb zone (bottom-center)

---

## Practice #89: Consistency System

**PROBLEM:** Inconsistent UI patterns across pages confuse users. Different button styles, form layouts, card designs, and spacing on different pages break user expectations and increase cognitive load.

**RESENI:** Same patterns for same actions across the entire app. Use design tokens for systematic consistency. Break conventions only with clear purpose and testing.

**Reference:** GoodUI #27 + #29 (Conventions)

### What Must Be Consistent

| Element    | Consistency Rule                                   |
| ---------- | -------------------------------------------------- |
| Buttons    | Same style for same action type everywhere         |
| Forms      | Same layout, labels, validation, error messages    |
| Cards      | Same structure (image, title, description, action) |
| Spacing    | Design token system (4px base)                     |
| Colors     | Token-based palette, semantic naming               |
| Typography | Type scale with defined sizes/weights              |
| Icons      | Same style (outline OR filled, consistent stroke)  |
| Feedback   | Same toast/notification style for same event type  |

### Design Tokens Approach

```css
:root {
  /* Colors: Semantic naming */
  --color-primary: #ff6b00;
  --color-primary-hover: #e55f00;
  --color-success: #16a34a;
  --color-error: #dc2626;
  --color-warning: #d97706;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-bg: #ffffff;
  --color-bg-subtle: #f9fafb;
  --color-border: #e5e7eb;

  /* Spacing: 4px base scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Typography */
  --font-family: "Inter", -apple-system, sans-serif;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

### When to Break Conventions

Break consistency ONLY when:

1. **Clear purpose** - The inconsistency draws attention intentionally (e.g., destructive action = red button)
2. **Tested** - A/B test confirms the break improves outcomes
3. **Documented** - Team knows it's intentional, not a bug

### OCEKAVANY DOPAD

- **Cognitive load:** -20-30% (predictable = effortless)
- **Development speed:** +30-50% (reusable components)
- **User confidence:** +15-25% (consistent = professional = trustworthy)
- **Onboarding time:** -20% (learn one pattern, apply everywhere)

### CHECKLIST

- [ ] Design tokens defined (colors, spacing, typography, radius, shadows)
- [ ] Button styles consistent across all pages
- [ ] Form patterns uniform (label position, validation, errors)
- [ ] Card layouts use same structure
- [ ] Spacing follows token scale (no magic numbers)
- [ ] Icon style unified (all outline OR all filled)
- [ ] Feedback messages use same toast/notification component
- [ ] Document any intentional convention breaks
- [ ] Regular consistency audit (quarterly)

---

## Summary

**10 Design Practices:**

1. **CTA buttons** (+25-50%) - Contrast, size 48x48px, clear text
2. **Visual hierarchy** (+15-30%) - Size, color, position
3. **Whitespace** (+10-20%) - Consistent spacing system
4. **Fewer borders** (+10-15%) - Proximity and background over lines
5. **Exposing options** (+15-25%) - Radio buttons over dropdowns for <5 options
6. **Icon + label** (+20-30%) - Always pair icons with text
7. **Distinct states** (+10-15%) - Hover, active, focus, selected for all elements
8. **Attention hierarchy** (+20-35%) - Primary/secondary/tertiary CTA weight
9. **Bigger click areas** (+15-25%) - Min 44x44px, full-row clickable
10. **Consistency system** (-20-30% cognitive load) - Design tokens, uniform patterns

**Total potential:** +140-275% improvement

**Next:** See practices/ab-testing.md for testing strategy
