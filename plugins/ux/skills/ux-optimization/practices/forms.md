# Forms Optimization Practices

Based on 213 case studies from ILINČEV blog. Every field costs 5-10% conversion.

**See also:** `legal-ux.md` Practice #22 for checkbox/consent UX and GDPR compliance.

---

## Practice #1: Minimize Fields

**PROBLÉM:** Každé pole ve formuláři snižuje konverzní poměr o 5-10%.

**ŘEŠENÍ:** Ptej se pouze na data, která OPRAVDU potřebuješ TEĎ.

**IMPLEMENTACE:**

1. **Pro registraci:**
   - Email (slouží jako username)
   - Heslo (min. 6 znaků pro běžné služby)
   - TO JE VŠE

2. **NIKDY se neptej na:**
   - Telefonní číslo (pokud nevoláš)
   - Titul, prostřední jméno
   - "Jak jste se o nás dozvěděl" (máš Analytics)
   - PSČ při registraci (zeptej se při objednávce)
   - Firma, IČO (pokud není B2B)

3. **Pro e-shop checkout:**
   - Jméno
   - E-mail
   - Adresa dodání
   - Telefon (na doručení)
   - Platba & doprava

**KÓD:**

```html
<!-- ❌ ŠPATNĚ - 12 polí -->
<form>
  <input type="text" name="title" placeholder="Titul">
  <input type="text" name="firstName" placeholder="Jméno">
  <input type="text" name="middleName" placeholder="Prostřední jméno">
  <input type="text" name="lastName" placeholder="Příjmení">
  <input type="email" name="email" placeholder="E-mail">
  <input type="email" name="emailConfirm" placeholder="Potvrdit e-mail">
  <input type="tel" name="phone" placeholder="Telefon">
  <input type="text" name="company" placeholder="Firma">
  <input type="text" name="ico" placeholder="IČO">
  <input type="text" name="referral" placeholder="Jak jste nás našel?">
  <input type="password" name="password" placeholder="Heslo">
  <input type="password" name="passwordConfirm" placeholder="Potvrdit heslo">
  <button>Registrovat</button>
</form>

<!-- ✅ SPRÁVNĚ - 2 pole -->
<form class="register-form">
  <h2>Vytvořit účet</h2>

  <div class="form-group">
    <label for="email">E-mail</label>
    <input
      type="email"
      id="email"
      name="email"
      autocomplete="email"
      required
    >
  </div>

  <div class="form-group">
    <label for="password">Heslo</label>
    <input
      type="password"
      id="password"
      name="password"
      autocomplete="new-password"
      minlength="6"
      required
    >
    <div class="password-hint">Minimálně 6 znaků</div>
  </div>

  <button type="submit" class="btn-primary btn-full">
    Vytvořit účet
  </button>

  <p class="terms">
    Registrací souhlasíte s
    <a href="/podminky">podmínkami použití</a>
  </p>
</form>
```

**OČEKÁVANÝ DOPAD:** +10-30% conversion (12 polí → 2 pole)

**A/B TEST SETUP:**
- Baseline: Current form completion rate
- Variant: Minimalized form (2 fields)
- Sample: Min 100 registrations per variant
- Duration: 1-2 weeks

**CHECKLIST:**
- [ ] Každé pole je nezbytné TEPRVE?
- [ ] Můžu zjistit info jinak? (Analytics, API, later)
- [ ] Lze přesunout do dalšího kroku?
- [ ] Je jasný benefit registrace?

---

## Practice #2: Inline Validation (onBlur)

**PROBLÉM:** Uživatel vidí chybu až po odeslání formuláře = frustrace.

**ŘEŠENÍ:** Validuj pole OKAMŽITĚ po opuštění (onBlur event).

**IMPLEMENTACE:**

1. **Kdy validovat:**
   - ❌ onFocus (příliš brzy - ještě nic nenapsal)
   - ✅ onBlur (při opuštění pole - ideální)
   - ✅ onChange (v reálném čase pro hesla)
   - ❌ onSubmit (příliš pozdě - všechny chyby najednou)

2. **Co zobrazit:**
   - Červený border + ikona ❌
   - Konkrétní chybová hláška POD polem
   - Zelený border + ikona ✅ při správném vyplnění

**KÓD:**

```javascript
// Validace formuláře
class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll('input[required]');
    this.init();
  }

  init() {
    this.inputs.forEach(input => {
      // Validuj při opuštění pole
      input.addEventListener('blur', () => this.validateField(input));

      // Pro heslo validuj v reálném čase
      if (input.type === 'password') {
        input.addEventListener('input', () => this.validateField(input));
      }
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(input) {
    const value = input.value.trim();
    const type = input.type;

    // Prázdné pole
    if (!value && input.required) {
      this.showError(input, 'Toto pole je povinné');
      return false;
    }

    // Email validace
    if (type === 'email') {
      if (!this.isValidEmail(value)) {
        this.showError(input, 'Zadejte platný e-mail (např. jmeno@domena.cz)');
        return false;
      }
    }

    // Heslo validace
    if (type === 'password') {
      if (value.length < 6) {
        this.showError(input, `Heslo musí mít min. 6 znaků (nyní ${value.length})`);
        return false;
      }
    }

    // Vše OK
    this.showSuccess(input);
    return true;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message') ||
                     this.createErrorElement();

    formGroup.classList.add('has-error');
    formGroup.classList.remove('has-success');
    errorDiv.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorDiv);
    }
  }

  showSuccess(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');

    formGroup.classList.add('has-success');
    formGroup.classList.remove('has-error');

    if (errorDiv) {
      errorDiv.remove();
    }
  }

  createErrorElement() {
    const div = document.createElement('div');
    div.className = 'error-message';
    return div;
  }

  handleSubmit(e) {
    e.preventDefault();

    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.form.submit();
    } else {
      // Scroll na první chybu
      const firstError = this.form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.querySelector('input').focus();
      }
    }
  }
}

// Použití
const form = document.querySelector('form');
new FormValidator(form);
```

**CSS:**

```css
.form-group {
  position: relative;
  margin-bottom: 24px;
}

/* Defaultní stav */
.form-group input {
  border: 2px solid #E0E0E0;
  transition: border-color 0.2s;
}

/* Focus */
.form-group input:focus {
  border-color: #0066CC;
  outline: none;
}

/* Error stav */
.form-group.has-error input {
  border-color: #DC3545;
}

.error-message {
  color: #DC3545;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
}

.error-message::before {
  content: '⚠️';
  margin-right: 4px;
}

/* Success stav */
.form-group.has-success input {
  border-color: #28A745;
}

.form-group.has-success::after {
  content: '✅';
  position: absolute;
  right: 12px;
  top: 38px;
}
```

**OČEKÁVANÝ DOPAD:** +15-25% conversion (immediate feedback)

**A/B TEST SETUP:**
- Baseline: Validation on submit only
- Variant: Inline validation onBlur
- Sample: Min 100 form submissions per variant
- Duration: 1-2 weeks

**CHECKLIST:**
- [ ] Validace onBlur, ne onFocus
- [ ] Konkrétní error messages (ne jen "Invalid")
- [ ] Zelená ikona při úspěchu
- [ ] Scroll na první chybu při submitu
- [ ] Funguje na mobile

---

## Practice #3: Ukázat požadavky na heslo DOPŘEDU

**PROBLÉM:** Uživatel nedokáže vytvořit validní heslo, protože neví požadavky.

**ŘEŠENÍ:** Ukazuj požadavky VŽDY a označuj splněné v reálném čase.

**IMPLEMENTACE:**

1. **Pro běžné služby:**
   - Minimálně 6 znaků

2. **Pro citlivé (banking, health):**
   - Minimálně 8 znaků
   - 1 velké písmeno
   - 1 číslice
   - 2FA (autentizační aplikace)

**KÓD:**

```html
<div class="form-group">
  <label for="password">Heslo</label>
  <input type="password" id="password" name="password">
  <button type="button" class="toggle-password">👁️ Zobrazit</button>

  <ul class="password-requirements">
    <li id="req-length" class="requirement">
      <span class="icon">⭕</span> Minimálně 8 znaků
    </li>
    <li id="req-uppercase" class="requirement">
      <span class="icon">⭕</span> Jedno velké písmeno
    </li>
    <li id="req-number" class="requirement">
      <span class="icon">⭕</span> Jedna číslice
    </li>
  </ul>

  <!-- Bonus: Síla hesla -->
  <div class="password-strength">
    <div class="strength-bar">
      <div class="strength-fill" data-strength="0"></div>
    </div>
    <span class="strength-text">Slabé</span>
  </div>
</div>

<script>
const passwordInput = document.querySelector('#password');
const requirements = {
  length: document.querySelector('#req-length'),
  uppercase: document.querySelector('#req-uppercase'),
  number: document.querySelector('#req-number')
};

passwordInput.addEventListener('input', (e) => {
  const value = e.target.value;
  let strength = 0;

  // Check length
  if (value.length >= 8) {
    requirements.length.querySelector('.icon').textContent = '✅';
    requirements.length.classList.add('valid');
    strength++;
  } else {
    requirements.length.querySelector('.icon').textContent = '⭕';
    requirements.length.classList.remove('valid');
  }

  // Check uppercase
  if (/[A-Z]/.test(value)) {
    requirements.uppercase.querySelector('.icon').textContent = '✅';
    requirements.uppercase.classList.add('valid');
    strength++;
  } else {
    requirements.uppercase.querySelector('.icon').textContent = '⭕';
    requirements.uppercase.classList.remove('valid');
  }

  // Check number
  if (/[0-9]/.test(value)) {
    requirements.number.querySelector('.icon').textContent = '✅';
    requirements.number.classList.add('valid');
    strength++;
  } else {
    requirements.number.querySelector('.icon').textContent = '⭕';
    requirements.number.classList.remove('valid');
  }

  // Update strength indicator
  const strengthFill = document.querySelector('.strength-fill');
  const strengthText = document.querySelector('.strength-text');

  strengthFill.setAttribute('data-strength', strength);

  if (strength === 0) {
    strengthText.textContent = 'Velmi slabé';
  } else if (strength === 1) {
    strengthText.textContent = 'Slabé';
  } else if (strength === 2) {
    strengthText.textContent = 'Střední';
  } else if (strength === 3) {
    strengthText.textContent = 'Silné';
  }
});
</script>

<style>
.password-requirements {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}

.requirement {
  font-size: 14px;
  color: #666;
  padding: 4px 0;
  transition: color 0.2s;
}

.requirement.valid {
  color: #28A745;
}

.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background: #E0E0E0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
}

.strength-fill[data-strength="0"] {
  width: 0%;
}

.strength-fill[data-strength="1"] {
  width: 33%;
  background: #DC3545;
}

.strength-fill[data-strength="2"] {
  width: 66%;
  background: #FFC107;
}

.strength-fill[data-strength="3"] {
  width: 100%;
  background: #28A745;
}

.strength-text {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  display: inline-block;
}
</style>
```

**OČEKÁVANÝ DOPAD:** +10-20% conversion (no frustration with password)

**A/B TEST SETUP:**
- Baseline: No password requirements shown
- Variant: Requirements shown + real-time validation
- Sample: Min 100 registrations per variant

**CHECKLIST:**
- [ ] Requirements visible BEFORE typing
- [ ] Real-time validation (onChange)
- [ ] Green checkmarks for met requirements
- [ ] Strength indicator (bonus)
- [ ] Mobile-friendly

---

## Practice #4: Toggle viditelnosti hesla

**PROBLÉM:** Uživatel udělá překlep a neví kde.

**ŘEŠENÍ:** Ikona oka pro zobrazení/skrytí hesla.

**KÓD:**

```html
<div class="password-field">
  <input type="password" id="password" name="password">
  <button
    type="button"
    class="toggle-password"
    aria-label="Zobrazit heslo"
    onclick="togglePasswordVisibility()"
  >
    👁️
  </button>
</div>

<script>
function togglePasswordVisibility() {
  const passwordInput = document.querySelector('#password');
  const toggleButton = document.querySelector('.toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = '🙈';
    toggleButton.setAttribute('aria-label', 'Skrýt heslo');
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = '👁️';
    toggleButton.setAttribute('aria-label', 'Zobrazit heslo');
  }
}
</script>

<style>
.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.toggle-password:hover {
  opacity: 1;
}
</style>
```

**OČEKÁVANÝ DOPAD:** +10-15% conversion (less typos)

**CHECKLIST:**
- [ ] Ikona vedle pole (ne overlay na input)
- [ ] aria-label pro accessibility
- [ ] Hover state
- [ ] Toggle funguje

---

## Practice #5: Social login

**PROBLÉM:** Uživatelé zapomínají hesla.

**ŘEŠENÍ:** Umožni přihlášení přes Google/Facebook/Apple.

**IMPLEMENTACE:**

1. **Pořadí podle věku:**
   - 18-25 let: Social login NAD e-mail (71% preferuje)
   - 50+ let: Social login POD e-mail (jen 17% preferuje)

2. **Pořadí platforem (ČR):**
   - Google (nejvíc používané)
   - Facebook
   - Apple
   - Seznam

**KÓD:**

```html
<div class="login-options">
  <!-- Pro mladší: social první -->
  <div class="social-logins">
    <button class="social-login google">
      <img src="/icons/google.svg" alt="">
      Pokračovat s Google
    </button>
    <button class="social-login facebook">
      <img src="/icons/facebook.svg" alt="">
      Pokračovat s Facebook
    </button>
    <button class="social-login apple">
      <img src="/icons/apple.svg" alt="">
      Pokračovat s Apple
    </button>
  </div>

  <div class="divider">
    <span>nebo</span>
  </div>

  <form class="email-login">
    <input type="email" placeholder="E-mail" autocomplete="email">
    <input type="password" placeholder="Heslo" autocomplete="current-password">
    <button type="submit">Přihlásit e-mailem</button>
  </form>
</div>

<style>
.social-login {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
}

.social-login:hover {
  border-color: #0066CC;
  background: #F5F9FF;
}

.social-login img {
  width: 20px;
  height: 20px;
}

.social-login.google:hover {
  border-color: #4285F4;
}

.social-login.facebook:hover {
  border-color: #1877F2;
}

.social-login.apple:hover {
  border-color: #000000;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #E0E0E0;
}

.divider span {
  padding: 0 16px;
  color: #666;
  font-size: 14px;
}
</style>
```

**OČEKÁVANÝ DOPAD:** +20-40% registrations (18-25 age group)

**A/B TEST SETUP:**
- Baseline: Email/password only
- Variant: Social login options
- Segment: By age group
- Sample: Min 100 registrations per variant per age group

**CHECKLIST:**
- [ ] Google, Facebook, Apple podporovány
- [ ] Pořadí podle cílové skupiny
- [ ] OAuth2 správně implementováno
- [ ] Privacy policy updated
- [ ] Error handling (social login failed)

---

## Practice #6: Správná mobilní klávesnice

**PROBLÉM:** Uživatel musí přepínat mezi klávesnicemi.

**ŘEŠENÍ:** Ukaž správnou klávesnici podle typu pole.

**KÓD:**

```html
<!-- E-mail → klávesnice se zavináčem -->
<input
  type="email"
  inputmode="email"
  autocomplete="email"
  placeholder="jmeno@domena.cz"
>

<!-- Telefon → numpad -->
<input
  type="tel"
  inputmode="tel"
  autocomplete="tel"
  placeholder="+420 123 456 789"
>

<!-- PSČ → numpad -->
<input
  type="text"
  inputmode="numeric"
  pattern="[0-9]*"
  autocomplete="postal-code"
  placeholder="12345"
>

<!-- Číslo karty → numpad -->
<input
  type="text"
  inputmode="numeric"
  pattern="[0-9]*"
  autocomplete="cc-number"
  placeholder="1234 5678 9012 3456"
>

<!-- URL → klávesnice s .com -->
<input
  type="url"
  inputmode="url"
  autocomplete="url"
  placeholder="https://example.com"
>

<!-- Hledání → tlačítko "Hledat" -->
<input
  type="search"
  inputmode="search"
  placeholder="Hledat..."
>

<!-- Text s kapitalizací (jméno) -->
<input
  type="text"
  autocomplete="given-name"
  autocapitalize="words"
  placeholder="Jan"
>
```

**INPUTMODE hodnoty:**
- `email` - @ a . snadno dostupné
- `tel` - numpad
- `numeric` - numpad (pro čísla, ne telefon)
- `url` - / a .com snadno dostupné
- `search` - tlačítko "Hledat"
- `text` - standardní klávesnice
- `none` - žádná klávesnice (custom input)

**OČEKÁVANÝ DOPAD:** +15-30% mobile conversion

**CHECKLIST:**
- [ ] Každé pole má správný inputmode
- [ ] Autocomplete atributy
- [ ] Pattern pro validaci (pokud nutné)
- [ ] Placeholder ukazuje expected format
- [ ] Testováno na iOS i Android

---

## Practice #7: Autofill atributy

**PROBLÉM:** Prohlížeč neumí automaticky vyplnit data.

**ŘEŠENÍ:** Používej správné autocomplete atributy.

**KÓD:**

```html
<!-- Osobní údaje -->
<input type="text" name="name" autocomplete="name" placeholder="Jan Novák">
<input type="text" name="firstName" autocomplete="given-name" placeholder="Jan">
<input type="text" name="lastName" autocomplete="family-name" placeholder="Novák">
<input type="email" name="email" autocomplete="email" placeholder="jan@novak.cz">
<input type="tel" name="phone" autocomplete="tel" placeholder="+420 123 456 789">

<!-- Adresa -->
<input type="text" name="address" autocomplete="street-address" placeholder="Ulice 123">
<input type="text" name="city" autocomplete="address-level2" placeholder="Praha">
<input type="text" name="zip" autocomplete="postal-code" placeholder="12000">
<input type="text" name="country" autocomplete="country-name" placeholder="Česká republika">

<!-- Platební karta -->
<input type="text" name="ccname" autocomplete="cc-name" placeholder="Jméno na kartě">
<input type="text" name="ccnumber" autocomplete="cc-number" placeholder="1234 5678 9012 3456">
<input type="text" name="ccexp" autocomplete="cc-exp" placeholder="12/25">
<input type="text" name="cvc" autocomplete="cc-csc" placeholder="123">

<!-- Přihlášení -->
<input type="email" name="email" autocomplete="username" placeholder="E-mail">
<input type="password" name="password" autocomplete="current-password" placeholder="Heslo">

<!-- Nové heslo (registrace) -->
<input type="password" name="newPassword" autocomplete="new-password" placeholder="Nové heslo">
```

**Kompletní seznam autocomplete hodnot:**
https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

**OČEKÁVANÝ DOPAD:** +10-20% conversion (especially mobile)

**CHECKLIST:**
- [ ] Všechna pole mají autocomplete
- [ ] Správné hodnoty (ne jen "on")
- [ ] name atribut odpovídá účelu
- [ ] Testuj autofill na reálném zařízení

---

## Practice #8: Konkrétní chybové hlášky

**PROBLÉM:** Generická chybová hláška "Neplatný vstup".

**ŘEŠENÍ:** Řekni CO je špatně a JAK to opravit.

**KÓD:**

```javascript
function validateEmail(email) {
  // ❌ ŠPATNĚ
  if (!isValid(email)) {
    return 'Neplatný vstup';
  }

  // ✅ SPRÁVNĚ - konkrétní feedback
  if (email.length === 0) {
    return 'E-mail je povinný';
  }

  if (!email.includes('@')) {
    return 'E-mail musí obsahovat zavináč (@)';
  }

  if (!email.includes('.')) {
    return 'E-mail musí obsahovat tečku (např. jmeno@domena.cz)';
  }

  if (email.endsWith('@')) {
    return 'Doplňte doménu po zavináči (např. @gmail.com)';
  }

  if (email.startsWith('@')) {
    return 'E-mail musí začínat jménem (např. jan@domena.cz)';
  }

  const domain = email.split('@')[1];
  if (domain && !domain.includes('.')) {
    return 'Doména musí obsahovat tečku (např. gmail.com)';
  }

  return null; // Valid
}

function validatePassword(password) {
  // ❌ ŠPATNĚ
  if (password.length < 8) {
    return 'Neplatné heslo';
  }

  // ✅ SPRÁVNĚ - konkrétní co chybí
  if (password.length < 8) {
    return `Heslo musí mít minimálně 8 znaků (nyní má ${password.length})`;
  }

  if (!/[A-Z]/.test(password)) {
    return 'Heslo musí obsahovat alespoň jedno velké písmeno (A-Z)';
  }

  if (!/[0-9]/.test(password)) {
    return 'Heslo musí obsahovat alespoň jednu číslici (0-9)';
  }

  return null; // Valid
}

function validatePhone(phone) {
  const digitsOnly = phone.replace(/\D/g, '');

  if (digitsOnly.length === 0) {
    return 'Telefon je povinný';
  }

  if (digitsOnly.length < 9) {
    return `Telefon musí mít 9 číslic (nyní má ${digitsOnly.length})`;
  }

  if (digitsOnly.length > 9) {
    return `Telefon má příliš mnoho číslic (${digitsOnly.length}, očekáváno 9)`;
  }

  return null; // Valid
}
```

**OČEKÁVANÝ DOPAD:** +10-15% conversion (less frustration)

**A/B TEST SETUP:**
- Baseline: Generic errors ("Invalid input", "Error")
- Variant: Specific, helpful errors
- Sample: Min 100 form submissions per variant
- Measure: Form abandonment rate, completion time

**CHECKLIST:**
- [ ] Každá chyba má konkrétní message
- [ ] Message říká CO je špatně
- [ ] Message říká JAK to opravit
- [ ] Pokud je počet znaků problém, ukaž ho
- [ ] Pokud je format problém, ukaž expected format
- [ ] Friendly tone (ne "ERROR!", ale "Pomůžeme vám...")

---

---

## Practice #9: Multi-Step Forms (Progressive Disclosure)

**PROBLÉM:** Long forms scare users (looks like too much work).

**ŘEŠENÍ:** Break into steps, show progress, ask easier questions first.

### When to Use Multi-Step

**Use multi-step when:**
- Form has 8+ fields
- Complex decision-making (e.g., insurance quote, loan application)
- Different sections (personal info → shipping → payment)

**DON'T use multi-step when:**
- Form has <5 fields (unnecessary complexity)
- Single context (login, newsletter signup)

---

### Implementation Pattern

```html
<div class="multi-step-form">
  <!-- Progress indicator -->
  <div class="progress-steps">
    <div class="step active">
      <span class="step-number">1</span>
      <span class="step-label">Osobní údaje</span>
    </div>
    <div class="step">
      <span class="step-number">2</span>
      <span class="step-label">Doručení</span>
    </div>
    <div class="step">
      <span class="step-number">3</span>
      <span class="step-label">Platba</span>
    </div>
  </div>

  <!-- Step 1: Personal info -->
  <div class="form-step" data-step="1">
    <h2>Osobní údaje</h2>
    <input type="text" name="name" placeholder="Jméno a příjmení" required>
    <input type="email" name="email" placeholder="E-mail" required>
    <input type="tel" name="phone" placeholder="Telefon" required>

    <button type="button" onclick="nextStep()">Pokračovat →</button>
  </div>

  <!-- Step 2: Shipping -->
  <div class="form-step" data-step="2" hidden>
    <h2>Doručení</h2>
    <input type="text" name="address" placeholder="Ulice a číslo popisné" required>
    <input type="text" name="city" placeholder="Město" required>
    <input type="text" name="zip" placeholder="PSČ" required>

    <button type="button" onclick="prevStep()">← Zpět</button>
    <button type="button" onclick="nextStep()">Pokračovat →</button>
  </div>

  <!-- Step 3: Payment -->
  <div class="form-step" data-step="3" hidden>
    <h2>Platba</h2>
    <select name="payment" required>
      <option value="">Vyberte způsob platby</option>
      <option value="card">Karta</option>
      <option value="transfer">Bankovní převod</option>
    </select>

    <button type="button" onclick="prevStep()">← Zpět</button>
    <button type="submit">Dokončit objednávku</button>
  </div>
</div>

<script>
let currentStep = 1;
const totalSteps = 3;

function nextStep() {
  // Validate current step before proceeding
  const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  const inputs = currentStepEl.querySelectorAll('[required]');

  let isValid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  if (!isValid) {
    alert('Vyplňte všechna povinná pole');
    return;
  }

  // Hide current step
  currentStepEl.hidden = true;

  // Show next step
  currentStep++;
  const nextStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  nextStepEl.hidden = false;

  // Update progress
  updateProgress();
}

function prevStep() {
  // Hide current step
  const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  currentStepEl.hidden = true;

  // Show previous step
  currentStep--;
  const prevStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  prevStepEl.hidden = false;

  // Update progress
  updateProgress();
}

function updateProgress() {
  document.querySelectorAll('.step').forEach((step, index) => {
    if (index + 1 < currentStep) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (index + 1 === currentStep) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('active', 'completed');
    }
  });
}
</script>

<style>
.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 24px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  position: relative;
  opacity: 0.5;
}

.step::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #E0E0E0;
  z-index: -1;
}

.step:last-child::after {
  display: none;
}

.step.active,
.step.completed {
  opacity: 1;
}

.step.completed::after {
  background: #28A745;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E0E0E0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s;
}

.step.active .step-number {
  background: #0066CC;
  color: white;
}

.step.completed .step-number {
  background: #28A745;
  color: white;
}

.step.completed .step-number::after {
  content: '✓';
}

.step-label {
  font-size: 14px;
  color: #666;
}

.step.active .step-label {
  color: #0066CC;
  font-weight: 500;
}

.form-step {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
```

---

### Best Practices

**1. Show progress (CRITICAL)**
- Visual indicator: "Krok 2 ze 3"
- Progress bar
- Numbered steps
- **Why:** Users need to know how much more work

**2. Easy questions first**
- Start: Name, email (easy)
- Middle: Address, phone (medium)
- End: Payment, complex decisions (hard)
- **Why:** Commitment escalation (already invested time)

**3. Allow going back**
- "← Zpět" button on all steps except first
- Don't lose data when going back
- **Why:** Users need to correct mistakes

**4. Validate per step**
- Don't let user proceed with errors
- Show errors inline (Practice #2)
- **Why:** Catch errors early

**5. Save progress (optional)**
- For very long forms (insurance, loans)
- "Save and continue later" option
- Email link to resume
- **Why:** Users may not have all info immediately

---

### Mobile Optimization

**Sticky progress bar:**
```css
.progress-steps {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**Swipe navigation (advanced):**
```javascript
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const diff = touchEndX - touchStartX;

  if (diff > 50 && currentStep > 1) {
    prevStep(); // Swipe right = back
  } else if (diff < -50 && currentStep < totalSteps) {
    nextStep(); // Swipe left = forward
  }
});
```

---

### OČEKÁVANÝ DOPAD

**Case studies:**
- Expedia: 12 fields → 2 steps = +12% conversion
- Vendio: 8 fields → 3 steps = +10% completion
- Amazon: Multi-step checkout = standard (for good reason)

**When to expect improvement:**
- Long forms (8+ fields): +10-20%
- Complex forms (insurance, loans): +20-30%
- Mobile users: +15-25% (less overwhelming on small screen)

---

### CHECKLIST

- [ ] Progress indicator visible
- [ ] Easy questions first
- [ ] "Zpět" button on steps 2+
- [ ] Validate before allowing next step
- [ ] Data persists when going back
- [ ] Mobile: Sticky progress bar
- [ ] Mobile: Touch-friendly buttons (44×44px)
- [ ] Consider save-and-resume for long forms

---

## Summary

**9 Forms Practices:**
1. **Minimize fields** (+10-30%) - Each field -5-10% conversion
2. **Inline validation** (+15-25%) - onBlur, not onSubmit
3. **Show password requirements** (+10-20%) - Upfront, real-time
4. **Toggle password visibility** (+10-15%) - Eye icon
5. **Social login** (+20-40%) - Google, Facebook, Apple
6. **Mobile keyboard** (+15-30%) - inputmode attribute
7. **Autofill** (+10-20%) - autocomplete attributes
8. **Concrete errors** (+10-15%) - Say WHAT and HOW
9. **Multi-step forms** (+10-30%) - Progressive disclosure for long forms

**Total potential:** +120-250% conversion with all practices combined

**Priority order (ICE):**
1. Minimize fields (high impact, high ease)
2. Inline validation (high impact, medium ease)
3. Mobile keyboard (high impact, high ease)
4. Multi-step forms (high impact for long forms, medium complexity)
5. Social login (high impact, medium complexity)
6. Password requirements (medium impact, high ease)

**See also:**
- `legal-ux.md` Practice #22 - Checkbox/consent UX and GDPR compliance
- `accessibility.md` Practice #26 - Form accessibility (labels, ARIA, error messages)

**Next:** See practices/ecommerce.md for e-shop optimization
