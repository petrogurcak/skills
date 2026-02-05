# Data Tables Optimization Practices

Based on research from NN/g, Baymard Institute, Material Design guidelines, and 40+ admin dashboard case studies.

**Core principle:** Tables are the backbone of admin interfaces. Every inefficiency compounds across hundreds of daily interactions.

---

## Practice #34: Table Layout & Visual Scanning

**PROBLÉM:** Uživatelé tráví 60%+ času v admin panelech skenováním tabulek. Špatný layout = únava, chyby, frustrace.

**ŘEŠENÍ:** Optimalizuj layout pro rychlé vertikální skenování s jasnou vizuální hierarchií.

**IMPLEMENTACE:**

1. **Zebra striping (alternující řádky)**
   - Používej POUZE světlé odstíny (např. #f9fafb vs #ffffff)
   - Nikdy ne tmavé nebo výrazné barvy
   - Pomáhá oku sledovat řádek horizontálně

2. **Fixed headers**
   - Header tabulky vždy viditelný při scrollu
   - Uživatel vždy ví, co která kolona znamená

3. **Column width optimization**
   - Primární identifikátor (název, ID) = širší
   - Čísla = užší, zarovnání vpravo
   - Datumy = konzistentní šířka
   - Akce = fixní šířka na konci

4. **Vertical alignment**
   - Text = top nebo middle
   - Čísla = middle, zarovnání vpravo
   - Akce = middle, center

**KÓD:**

```html
<!-- ❌ ŠPATNĚ - žádná struktura, špatné zarovnání -->
<table>
  <tr><td>Jan Novák</td><td>jan@email.cz</td><td>1500</td><td>2024-01-15</td></tr>
  <tr><td>Marie Svobodová</td><td>marie@email.cz</td><td>2300</td><td>2024-01-14</td></tr>
</table>

<!-- ✅ SPRÁVNĚ - zebra striping, fixed header, správné zarovnání -->
<div class="table-container">
  <table class="data-table">
    <thead class="sticky-header">
      <tr>
        <th class="col-name">Jméno</th>
        <th class="col-email">E-mail</th>
        <th class="col-amount text-right">Částka</th>
        <th class="col-date">Datum</th>
        <th class="col-actions">Akce</th>
      </tr>
    </thead>
    <tbody>
      <tr class="row-odd">
        <td class="col-name">Jan Novák</td>
        <td class="col-email">jan@email.cz</td>
        <td class="col-amount text-right">1 500 Kč</td>
        <td class="col-date">15. 1. 2024</td>
        <td class="col-actions">
          <button class="btn-icon" title="Upravit">✏️</button>
          <button class="btn-icon" title="Smazat">🗑️</button>
        </td>
      </tr>
      <tr class="row-even">
        <td class="col-name">Marie Svobodová</td>
        <td class="col-email">marie@email.cz</td>
        <td class="col-amount text-right">2 300 Kč</td>
        <td class="col-date">14. 1. 2024</td>
        <td class="col-actions">
          <button class="btn-icon" title="Upravit">✏️</button>
          <button class="btn-icon" title="Smazat">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
/* Table container pro horizontal scroll na mobilu */
.table-container {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* Sticky header */
.sticky-header {
  position: sticky;
  top: 0;
  background: #f9fafb;
  z-index: 10;
}

.sticky-header th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

/* Zebra striping - SVĚTLÉ odstíny */
.row-odd { background: #ffffff; }
.row-even { background: #f9fafb; }

/* Hover state */
tbody tr:hover {
  background: #f3f4f6;
}

/* Cell styling */
.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

/* Right align pro čísla */
.text-right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* Column widths */
.col-name { min-width: 150px; }
.col-email { min-width: 200px; }
.col-amount { min-width: 100px; }
.col-date { min-width: 120px; }
.col-actions {
  min-width: 100px;
  text-align: center;
}
```

**OČEKÁVANÝ DOPAD:** +15-25% rychlost skenování, -20% chybovost při výběru řádku

**A/B TEST SETUP:**
- Baseline: Čas potřebný k nalezení konkrétního záznamu
- Variant: Optimalizovaný layout
- Metrika: Task completion time, error rate
- Sample: Min 50 uživatelů, 10 tasků každý

**CHECKLIST:**
- [ ] Zebra striping se světlými odstíny
- [ ] Fixed/sticky header
- [ ] Čísla zarovnaná vpravo s tabular-nums
- [ ] Hover state na řádcích
- [ ] Horizontal scroll na mobilu (ne oříznutí)

---

## Practice #35: Sorting & Filtering

**PROBLÉM:** Uživatelé nemohou najít data v tabulce s 100+ záznamy. 78% uživatelů opustí stránku, pokud nenajdou data do 30 sekund.

**ŘEŠENÍ:** Implementuj multi-column sorting a víceúrovňové filtrování.

**IMPLEMENTACE:**

1. **Column sorting**
   - Kliknutí na header = sort ascending
   - Druhé kliknutí = sort descending
   - Třetí kliknutí = reset
   - Vizuální indikátor směru (šipka)

2. **Quick filters**
   - Nad tabulkou, vždy viditelné
   - Pro nejčastější use cases
   - Max 3-4 quick filters

3. **Advanced filters**
   - Skryté v "Filtry" dropdown/panel
   - Pro komplexní kombinace
   - "Aplikovat" a "Resetovat" tlačítka

4. **Search**
   - Full-text search přes všechny sloupce
   - Nebo per-column search
   - Debounce 300ms pro API calls

**KÓD:**

```html
<!-- Filter bar nad tabulkou -->
<div class="table-controls">
  <!-- Search -->
  <div class="search-box">
    <input
      type="search"
      placeholder="Hledat..."
      class="search-input"
      aria-label="Hledat v tabulce"
    >
  </div>

  <!-- Quick filters -->
  <div class="quick-filters">
    <select class="filter-select" aria-label="Filtr podle stavu">
      <option value="">Všechny stavy</option>
      <option value="active">Aktivní</option>
      <option value="inactive">Neaktivní</option>
      <option value="pending">Čekající</option>
    </select>

    <select class="filter-select" aria-label="Filtr podle období">
      <option value="">Všechna období</option>
      <option value="today">Dnes</option>
      <option value="week">Tento týden</option>
      <option value="month">Tento měsíc</option>
    </select>
  </div>

  <!-- Advanced filters toggle -->
  <button class="btn-secondary" id="toggle-advanced">
    Pokročilé filtry
  </button>

  <!-- Active filters indicator -->
  <div class="active-filters" id="active-filters">
    <span class="filter-tag">
      Stav: Aktivní
      <button class="remove-filter" aria-label="Odstranit filtr">×</button>
    </span>
  </div>
</div>

<!-- Sortable table header -->
<thead>
  <tr>
    <th class="sortable" data-sort="name" aria-sort="none">
      Jméno
      <span class="sort-icon">⇅</span>
    </th>
    <th class="sortable sorted-asc" data-sort="date" aria-sort="ascending">
      Datum
      <span class="sort-icon">↑</span>
    </th>
    <th class="sortable" data-sort="amount" aria-sort="none">
      Částka
      <span class="sort-icon">⇅</span>
    </th>
  </tr>
</thead>
```

```css
/* Table controls */
.table-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

/* Search */
.search-input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  min-width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Filter selects */
.filter-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
}

/* Active filter tags */
.active-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 4px;
  font-size: 12px;
}

.remove-filter {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #1e40af;
}

/* Sortable headers */
.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background: #f3f4f6;
}

.sort-icon {
  margin-left: 4px;
  opacity: 0.5;
}

.sorted-asc .sort-icon,
.sorted-desc .sort-icon {
  opacity: 1;
}
```

```javascript
// Sorting logic
class TableSorter {
  constructor(table) {
    this.table = table;
    this.currentSort = { column: null, direction: null };
    this.initSorting();
  }

  initSorting() {
    const headers = this.table.querySelectorAll('.sortable');
    headers.forEach(header => {
      header.addEventListener('click', () => this.sort(header));
    });
  }

  sort(header) {
    const column = header.dataset.sort;
    let direction = 'asc';

    // Cycle: none -> asc -> desc -> none
    if (this.currentSort.column === column) {
      if (this.currentSort.direction === 'asc') {
        direction = 'desc';
      } else if (this.currentSort.direction === 'desc') {
        direction = null; // Reset
      }
    }

    // Update UI
    this.table.querySelectorAll('.sortable').forEach(h => {
      h.classList.remove('sorted-asc', 'sorted-desc');
      h.setAttribute('aria-sort', 'none');
    });

    if (direction) {
      header.classList.add(`sorted-${direction}`);
      header.setAttribute('aria-sort', direction === 'asc' ? 'ascending' : 'descending');
    }

    this.currentSort = { column, direction };
    this.performSort();
  }

  performSort() {
    // Implement actual sorting logic or API call
    console.log('Sorting by:', this.currentSort);
  }
}

// Search with debounce
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', debounce((e) => {
  const query = e.target.value;
  // Perform search (API call or client-side filter)
  console.log('Searching for:', query);
}, 300));
```

**OČEKÁVANÝ DOPAD:** +20-35% rychlost nalezení dat, -40% frustrace uživatelů

**A/B TEST SETUP:**
- Baseline: Čas k nalezení specifického záznamu
- Variant: S quick filters + search
- Metrika: Task completion time, search usage rate
- Sample: Min 100 search sessions

**CHECKLIST:**
- [ ] Column sorting s vizuálním indikátorem
- [ ] aria-sort atributy pro accessibility
- [ ] Search s debounce (300ms)
- [ ] Quick filters pro top 3 use cases
- [ ] Active filters viditelně označeny
- [ ] Reset filters možnost

---

## Practice #36: Pagination Strategies

**PROBLÉM:** 10,000+ záznamů nelze zobrazit najednou. Špatná pagination = ztracení kontextu, pomalé načítání.

**ŘEŠENÍ:** Vyber správnou pagination strategii podle use case.

**IMPLEMENTACE:**

### Kdy použít kterou strategii:

| Strategie | Use Case | Pros | Cons |
|-----------|----------|------|------|
| **Numbered pages** | Admin tabulky, přehled dat | Přesná navigace, SEO friendly | Nutnost klikat |
| **Load more** | Feedy, seznamy produktů | Zachová kontext | Nelze skočit na konec |
| **Infinite scroll** | Social media, discovery | Plynulé browsing | Nelze se vrátit, no footer |
| **Cursor pagination** | Real-time data, API | Konzistentní při změnách | Komplexnější implementace |

### Pro admin panely: Numbered pages (doporučeno)

**KÓD:**

```html
<!-- Pagination component -->
<div class="pagination-wrapper">
  <!-- Page size selector -->
  <div class="page-size">
    <label for="page-size">Zobrazit:</label>
    <select id="page-size" class="page-size-select">
      <option value="10">10</option>
      <option value="25" selected>25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <span>záznamů</span>
  </div>

  <!-- Results info -->
  <div class="results-info">
    Zobrazeno <strong>1-25</strong> z <strong>1,234</strong> záznamů
  </div>

  <!-- Pagination controls -->
  <nav class="pagination" aria-label="Stránkování">
    <button class="page-btn" aria-label="První stránka" disabled>
      ««
    </button>
    <button class="page-btn" aria-label="Předchozí stránka" disabled>
      «
    </button>

    <button class="page-btn active" aria-current="page">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">3</button>
    <span class="page-ellipsis">...</span>
    <button class="page-btn">49</button>
    <button class="page-btn">50</button>

    <button class="page-btn" aria-label="Další stránka">
      »
    </button>
    <button class="page-btn" aria-label="Poslední stránka">
      »»
    </button>
  </nav>

  <!-- Direct page jump -->
  <div class="page-jump">
    <label for="page-jump">Přejít na:</label>
    <input
      type="number"
      id="page-jump"
      min="1"
      max="50"
      class="page-jump-input"
    >
    <button class="btn-small">Jít</button>
  </div>
</div>
```

```css
.pagination-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

/* Page size selector */
.page-size {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.page-size-select {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

/* Results info */
.results-info {
  font-size: 14px;
  color: #6b7280;
}

/* Pagination buttons */
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}

.page-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.page-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-ellipsis {
  padding: 0 8px;
  color: #6b7280;
}

/* Direct page jump */
.page-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.page-jump-input {
  width: 60px;
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: center;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .pagination-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .pagination {
    justify-content: center;
  }

  .page-jump {
    display: none; /* Hide on mobile */
  }
}
```

**OČEKÁVANÝ DOPAD:** +15-30% efektivita navigace, -25% ztráta kontextu

**A/B TEST SETUP:**
- Baseline: Aktuální pagination
- Variant: Page size selector + direct jump
- Metrika: Pages visited per session, bounce rate
- Sample: Min 500 sessions

**CHECKLIST:**
- [ ] Page size selector (10, 25, 50, 100)
- [ ] Total count vždy zobrazen
- [ ] First/Last page buttons
- [ ] Direct page jump input
- [ ] Current page jasně označena (aria-current)
- [ ] Disabled state pro neaktivní buttons
- [ ] Mobile responsive

---

## Practice #37: Large Dataset Handling

**PROBLÉM:** Tabulky s 10,000+ záznamy = pomalé načítání, zamrzání UI, out of memory.

**ŘEŠENÍ:** Implementuj lazy loading, virtual scrolling a progressive enhancement.

**IMPLEMENTACE:**

1. **Server-side pagination**
   - Nikdy neloaduj všechna data najednou
   - API endpoint s limit/offset nebo cursor
   - Cache recent pages

2. **Virtual scrolling (pro velké seznamy)**
   - Renderuj pouze viditelné řádky
   - Recykluj DOM elementy
   - Knihovny: react-window, vue-virtual-scroller

3. **Column visibility toggle**
   - Nech uživatele skrýt nepotřebné sloupce
   - Ulož preference do localStorage
   - Zrychlí rendering

4. **Lazy loading images/avatars**
   - loading="lazy" atribut
   - Placeholder během načítání

**KÓD:**

```html
<!-- Column visibility toggle -->
<div class="column-toggle">
  <button class="btn-secondary" id="column-settings">
    Sloupce ▼
  </button>
  <div class="column-dropdown" hidden>
    <label class="column-option">
      <input type="checkbox" checked data-column="name">
      Jméno
    </label>
    <label class="column-option">
      <input type="checkbox" checked data-column="email">
      E-mail
    </label>
    <label class="column-option">
      <input type="checkbox" checked data-column="phone">
      Telefon
    </label>
    <label class="column-option">
      <input type="checkbox" data-column="address">
      Adresa
    </label>
    <label class="column-option">
      <input type="checkbox" data-column="notes">
      Poznámky
    </label>
  </div>
</div>

<!-- Loading state -->
<div class="table-loading" id="table-loading" hidden>
  <div class="spinner"></div>
  <span>Načítám data...</span>
</div>

<!-- Empty state -->
<div class="table-empty" id="table-empty" hidden>
  <div class="empty-icon">📭</div>
  <h3>Žádné záznamy</h3>
  <p>Nebyly nalezeny žádné záznamy odpovídající vašim filtrům.</p>
  <button class="btn-primary" id="clear-filters">
    Zrušit filtry
  </button>
</div>
```

```css
/* Column dropdown */
.column-toggle {
  position: relative;
}

.column-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 20;
  min-width: 150px;
}

.column-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}

.column-option:hover {
  background: #f3f4f6;
}

/* Loading state */
.table-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #6b7280;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty state */
.table-empty {
  text-align: center;
  padding: 48px;
  color: #6b7280;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.table-empty h3 {
  margin: 0 0 8px;
  color: #374151;
}

.table-empty p {
  margin: 0 0 16px;
}

/* Hidden columns */
[data-column-hidden="true"] {
  display: none;
}
```

```javascript
// Column visibility with localStorage persistence
class ColumnManager {
  constructor(tableId) {
    this.tableId = tableId;
    this.storageKey = `table-columns-${tableId}`;
    this.init();
  }

  init() {
    // Load saved preferences
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const visibility = JSON.parse(saved);
      Object.entries(visibility).forEach(([column, visible]) => {
        this.toggleColumn(column, visible);
      });
    }

    // Setup listeners
    document.querySelectorAll('[data-column]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.toggleColumn(e.target.dataset.column, e.target.checked);
        this.save();
      });
    });
  }

  toggleColumn(column, visible) {
    const cells = document.querySelectorAll(`[data-col="${column}"]`);
    cells.forEach(cell => {
      cell.dataset.columnHidden = !visible;
    });
  }

  save() {
    const visibility = {};
    document.querySelectorAll('[data-column]').forEach(checkbox => {
      visibility[checkbox.dataset.column] = checkbox.checked;
    });
    localStorage.setItem(this.storageKey, JSON.stringify(visibility));
  }
}

// Lazy loading with Intersection Observer
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

**OČEKÁVANÝ DOPAD:** -30-50% load time, +40% rendering performance

**A/B TEST SETUP:**
- Baseline: Load all columns
- Variant: Column toggle + lazy loading
- Metrika: Page load time, Time to Interactive
- Sample: Performance monitoring na 1000 page views

**CHECKLIST:**
- [ ] Server-side pagination (nikdy all-at-once)
- [ ] Loading state během fetch
- [ ] Empty state když 0 results
- [ ] Column visibility toggle
- [ ] Preferences uloženy v localStorage
- [ ] Lazy loading pro images
- [ ] Debounce na filter changes

---

## Practice #38: Inline Actions & Bulk Operations

**PROBLÉM:** Uživatelé potřebují provádět akce na jednotlivých i více záznamech. Špatný UX = případné ztráty dat, frustrace.

**ŘEŠENÍ:** Implementuj row-level akce a bezpečné bulk operations.

**IMPLEMENTACE:**

1. **Row-level actions**
   - Umísti na konec řádku
   - Max 3 primární akce viditelné
   - Další v "..." dropdown menu
   - Ikony + tooltip, ne jen text

2. **Bulk selection**
   - Checkbox na začátku každého řádku
   - "Select all" v headeru (pouze viditelné)
   - "Select all X items" pro celý dataset
   - Jasný počet vybraných

3. **Bulk actions bar**
   - Objeví se při výběru 1+ položek
   - Sticky na spodku/vrchu
   - Zobraz počet vybraných
   - Confirmation pro destruktivní akce

4. **Delete safety**
   - Vždy confirmation dialog
   - Ukaž co bude smazáno
   - Soft delete kde možné
   - Undo možnost (5-10 sekund)

**KÓD:**

```html
<!-- Table with selection -->
<table class="data-table">
  <thead>
    <tr>
      <th class="col-select">
        <input
          type="checkbox"
          id="select-all"
          aria-label="Vybrat všechny viditelné"
        >
      </th>
      <th>Jméno</th>
      <th>E-mail</th>
      <th class="col-actions">Akce</th>
    </tr>
  </thead>
  <tbody>
    <tr data-id="1">
      <td class="col-select">
        <input type="checkbox" class="row-select" aria-label="Vybrat řádek">
      </td>
      <td>Jan Novák</td>
      <td>jan@email.cz</td>
      <td class="col-actions">
        <!-- Primary actions (always visible) -->
        <button class="btn-icon" title="Upravit" aria-label="Upravit">
          ✏️
        </button>
        <button class="btn-icon" title="Duplikovat" aria-label="Duplikovat">
          📋
        </button>

        <!-- More actions dropdown -->
        <div class="actions-dropdown">
          <button class="btn-icon" title="Více akcí" aria-label="Více akcí">
            ⋮
          </button>
          <div class="dropdown-menu" hidden>
            <button class="dropdown-item">📤 Exportovat</button>
            <button class="dropdown-item">📧 Odeslat e-mail</button>
            <hr>
            <button class="dropdown-item text-danger">🗑️ Smazat</button>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<!-- Bulk actions bar (appears when items selected) -->
<div class="bulk-actions-bar" id="bulk-bar" hidden>
  <div class="bulk-info">
    <span class="selected-count">3</span> položky vybrány
    <button class="btn-link" id="select-all-pages">
      Vybrat všech 1,234 položek
    </button>
  </div>

  <div class="bulk-buttons">
    <button class="btn-secondary">
      📤 Exportovat
    </button>
    <button class="btn-secondary">
      📁 Přesunout do...
    </button>
    <button class="btn-danger" id="bulk-delete">
      🗑️ Smazat
    </button>
  </div>

  <button class="btn-icon" id="clear-selection" aria-label="Zrušit výběr">
    ✕
  </button>
</div>

<!-- Delete confirmation modal -->
<dialog id="delete-confirm" class="modal">
  <div class="modal-content">
    <h2>Smazat položky?</h2>
    <p>Chystáte se smazat <strong>3 položky</strong>:</p>
    <ul class="delete-list">
      <li>Jan Novák</li>
      <li>Marie Svobodová</li>
      <li>Petr Dvořák</li>
    </ul>
    <p class="warning">Tato akce je nevratná.</p>

    <div class="modal-actions">
      <button class="btn-secondary" id="cancel-delete">Zrušit</button>
      <button class="btn-danger" id="confirm-delete">Smazat</button>
    </div>
  </div>
</dialog>

<!-- Undo toast -->
<div class="toast" id="undo-toast" hidden>
  <span>3 položky smazány</span>
  <button class="btn-link" id="undo-delete">Vrátit zpět</button>
  <div class="toast-timer"></div>
</div>
```

```css
/* Selection column */
.col-select {
  width: 40px;
  text-align: center;
}

/* Actions column */
.col-actions {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: #f3f4f6;
}

/* Actions dropdown */
.actions-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 20;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.dropdown-item.text-danger {
  color: #dc2626;
}

.dropdown-menu hr {
  margin: 4px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* Bulk actions bar */
.bulk-actions-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #1f2937;
  color: white;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.bulk-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-count {
  font-weight: 600;
  font-size: 18px;
}

.bulk-buttons {
  display: flex;
  gap: 8px;
}

/* Delete confirmation modal */
.modal {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 400px;
}

.modal::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  padding: 24px;
}

.modal-content h2 {
  margin: 0 0 16px;
}

.delete-list {
  background: #fef2f2;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
}

.delete-list li {
  padding: 4px 0;
}

.warning {
  color: #dc2626;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

/* Undo toast */
.toast {
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

.toast-timer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #3b82f6;
  animation: timer 5s linear forwards;
}

@keyframes timer {
  from { width: 100%; }
  to { width: 0%; }
}
```

```javascript
// Bulk selection logic
class BulkSelector {
  constructor() {
    this.selected = new Set();
    this.selectAllCheckbox = document.getElementById('select-all');
    this.rowCheckboxes = document.querySelectorAll('.row-select');
    this.bulkBar = document.getElementById('bulk-bar');

    this.init();
  }

  init() {
    // Select all visible
    this.selectAllCheckbox.addEventListener('change', (e) => {
      this.rowCheckboxes.forEach(cb => {
        cb.checked = e.target.checked;
        const id = cb.closest('tr').dataset.id;
        if (e.target.checked) {
          this.selected.add(id);
        } else {
          this.selected.delete(id);
        }
      });
      this.updateUI();
    });

    // Individual row selection
    this.rowCheckboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.closest('tr').dataset.id;
        if (e.target.checked) {
          this.selected.add(id);
        } else {
          this.selected.delete(id);
        }
        this.updateSelectAllState();
        this.updateUI();
      });
    });
  }

  updateSelectAllState() {
    const allChecked = [...this.rowCheckboxes].every(cb => cb.checked);
    const someChecked = [...this.rowCheckboxes].some(cb => cb.checked);

    this.selectAllCheckbox.checked = allChecked;
    this.selectAllCheckbox.indeterminate = someChecked && !allChecked;
  }

  updateUI() {
    const count = this.selected.size;
    this.bulkBar.hidden = count === 0;

    if (count > 0) {
      document.querySelector('.selected-count').textContent = count;
    }
  }

  clearSelection() {
    this.selected.clear();
    this.rowCheckboxes.forEach(cb => cb.checked = false);
    this.selectAllCheckbox.checked = false;
    this.selectAllCheckbox.indeterminate = false;
    this.updateUI();
  }
}

// Delete with undo
class DeleteManager {
  constructor() {
    this.deletedItems = [];
    this.undoTimeout = null;
  }

  async delete(ids) {
    // Show confirmation
    const confirmed = await this.showConfirmation(ids);
    if (!confirmed) return;

    // Soft delete (mark as deleted, don't remove yet)
    this.deletedItems = ids;

    // Update UI immediately (optimistic)
    ids.forEach(id => {
      const row = document.querySelector(`tr[data-id="${id}"]`);
      if (row) row.hidden = true;
    });

    // Show undo toast
    this.showUndoToast(ids.length);

    // Actually delete after timeout
    this.undoTimeout = setTimeout(() => {
      this.permanentDelete(ids);
    }, 5000);
  }

  showConfirmation(ids) {
    return new Promise(resolve => {
      const dialog = document.getElementById('delete-confirm');
      dialog.showModal();

      document.getElementById('confirm-delete').onclick = () => {
        dialog.close();
        resolve(true);
      };

      document.getElementById('cancel-delete').onclick = () => {
        dialog.close();
        resolve(false);
      };
    });
  }

  showUndoToast(count) {
    const toast = document.getElementById('undo-toast');
    toast.querySelector('span').textContent = `${count} položek smazáno`;
    toast.hidden = false;

    document.getElementById('undo-delete').onclick = () => {
      this.undo();
    };
  }

  undo() {
    clearTimeout(this.undoTimeout);

    // Restore rows
    this.deletedItems.forEach(id => {
      const row = document.querySelector(`tr[data-id="${id}"]`);
      if (row) row.hidden = false;
    });

    this.deletedItems = [];
    document.getElementById('undo-toast').hidden = true;
  }

  permanentDelete(ids) {
    // API call to actually delete
    console.log('Permanently deleting:', ids);
    document.getElementById('undo-toast').hidden = true;
    this.deletedItems = [];
  }
}
```

**OČEKÁVANÝ DOPAD:** -50-80% accidental deletes, +30% task efficiency

**A/B TEST SETUP:**
- Baseline: Delete without confirmation
- Variant: Confirmation + undo
- Metrika: Accidental delete support tickets, task completion time
- Sample: Track over 1 měsíc

**CHECKLIST:**
- [ ] Row-level actions na konci řádku
- [ ] Max 3 viditelné, zbytek v dropdown
- [ ] Bulk selection s "select all"
- [ ] Bulk actions bar při výběru
- [ ] Delete confirmation dialog
- [ ] Undo možnost (5-10 sekund)
- [ ] Soft delete kde možné
- [ ] aria-label pro všechny action buttons

---

## Sources

- [NN/g: Data Tables](https://www.nngroup.com/articles/data-tables/)
- [WP DataTables: Table UI Design Guide](https://wpdatatables.com/table-ui-design/)
- [Justinmind: Designing effective data tables](https://www.justinmind.com/ui-design/data-table)
- [Material Design: Data tables](https://m3.material.io/components/data-tables)
- [Smashing Magazine: Dashboard Design](https://www.smashingmagazine.com/2021/11/dashboard-design-research-decluttering-data-viz/)
