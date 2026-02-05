# Enterprise Forms Optimization Practices

Based on research from Nielsen Norman Group, IxDF, and enterprise application case studies.

**Core principle:** Enterprise formuláře jsou komplexnější než consumer forms. Uživatelé je vyplňují denně = každá vteřina navíc se násobí 1000×.

**Viz také:** `forms.md` pro základní form optimization (minimalizace polí, validace, password UX).

---

## Practice #48: Multi-step Forms

**PROBLÉM:** Formulář s 20+ poli = odrazující, vysoká abandonment rate (81% lidí opustí formulář po začátku vyplňování).

**ŘEŠENÍ:** Rozděl na logické kroky s progress indicatorem a draft save.

**IMPLEMENTACE:**

### Kdy použít multi-step:
- 10+ polí
- Logicky oddělitelné sekce (osobní údaje → adresa → platba)
- Uživatel potřebuje vidět progress

### Pravidla:
1. **3-7 kroků** max (ideálně 4-5)
2. **Progress indicator** vždy viditelný
3. **Draft save** mezi kroky
4. **Back navigation** bez ztráty dat
5. **Summary step** před finálním submit

**KÓD:**

```html
<!-- Multi-step form container -->
<div class="wizard-form">
  <!-- Progress bar -->
  <div class="progress-container" role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="4">
    <div class="progress-bar">
      <div class="progress-fill" style="width: 50%"></div>
    </div>
    <div class="progress-steps">
      <div class="step completed" data-step="1">
        <span class="step-number">✓</span>
        <span class="step-label">Osobní údaje</span>
      </div>
      <div class="step active" data-step="2">
        <span class="step-number">2</span>
        <span class="step-label">Adresa</span>
      </div>
      <div class="step" data-step="3">
        <span class="step-number">3</span>
        <span class="step-label">Platba</span>
      </div>
      <div class="step" data-step="4">
        <span class="step-number">4</span>
        <span class="step-label">Souhrn</span>
      </div>
    </div>
  </div>

  <!-- Form steps -->
  <form id="wizard" novalidate>
    <!-- Step 1: Personal info -->
    <fieldset class="form-step" data-step="1" hidden>
      <legend class="sr-only">Osobní údaje</legend>
      <h2>Osobní údaje</h2>

      <div class="form-row">
        <div class="form-group">
          <label for="firstName">Jméno *</label>
          <input type="text" id="firstName" name="firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Příjmení *</label>
          <input type="text" id="lastName" name="lastName" required>
        </div>
      </div>

      <div class="form-group">
        <label for="email">E-mail *</label>
        <input type="email" id="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="phone">Telefon</label>
        <input type="tel" id="phone" name="phone" inputmode="tel">
        <span class="field-hint">Pro doručení zásilky</span>
      </div>
    </fieldset>

    <!-- Step 2: Address -->
    <fieldset class="form-step active" data-step="2">
      <legend class="sr-only">Adresa</legend>
      <h2>Doručovací adresa</h2>

      <div class="form-group">
        <label for="street">Ulice a číslo *</label>
        <input type="text" id="street" name="street" required autocomplete="street-address">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="city">Město *</label>
          <input type="text" id="city" name="city" required autocomplete="address-level2">
        </div>
        <div class="form-group form-group-sm">
          <label for="zip">PSČ *</label>
          <input type="text" id="zip" name="zip" required autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}">
        </div>
      </div>

      <div class="form-group">
        <label for="country">Země *</label>
        <select id="country" name="country" required autocomplete="country">
          <option value="">Vyberte zemi</option>
          <option value="CZ" selected>Česká republika</option>
          <option value="SK">Slovensko</option>
        </select>
      </div>
    </fieldset>

    <!-- Step 3: Payment -->
    <fieldset class="form-step" data-step="3" hidden>
      <legend class="sr-only">Platba</legend>
      <h2>Platební údaje</h2>
      <!-- Payment fields -->
    </fieldset>

    <!-- Step 4: Summary -->
    <fieldset class="form-step" data-step="4" hidden>
      <legend class="sr-only">Souhrn</legend>
      <h2>Souhrn objednávky</h2>

      <div class="summary-section">
        <h3>Osobní údaje</h3>
        <dl class="summary-list">
          <dt>Jméno</dt>
          <dd id="summary-name">-</dd>
          <dt>E-mail</dt>
          <dd id="summary-email">-</dd>
        </dl>
        <button type="button" class="btn-link edit-step" data-goto="1">Upravit</button>
      </div>

      <div class="summary-section">
        <h3>Adresa</h3>
        <dl class="summary-list">
          <dt>Ulice</dt>
          <dd id="summary-street">-</dd>
          <dt>Město</dt>
          <dd id="summary-city">-</dd>
        </dl>
        <button type="button" class="btn-link edit-step" data-goto="2">Upravit</button>
      </div>
    </fieldset>

    <!-- Navigation -->
    <div class="form-navigation">
      <button type="button" class="btn-secondary" id="prev-step" hidden>
        ← Zpět
      </button>

      <div class="nav-spacer"></div>

      <span class="draft-status" id="draft-status">
        Automaticky uloženo
      </span>

      <button type="button" class="btn-primary" id="next-step">
        Pokračovat →
      </button>

      <button type="submit" class="btn-primary" id="submit-form" hidden>
        Dokončit objednávku
      </button>
    </div>
  </form>
</div>
```

```css
/* Progress container */
.progress-container {
  margin-bottom: 32px;
}

.progress-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
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
  font-weight: 600;
  font-size: 14px;
}

.step.active .step-number {
  background: #3b82f6;
  color: white;
}

.step.completed .step-number {
  background: #059669;
  color: white;
}

.step-label {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
}

.step.active .step-label {
  color: #374151;
  font-weight: 500;
}

/* Form steps */
.form-step {
  border: none;
  padding: 0;
  margin: 0;
}

.form-step[hidden] {
  display: none;
}

.form-step h2 {
  font-size: 20px;
  margin: 0 0 24px;
}

/* Form layout */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group-sm {
  max-width: 150px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.field-hint {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #6b7280;
}

/* Summary */
.summary-section {
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
}

.summary-section h3 {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-list {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 8px;
  margin: 0;
}

.summary-list dt {
  color: #6b7280;
  font-size: 14px;
}

.summary-list dd {
  margin: 0;
  font-weight: 500;
}

.edit-step {
  position: absolute;
  top: 16px;
  right: 16px;
}

/* Navigation */
.form-navigation {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  margin-top: 32px;
}

.nav-spacer {
  flex: 1;
}

.draft-status {
  font-size: 13px;
  color: #059669;
}

/* Responsive */
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .progress-steps {
    display: none;
  }

  .step-label {
    font-size: 11px;
  }
}
```

```javascript
class WizardForm {
  constructor(form) {
    this.form = form;
    this.steps = form.querySelectorAll('.form-step');
    this.currentStep = 1;
    this.totalSteps = this.steps.length;
    this.storageKey = 'wizard-draft';

    this.init();
  }

  init() {
    // Restore draft
    this.loadDraft();

    // Navigation buttons
    document.getElementById('next-step').addEventListener('click', () => this.next());
    document.getElementById('prev-step').addEventListener('click', () => this.prev());

    // Edit buttons in summary
    document.querySelectorAll('.edit-step').forEach(btn => {
      btn.addEventListener('click', () => {
        this.goToStep(parseInt(btn.dataset.goto));
      });
    });

    // Auto-save on input
    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('change', () => this.saveDraft());
    });

    // Form submit
    this.form.addEventListener('submit', (e) => this.submit(e));

    // Initial state
    this.updateUI();
  }

  next() {
    // Validate current step
    const currentFieldset = this.form.querySelector(`[data-step="${this.currentStep}"]`);
    const inputs = currentFieldset.querySelectorAll('[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        valid = false;
        input.classList.add('invalid');
        this.showError(input);
      } else {
        input.classList.remove('invalid');
      }
    });

    if (!valid) {
      // Focus first invalid
      currentFieldset.querySelector('.invalid')?.focus();
      return;
    }

    // Save and proceed
    this.saveDraft();

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateUI();

      // Update summary on last step
      if (this.currentStep === this.totalSteps) {
        this.updateSummary();
      }
    }
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    }
  }

  goToStep(step) {
    this.currentStep = step;
    this.updateUI();
  }

  updateUI() {
    // Update steps visibility
    this.steps.forEach((step, index) => {
      const stepNum = index + 1;
      step.hidden = stepNum !== this.currentStep;
      step.classList.toggle('active', stepNum === this.currentStep);
    });

    // Update progress
    const progress = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;

    // Update step indicators
    document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.toggle('active', stepNum === this.currentStep);
      step.classList.toggle('completed', stepNum < this.currentStep);
    });

    // Update navigation buttons
    document.getElementById('prev-step').hidden = this.currentStep === 1;
    document.getElementById('next-step').hidden = this.currentStep === this.totalSteps;
    document.getElementById('submit-form').hidden = this.currentStep !== this.totalSteps;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Focus first input
    const firstInput = this.form.querySelector(`[data-step="${this.currentStep}"] input`);
    if (firstInput) firstInput.focus();
  }

  updateSummary() {
    const data = new FormData(this.form);
    document.getElementById('summary-name').textContent =
      `${data.get('firstName')} ${data.get('lastName')}`;
    document.getElementById('summary-email').textContent = data.get('email');
    document.getElementById('summary-street').textContent = data.get('street');
    document.getElementById('summary-city').textContent =
      `${data.get('zip')} ${data.get('city')}`;
  }

  saveDraft() {
    const data = new FormData(this.form);
    const draft = {
      step: this.currentStep,
      data: Object.fromEntries(data),
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(this.storageKey, JSON.stringify(draft));

    // Update status
    const status = document.getElementById('draft-status');
    status.textContent = 'Ukládám...';
    setTimeout(() => {
      status.textContent = 'Automaticky uloženo';
    }, 500);
  }

  loadDraft() {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return;

    const draft = JSON.parse(saved);

    // Restore form data
    Object.entries(draft.data).forEach(([name, value]) => {
      const input = this.form.querySelector(`[name="${name}"]`);
      if (input) input.value = value;
    });

    // Restore step
    this.currentStep = draft.step;
  }

  showError(input) {
    // Remove existing error
    const existing = input.parentElement.querySelector('.error-message');
    if (existing) existing.remove();

    // Add error message
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = input.validationMessage || 'Toto pole je povinné';
    input.parentElement.appendChild(error);
  }

  submit(e) {
    e.preventDefault();
    // Clear draft on successful submit
    localStorage.removeItem(this.storageKey);
    // Submit form
    console.log('Submitting:', Object.fromEntries(new FormData(this.form)));
  }
}

// Initialize
new WizardForm(document.getElementById('wizard'));
```

**OČEKÁVANÝ DOPAD:** +25-40% form completion rate

**CHECKLIST:**
- [ ] Progress indicator viditelný
- [ ] Draft save mezi kroky
- [ ] Back navigation bez ztráty dat
- [ ] Summary step před submit
- [ ] "Edit" linky v summary
- [ ] Focus management mezi kroky
- [ ] Mobile responsive progress

---

## Practice #49: Complex Validation

**PROBLÉM:** Enterprise formuláře mají komplexní validační pravidla - závislá pole, async validace, cross-field rules.

**ŘEŠENÍ:** Vícevrstvá validace s jasnou zpětnou vazbou.

**IMPLEMENTACE:**

### Typy validace:

| Typ | Kdy | Příklad |
|-----|-----|---------|
| **Inline** | Při opuštění pole | Email format |
| **Cross-field** | Při změně souvisejícího | Heslo = Potvrdit heslo |
| **Async** | Po debounce | Username availability |
| **Submit** | Před odesláním | All required fields |

### Pravidla:
1. **Validuj na blur** (ne na každý keystroke)
2. **Zobraz chybu u pole** (ne globálně)
3. **Pozitivní feedback** (✓ při valid)
4. **Async = loading state**

**KÓD:**

```html
<!-- Complex validation form -->
<form id="registration" novalidate>
  <!-- Email with async validation -->
  <div class="form-group">
    <label for="email">E-mail *</label>
    <div class="input-wrapper">
      <input
        type="email"
        id="email"
        name="email"
        required
        data-validate="email,unique"
      >
      <span class="input-status" id="email-status"></span>
    </div>
    <span class="field-error" id="email-error"></span>
  </div>

  <!-- Password with strength indicator -->
  <div class="form-group">
    <label for="password">Heslo *</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      data-validate="password"
    >
    <div class="password-strength" id="password-strength">
      <div class="strength-bar">
        <div class="strength-fill"></div>
      </div>
      <span class="strength-label">Slabé heslo</span>
    </div>
    <ul class="password-requirements">
      <li data-req="length">Minimálně 8 znaků</li>
      <li data-req="upper">Alespoň jedno velké písmeno</li>
      <li data-req="number">Alespoň jedna číslice</li>
      <li data-req="special">Alespoň jeden speciální znak</li>
    </ul>
    <span class="field-error" id="password-error"></span>
  </div>

  <!-- Confirm password (cross-field) -->
  <div class="form-group">
    <label for="confirmPassword">Potvrdit heslo *</label>
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      required
      data-validate="match:password"
    >
    <span class="field-error" id="confirmPassword-error"></span>
  </div>

  <!-- Dependent fields -->
  <div class="form-group">
    <label>Typ účtu *</label>
    <div class="radio-group">
      <label class="radio-label">
        <input type="radio" name="accountType" value="personal" checked>
        Osobní
      </label>
      <label class="radio-label">
        <input type="radio" name="accountType" value="business">
        Firemní
      </label>
    </div>
  </div>

  <!-- Conditional field (shown when business selected) -->
  <div class="form-group conditional" id="company-field" hidden>
    <label for="companyName">Název firmy *</label>
    <input
      type="text"
      id="companyName"
      name="companyName"
      data-validate="required-if:accountType=business"
    >
    <span class="field-error" id="companyName-error"></span>
  </div>

  <div class="form-group conditional" id="ico-field" hidden>
    <label for="ico">IČO *</label>
    <input
      type="text"
      id="ico"
      name="ico"
      pattern="[0-9]{8}"
      inputmode="numeric"
      data-validate="ico,required-if:accountType=business"
    >
    <span class="field-error" id="ico-error"></span>
    <span class="field-hint">8 číslic</span>
  </div>

  <button type="submit" class="btn-primary">Vytvořit účet</button>
</form>
```

```css
/* Input with status icon */
.input-wrapper {
  position: relative;
}

.input-wrapper input {
  padding-right: 40px;
}

.input-status {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
}

.input-status.loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.input-status.valid::after {
  content: '✓';
  color: #059669;
}

.input-status.invalid::after {
  content: '✗';
  color: #dc2626;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

/* Field states */
.form-group input.valid {
  border-color: #059669;
}

.form-group input.invalid {
  border-color: #dc2626;
}

.field-error {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #dc2626;
}

.field-error:empty {
  display: none;
}

/* Password strength */
.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin-bottom: 6px;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s, background 0.3s;
  width: 0;
}

.strength-fill.weak {
  width: 25%;
  background: #dc2626;
}

.strength-fill.fair {
  width: 50%;
  background: #f59e0b;
}

.strength-fill.good {
  width: 75%;
  background: #3b82f6;
}

.strength-fill.strong {
  width: 100%;
  background: #059669;
}

.strength-label {
  font-size: 12px;
  color: #6b7280;
}

/* Password requirements */
.password-requirements {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  font-size: 13px;
}

.password-requirements li {
  padding: 4px 0;
  color: #6b7280;
}

.password-requirements li::before {
  content: '○';
  margin-right: 8px;
}

.password-requirements li.met {
  color: #059669;
}

.password-requirements li.met::before {
  content: '●';
}

/* Conditional fields */
.conditional {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

```javascript
class FormValidator {
  constructor(form) {
    this.form = form;
    this.validators = {
      email: this.validateEmail.bind(this),
      unique: this.validateUnique.bind(this),
      password: this.validatePassword.bind(this),
      match: this.validateMatch.bind(this),
      ico: this.validateICO.bind(this),
      'required-if': this.validateRequiredIf.bind(this)
    };

    this.init();
  }

  init() {
    // Validate on blur
    this.form.querySelectorAll('[data-validate]').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
    });

    // Password live feedback
    const password = this.form.querySelector('#password');
    if (password) {
      password.addEventListener('input', () => this.updatePasswordStrength(password));
    }

    // Cross-field validation
    const confirmPassword = this.form.querySelector('#confirmPassword');
    if (confirmPassword && password) {
      password.addEventListener('input', () => {
        if (confirmPassword.value) this.validateField(confirmPassword);
      });
    }

    // Conditional fields
    this.form.querySelectorAll('[name="accountType"]').forEach(radio => {
      radio.addEventListener('change', () => this.handleConditionalFields());
    });

    // Submit validation
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async validateField(input) {
    const rules = input.dataset.validate.split(',');
    const statusEl = document.getElementById(`${input.name}-status`);
    const errorEl = document.getElementById(`${input.name}-error`);

    // Clear previous state
    input.classList.remove('valid', 'invalid');
    if (statusEl) statusEl.className = 'input-status';
    if (errorEl) errorEl.textContent = '';

    // Skip empty non-required fields
    if (!input.value && !input.required) return true;

    // Check required first
    if (input.required && !input.value) {
      this.setFieldError(input, 'Toto pole je povinné');
      return false;
    }

    // Run validators
    for (const rule of rules) {
      const [validator, param] = rule.split(':');

      if (this.validators[validator]) {
        if (statusEl) statusEl.classList.add('loading');

        const result = await this.validators[validator](input, param);

        if (statusEl) statusEl.classList.remove('loading');

        if (!result.valid) {
          this.setFieldError(input, result.message);
          return false;
        }
      }
    }

    // All valid
    input.classList.add('valid');
    if (statusEl) statusEl.classList.add('valid');
    return true;
  }

  setFieldError(input, message) {
    input.classList.add('invalid');
    const statusEl = document.getElementById(`${input.name}-status`);
    const errorEl = document.getElementById(`${input.name}-error`);

    if (statusEl) statusEl.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  }

  // Validators
  validateEmail(input) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      valid: pattern.test(input.value),
      message: 'Zadejte platnou e-mailovou adresu'
    };
  }

  async validateUnique(input) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email exists (mock)
    const exists = input.value === 'test@test.cz';
    return {
      valid: !exists,
      message: 'Tento e-mail je již registrován'
    };
  }

  validatePassword(input) {
    const value = input.value;
    if (value.length < 8) {
      return { valid: false, message: 'Heslo musí mít alespoň 8 znaků' };
    }
    return { valid: true };
  }

  validateMatch(input, targetName) {
    const target = this.form.querySelector(`#${targetName}`);
    return {
      valid: input.value === target.value,
      message: 'Hesla se neshodují'
    };
  }

  validateICO(input) {
    const pattern = /^[0-9]{8}$/;
    return {
      valid: pattern.test(input.value),
      message: 'IČO musí obsahovat 8 číslic'
    };
  }

  validateRequiredIf(input, condition) {
    const [fieldName, expectedValue] = condition.split('=');
    const field = this.form.querySelector(`[name="${fieldName}"]:checked`);

    if (field && field.value === expectedValue && !input.value) {
      return { valid: false, message: 'Toto pole je povinné' };
    }
    return { valid: true };
  }

  // Password strength
  updatePasswordStrength(input) {
    const value = input.value;
    const requirements = {
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value)
    };

    // Update requirement indicators
    Object.entries(requirements).forEach(([req, met]) => {
      const el = document.querySelector(`[data-req="${req}"]`);
      if (el) el.classList.toggle('met', met);
    });

    // Calculate strength
    const metCount = Object.values(requirements).filter(Boolean).length;
    const strengthFill = document.querySelector('.strength-fill');
    const strengthLabel = document.querySelector('.strength-label');

    const levels = [
      { class: '', label: 'Zadejte heslo' },
      { class: 'weak', label: 'Slabé heslo' },
      { class: 'fair', label: 'Průměrné heslo' },
      { class: 'good', label: 'Dobré heslo' },
      { class: 'strong', label: 'Silné heslo' }
    ];

    const level = levels[metCount];
    strengthFill.className = `strength-fill ${level.class}`;
    strengthLabel.textContent = level.label;
  }

  // Conditional fields
  handleConditionalFields() {
    const accountType = this.form.querySelector('[name="accountType"]:checked').value;
    const isBusiness = accountType === 'business';

    document.getElementById('company-field').hidden = !isBusiness;
    document.getElementById('ico-field').hidden = !isBusiness;

    // Update required state
    const companyInput = document.getElementById('companyName');
    const icoInput = document.getElementById('ico');

    companyInput.required = isBusiness;
    icoInput.required = isBusiness;
  }

  // Submit
  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const inputs = this.form.querySelectorAll('[data-validate]');
    let allValid = true;

    for (const input of inputs) {
      if (!input.closest('.conditional')?.hidden) {
        const valid = await this.validateField(input);
        if (!valid) allValid = false;
      }
    }

    if (allValid) {
      console.log('Form is valid, submitting...');
      // Submit form
    } else {
      // Focus first invalid field
      this.form.querySelector('.invalid')?.focus();
    }
  }
}

// Initialize
new FormValidator(document.getElementById('registration'));
```

**OČEKÁVANÝ DOPAD:** +15-25% form completion, -40% validation errors

**CHECKLIST:**
- [ ] Validace na blur (ne keystroke)
- [ ] Chyba zobrazena u pole
- [ ] Pozitivní feedback (✓)
- [ ] Async validace s loading
- [ ] Cross-field validace funguje
- [ ] Dependent fields s animací
- [ ] Focus na první invalid při submit

---

## Practice #50: Large Data Entry

**PROBLÉM:** Formuláře pro zadávání velkých objemů dat (import, batch edit) jsou neefektivní.

**ŘEŠENÍ:** Optimalizuj pro rychlost - keyboard shortcuts, tab order, auto-fill.

**IMPLEMENTACE:**

### Techniky pro rychlý data entry:
1. **Logický tab order** - zleva doprava, shora dolů
2. **Keyboard shortcuts** - Enter = next field, Ctrl+S = save
3. **Auto-fill suggestions** - historie, časté hodnoty
4. **Copy/paste support** - bulk import z Excelu
5. **Inline edit v tabulkách** - double-click to edit

**KÓD:**

```html
<!-- Quick data entry form -->
<form id="quick-entry" class="data-entry-form">
  <div class="form-toolbar">
    <div class="toolbar-info">
      <span class="entry-count">Záznam 1 / 10</span>
      <span class="shortcuts-hint">
        Enter = další pole | Ctrl+S = uložit | Ctrl+N = nový záznam
      </span>
    </div>
    <div class="toolbar-actions">
      <button type="button" class="btn-secondary" id="prev-record">
        ← Předchozí
      </button>
      <button type="button" class="btn-secondary" id="next-record">
        Další →
      </button>
      <button type="submit" class="btn-primary">
        Uložit (Ctrl+S)
      </button>
    </div>
  </div>

  <div class="form-grid">
    <div class="form-group">
      <label for="sku">SKU *</label>
      <input
        type="text"
        id="sku"
        name="sku"
        required
        autofocus
        data-next="name"
      >
    </div>

    <div class="form-group">
      <label for="name">Název produktu *</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        list="product-suggestions"
        data-next="category"
      >
      <datalist id="product-suggestions">
        <option value="Tričko basic">
        <option value="Tričko premium">
        <option value="Mikina s kapucí">
      </datalist>
    </div>

    <div class="form-group">
      <label for="category">Kategorie *</label>
      <select id="category" name="category" required data-next="price">
        <option value="">Vyberte</option>
        <option value="clothing">Oblečení</option>
        <option value="accessories">Doplňky</option>
      </select>
    </div>

    <div class="form-group">
      <label for="price">Cena (Kč) *</label>
      <input
        type="number"
        id="price"
        name="price"
        required
        min="0"
        step="1"
        inputmode="decimal"
        data-next="stock"
      >
    </div>

    <div class="form-group">
      <label for="stock">Skladem *</label>
      <input
        type="number"
        id="stock"
        name="stock"
        required
        min="0"
        inputmode="numeric"
        data-next="sku"
        data-next-record="true"
      >
    </div>
  </div>

  <!-- Bulk paste area -->
  <div class="bulk-paste-area">
    <h4>Hromadné vložení</h4>
    <p>Vložte data z Excelu (SKU, Název, Kategorie, Cena, Sklad)</p>
    <textarea
      id="bulk-paste"
      placeholder="Ctrl+V pro vložení dat..."
      rows="5"
    ></textarea>
    <button type="button" class="btn-secondary" id="process-paste">
      Zpracovat data
    </button>
  </div>
</form>
```

```css
/* Data entry form */
.data-entry-form {
  max-width: 800px;
}

.form-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 24px;
}

.toolbar-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.entry-count {
  font-weight: 600;
}

.shortcuts-hint {
  font-size: 12px;
  color: #6b7280;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

/* Form grid for efficient layout */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* Bulk paste */
.bulk-paste-area {
  margin-top: 32px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
}

.bulk-paste-area h4 {
  margin: 0 0 8px;
}

.bulk-paste-area p {
  margin: 0 0 16px;
  font-size: 14px;
  color: #6b7280;
}

.bulk-paste-area textarea {
  width: 100%;
  font-family: monospace;
  font-size: 13px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  resize: vertical;
}

/* Focus ring for keyboard navigation */
.data-entry-form input:focus,
.data-entry-form select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
```

```javascript
class QuickDataEntry {
  constructor(form) {
    this.form = form;
    this.currentRecord = 0;
    this.totalRecords = 10;

    this.init();
  }

  init() {
    // Enter = next field
    this.form.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.goToNextField(input);
        }
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+S = save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.form.requestSubmit();
      }

      // Ctrl+N = new record
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        this.newRecord();
      }
    });

    // Navigation buttons
    document.getElementById('prev-record').addEventListener('click', () => this.prevRecord());
    document.getElementById('next-record').addEventListener('click', () => this.nextRecord());

    // Bulk paste
    document.getElementById('process-paste').addEventListener('click', () => this.processBulkPaste());

    // Auto-detect paste in textarea
    document.getElementById('bulk-paste').addEventListener('paste', (e) => {
      setTimeout(() => this.processBulkPaste(), 100);
    });
  }

  goToNextField(currentInput) {
    const nextId = currentInput.dataset.next;

    if (currentInput.dataset.nextRecord === 'true') {
      // Save and go to next record
      this.nextRecord();
      return;
    }

    if (nextId) {
      const nextInput = document.getElementById(nextId);
      if (nextInput) nextInput.focus();
    }
  }

  prevRecord() {
    if (this.currentRecord > 0) {
      this.saveCurrentRecord();
      this.currentRecord--;
      this.loadRecord(this.currentRecord);
      this.updateCounter();
    }
  }

  nextRecord() {
    if (this.currentRecord < this.totalRecords - 1) {
      this.saveCurrentRecord();
      this.currentRecord++;
      this.loadRecord(this.currentRecord);
      this.updateCounter();
    }
  }

  newRecord() {
    this.saveCurrentRecord();
    this.totalRecords++;
    this.currentRecord = this.totalRecords - 1;
    this.form.reset();
    this.form.querySelector('[autofocus]').focus();
    this.updateCounter();
  }

  saveCurrentRecord() {
    // Save to localStorage or API
    const data = new FormData(this.form);
    console.log('Saving record:', Object.fromEntries(data));
  }

  loadRecord(index) {
    // Load from storage/API
    console.log('Loading record:', index);
    this.form.reset();
    this.form.querySelector('[autofocus]').focus();
  }

  updateCounter() {
    document.querySelector('.entry-count').textContent =
      `Záznam ${this.currentRecord + 1} / ${this.totalRecords}`;
  }

  processBulkPaste() {
    const textarea = document.getElementById('bulk-paste');
    const data = textarea.value.trim();

    if (!data) return;

    // Parse tab-separated values
    const rows = data.split('\n').map(row => row.split('\t'));

    console.log('Parsed rows:', rows);

    // Process each row
    rows.forEach((row, index) => {
      if (row.length >= 5) {
        const [sku, name, category, price, stock] = row;
        // Create record
        console.log('Creating record:', { sku, name, category, price, stock });
      }
    });

    // Clear textarea
    textarea.value = '';

    // Show success message
    alert(`Zpracováno ${rows.length} záznamů`);
  }
}

// Initialize
new QuickDataEntry(document.getElementById('quick-entry'));
```

**OČEKÁVANÝ DOPAD:** +40-60% data entry speed

**CHECKLIST:**
- [ ] Logický tab order
- [ ] Enter = next field
- [ ] Ctrl+S = save
- [ ] Bulk paste support
- [ ] Record counter viditelný
- [ ] Prev/Next navigation
- [ ] Autofocus na první pole

---

## Practice #51: Form States & Feedback

**PROBLÉM:** Uživatel neví jestli se formulář odesílá, jestli byla akce úspěšná, nebo co se pokazilo.

**ŘEŠENÍ:** Jasné stavové indikátory pro každou fázi interakce.

**IMPLEMENTACE:**

### Stavy formuláře:
1. **Idle** - Default state
2. **Dirty** - Unsaved changes
3. **Validating** - Async validation
4. **Submitting** - Odesílání
5. **Success** - Úspěšně odesláno
6. **Error** - Chyba při odeslání

**KÓD:**

```html
<!-- Form with state indicators -->
<form id="stateful-form" data-state="idle">
  <!-- Form header with status -->
  <div class="form-status-bar">
    <span class="status-indicator">
      <span class="status-dot"></span>
      <span class="status-text">Připraveno</span>
    </span>
    <span class="last-saved" id="last-saved"></span>
  </div>

  <!-- Form fields -->
  <div class="form-body">
    <!-- ... fields ... -->
  </div>

  <!-- Submit area -->
  <div class="form-actions">
    <button type="button" class="btn-secondary" id="cancel-btn">
      Zrušit
    </button>
    <button type="submit" class="btn-primary" id="submit-btn">
      <span class="btn-text">Uložit změny</span>
      <span class="btn-spinner" hidden></span>
    </button>
  </div>
</form>

<!-- Success toast -->
<div class="toast toast-success" id="success-toast" hidden>
  <span class="toast-icon">✓</span>
  <span class="toast-message">Změny byly uloženy</span>
</div>

<!-- Error toast -->
<div class="toast toast-error" id="error-toast" hidden>
  <span class="toast-icon">✗</span>
  <span class="toast-message" id="error-message">Něco se pokazilo</span>
  <button class="btn-link" id="retry-btn">Zkusit znovu</button>
</div>
```

```css
/* Form states */
[data-state="idle"] .status-dot { background: #9ca3af; }
[data-state="dirty"] .status-dot { background: #f59e0b; }
[data-state="validating"] .status-dot { background: #3b82f6; animation: pulse 1s infinite; }
[data-state="submitting"] .status-dot { background: #3b82f6; animation: pulse 0.5s infinite; }
[data-state="success"] .status-dot { background: #059669; }
[data-state="error"] .status-dot { background: #dc2626; }

/* Status bar */
.form-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 24px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-text {
  font-size: 14px;
  color: #374151;
}

.last-saved {
  font-size: 13px;
  color: #6b7280;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Submit button states */
[data-state="submitting"] #submit-btn {
  pointer-events: none;
  opacity: 0.7;
}

[data-state="submitting"] .btn-text {
  display: none;
}

[data-state="submitting"] .btn-spinner {
  display: inline-block !important;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Toasts */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
}

.toast-success {
  background: #059669;
  color: white;
}

.toast-error {
  background: #dc2626;
  color: white;
}

.toast-icon {
  font-size: 20px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

```javascript
class StatefulForm {
  constructor(form) {
    this.form = form;
    this.originalData = new FormData(form);
    this.state = 'idle';

    this.init();
  }

  init() {
    // Track changes
    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => this.checkDirty());
    });

    // Submit handler
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Cancel handler
    document.getElementById('cancel-btn').addEventListener('click', () => this.cancel());

    // Retry handler
    document.getElementById('retry-btn').addEventListener('click', () => this.retry());
  }

  setState(newState) {
    this.state = newState;
    this.form.dataset.state = newState;
    this.updateStatusText();
  }

  updateStatusText() {
    const statusText = document.querySelector('.status-text');
    const texts = {
      idle: 'Připraveno',
      dirty: 'Neuložené změny',
      validating: 'Ověřuji...',
      submitting: 'Ukládám...',
      success: 'Uloženo',
      error: 'Chyba'
    };
    statusText.textContent = texts[this.state] || '';
  }

  checkDirty() {
    const currentData = new FormData(this.form);
    const isDirty = !this.isEqual(this.originalData, currentData);

    if (isDirty && this.state !== 'dirty') {
      this.setState('dirty');
    } else if (!isDirty && this.state === 'dirty') {
      this.setState('idle');
    }
  }

  isEqual(fd1, fd2) {
    const obj1 = Object.fromEntries(fd1);
    const obj2 = Object.fromEntries(fd2);
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState('submitting');

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success/failure
          if (Math.random() > 0.2) {
            resolve();
          } else {
            reject(new Error('Network error'));
          }
        }, 1500);
      });

      // Success
      this.setState('success');
      this.originalData = new FormData(this.form);
      this.showSuccessToast();

      // Reset to idle after delay
      setTimeout(() => this.setState('idle'), 2000);

    } catch (error) {
      // Error
      this.setState('error');
      this.showErrorToast(error.message);
    }
  }

  showSuccessToast() {
    const toast = document.getElementById('success-toast');
    toast.hidden = false;
    setTimeout(() => toast.hidden = true, 3000);
  }

  showErrorToast(message) {
    const toast = document.getElementById('error-toast');
    document.getElementById('error-message').textContent = message;
    toast.hidden = false;
  }

  cancel() {
    // Restore original data
    for (const [name, value] of this.originalData) {
      const input = this.form.querySelector(`[name="${name}"]`);
      if (input) input.value = value;
    }
    this.setState('idle');
  }

  retry() {
    document.getElementById('error-toast').hidden = true;
    this.form.requestSubmit();
  }
}

// Initialize
new StatefulForm(document.getElementById('stateful-form'));
```

**OČEKÁVANÝ DOPAD:** +20% user confidence, -30% support tickets

**CHECKLIST:**
- [ ] Dirty state indicator
- [ ] Loading/submitting state
- [ ] Success feedback (toast)
- [ ] Error feedback s retry
- [ ] Disabled submit během loading
- [ ] Last saved timestamp
- [ ] Cancel reverts změny

---

## Sources

- [Nielsen Norman Group: Website Forms Usability](https://www.nngroup.com/articles/web-form-design/)
- [IxDF: How to Design UI Forms](https://www.interaction-design.org/literature/article/ui-form-design)
- [Designlab: Form UI Design Best Practices](https://designlab.com/blog/form-ui-design-best-practices)
- [Pencil & Paper: Enterprise UX Design Guide](https://www.pencilandpaper.io/articles/enterprise-ux-design-guide)
