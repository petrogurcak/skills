# CRUD Operations Optimization Practices

Based on research from Medium UX articles, Jacob Paris optimistic UI guidelines, and enterprise application case studies.

**Core principle:** CRUD (Create, Read, Update, Delete) je základ každého admin panelu. Špatný CRUD UX = ztráta dat, frustrace, nízká adopce.

**Alternative model:** CRAP (Create, Revise, Archive, Purge) - non-destructive approach preferující soft delete.

---

## Practice #39: Create Patterns

**PROBLÉM:** Uživatelé neví jak vytvořit nový záznam, nebo se bojí začít kvůli komplexnímu formuláři.

**ŘEŠENÍ:** Vyber správný create pattern podle frekvence použití a komplexity dat.

**IMPLEMENTACE:**

### Tři hlavní patterns:

| Pattern | Kdy použít | Popis |
|---------|------------|-------|
| **Form-first** | Komplexní data, validace | Sbírej data před vytvořením |
| **Create-first** | Časté vytváření, jednoduché | Vytvoř okamžitě, edituj inline |
| **Draft** | Důležitá data, dlouhé formuláře | Ukládej průběžně, publikuj až hotovo |

### 1. Form-first pattern
- Modál nebo full page s formulářem
- Validace při submit
- Vhodné pro: Uživatelské účty, objednávky, komplexní entity

### 2. Create-first pattern
- "Add item" vytvoří prázdný záznam okamžitě
- Uživatel edituje inline
- Vhodné pro: Todo items, poznámky, rychlé záznamy

### 3. Draft pattern
- Data se ukládají průběžně (auto-save)
- Status: Draft → Published
- Vhodné pro: Články, dokumenty, důležité záznamy

**KÓD:**

```html
<!-- CTA placement - vždy viditelné -->
<div class="page-header">
  <h1>Produkty</h1>
  <button class="btn-primary" id="create-product">
    + Přidat produkt
  </button>
</div>

<!-- Form-first: Modal approach -->
<dialog id="create-modal" class="modal">
  <form id="create-form" class="modal-form">
    <div class="modal-header">
      <h2>Nový produkt</h2>
      <button type="button" class="btn-close" aria-label="Zavřít">×</button>
    </div>

    <div class="modal-body">
      <div class="form-group">
        <label for="product-name">Název produktu *</label>
        <input
          type="text"
          id="product-name"
          name="name"
          required
          autofocus
        >
      </div>

      <div class="form-group">
        <label for="product-price">Cena *</label>
        <input
          type="number"
          id="product-price"
          name="price"
          min="0"
          step="0.01"
          required
        >
      </div>

      <div class="form-group">
        <label for="product-category">Kategorie</label>
        <select id="product-category" name="category">
          <option value="">Vyberte kategorii</option>
          <option value="electronics">Elektronika</option>
          <option value="clothing">Oblečení</option>
        </select>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn-secondary" data-close>
        Zrušit
      </button>
      <button type="submit" class="btn-primary">
        Vytvořit produkt
      </button>
    </div>
  </form>
</dialog>

<!-- Create-first: Inline approach -->
<table class="data-table">
  <tbody id="items-list">
    <tr class="item-row">
      <td>
        <input type="text" class="inline-input" value="Existující položka">
      </td>
      <td class="actions">
        <button class="btn-icon">✏️</button>
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">
        <button class="btn-ghost add-inline" id="add-inline">
          + Přidat položku
        </button>
      </td>
    </tr>
  </tfoot>
</table>

<!-- Draft pattern: Status indicator -->
<div class="editor-header">
  <input type="text" class="title-input" placeholder="Název dokumentu">
  <div class="draft-status">
    <span class="status-badge status-draft">Koncept</span>
    <span class="last-saved">Uloženo před 2 min</span>
  </div>
  <div class="editor-actions">
    <button class="btn-secondary">Uložit koncept</button>
    <button class="btn-primary">Publikovat</button>
  </div>
</div>
```

```css
/* Page header with CTA */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

/* Modal form */
.modal {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  width: 90%;
}

.modal::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

/* Form groups */
.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Inline add */
.add-inline {
  width: 100%;
  padding: 12px;
  text-align: left;
  color: #6b7280;
}

.add-inline:hover {
  background: #f3f4f6;
  color: #3b82f6;
}

.inline-input {
  border: none;
  background: transparent;
  width: 100%;
  padding: 8px 0;
}

.inline-input:focus {
  outline: none;
  border-bottom: 2px solid #3b82f6;
}

/* Draft status */
.editor-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.title-input {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  border: none;
  padding: 8px 0;
}

.draft-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-draft {
  background: #fef3c7;
  color: #92400e;
}

.status-published {
  background: #d1fae5;
  color: #065f46;
}

.last-saved {
  font-size: 12px;
  color: #6b7280;
}
```

```javascript
// Modal open/close
const createBtn = document.getElementById('create-product');
const modal = document.getElementById('create-modal');

createBtn.addEventListener('click', () => {
  modal.showModal();
});

modal.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => modal.close());
});

// Form submission
document.getElementById('create-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    // Show loading state
    const submitBtn = e.target.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Vytvářím...';

    // API call
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      modal.close();
      // Refresh list or add to DOM
      location.reload(); // Or better: add row to table
    }
  } catch (error) {
    console.error('Create failed:', error);
  }
});

// Create-first: Inline add
document.getElementById('add-inline').addEventListener('click', () => {
  const tbody = document.getElementById('items-list');
  const newRow = document.createElement('tr');
  newRow.className = 'item-row new-item';
  newRow.innerHTML = `
    <td>
      <input type="text" class="inline-input" placeholder="Nová položka" autofocus>
    </td>
    <td class="actions">
      <button class="btn-icon save-inline">💾</button>
      <button class="btn-icon cancel-inline">✕</button>
    </td>
  `;
  tbody.appendChild(newRow);
  newRow.querySelector('input').focus();
});

// Draft: Auto-save
let saveTimeout;
document.querySelector('.title-input').addEventListener('input', () => {
  clearTimeout(saveTimeout);
  document.querySelector('.last-saved').textContent = 'Ukládám...';

  saveTimeout = setTimeout(async () => {
    // Save to API
    await saveDraft();
    document.querySelector('.last-saved').textContent = 'Uloženo právě teď';
  }, 1000);
});
```

**OČEKÁVANÝ DOPAD:** +10-25% create completion rate

**A/B TEST SETUP:**
- Baseline: Aktuální create flow
- Variant: Optimalizovaný pattern dle use case
- Metrika: Create completion rate, time to create
- Sample: Min 100 creates per variant

**CHECKLIST:**
- [ ] CTA "Add [entity]" viditelné (page header)
- [ ] Pattern odpovídá use case (form/create/draft)
- [ ] Modal má jasné Close a Cancel
- [ ] Autofocus na první pole
- [ ] Loading state na submit button
- [ ] Error handling s jasnou zprávou

---

## Practice #40: Update/Edit Patterns

**PROBLÉM:** Uživatelé ztrácejí data při editaci (nechtěné zavření, timeout session, crash).

**ŘEŠENÍ:** Implementuj správný edit pattern s ochranou dat.

**IMPLEMENTACE:**

### Patterns podle impact:

| Impact | Pattern | Příklad |
|--------|---------|---------|
| **Low** | Auto-save | Poznámky, drafty |
| **Medium** | Save button + unsaved warning | Profil, nastavení |
| **High** | Review + confirm | Platby, smazání, publikace |

### 1. Auto-save (low impact)
- Ukládej při každé změně (debounce 1s)
- Ukazuj "Saved" / "Saving..." status
- Žádný explicit save button

### 2. Manual save (medium impact)
- Save button (disabled když no changes)
- Unsaved changes warning při odchodu
- Cancel = revert changes

### 3. Modal edit (dead-end navigation)
- Uživatel nemůže jít jinam než Save/Cancel
- Vhodné pro quick edits
- Nevhodné pro komplexní formuláře

**KÓD:**

```html
<!-- Inline edit trigger -->
<tr data-id="123">
  <td class="editable" data-field="name">
    <span class="display-value">Jan Novák</span>
    <input type="text" class="edit-input" value="Jan Novák" hidden>
  </td>
  <td class="actions">
    <button class="btn-icon edit-trigger" title="Upravit">✏️</button>
  </td>
</tr>

<!-- Edit modal -->
<dialog id="edit-modal" class="modal">
  <form id="edit-form" class="modal-form">
    <div class="modal-header">
      <h2>Upravit produkt</h2>
      <button type="button" class="btn-close" aria-label="Zavřít">×</button>
    </div>

    <div class="modal-body">
      <!-- Form fields -->
    </div>

    <div class="modal-footer">
      <span class="unsaved-indicator" hidden>
        Neuložené změny
      </span>
      <button type="button" class="btn-secondary" data-close>
        Zrušit
      </button>
      <button type="submit" class="btn-primary" disabled>
        Uložit změny
      </button>
    </div>
  </form>
</dialog>

<!-- Full page edit with unsaved warning -->
<form id="settings-form" class="settings-form">
  <div class="form-header">
    <h1>Nastavení účtu</h1>
    <div class="form-status">
      <span class="status-saved" id="save-status">Všechny změny uloženy</span>
    </div>
  </div>

  <div class="form-content">
    <!-- Form fields -->
  </div>

  <div class="form-footer sticky-footer">
    <button type="button" class="btn-secondary" id="discard-changes" disabled>
      Zahodit změny
    </button>
    <button type="submit" class="btn-primary" id="save-changes" disabled>
      Uložit změny
    </button>
  </div>
</form>
```

```css
/* Inline edit */
.editable {
  position: relative;
  cursor: pointer;
}

.editable:hover {
  background: #f9fafb;
}

.editable.editing .display-value {
  display: none;
}

.editable.editing .edit-input {
  display: block !important;
  width: 100%;
  padding: 6px 8px;
  border: 2px solid #3b82f6;
  border-radius: 4px;
}

/* Unsaved indicator */
.unsaved-indicator {
  color: #f59e0b;
  font-size: 14px;
  margin-right: auto;
}

/* Sticky footer for long forms */
.sticky-footer {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}

/* Save status */
.form-status {
  font-size: 14px;
}

.status-saved {
  color: #059669;
}

.status-saving {
  color: #6b7280;
}

.status-unsaved {
  color: #f59e0b;
}
```

```javascript
// Track form changes
class FormChangeTracker {
  constructor(form) {
    this.form = form;
    this.originalData = new FormData(form);
    this.hasChanges = false;

    this.init();
  }

  init() {
    // Track all inputs
    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => this.checkChanges());
    });

    // Unsaved changes warning
    window.addEventListener('beforeunload', (e) => {
      if (this.hasChanges) {
        e.preventDefault();
        e.returnValue = 'Máte neuložené změny. Opravdu chcete odejít?';
      }
    });
  }

  checkChanges() {
    const currentData = new FormData(this.form);
    this.hasChanges = !this.isEqual(this.originalData, currentData);
    this.updateUI();
  }

  isEqual(fd1, fd2) {
    const obj1 = Object.fromEntries(fd1);
    const obj2 = Object.fromEntries(fd2);
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  updateUI() {
    const saveBtn = document.getElementById('save-changes');
    const discardBtn = document.getElementById('discard-changes');
    const status = document.getElementById('save-status');

    saveBtn.disabled = !this.hasChanges;
    discardBtn.disabled = !this.hasChanges;

    if (this.hasChanges) {
      status.textContent = 'Neuložené změny';
      status.className = 'status-unsaved';
    } else {
      status.textContent = 'Všechny změny uloženy';
      status.className = 'status-saved';
    }
  }

  markSaved() {
    this.originalData = new FormData(this.form);
    this.hasChanges = false;
    this.updateUI();
  }

  discard() {
    // Restore original values
    for (const [key, value] of this.originalData) {
      const input = this.form.querySelector(`[name="${key}"]`);
      if (input) input.value = value;
    }
    this.hasChanges = false;
    this.updateUI();
  }
}

// Auto-save implementation
class AutoSave {
  constructor(form, saveUrl) {
    this.form = form;
    this.saveUrl = saveUrl;
    this.timeout = null;
    this.status = document.getElementById('save-status');

    this.init();
  }

  init() {
    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => this.schedulesSave());
    });
  }

  schedulesSave() {
    clearTimeout(this.timeout);
    this.status.textContent = 'Ukládám...';
    this.status.className = 'status-saving';

    this.timeout = setTimeout(() => this.save(), 1000);
  }

  async save() {
    try {
      const data = new FormData(this.form);

      await fetch(this.saveUrl, {
        method: 'PUT',
        body: data
      });

      this.status.textContent = 'Uloženo';
      this.status.className = 'status-saved';
    } catch (error) {
      this.status.textContent = 'Chyba při ukládání';
      this.status.className = 'status-unsaved';
    }
  }
}

// Inline edit
document.querySelectorAll('.edit-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    const cell = row.querySelector('.editable');

    cell.classList.add('editing');
    const input = cell.querySelector('.edit-input');
    input.focus();
    input.select();

    // Save on blur or Enter
    input.addEventListener('blur', saveInlineEdit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveInlineEdit(e);
      if (e.key === 'Escape') cancelInlineEdit(e);
    });
  });
});

async function saveInlineEdit(e) {
  const cell = e.target.closest('.editable');
  const value = e.target.value;

  cell.querySelector('.display-value').textContent = value;
  cell.classList.remove('editing');

  // API call
  const row = cell.closest('tr');
  const id = row.dataset.id;
  const field = cell.dataset.field;

  await fetch(`/api/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [field]: value })
  });
}

function cancelInlineEdit(e) {
  const cell = e.target.closest('.editable');
  const originalValue = cell.querySelector('.display-value').textContent;
  e.target.value = originalValue;
  cell.classList.remove('editing');
}
```

**OČEKÁVANÝ DOPAD:** -30-50% data loss incidents, +20% edit completion

**A/B TEST SETUP:**
- Baseline: Edit bez unsaved warning
- Variant: S unsaved warning + auto-save
- Metrika: Data loss support tickets, edit abandonment rate
- Sample: Track over 1 měsíc

**CHECKLIST:**
- [ ] Pattern odpovídá impact (auto/manual/review)
- [ ] Unsaved changes warning při odchodu
- [ ] Save button disabled když no changes
- [ ] Loading state během save
- [ ] Success/error feedback
- [ ] Discard changes možnost

---

## Practice #41: Delete Patterns

**PROBLÉM:** Accidental deletes = ztráta důležitých dat = support tickets, frustrace, někdy právní problémy.

**ŘEŠENÍ:** Implementuj víceúrovňovou ochranu proti nechtěnému smazání.

**IMPLEMENTACE:**

### Ochranné vrstvy (v pořadí)

1. **Visual distinction** - Delete button vypadá nebezpečně (červená, ikona)
2. **Position** - Delete schován hlouběji (ne první v řadě)
3. **Confirmation** - Dialog "Opravdu smazat?"
4. **Soft delete** - Data nejsou fyzicky smazána
5. **Undo** - Možnost vrátit zpět (5-10 sekund)
6. **Recovery** - "Nedávno smazané" sekce

### Úrovně podle důležitosti:

| Důležitost | Ochrana |
|------------|---------|
| **Nízká** (draft, temp) | Soft delete + undo toast |
| **Střední** (user data) | Confirmation + soft delete + undo |
| **Vysoká** (platby, smlouvy) | Double confirmation + audit log |
| **Kritická** (účty) | Admin approval + delay period |

**KÓD:**

```html
<!-- Delete button styling - DANGER appearance -->
<button class="btn-danger-outline" id="delete-item">
  <span class="icon">🗑️</span>
  Smazat
</button>

<!-- Simple confirmation dialog -->
<dialog id="delete-confirm-simple" class="modal modal-sm">
  <div class="modal-content">
    <div class="modal-icon modal-icon-danger">⚠️</div>
    <h3>Smazat položku?</h3>
    <p>Položka "<strong id="item-name">Jan Novák</strong>" bude přesunuta do koše.</p>

    <div class="modal-actions">
      <button class="btn-secondary" data-close>Zrušit</button>
      <button class="btn-danger" id="confirm-simple-delete">Smazat</button>
    </div>
  </div>
</dialog>

<!-- High-stakes confirmation (type to confirm) -->
<dialog id="delete-confirm-critical" class="modal">
  <div class="modal-content">
    <div class="modal-icon modal-icon-danger">⚠️</div>
    <h3>Smazat účet?</h3>

    <div class="warning-box">
      <strong>Tato akce je nevratná!</strong>
      <ul>
        <li>Všechna data budou trvale smazána</li>
        <li>Aktivní předplatné bude zrušeno</li>
        <li>Přístup bude okamžitě odebrán</li>
      </ul>
    </div>

    <div class="confirm-input">
      <label>
        Pro potvrzení napište <strong>DELETE</strong>:
      </label>
      <input
        type="text"
        id="confirm-text"
        autocomplete="off"
        placeholder="DELETE"
      >
    </div>

    <div class="modal-actions">
      <button class="btn-secondary" data-close>Zrušit</button>
      <button class="btn-danger" id="confirm-critical-delete" disabled>
        Trvale smazat
      </button>
    </div>
  </div>
</dialog>

<!-- Undo toast -->
<div class="toast toast-undo" id="undo-toast" hidden>
  <span class="toast-message">
    <span class="icon">🗑️</span>
    Položka smazána
  </span>
  <button class="btn-link" id="undo-btn">Vrátit zpět</button>
  <div class="toast-progress"></div>
</div>

<!-- Recently deleted section -->
<section class="recently-deleted" id="trash-section">
  <div class="section-header">
    <h2>🗑️ Koš</h2>
    <span class="badge">3 položky</span>
    <button class="btn-link" id="empty-trash">Vysypat koš</button>
  </div>

  <div class="trash-list">
    <div class="trash-item">
      <div class="trash-info">
        <strong>Jan Novák</strong>
        <span class="trash-date">Smazáno před 2 dny</span>
        <span class="trash-warning">Bude odstraněno za 28 dní</span>
      </div>
      <div class="trash-actions">
        <button class="btn-secondary btn-sm">Obnovit</button>
        <button class="btn-danger-outline btn-sm">Trvale smazat</button>
      </div>
    </div>
  </div>
</section>
```

```css
/* Danger button styling */
.btn-danger {
  background: #dc2626;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-danger:hover {
  background: #b91c1c;
}

.btn-danger:disabled {
  background: #fca5a5;
  cursor: not-allowed;
}

.btn-danger-outline {
  background: transparent;
  color: #dc2626;
  border: 1px solid #dc2626;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-danger-outline:hover {
  background: #fef2f2;
}

/* Modal small */
.modal-sm {
  max-width: 400px;
}

.modal-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
}

.modal-icon-danger {
  color: #dc2626;
}

/* Warning box */
.warning-box {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.warning-box ul {
  margin: 8px 0 0;
  padding-left: 20px;
}

.warning-box li {
  margin: 4px 0;
  color: #991b1b;
}

/* Type to confirm input */
.confirm-input {
  margin: 20px 0;
}

.confirm-input label {
  display: block;
  margin-bottom: 8px;
}

.confirm-input input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 16px;
  text-align: center;
  letter-spacing: 2px;
}

.confirm-input input:focus {
  border-color: #dc2626;
  outline: none;
}

/* Undo toast */
.toast-undo {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: #1f2937;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #3b82f6;
  border-radius: 0 0 8px 8px;
  animation: shrink 5s linear forwards;
}

@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}

/* Trash section */
.recently-deleted {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-header .badge {
  background: #e5e7eb;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.trash-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
}

.trash-date {
  display: block;
  font-size: 12px;
  color: #6b7280;
}

.trash-warning {
  display: block;
  font-size: 12px;
  color: #f59e0b;
}

.trash-actions {
  display: flex;
  gap: 8px;
}
```

```javascript
// Simple delete with undo
class SoftDelete {
  constructor() {
    this.deletedItems = [];
    this.undoTimeout = null;
  }

  async delete(id, name) {
    // Show confirmation
    const confirmed = await this.showConfirmation(name);
    if (!confirmed) return;

    // Optimistic UI - hide immediately
    const row = document.querySelector(`[data-id="${id}"]`);
    row.dataset.deleted = 'true';
    row.style.display = 'none';

    this.deletedItems.push({ id, element: row });

    // Show undo toast
    this.showUndoToast();

    // Actually delete after timeout
    this.undoTimeout = setTimeout(() => {
      this.permanentDelete();
    }, 5000);
  }

  showConfirmation(name) {
    return new Promise(resolve => {
      const dialog = document.getElementById('delete-confirm-simple');
      document.getElementById('item-name').textContent = name;
      dialog.showModal();

      document.getElementById('confirm-simple-delete').onclick = () => {
        dialog.close();
        resolve(true);
      };

      dialog.querySelector('[data-close]').onclick = () => {
        dialog.close();
        resolve(false);
      };
    });
  }

  showUndoToast() {
    const toast = document.getElementById('undo-toast');
    toast.hidden = false;

    document.getElementById('undo-btn').onclick = () => {
      this.undo();
    };
  }

  undo() {
    clearTimeout(this.undoTimeout);

    // Restore items
    this.deletedItems.forEach(item => {
      item.element.style.display = '';
      delete item.element.dataset.deleted;
    });

    this.deletedItems = [];
    document.getElementById('undo-toast').hidden = true;
  }

  async permanentDelete() {
    // API call to move to trash
    for (const item of this.deletedItems) {
      await fetch(`/api/items/${item.id}`, {
        method: 'DELETE'
      });
    }

    this.deletedItems = [];
    document.getElementById('undo-toast').hidden = true;
  }
}

// Critical delete with type-to-confirm
class CriticalDelete {
  constructor() {
    this.confirmPhrase = 'DELETE';
  }

  async delete(id) {
    const confirmed = await this.showCriticalConfirmation();
    if (!confirmed) return;

    // Show loading, make API call, redirect
    console.log('Permanently deleting:', id);
  }

  showCriticalConfirmation() {
    return new Promise(resolve => {
      const dialog = document.getElementById('delete-confirm-critical');
      const input = document.getElementById('confirm-text');
      const confirmBtn = document.getElementById('confirm-critical-delete');

      input.value = '';
      confirmBtn.disabled = true;

      dialog.showModal();

      // Enable button only when correct phrase typed
      input.addEventListener('input', () => {
        confirmBtn.disabled = input.value !== this.confirmPhrase;
      });

      confirmBtn.onclick = () => {
        dialog.close();
        resolve(true);
      };

      dialog.querySelector('[data-close]').onclick = () => {
        dialog.close();
        resolve(false);
      };
    });
  }
}
```

**OČEKÁVANÝ DOPAD:** -50-80% accidental deletes, -70% data recovery support tickets

**A/B TEST SETUP:**
- Baseline: Delete bez undo
- Variant: Soft delete + undo + trash
- Metrika: Accidental delete tickets, data recovery requests
- Sample: Track over 3 měsíce

**CHECKLIST:**
- [ ] Delete button má danger styling (červená)
- [ ] Delete není první v řadě akcí
- [ ] Confirmation dialog vždy
- [ ] Ukazuje CO bude smazáno
- [ ] Soft delete kde možné
- [ ] Undo toast (5-10 sekund)
- [ ] "Koš" / "Nedávno smazané" sekce
- [ ] Auto-purge po X dnech s warningem

---

## Practice #42: Bulk Operations

**PROBLÉM:** Uživatelé potřebují provést stejnou akci na 10-100+ položkách. Bez bulk = minuty klikání.

**ŘEŠENÍ:** Implementuj bezpečné a efektivní bulk operations.

**IMPLEMENTACE:**

Viz **Practice #38** v `data-tables.md` pro detailní implementaci bulk selection a actions.

### Dodatečné best practices:

1. **Progress feedback** pro dlouhé operace
2. **Partial success handling** - co když některé selžou?
3. **Undo pro bulk delete** - náročnější ale důležité
4. **Rate limiting** - ochrana proti accidental spam

**KÓD:**

```html
<!-- Bulk progress modal -->
<dialog id="bulk-progress" class="modal">
  <div class="modal-content">
    <h3>Zpracovávám položky...</h3>

    <div class="progress-bar">
      <div class="progress-fill" style="width: 45%"></div>
    </div>

    <div class="progress-status">
      <span>Zpracováno: <strong>45</strong> / <strong>100</strong></span>
      <span class="progress-percent">45%</span>
    </div>

    <div class="progress-log">
      <div class="log-item log-success">✓ Jan Novák - úspěšně smazán</div>
      <div class="log-item log-error">✗ Marie Svobodová - chyba: nelze smazat</div>
    </div>

    <button class="btn-secondary" id="cancel-bulk">Zrušit</button>
  </div>
</dialog>

<!-- Bulk result summary -->
<dialog id="bulk-result" class="modal">
  <div class="modal-content">
    <div class="result-summary">
      <div class="result-success">
        <span class="result-icon">✓</span>
        <strong>85</strong> úspěšně zpracováno
      </div>
      <div class="result-error">
        <span class="result-icon">✗</span>
        <strong>15</strong> selhalo
      </div>
    </div>

    <details class="error-details">
      <summary>Zobrazit chyby (15)</summary>
      <ul>
        <li>Marie Svobodová - aktivní objednávka</li>
        <li>Petr Dvořák - admin účet</li>
        <!-- ... -->
      </ul>
    </details>

    <div class="modal-actions">
      <button class="btn-secondary" id="retry-failed">
        Opakovat selhané (15)
      </button>
      <button class="btn-primary" data-close>Hotovo</button>
    </div>
  </div>
</dialog>
```

```css
/* Progress bar */
.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s;
}

.progress-status {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #6b7280;
}

.progress-log {
  max-height: 200px;
  overflow-y: auto;
  margin: 16px 0;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  font-size: 13px;
  font-family: monospace;
}

.log-item {
  padding: 4px 0;
}

.log-success {
  color: #059669;
}

.log-error {
  color: #dc2626;
}

/* Result summary */
.result-summary {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.result-success,
.result-error {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.result-success {
  background: #d1fae5;
  color: #065f46;
}

.result-error {
  background: #fef2f2;
  color: #991b1b;
}

.result-icon {
  display: block;
  font-size: 32px;
  margin-bottom: 8px;
}

.error-details {
  margin: 16px 0;
}

.error-details summary {
  cursor: pointer;
  color: #dc2626;
  font-weight: 500;
}

.error-details ul {
  margin-top: 12px;
  padding-left: 20px;
  font-size: 14px;
}
```

**OČEKÁVANÝ DOPAD:** +60-80% efficiency pro bulk tasks

**CHECKLIST:**
- [ ] Progress indicator pro dlouhé operace
- [ ] Možnost zrušit během zpracování
- [ ] Partial failure handling
- [ ] Summary s počtem úspěšných/neúspěšných
- [ ] "Retry failed" možnost
- [ ] Rate limiting pro ochranu

---

## Practice #43: Optimistic UI

**PROBLÉM:** API calls trvají 200-2000ms. Uživatel čeká, UI "zamrzá", pocit pomalosti.

**ŘEŠENÍ:** Aktualizuj UI okamžitě, rollback při chybě.

**IMPLEMENTACE:**

### Kdy použít:
- ✅ Toggle (like, favorite, archive)
- ✅ Inline edit
- ✅ Reorder (drag & drop)
- ✅ Delete (s undo)
- ❌ Create (potřebuje ID z backendu)
- ❌ Payment (kritická operace)

### Pattern:

1. Aktualizuj UI okamžitě
2. Odešli request na pozadí
3. Při úspěchu: nic (už zobrazeno)
4. Při chybě: rollback + error message

**KÓD:**

```javascript
// Optimistic toggle
async function toggleFavorite(itemId, button) {
  // 1. Immediate UI update
  const wasFavorite = button.classList.contains('active');
  button.classList.toggle('active');
  button.setAttribute('aria-pressed', !wasFavorite);

  try {
    // 2. API call in background
    const response = await fetch(`/api/items/${itemId}/favorite`, {
      method: wasFavorite ? 'DELETE' : 'POST'
    });

    if (!response.ok) {
      throw new Error('Failed to update');
    }

    // 3. Success - UI already correct, nothing to do

  } catch (error) {
    // 4. Error - rollback UI
    button.classList.toggle('active');
    button.setAttribute('aria-pressed', wasFavorite);

    // Show error toast
    showToast('Nepodařilo se uložit. Zkuste to znovu.', 'error');
  }
}

// Optimistic inline edit
async function saveInlineEdit(cell, newValue) {
  const originalValue = cell.dataset.originalValue;

  // 1. Update UI immediately
  cell.querySelector('.display-value').textContent = newValue;
  cell.classList.remove('editing');

  try {
    // 2. API call
    const id = cell.closest('tr').dataset.id;
    const field = cell.dataset.field;

    const response = await fetch(`/api/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: newValue })
    });

    if (!response.ok) throw new Error('Save failed');

    // 3. Success - update original value
    cell.dataset.originalValue = newValue;

  } catch (error) {
    // 4. Rollback
    cell.querySelector('.display-value').textContent = originalValue;
    showToast('Nepodařilo se uložit změny.', 'error');
  }
}

// Optimistic delete with undo
async function optimisticDelete(itemId, row) {
  // 1. Hide immediately
  row.style.opacity = '0.5';
  row.style.pointerEvents = 'none';

  // 2. Show undo toast
  const undone = await showUndoToast('Položka smazána', 5000);

  if (undone) {
    // User clicked undo - restore
    row.style.opacity = '1';
    row.style.pointerEvents = '';
    return;
  }

  // 3. Actually delete
  try {
    row.remove();
    await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
  } catch (error) {
    // Rollback - but row is gone, need to re-add
    // This is why soft delete is preferred
    showToast('Nepodařilo se smazat. Obnovte stránku.', 'error');
  }
}

// Helper: Undo toast with promise
function showUndoToast(message, duration) {
  return new Promise(resolve => {
    const toast = document.getElementById('undo-toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.hidden = false;

    const timeout = setTimeout(() => {
      toast.hidden = true;
      resolve(false); // Not undone
    }, duration);

    document.getElementById('undo-btn').onclick = () => {
      clearTimeout(timeout);
      toast.hidden = true;
      resolve(true); // Undone
    };
  });
}

// Helper: Error toast
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
```

```css
/* Pending state during optimistic update */
.pending {
  opacity: 0.7;
  pointer-events: none;
}

/* Toast types */
.toast-error {
  background: #dc2626;
}

.toast-success {
  background: #059669;
}
```

**OČEKÁVANÝ DOPAD:** Perceived performance +200-500%, user satisfaction +25%

**A/B TEST SETUP:**
- Baseline: Standard API-first update
- Variant: Optimistic UI
- Metrika: Perceived speed (survey), task completion time
- Sample: User testing sessions

**CHECKLIST:**
- [ ] UI update před API call
- [ ] Loading/pending state viditelný
- [ ] Rollback při chybě
- [ ] Error message jasný a actionable
- [ ] Nepoužívat pro kritické operace (payments)

---

## Sources

- [Medium: Mastering UX for CRUD Operations](https://medium.com/design-bootcamp/mastering-crud-operations-a-framework-for-seamless-product-design-2630affbc1e5)
- [Medium: CRUD in enterprise UX](https://medium.com/design-bootcamp/crud-in-enterprise-application-and-whats-more-b522bded803d)
- [Jacob Paris: Guidelines for optimistic UI](https://www.jacobparis.com/content/remix-crud-ui)
- [UX StackExchange: CRUD Desktop Best Practice](https://ux.stackexchange.com/questions/3519/crud-desktop-best-practice)
