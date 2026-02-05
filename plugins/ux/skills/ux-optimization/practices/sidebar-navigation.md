# Sidebar Navigation Optimization Practices

Based on research from NN/g, UXPin, and 50+ admin dashboard pattern analyses.

**Core principle:** Sidebar je páteř admin panelu. Dobrá navigace = uživatel vždy ví kde je a kam může jít.

---

## Practice #44: Fixed vs Collapsible Sidebar

**PROBLÉM:** Uživatelé ztrácejí orientaci v aplikaci. Na mobilu sidebar zabírá moc místa.

**ŘEŠENÍ:** Vyber správný pattern podle zařízení a komplexity navigace.

**IMPLEMENTACE:**

### Kdy použít který pattern:

| Pattern | Zařízení | Use Case | Příklad |
|---------|----------|----------|---------|
| **Fixed (vždy viditelný)** | Desktop | Časté přepínání, komplexní app | Google Analytics |
| **Collapsible (icons only)** | Desktop | Potřeba více prostoru pro content | Trello |
| **Overlay (hamburger)** | Mobile/Tablet | Dotykové ovládání | Gmail app |
| **Off-canvas** | Mobile | Maximum content space | Admin na mobilu |

### Desktop: Fixed + Collapsible toggle
- Default: Expanded (icons + text)
- Toggle: Collapsed (icons only + tooltips)
- Persist preference v localStorage

### Mobile: Overlay
- Hamburger menu tlačítko
- Full-screen nebo partial overlay
- Backdrop pro zavření kliknutím mimo

**KÓD:**

```html
<!-- Desktop sidebar with collapse toggle -->
<aside class="sidebar" id="sidebar" data-collapsed="false">
  <!-- Collapse toggle -->
  <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
    <span class="toggle-icon">◀</span>
  </button>

  <!-- Logo -->
  <div class="sidebar-header">
    <img src="/logo.svg" alt="Logo" class="logo-full">
    <img src="/logo-icon.svg" alt="" class="logo-collapsed">
  </div>

  <!-- Navigation -->
  <nav class="sidebar-nav" aria-label="Hlavní navigace">
    <ul class="nav-list">
      <li class="nav-item">
        <a href="/dashboard" class="nav-link active" aria-current="page">
          <span class="nav-icon">📊</span>
          <span class="nav-text">Dashboard</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="/orders" class="nav-link">
          <span class="nav-icon">📦</span>
          <span class="nav-text">Objednávky</span>
          <span class="nav-badge">12</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="/products" class="nav-link">
          <span class="nav-icon">🏷️</span>
          <span class="nav-text">Produkty</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="/customers" class="nav-link">
          <span class="nav-icon">👥</span>
          <span class="nav-text">Zákazníci</span>
        </a>
      </li>
    </ul>

    <!-- Divider -->
    <div class="nav-divider"></div>

    <ul class="nav-list">
      <li class="nav-item">
        <a href="/settings" class="nav-link">
          <span class="nav-icon">⚙️</span>
          <span class="nav-text">Nastavení</span>
        </a>
      </li>
    </ul>
  </nav>

  <!-- User section at bottom -->
  <div class="sidebar-footer">
    <div class="user-info">
      <img src="/avatar.jpg" alt="" class="user-avatar">
      <div class="user-details">
        <span class="user-name">Jan Novák</span>
        <span class="user-role">Admin</span>
      </div>
    </div>
    <button class="btn-icon" aria-label="Odhlásit">🚪</button>
  </div>
</aside>

<!-- Mobile hamburger -->
<button class="mobile-menu-toggle" id="mobile-toggle" aria-label="Otevřít menu">
  ☰
</button>

<!-- Mobile overlay -->
<div class="sidebar-overlay" id="sidebar-overlay" hidden></div>

<!-- Main content -->
<main class="main-content">
  <!-- Page content -->
</main>
```

```css
/* Base sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background: #1f2937;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
  z-index: 100;
}

/* Collapsed state */
.sidebar[data-collapsed="true"] {
  width: 72px;
}

.sidebar[data-collapsed="true"] .nav-text,
.sidebar[data-collapsed="true"] .nav-badge,
.sidebar[data-collapsed="true"] .user-details,
.sidebar[data-collapsed="true"] .logo-full {
  display: none;
}

.sidebar[data-collapsed="true"] .logo-collapsed {
  display: block;
}

.logo-collapsed {
  display: none;
}

/* Toggle button */
.sidebar-toggle {
  position: absolute;
  right: -12px;
  top: 24px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3b82f6;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  z-index: 10;
}

.sidebar[data-collapsed="true"] .toggle-icon {
  transform: rotate(180deg);
}

/* Header */
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #374151;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #9ca3af;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.15s;
}

.nav-link:hover {
  background: #374151;
  color: white;
}

.nav-link.active {
  background: #3b82f6;
  color: white;
}

.nav-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  white-space: nowrap;
}

.nav-badge {
  background: #ef4444;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
}

.nav-divider {
  height: 1px;
  background: #374151;
  margin: 16px 0;
}

/* Footer */
.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.user-name {
  display: block;
  font-weight: 500;
  font-size: 14px;
}

.user-role {
  display: block;
  font-size: 12px;
  color: #9ca3af;
}

/* Main content offset */
.main-content {
  margin-left: 260px;
  transition: margin-left 0.2s ease;
}

.sidebar[data-collapsed="true"] ~ .main-content {
  margin-left: 72px;
}

/* Tooltips for collapsed state */
.sidebar[data-collapsed="true"] .nav-link {
  position: relative;
}

.sidebar[data-collapsed="true"] .nav-link::after {
  content: attr(data-tooltip);
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background: #1f2937;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 1000;
}

.sidebar[data-collapsed="true"] .nav-link:hover::after {
  opacity: 1;
}

/* Mobile styles */
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 99;
  width: 44px;
  height: 44px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-toggle {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-content {
    margin-left: 0;
  }
}
```

```javascript
// Sidebar collapse toggle
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('sidebar-toggle');

// Load saved preference
const savedCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
sidebar.dataset.collapsed = savedCollapsed;

toggleBtn.addEventListener('click', () => {
  const isCollapsed = sidebar.dataset.collapsed === 'true';
  sidebar.dataset.collapsed = !isCollapsed;
  localStorage.setItem('sidebar-collapsed', !isCollapsed);
});

// Add tooltips for collapsed state
document.querySelectorAll('.nav-link').forEach(link => {
  link.dataset.tooltip = link.querySelector('.nav-text').textContent;
});

// Mobile toggle
const mobileToggle = document.getElementById('mobile-toggle');
const overlay = document.getElementById('sidebar-overlay');

mobileToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.hidden = false;
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.hidden = true;
});

// Close on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    overlay.hidden = true;
  }
});

// Close on navigation (SPA)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('open');
      overlay.hidden = true;
    }
  });
});
```

**OČEKÁVANÝ DOPAD:** +20-35% navigation efficiency, +15% mobile engagement

**A/B TEST SETUP:**
- Baseline: Fixed sidebar only
- Variant: Collapsible + mobile overlay
- Metrika: Navigation clicks, mobile session duration
- Sample: Min 500 sessions per device type

**CHECKLIST:**
- [ ] Fixed na desktopu (expanded default)
- [ ] Collapsible s persist preference
- [ ] Tooltips v collapsed stavu
- [ ] Overlay na mobilu (hamburger)
- [ ] Backdrop pro zavření
- [ ] Escape key zavře overlay
- [ ] Active state jasně viditelný
- [ ] Smooth transitions (200-300ms)

---

## Practice #45: Tree/Multi-level Navigation

**PROBLÉM:** Komplexní aplikace mají 20-50+ navigačních položek. Flat list = chaos.

**ŘEŠENÍ:** Hierarchická navigace s expand/collapse a aktivní stav propagace.

**IMPLEMENTACE:**

### Pravidla pro hierarchii:
- Max 3 úrovně (parent → child → grandchild)
- Expand parent automaticky při aktivním child
- Vizuálně rozlišit úrovně (indent, font size)
- Remember expanded state

**KÓD:**

```html
<nav class="sidebar-nav" aria-label="Hlavní navigace">
  <ul class="nav-list">
    <!-- Simple item -->
    <li class="nav-item">
      <a href="/dashboard" class="nav-link">
        <span class="nav-icon">📊</span>
        <span class="nav-text">Dashboard</span>
      </a>
    </li>

    <!-- Parent with children -->
    <li class="nav-item has-children">
      <button class="nav-link nav-parent" aria-expanded="true">
        <span class="nav-icon">📦</span>
        <span class="nav-text">Objednávky</span>
        <span class="nav-arrow">▼</span>
      </button>
      <ul class="nav-children">
        <li class="nav-item">
          <a href="/orders" class="nav-link nav-child">
            Všechny objednávky
          </a>
        </li>
        <li class="nav-item">
          <a href="/orders/pending" class="nav-link nav-child active" aria-current="page">
            Čekající
            <span class="nav-badge">5</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="/orders/completed" class="nav-link nav-child">
            Dokončené
          </a>
        </li>
        <li class="nav-item">
          <a href="/orders/cancelled" class="nav-link nav-child">
            Zrušené
          </a>
        </li>
      </ul>
    </li>

    <!-- Parent with grandchildren (max 3 levels) -->
    <li class="nav-item has-children">
      <button class="nav-link nav-parent" aria-expanded="false">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">Nastavení</span>
        <span class="nav-arrow">▶</span>
      </button>
      <ul class="nav-children" hidden>
        <li class="nav-item">
          <a href="/settings/general" class="nav-link nav-child">
            Obecné
          </a>
        </li>
        <li class="nav-item has-children">
          <button class="nav-link nav-child nav-parent" aria-expanded="false">
            Integrace
            <span class="nav-arrow">▶</span>
          </button>
          <ul class="nav-grandchildren" hidden>
            <li class="nav-item">
              <a href="/settings/integrations/api" class="nav-link nav-grandchild">
                API
              </a>
            </li>
            <li class="nav-item">
              <a href="/settings/integrations/webhooks" class="nav-link nav-grandchild">
                Webhooks
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

```css
/* Parent items */
.nav-parent {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-arrow {
  margin-left: auto;
  font-size: 10px;
  transition: transform 0.2s;
}

.nav-parent[aria-expanded="true"] .nav-arrow {
  transform: rotate(180deg);
}

/* Children list */
.nav-children {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 36px; /* Indent */
}

.nav-children[hidden] {
  display: none;
}

/* Child items */
.nav-child {
  padding: 10px 16px;
  font-size: 14px;
  color: #9ca3af;
}

.nav-child.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

/* Grandchildren */
.nav-grandchildren {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 16px;
}

.nav-grandchild {
  padding: 8px 16px;
  font-size: 13px;
}

/* Parent has active child indicator */
.nav-parent.has-active-child {
  color: white;
}

.nav-parent.has-active-child::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #3b82f6;
}
```

```javascript
class TreeNavigation {
  constructor(nav) {
    this.nav = nav;
    this.storageKey = 'nav-expanded';
    this.init();
  }

  init() {
    // Restore expanded state
    this.restoreState();

    // Setup click handlers
    this.nav.querySelectorAll('.nav-parent').forEach(parent => {
      parent.addEventListener('click', (e) => this.toggle(parent));
    });

    // Auto-expand parent of active item
    this.expandActiveParents();

    // Mark parents with active children
    this.markActiveParents();
  }

  toggle(parent) {
    const isExpanded = parent.getAttribute('aria-expanded') === 'true';
    const children = parent.nextElementSibling;

    parent.setAttribute('aria-expanded', !isExpanded);
    children.hidden = isExpanded;

    this.saveState();
  }

  expandActiveParents() {
    const activeItem = this.nav.querySelector('.nav-link.active');
    if (!activeItem) return;

    // Walk up and expand all parent lists
    let parent = activeItem.closest('.nav-children, .nav-grandchildren');
    while (parent) {
      parent.hidden = false;
      const toggle = parent.previousElementSibling;
      if (toggle && toggle.classList.contains('nav-parent')) {
        toggle.setAttribute('aria-expanded', 'true');
      }
      parent = parent.parentElement.closest('.nav-children');
    }
  }

  markActiveParents() {
    this.nav.querySelectorAll('.nav-parent').forEach(parent => {
      const children = parent.nextElementSibling;
      if (children && children.querySelector('.active')) {
        parent.classList.add('has-active-child');
      }
    });
  }

  saveState() {
    const expanded = {};
    this.nav.querySelectorAll('.nav-parent').forEach((parent, index) => {
      expanded[index] = parent.getAttribute('aria-expanded') === 'true';
    });
    localStorage.setItem(this.storageKey, JSON.stringify(expanded));
  }

  restoreState() {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return;

    const expanded = JSON.parse(saved);
    this.nav.querySelectorAll('.nav-parent').forEach((parent, index) => {
      if (expanded[index] !== undefined) {
        parent.setAttribute('aria-expanded', expanded[index]);
        const children = parent.nextElementSibling;
        if (children) children.hidden = !expanded[index];
      }
    });
  }
}

// Initialize
new TreeNavigation(document.querySelector('.sidebar-nav'));
```

**OČEKÁVANÝ DOPAD:** +15-30% findability, -25% navigation time

**CHECKLIST:**
- [ ] Max 3 úrovně hierarchie
- [ ] aria-expanded na parent buttons
- [ ] Auto-expand při aktivním child
- [ ] Persist expanded state
- [ ] Vizuální indent pro úrovně
- [ ] Arrow indicator rotace
- [ ] Parent indicator když má aktivní child

---

## Practice #46: Sidebar Icons

**PROBLÉM:** Ikony bez kontextu jsou nejednoznačné. Jen text zabírá moc místa.

**ŘEŠENÍ:** Kombinuj ikony s textem, v collapsed stavu přidej tooltips.

**IMPLEMENTACE:**

### Pravidla pro ikony:
- Vždy icon + text (ne jen icon)
- Konzistentní styl (emoji, outline, filled)
- Tooltip v collapsed stavu
- 24px velikost pro touch targets

**KÓD:**

```html
<!-- Icon with text -->
<a href="/orders" class="nav-link" data-tooltip="Objednávky">
  <span class="nav-icon" aria-hidden="true">📦</span>
  <span class="nav-text">Objednávky</span>
</a>

<!-- Icon with badge -->
<a href="/notifications" class="nav-link" data-tooltip="Notifikace (5 nových)">
  <span class="nav-icon" aria-hidden="true">🔔</span>
  <span class="nav-text">Notifikace</span>
  <span class="nav-badge" aria-label="5 nových">5</span>
</a>
```

```css
/* Icon styling */
.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

/* For SVG/custom icons */
.nav-icon svg {
  width: 20px;
  height: 20px;
}

/* Tooltip for collapsed sidebar */
.sidebar[data-collapsed="true"] .nav-link {
  position: relative;
  justify-content: center;
  padding: 12px;
}

.sidebar[data-collapsed="true"] .nav-link::after {
  content: attr(data-tooltip);
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s, visibility 0.15s;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Arrow on tooltip */
.sidebar[data-collapsed="true"] .nav-link::before {
  content: '';
  position: absolute;
  left: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #1f2937;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s, visibility 0.15s;
}

.sidebar[data-collapsed="true"] .nav-link:hover::after,
.sidebar[data-collapsed="true"] .nav-link:hover::before,
.sidebar[data-collapsed="true"] .nav-link:focus::after,
.sidebar[data-collapsed="true"] .nav-link:focus::before {
  opacity: 1;
  visibility: visible;
}

/* Badge position in collapsed */
.sidebar[data-collapsed="true"] .nav-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  padding: 1px 4px;
  min-width: 16px;
}
```

**OČEKÁVANÝ DOPAD:** +25% icon recognition, -20% mis-clicks

**CHECKLIST:**
- [ ] Každá položka má icon + text
- [ ] Konzistentní icon styl
- [ ] 24px minimum touch target
- [ ] Tooltips v collapsed stavu
- [ ] Badge má aria-label
- [ ] Icons mají aria-hidden="true"

---

## Practice #47: Mobile Adaptation

**PROBLÉM:** Desktop sidebar nefunguje na mobilu - příliš široký, špatné touch targets.

**ŘEŠENÍ:** Dedicated mobile navigation pattern.

**IMPLEMENTACE:**

### Mobile patterns:
1. **Hamburger + overlay** - Most common
2. **Bottom navigation** - Pro 4-5 hlavních položek
3. **Tab bar + hamburger hybrid** - Kombinace obou

**KÓD:**

```html
<!-- Bottom navigation (alternative to hamburger) -->
<nav class="bottom-nav" aria-label="Hlavní navigace">
  <a href="/dashboard" class="bottom-nav-item active">
    <span class="nav-icon">📊</span>
    <span class="nav-label">Dashboard</span>
  </a>
  <a href="/orders" class="bottom-nav-item">
    <span class="nav-icon">📦</span>
    <span class="nav-label">Objednávky</span>
    <span class="nav-badge">5</span>
  </a>
  <a href="/products" class="bottom-nav-item">
    <span class="nav-icon">🏷️</span>
    <span class="nav-label">Produkty</span>
  </a>
  <a href="/customers" class="bottom-nav-item">
    <span class="nav-icon">👥</span>
    <span class="nav-label">Zákazníci</span>
  </a>
  <button class="bottom-nav-item" id="more-menu">
    <span class="nav-icon">☰</span>
    <span class="nav-label">Více</span>
  </button>
</nav>

<!-- "More" menu sheet -->
<div class="bottom-sheet" id="more-sheet" hidden>
  <div class="sheet-handle"></div>
  <nav class="sheet-nav">
    <a href="/reports" class="sheet-link">📈 Reporty</a>
    <a href="/settings" class="sheet-link">⚙️ Nastavení</a>
    <a href="/help" class="sheet-link">❓ Nápověda</a>
    <button class="sheet-link text-danger">🚪 Odhlásit</button>
  </nav>
</div>
```

```css
/* Bottom navigation */
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 8px 0;
  padding-bottom: env(safe-area-inset-bottom, 8px);
  z-index: 100;
}

@media (max-width: 768px) {
  .bottom-nav {
    display: flex;
    justify-content: space-around;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
    padding-bottom: 80px; /* Space for bottom nav */
  }
}

.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  color: #6b7280;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  min-width: 64px;
}

.bottom-nav-item.active {
  color: #3b82f6;
}

.bottom-nav-item .nav-icon {
  font-size: 24px;
}

.bottom-nav-item .nav-label {
  font-size: 11px;
  font-weight: 500;
}

.bottom-nav-item .nav-badge {
  position: absolute;
  top: 4px;
  right: 8px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 10px;
}

/* Bottom sheet */
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 200;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  padding-bottom: env(safe-area-inset-bottom, 16px);
}

.bottom-sheet:not([hidden]) {
  transform: translateY(0);
}

.sheet-handle {
  width: 40px;
  height: 4px;
  background: #d1d5db;
  border-radius: 2px;
  margin: 12px auto;
}

.sheet-nav {
  padding: 8px 16px 16px;
}

.sheet-link {
  display: block;
  width: 100%;
  padding: 16px;
  text-align: left;
  background: none;
  border: none;
  font-size: 16px;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
}

.sheet-link:hover {
  background: #f3f4f6;
}

/* Thumb zone optimization */
@media (max-width: 768px) {
  /* Primary actions in thumb zone (bottom 1/3) */
  .primary-actions {
    position: fixed;
    bottom: 80px; /* Above bottom nav */
    right: 16px;
  }

  /* FAB for primary action */
  .fab {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #3b82f6;
    color: white;
    border: none;
    font-size: 24px;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    cursor: pointer;
  }
}
```

```javascript
// Bottom sheet
const moreBtn = document.getElementById('more-menu');
const sheet = document.getElementById('more-sheet');

moreBtn.addEventListener('click', () => {
  sheet.hidden = !sheet.hidden;
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!sheet.hidden && !sheet.contains(e.target) && e.target !== moreBtn) {
    sheet.hidden = true;
  }
});

// Swipe down to close
let startY = 0;
sheet.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

sheet.addEventListener('touchmove', (e) => {
  const deltaY = e.touches[0].clientY - startY;
  if (deltaY > 50) {
    sheet.hidden = true;
  }
});
```

**OČEKÁVANÝ DOPAD:** +30-50% mobile navigation efficiency, +25% mobile conversion

**CHECKLIST:**
- [ ] Hamburger nebo bottom nav na mobilu
- [ ] Touch targets min 44x44px
- [ ] Safe area inset respektován
- [ ] Primary actions v thumb zone
- [ ] Swipe gestures pro zavření
- [ ] Landscape orientation handled

---

## Breadcrumbs Integration

**Doplněk k sidebar navigaci:**

```html
<!-- Breadcrumbs above content -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/orders">Objednávky</a></li>
    <li aria-current="page">Objednávka #12345</li>
  </ol>
</nav>
```

```css
.breadcrumbs {
  padding: 12px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs li:not(:last-child)::after {
  content: '/';
  margin: 0 8px;
  color: #9ca3af;
}

.breadcrumbs a {
  color: #6b7280;
  text-decoration: none;
}

.breadcrumbs a:hover {
  color: #3b82f6;
  text-decoration: underline;
}

.breadcrumbs [aria-current="page"] {
  color: #374151;
  font-weight: 500;
}
```

**CHECKLIST:**
- [ ] Breadcrumbs nad obsahem
- [ ] aria-current="page" na aktuální
- [ ] Klikatelné všechny kromě poslední
- [ ] Responsive (wrap na mobilu)

---

## Sources

- [NN/g: Navigation design](https://www.nngroup.com/articles/navigation-ia/)
- [UXPin: Sidebar Tutorial](https://www.uxpin.com/studio/blog/sidebar-tutorial/)
- [Navbar Gallery: Best Sidebar Examples](https://www.navbar.gallery/blog/best-side-bar-navigation-menu-design-examples)
- [UX StackExchange: Top menu vs Side menu](https://ux.stackexchange.com/questions/92606/top-menu-vs-side-menu-on-dashboard)
