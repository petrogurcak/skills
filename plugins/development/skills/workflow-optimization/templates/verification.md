# Verification Checklist

> **Pravidlo:** Před KAŽDÝM commitem projít relevantní sekce.
> **Proč:** Built-in verification = 2-3x quality (Anthropic pattern)

---

## Before EVERY Commit

### Code Quality
- [ ] Změny jsou minimální - jen to co bylo požadováno
- [ ] Žádné hardcoded values (magic numbers, URLs, secrets)
- [ ] Žádné TODO/FIXME bez issue čísla
- [ ] Commit message vysvětluje PROČ, ne CO

---

## [STACK-SPECIFIC SECTION]

<!-- Replace with appropriate section based on detected stack -->

### Python/FastAPI

#### Tests
- [ ] `pytest` passes
- [ ] Nový kód má testy (RED → GREEN)
- [ ] Edge cases pokryté

#### Type Safety
- [ ] `mypy app` - no errors
- [ ] Všechny funkce mají type hints
- [ ] Pydantic models validují vstupy

#### Security
- [ ] Input validation na všech endpointech
- [ ] Tenant isolation zachována
- [ ] Žádné secrets v kódu nebo logách
- [ ] Rate limiting na public endpointech

#### Database
- [ ] Migrace má downgrade
- [ ] Žádné N+1 queries
- [ ] Indexy na foreign keys

---

### Expo/React Native

#### Tests
- [ ] `npm test` passes
- [ ] Komponenty mají basic testy

#### Type Safety
- [ ] `npx tsc --noEmit` - no errors
- [ ] Props mají TypeScript typy

#### UI/UX
- [ ] iOS Simulator test
- [ ] Android emulator test (pokud UI změna)
- [ ] Dark mode funguje
- [ ] Touch targets min 48x48px

#### i18n
- [ ] Všechny stringy přes `t()` funkci
- [ ] cs.json a en.json aktualizovány

---

### Nette/PHP

#### Templates
- [ ] Latte syntax správná (n:href, n:class)
- [ ] Překlady přes `{_'key'}`
- [ ] SEO meta tags přítomné

#### Assets
- [ ] `npm run build` prošel
- [ ] Vite manifest aktuální

---

## Deployment

### Pre-Deploy
- [ ] Všechny testy prošly
- [ ] `.env` není v commitu
- [ ] Migrations jsou reversible

### Post-Deploy
- [ ] Health check endpoint odpovídá
- [ ] Logs bez errors
- [ ] Cache cleared

---

## Red Flags - Stop & Review

- [ ] Changing auth/security code → security review
- [ ] Changing billing code → extra careful
- [ ] Changing tenant isolation → verify no data leaks
- [ ] Large refactor → incremental commits

---

**Last Updated:** [DATE]
