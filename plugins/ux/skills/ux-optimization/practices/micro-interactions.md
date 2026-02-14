# Micro-Interactions & Feedback Practices

Micro-interactions, transitions, feedback, and state management. Small details that make the difference between an app that feels "meh" and one that feels polished and responsive.

---

## Practice #71: Meaningful Transitions (0.3-0.5s)

**PROBLEM:** UI elements appear/disappear instantly, causing user confusion. "Where did that go?" "What just changed?" Jarring state changes hurt perceived quality.

**RESENI:** Subtle animations help users understand what changed and where things went. But only when they serve a purpose.

**PRAVIDLA:**
- 0.3s for small elements (buttons, toggles, tooltips)
- 0.5s for large elements (modals, panels, page sections)
- Never >0.8s (feels sluggish)
- Easing: `ease-out` for entering (fast start, gentle stop), `ease-in` for leaving (gentle start, fast exit)
- Skip animation for repeated/bulk actions (loading 50 items)
- Respect `prefers-reduced-motion`

**IMPLEMENTACE:**

### Animation decision guide:

| Element | Duration | Easing | Trigger |
|---------|----------|--------|---------|
| Button hover/active | 0.15s | ease | hover/click |
| Tooltip show | 0.2s | ease-out | hover/focus |
| Dropdown open | 0.25s | ease-out | click |
| Modal enter | 0.3s | ease-out | trigger |
| Modal exit | 0.2s | ease-in | close |
| Page section expand | 0.4s | ease-out | click |
| Sidebar open/close | 0.3s | ease-in-out | toggle |
| Toast notification | 0.3s enter, 0.2s exit | ease-out/ease-in | event |

**KOD:**

```css
/* Transition design tokens */
:root {
  /* Durations */
  --duration-instant: 0.1s;
  --duration-fast: 0.15s;
  --duration-normal: 0.25s;
  --duration-moderate: 0.3s;
  --duration-slow: 0.5s;

  /* Easings */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Button transitions */
.btn {
  transition:
    background-color var(--duration-fast) var(--ease-in-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-in-out);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Modal transitions */
.modal-overlay {
  opacity: 0;
  transition: opacity var(--duration-moderate) var(--ease-out);
}

.modal-overlay.visible {
  opacity: 1;
}

.modal-content {
  transform: translateY(16px) scale(0.98);
  opacity: 0;
  transition:
    transform var(--duration-moderate) var(--ease-out),
    opacity var(--duration-moderate) var(--ease-out);
}

.modal-overlay.visible .modal-content {
  transform: translateY(0) scale(1);
  opacity: 1;
}

/* Closing uses ease-in (faster exit) */
.modal-overlay.closing {
  opacity: 0;
  transition: opacity 0.2s var(--ease-in);
}

.modal-overlay.closing .modal-content {
  transform: translateY(8px) scale(0.98);
  transition:
    transform 0.2s var(--ease-in),
    opacity 0.2s var(--ease-in);
}

/* Dropdown / accordion */
.dropdown-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height var(--duration-normal) var(--ease-out),
    opacity var(--duration-normal) var(--ease-out);
}

.dropdown-content.open {
  max-height: 500px; /* Adjust per content */
  opacity: 1;
}

/* Sidebar toggle */
.sidebar {
  width: 260px;
  transition: width var(--duration-moderate) var(--ease-in-out);
}

.sidebar.collapsed {
  width: 64px;
}

/* Fade enter for new list items */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.list-item-enter {
  animation: fadeSlideIn var(--duration-moderate) var(--ease-out) forwards;
}

/* Staggered list animation */
.list-item-enter:nth-child(1) { animation-delay: 0ms; }
.list-item-enter:nth-child(2) { animation-delay: 50ms; }
.list-item-enter:nth-child(3) { animation-delay: 100ms; }
.list-item-enter:nth-child(4) { animation-delay: 150ms; }
.list-item-enter:nth-child(5) { animation-delay: 200ms; }
```

**OCEKAVANY DOPAD:** +10-15% perceived quality, -20% user confusion on state changes

**CHECKLIST:**
- [ ] Transition tokens definovany v :root
- [ ] Vsechny interaktivni elementy maji transition
- [ ] prefers-reduced-motion respektovano
- [ ] Enter = ease-out, exit = ease-in
- [ ] Zadna animace >0.8s
- [ ] Bulk/repeated actions preskakuji animaci

---

## Practice #72: Action Feedback (Confirm Everything)

**PROBLEM:** Uzivatel klikne tlacitko a nic se nestane (vizualne). Nevedi jestli akce probehla. Klikne znovu. A znovu. Duplicitni requesty, frustrace.

**RESENI:** Kazda akce musi davat okamzity vizualni feedback. Button state change, toast, inline confirmation.

**PRAVIDLA:**
- Immediate (<100ms): button visual change on click
- Short (200-500ms): loading animation
- Completion: success toast or inline confirmation
- Nikdy nenechat uzivatele v nejistote jestli akce probehla
- Duplikovane kliknuti = disable button behem procesu

**IMPLEMENTACE:**

### 4 typy feedbacku:

| Typ | Kdy | Priklad |
|-----|-----|---------|
| **Button state** | Vzdy | Click -> loading -> success/error |
| **Toast** | Background actions | "Ulozeno", "Email odeslan" |
| **Inline** | Form fields | Green checkmark vedle pole |
| **Sound** | Kriticke akce (volitelne) | Subtle click/success sound |

**KOD:**

```html
<!-- Button with loading states -->
<button class="btn-primary btn-with-feedback" id="save-btn">
  <span class="btn-text">Ulozit</span>
  <span class="btn-loading" hidden>
    <svg class="spinner" width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"
              fill="none" stroke-dasharray="30" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate"
                          dur="0.8s" from="0 8 8" to="360 8 8" repeatCount="indefinite"/>
      </circle>
    </svg>
    Ukladam...
  </span>
  <span class="btn-success" hidden>
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2"
            fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Ulozeno!
  </span>
</button>

<!-- Toast notification container -->
<div class="toast-container" id="toast-container" aria-live="polite">
  <!-- Toasts are inserted here dynamically -->
</div>
```

```css
/* Button feedback states */
.btn-with-feedback {
  position: relative;
  min-width: 120px;
  transition: all 0.2s ease;
}

.btn-with-feedback .btn-text,
.btn-with-feedback .btn-loading,
.btn-with-feedback .btn-success {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-with-feedback.is-loading {
  opacity: 0.8;
  pointer-events: none;
}

.btn-with-feedback.is-success {
  background: #059669;
}

.btn-with-feedback.is-error {
  background: #dc2626;
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

/* Toast notifications */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  z-index: 1000;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  animation: toastEnter 0.3s ease-out forwards;
}

.toast.removing {
  animation: toastExit 0.2s ease-in forwards;
}

@keyframes toastEnter {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes toastExit {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
}

.toast-success {
  background: #059669;
  color: white;
}

.toast-error {
  background: #dc2626;
  color: white;
}

.toast-warning {
  background: #d97706;
  color: white;
}

.toast-info {
  background: #1f2937;
  color: white;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  padding: 4px;
  font-size: 16px;
}

.toast-close:hover {
  opacity: 1;
}
```

```javascript
// Button feedback controller
class ButtonFeedback {
  constructor(button) {
    this.button = button;
    this.textEl = button.querySelector('.btn-text');
    this.loadingEl = button.querySelector('.btn-loading');
    this.successEl = button.querySelector('.btn-success');
  }

  startLoading() {
    this.button.classList.add('is-loading');
    this.textEl.hidden = true;
    this.loadingEl.hidden = false;
    this.successEl.hidden = true;
    this.button.disabled = true;
  }

  showSuccess(duration = 2000) {
    this.button.classList.remove('is-loading');
    this.button.classList.add('is-success');
    this.textEl.hidden = true;
    this.loadingEl.hidden = true;
    this.successEl.hidden = false;

    setTimeout(() => this.reset(), duration);
  }

  showError() {
    this.button.classList.remove('is-loading');
    this.button.classList.add('is-error');
    this.textEl.hidden = false;
    this.loadingEl.hidden = true;
    this.successEl.hidden = true;
    this.button.disabled = false;

    setTimeout(() => {
      this.button.classList.remove('is-error');
    }, 500);
  }

  reset() {
    this.button.classList.remove('is-loading', 'is-success', 'is-error');
    this.textEl.hidden = false;
    this.loadingEl.hidden = true;
    this.successEl.hidden = true;
    this.button.disabled = false;
  }
}

// Toast notification system
class ToastManager {
  constructor(containerId = 'toast-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      this.container.className = 'toast-container';
      this.container.setAttribute('aria-live', 'polite');
      document.body.appendChild(this.container);
    }
  }

  show(message, type = 'info', duration = 4000) {
    const icons = {
      success: '\u2713',
      error: '\u2717',
      warning: '\u26A0',
      info: '\u2139'
    };

    // Build toast using safe DOM methods
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    const iconSpan = document.createElement('span');
    iconSpan.className = 'toast-icon';
    iconSpan.textContent = icons[type] || icons.info;

    const msgSpan = document.createElement('span');
    msgSpan.className = 'toast-message';
    msgSpan.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', 'Zavrit');
    closeBtn.textContent = '\u00D7';
    closeBtn.addEventListener('click', () => this.dismiss(toast));

    toast.appendChild(iconSpan);
    toast.appendChild(msgSpan);
    toast.appendChild(closeBtn);

    this.container.appendChild(toast);

    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast), duration);
    }

    return toast;
  }

  dismiss(toast) {
    if (!toast || toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 200);
  }

  success(message, duration) { return this.show(message, 'success', duration); }
  error(message, duration) { return this.show(message, 'error', duration); }
  warning(message, duration) { return this.show(message, 'warning', duration); }
  info(message, duration) { return this.show(message, 'info', duration); }
}

// Usage example
const toast = new ToastManager();
const saveBtn = new ButtonFeedback(document.getElementById('save-btn'));

document.getElementById('save-btn').addEventListener('click', async () => {
  saveBtn.startLoading();

  try {
    await fetch('/api/save', { method: 'POST' });
    saveBtn.showSuccess();
    toast.success('Zmeny ulozeny');
  } catch (error) {
    saveBtn.showError();
    toast.error('Ulozeni selhalo. Zkuste to znovu.');
  }
});
```

**OCEKAVANY DOPAD:** +15-25% task confidence, -30% repeated/duplicate clicks

**A/B TEST SETUP:**
- Baseline: Button bez loading state, no toast
- Variant: Full feedback (button states + toasts)
- Metrika: Duplicate clicks, task completion confidence (survey)
- Sample: Track over 2 tydny

**CHECKLIST:**
- [ ] Kazde tlacitko ma loading state
- [ ] Disabled behem zpracovani (no double-click)
- [ ] Success feedback po dokonceni
- [ ] Error feedback s jasnou zpravou
- [ ] Toast system pro background akce
- [ ] aria-live na toast container pro accessibility

---

## Practice #73: Undo Over Confirm (Forgiving Actions)

**PROBLEM:** "Opravdu chcete smazat?" dialogy jsou friction. Uzivatel klikne "Ano" mechanicky bez cteni. A kdyz udela chybu, nema se jak vratit.

**RESENI:** Misto potvrzovacich dialogu pouzij undo pattern. Proved akci okamzite a dej moznost ji vratit.

**PRAVIDLA:**
- "Email smazan. ZPET" > "Opravdu chcete smazat tento email?"
- Confirm dialog = friction, zpomaluje workflow
- Undo = svoboda, uzivatel se neboji experimentovat
- Undo timeout: 5-10 sekund (s vizualnim countdownem)
- Pro KRITICKE akce (smazani uctu, platba) porad pouzij confirm dialog

**IMPLEMENTACE:**

### Kdy undo vs. kdy confirm:

| Akce | Pattern | Duvod |
|------|---------|-------|
| Archivovat email | Undo | Casty, low-risk |
| Smazat polozku | Undo + soft delete | Casty, obnovitelne |
| Odeslat email | Undo (5s delay) | Gmail pattern |
| Zmenit status | Undo | Casty, reversible |
| Smazat ucet | Confirm | Kriticke, nevratne |
| Platba | Confirm | Financni, nevratne |
| Publikovat clanek | Confirm | Verejne, high-impact |

**Viz take:** `crud-operations.md` Practice #41 pro detailni delete patterns s undo. Toto je UX princip, ktery stoji za tim.

**KOD:**

```html
<!-- Undo toast component -->
<div class="undo-toast" id="undo-toast" role="alert" hidden>
  <div class="undo-toast-content">
    <span class="undo-toast-icon">&#128465;</span>
    <span class="undo-toast-message" id="undo-message">Polozka smazana</span>
  </div>

  <button class="undo-toast-action" id="undo-action">
    Zpet
  </button>

  <div class="undo-toast-timer">
    <div class="undo-toast-timer-fill" id="undo-timer"></div>
  </div>
</div>
```

```css
/* Undo toast */
.undo-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: #1f2937;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 300px;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.undo-toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  font-size: 14px;
}

.undo-toast-action {
  background: none;
  border: none;
  color: #60a5fa;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.undo-toast-action:hover {
  background: rgba(96, 165, 250, 0.15);
}

/* Timer bar */
.undo-toast-timer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.undo-toast-timer-fill {
  height: 100%;
  background: #60a5fa;
  width: 100%;
  animation: timerShrink var(--undo-duration, 5s) linear forwards;
}

@keyframes timerShrink {
  from { width: 100%; }
  to { width: 0%; }
}
```

```javascript
// Reusable undo system
class UndoManager {
  constructor() {
    this.toast = document.getElementById('undo-toast');
    this.messageEl = document.getElementById('undo-message');
    this.actionBtn = document.getElementById('undo-action');
    this.timerEl = document.getElementById('undo-timer');
    this.timeout = null;
    this.currentAction = null;
  }

  /**
   * Execute an action with undo capability
   * @param {Object} options
   * @param {Function} options.execute - Run the action
   * @param {Function} options.undo - Reverse the action
   * @param {string} options.message - Toast message
   * @param {number} options.duration - Undo window in ms (default 5000)
   */
  perform({ execute, undo, message, duration = 5000 }) {
    // Cancel any pending action
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.finalizePrevious();
    }

    // Execute the action immediately (optimistic)
    execute();

    // Store undo function
    this.currentAction = { undo, finalize: null };

    // Show toast
    this.messageEl.textContent = message;
    this.toast.hidden = false;
    this.toast.style.setProperty('--undo-duration', duration + 'ms');

    // Reset timer animation
    this.timerEl.style.animation = 'none';
    this.timerEl.offsetHeight; // Force reflow
    this.timerEl.style.animation =
      'timerShrink ' + duration + 'ms linear forwards';

    // Setup undo button
    this.actionBtn.onclick = () => {
      clearTimeout(this.timeout);
      this.currentAction.undo();
      this.currentAction = null;
      this.hideToast();
    };

    // Auto-finalize after timeout
    this.timeout = setTimeout(() => {
      this.hideToast();
      this.currentAction = null;
    }, duration);
  }

  finalizePrevious() {
    // If there was a pending action, let it complete
    this.currentAction = null;
  }

  hideToast() {
    this.toast.hidden = true;
  }
}

// Usage examples
const undoManager = new UndoManager();

// Example: Archive email
function archiveEmail(emailId) {
  const row = document.querySelector('[data-id="' + emailId + '"]');
  const originalDisplay = row.style.display;

  undoManager.perform({
    execute: () => {
      row.style.display = 'none';
      fetch('/api/emails/' + emailId + '/archive', { method: 'POST' });
    },
    undo: () => {
      row.style.display = originalDisplay;
      fetch('/api/emails/' + emailId + '/unarchive', { method: 'POST' });
    },
    message: 'Email archivovan',
    duration: 5000
  });
}

// Example: Delete with undo
function deleteItem(itemId, itemName) {
  const row = document.querySelector('[data-id="' + itemId + '"]');
  const parent = row.parentNode;
  const nextSibling = row.nextSibling;

  undoManager.perform({
    execute: () => {
      row.remove();
      fetch('/api/items/' + itemId, { method: 'DELETE' });
    },
    undo: () => {
      parent.insertBefore(row, nextSibling);
      fetch('/api/items/' + itemId + '/restore', { method: 'POST' });
    },
    message: '"' + itemName + '" smazano',
    duration: 8000
  });
}

// Example: Send email with undo (Gmail pattern)
function sendEmail(emailData) {
  let sent = false;

  undoManager.perform({
    execute: () => {
      // Don't actually send yet - wait for undo window
      showComposeSuccess();
    },
    undo: () => {
      // Reopen compose with the email data
      openCompose(emailData);
    },
    message: 'Email odeslan',
    duration: 5000
  });

  // Actually send after undo window expires
  setTimeout(() => {
    if (!sent) {
      fetch('/api/emails/send', {
        method: 'POST',
        body: JSON.stringify(emailData)
      });
      sent = true;
    }
  }, 5100);
}
```

**OCEKAVANY DOPAD:** +20-30% action speed, -50% decision fatigue

**CHECKLIST:**
- [ ] Low-risk akce pouzivaji undo misto confirm
- [ ] Undo toast s vizualnim timerem (countdown)
- [ ] Timeout 5-10 sekund
- [ ] Kriticke akce stale pouzivaji confirm dialog
- [ ] Undo revertuje UI i API
- [ ] aria-role="alert" na toast

---

## Practice #74: Showing State (Visual Status)

**PROBLEM:** Polozky v seznamu nemaji vizualni indikator stavu. Read/unread, paid/unpaid, active/inactive - vse vypada stejne. Uzivatel musi klikat do detailu.

**RESENI:** Kazda polozka se stavem musi tento stav ukazovat vizualne (barvou, ikonou, badge).

**PRAVIDLA:**
- Konzistentni barvy v cele aplikaci:
  - Green = success, active, paid, completed
  - Yellow/orange = warning, pending, draft
  - Red = error, overdue, failed, inactive
  - Blue = info, in progress, new
  - Gray = neutral, archived, disabled
- Stav = badge + barva + (volitelne) ikona
- Stav musi byt citelny bez barev (accessibility - tvar/text)
- Jeden radek = max 1-2 stavove indikatory

**IMPLEMENTACE:**

### Status system:

| Stav | Barva | Badge text | Priklad |
|------|-------|------------|---------|
| Active | Green | Aktivni | Ucet, predplatne |
| Inactive | Gray | Neaktivni | Ucet, predplatne |
| Pending | Yellow | Cekajici | Objednavka, platba |
| Completed | Green | Dokonceno | Ukol, objednavka |
| Failed | Red | Selhalo | Platba, import |
| Draft | Yellow | Koncept | Clanek, email |
| Published | Green | Publikovano | Clanek |
| Overdue | Red | Po splatnosti | Faktura |
| New/Unread | Blue dot | - | Zprava, notifikace |

**KOD:**

```html
<!-- Status badge system -->
<span class="status-badge status-active">Aktivni</span>
<span class="status-badge status-inactive">Neaktivni</span>
<span class="status-badge status-pending">Cekajici</span>
<span class="status-badge status-completed">Dokonceno</span>
<span class="status-badge status-failed">Selhalo</span>
<span class="status-badge status-draft">Koncept</span>
<span class="status-badge status-published">Publikovano</span>
<span class="status-badge status-overdue">Po splatnosti</span>

<!-- Status dot (minimal - for lists) -->
<span class="status-dot status-dot-active" title="Aktivni"></span>
<span class="status-dot status-dot-inactive" title="Neaktivni"></span>
<span class="status-dot status-dot-unread" title="Neprecteno"></span>

<!-- In context: Table row with status -->
<tr>
  <td>
    <span class="status-dot status-dot-unread"></span>
    Objednavka #1234
  </td>
  <td>Jan Novak</td>
  <td>12 500 Kc</td>
  <td><span class="status-badge status-pending">Cekajici na platbu</span></td>
</tr>

<!-- In context: Card with status -->
<div class="card">
  <div class="card-header">
    <h3>Kampan: Letni akce</h3>
    <span class="status-badge status-active">Aktivni</span>
  </div>
  <div class="card-body">
    <p>Probihajici kampan s 2 500 oslovenymi.</p>
  </div>
</div>

<!-- In context: List with unread indicator -->
<div class="message-item unread">
  <span class="unread-indicator"></span>
  <div class="message-content">
    <strong>Novy pozadavek od zakaznika</strong>
    <p>Dobre den, chtel bych se zeptat na...</p>
  </div>
  <span class="message-time">pred 5 min</span>
</div>
```

```css
/* Status badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
}

/* Semantic status colors */
.status-active,
.status-completed,
.status-published {
  background: #d1fae5;
  color: #065f46;
}

.status-inactive,
.status-archived {
  background: #f3f4f6;
  color: #4b5563;
}

.status-pending,
.status-draft {
  background: #fef3c7;
  color: #92400e;
}

.status-failed,
.status-overdue {
  background: #fee2e2;
  color: #991b1b;
}

.status-info,
.status-in-progress {
  background: #dbeafe;
  color: #1e40af;
}

/* Status dot (minimal indicator) */
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot-active { background: #059669; }
.status-dot-inactive { background: #9ca3af; }
.status-dot-pending { background: #d97706; }
.status-dot-failed { background: #dc2626; }
.status-dot-unread { background: #3b82f6; }

/* Unread message indicator */
.message-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: background 0.15s;
}

.message-item:hover {
  background: #f9fafb;
}

.message-item.unread {
  background: #eff6ff;
}

.message-item.unread .message-content strong {
  color: #1f2937;
}

.unread-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3b82f6;
  margin-top: 6px;
  flex-shrink: 0;
}

/* Read state */
.message-item:not(.unread) .unread-indicator {
  visibility: hidden;
}

.message-item:not(.unread) .message-content strong {
  font-weight: 400;
  color: #6b7280;
}

/* Status transition animation */
.status-badge {
  transition: all 0.2s ease;
}

.status-badge.changing {
  transform: scale(1.1);
}
```

```javascript
// Status badge helper
function createStatusBadge(status) {
  const statusMap = {
    active:    { text: 'Aktivni', cssClass: 'status-active' },
    inactive:  { text: 'Neaktivni', cssClass: 'status-inactive' },
    pending:   { text: 'Cekajici', cssClass: 'status-pending' },
    completed: { text: 'Dokonceno', cssClass: 'status-completed' },
    failed:    { text: 'Selhalo', cssClass: 'status-failed' },
    draft:     { text: 'Koncept', cssClass: 'status-draft' },
    published: { text: 'Publikovano', cssClass: 'status-published' },
    overdue:   { text: 'Po splatnosti', cssClass: 'status-overdue' }
  };

  const config = statusMap[status] || { text: status, cssClass: 'status-inactive' };

  const badge = document.createElement('span');
  badge.className = 'status-badge ' + config.cssClass;
  badge.textContent = config.text;

  return badge;
}

// Animate status change
function updateStatus(element, newStatus) {
  const badge = element.querySelector('.status-badge');

  // Animate out
  badge.classList.add('changing');

  setTimeout(() => {
    // Replace badge
    const newBadge = createStatusBadge(newStatus);
    newBadge.classList.add('changing');
    badge.replaceWith(newBadge);

    // Animate in
    setTimeout(() => newBadge.classList.remove('changing'), 200);
  }, 150);
}
```

**OCEKAVANY DOPAD:** +25-35% scan speed, -40% support tickets related to status questions

**CHECKLIST:**
- [ ] Kazda polozka se stavem ma vizualni indikator
- [ ] Konzistentni barvy v cele app (green=good, red=bad, yellow=pending)
- [ ] Stav je citelny i bez barev (text label, ne jen barva)
- [ ] Status badge system pouziva shodnou komponentu vsude
- [ ] Unread/new indikator pro zpravy/notifikace
- [ ] Animace pri zmene stavu
- [ ] Max 1-2 stavove indikatory na radek

---

## Practice #75: Scroll Continuity (Avoid False Bottoms)

**PROBLEM:** Uzivatel scrolluje a zastavi, protoze to vypada jako konec stranky. Dalsi obsah existuje, ale neni videt ze pokracuje. "False bottom" = ztraceny engagement.

**RESENI:** Vizualni naznaky ze obsah pokracuje. Fade-out na spodku, castecne viditelna dalsi sekce, scroll indikatory.

**PRAVIDLA:**
- Vzdy ukazat castecny obsah dalsi sekce (min 50px viditelnych)
- Fade-out hint na spodku overflowed containeru
- Pro dlouhe stranky: repeat CTA na konci (GoodUI #5)
- Scroll indicator pro horizontalni scroll (tabulky, galerie)
- Nikdy nekonci sekci s velkym prazdnym prostorem

**IMPLEMENTACE:**

### 3 techniky:

| Technika | Kdy | Priklad |
|----------|-----|---------|
| **Partial peek** | Dalsi sekce existuje | Ukazat 50px dalsi sekce |
| **Fade hint** | Overflowed container | Fade-out na spodku seznamu |
| **Scroll indicator** | Horizontalni scroll | Sipky nebo fade na stranach |

**KOD:**

```html
<!-- Fade hint on scrollable container -->
<div class="scroll-container" id="scrollable-list">
  <div class="scroll-content">
    <div class="list-item">Polozka 1</div>
    <div class="list-item">Polozka 2</div>
    <div class="list-item">Polozka 3</div>
    <div class="list-item">Polozka 4</div>
    <div class="list-item">Polozka 5</div>
    <div class="list-item">Polozka 6</div>
    <div class="list-item">Polozka 7</div>
    <div class="list-item">Polozka 8</div>
  </div>
</div>

<!-- Horizontal scroll with indicators -->
<div class="horizontal-scroll-wrapper">
  <button class="scroll-arrow scroll-arrow-left" hidden aria-label="Scroll left">
    &#8249;
  </button>

  <div class="horizontal-scroll" id="horizontal-list">
    <div class="scroll-card">Card 1</div>
    <div class="scroll-card">Card 2</div>
    <div class="scroll-card">Card 3</div>
    <div class="scroll-card">Card 4</div>
    <div class="scroll-card">Card 5</div>
    <div class="scroll-card">Card 6</div>
  </div>

  <button class="scroll-arrow scroll-arrow-right" aria-label="Scroll right">
    &#8250;
  </button>
</div>

<!-- Repeated CTA at bottom of long page -->
<section class="content-section">
  <!-- Long content here... -->
</section>

<section class="bottom-cta" id="bottom-cta">
  <h2>Pripraveni zacit?</h2>
  <p>Vyzkousejte zdarma na 14 dni. Bez kreditni karty.</p>
  <button class="btn-primary btn-lg">Zacit zdarma</button>
</section>
```

```css
/* Vertical scroll fade hint */
.scroll-container {
  position: relative;
  max-height: 300px;
  overflow-y: auto;
}

/* Fade at bottom when more content exists */
.scroll-container::after {
  content: '';
  position: sticky;
  bottom: 0;
  display: block;
  height: 48px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.9) 70%,
    rgba(255, 255, 255, 1) 100%
  );
  pointer-events: none;
  margin-top: -48px;
}

/* Hide fade when scrolled to bottom */
.scroll-container.at-bottom::after {
  opacity: 0;
  transition: opacity 0.2s;
}

/* Horizontal scroll wrapper */
.horizontal-scroll-wrapper {
  position: relative;
}

.horizontal-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  padding: 4px 0;
}

.horizontal-scroll::-webkit-scrollbar {
  display: none;
}

.scroll-card {
  flex: 0 0 280px;
  scroll-snap-align: start;
  padding: 24px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* Horizontal fade hints */
.horizontal-scroll-wrapper::before,
.horizontal-scroll-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  z-index: 1;
  pointer-events: none;
}

.horizontal-scroll-wrapper::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
  opacity: 0;
  transition: opacity 0.2s;
}

.horizontal-scroll-wrapper::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}

.horizontal-scroll-wrapper.scrolled-start::before {
  opacity: 1;
}

.horizontal-scroll-wrapper.scrolled-end::after {
  opacity: 0;
}

/* Scroll arrows */
.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.scroll-arrow:hover {
  background: #f9fafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.scroll-arrow-left { left: -18px; }
.scroll-arrow-right { right: -18px; }

/* Bottom CTA (repeated) */
.bottom-cta {
  text-align: center;
  padding: 64px 24px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.bottom-cta h2 {
  font-size: 28px;
  margin: 0 0 8px;
}

.bottom-cta p {
  color: #6b7280;
  margin: 0 0 24px;
}
```

```javascript
// Vertical scroll: detect bottom and hide fade
function initScrollFade(container) {
  container.addEventListener('scroll', () => {
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 10;

    container.classList.toggle('at-bottom', isAtBottom);
  });
}

// Horizontal scroll: arrows + fade indicators
function initHorizontalScroll(wrapper) {
  const scrollEl = wrapper.querySelector('.horizontal-scroll');
  const leftArrow = wrapper.querySelector('.scroll-arrow-left');
  const rightArrow = wrapper.querySelector('.scroll-arrow-right');

  function updateIndicators() {
    const isStart = scrollEl.scrollLeft < 10;
    const isEnd =
      scrollEl.scrollWidth - scrollEl.scrollLeft - scrollEl.clientWidth < 10;

    wrapper.classList.toggle('scrolled-start', !isStart);
    wrapper.classList.toggle('scrolled-end', isEnd);

    if (leftArrow) leftArrow.hidden = isStart;
    if (rightArrow) rightArrow.hidden = isEnd;
  }

  scrollEl.addEventListener('scroll', updateIndicators);
  window.addEventListener('resize', updateIndicators);
  updateIndicators(); // Initial check

  // Arrow click handlers
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      scrollEl.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      scrollEl.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

// Bottom CTA: Show with intersection observer
function initBottomCTA() {
  const bottomCTA = document.getElementById('bottom-cta');
  if (!bottomCTA) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bottomCTA.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(bottomCTA);
}

// Init all scroll enhancements
document.querySelectorAll('.scroll-container').forEach(initScrollFade);
document.querySelectorAll('.horizontal-scroll-wrapper').forEach(initHorizontalScroll);
initBottomCTA();
```

**OCEKAVANY DOPAD:** +15-20% scroll depth, +10-15% CTA clicks from repeated bottom CTA

**CHECKLIST:**
- [ ] Fade hint na scrollovatelnych containerech
- [ ] Fade zmizi kdyz uzivatel doscrlluje na konec
- [ ] Horizontalni scroll ma sipky a fade indikatory
- [ ] CTA zopakovano na konci dlouhe stranky
- [ ] Zadny false bottom (vzdy castecne videt dalsi sekci)
- [ ] scroll-snap pro horizontalni scroll na mobile
- [ ] Testovano na ruznych vyskach viewportu

---

## Summary

**5 Micro-Interaction Practices:**
1. **Meaningful transitions** (+10-15% quality) - 0.3-0.5s, ease-out enter, ease-in exit
2. **Action feedback** (+15-25% confidence) - Button states + toast system, never leave user guessing
3. **Undo over confirm** (+20-30% speed) - Freedom > friction, undo toast with timer
4. **Showing state** (+25-35% scan speed) - Consistent status badges, semantic colors
5. **Scroll continuity** (+15-20% depth) - Fade hints, no false bottoms, repeated CTAs

**Total potential:** +85-125% improvement in perceived quality and efficiency

**Priority order (ICE):**
1. Action feedback (high impact, high ease - just add button states + toasts)
2. Showing state (high impact, medium ease - design system needed)
3. Undo over confirm (high impact, medium ease - needs undo infrastructure)
4. Scroll continuity (medium impact, high ease - CSS only for basics)
5. Meaningful transitions (medium impact, high ease - CSS design tokens)

**See also:**
- `crud-operations.md` Practice #41 - Delete patterns with undo
- `crud-operations.md` Practice #43 - Optimistic UI (related to action feedback)
- `design.md` Practice #13 - CTA button design
- `empty-and-first-use.md` Practice #70 - Expectation setting (related to scroll continuity)

**Next:** See practices/accessibility.md for accessibility requirements across all these patterns
