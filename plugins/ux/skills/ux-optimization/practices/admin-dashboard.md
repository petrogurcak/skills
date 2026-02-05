# Admin Dashboard Optimization Practices

Based on research from Nielsen Norman Group, Smashing Magazine, and 100+ enterprise dashboard analyses.

**Core principle:** Dashboard = přehled na první pohled. Uživatel musí pochopit stav systému do 5 sekund.

---

## Practice #30: Dashboard Layout Patterns

**PROBLÉM:** Přeplněný dashboard = informační přetížení. Uživatelé neví kam se dívat.

**ŘEŠENÍ:** Použij grid layout s jasnou vizuální hierarchií a "above-the-fold" prioritizací.

**IMPLEMENTACE:**

### Layout principy:

1. **F-pattern scanning** - Nejdůležitější vlevo nahoře
2. **Above-the-fold** - Kritické KPIs viditelné bez scrollu
3. **Grid system** - Konzistentní spacing (8px/16px/24px)
4. **Widget hierarchy** - Velké = důležité, malé = sekundární

### Doporučené layouty:

| Layout | Use Case | Popis |
|--------|----------|-------|
| **KPI row + charts** | Executive dashboard | 4 KPI cards nahoře, grafy dole |
| **Sidebar + main** | Operational | Filtry vlevo, data vpravo |
| **Grid widgets** | Customizable | Drag-and-drop widgety |
| **Split view** | Comparison | Master-detail layout |

**KÓD:**

```html
<!-- Executive Dashboard Layout -->
<div class="dashboard">
  <!-- Top KPI Row -->
  <section class="kpi-row" aria-label="Klíčové metriky">
    <div class="kpi-card">
      <span class="kpi-label">Celkové tržby</span>
      <span class="kpi-value">1,234,567 Kč</span>
      <span class="kpi-change positive">+12.5%</span>
      <span class="kpi-period">vs minulý měsíc</span>
    </div>

    <div class="kpi-card">
      <span class="kpi-label">Objednávky</span>
      <span class="kpi-value">847</span>
      <span class="kpi-change positive">+8.3%</span>
      <span class="kpi-period">vs minulý měsíc</span>
    </div>

    <div class="kpi-card">
      <span class="kpi-label">Průměrná objednávka</span>
      <span class="kpi-value">1,458 Kč</span>
      <span class="kpi-change negative">-2.1%</span>
      <span class="kpi-period">vs minulý měsíc</span>
    </div>

    <div class="kpi-card">
      <span class="kpi-label">Konverzní poměr</span>
      <span class="kpi-value">3.2%</span>
      <span class="kpi-change neutral">0%</span>
      <span class="kpi-period">vs minulý měsíc</span>
    </div>
  </section>

  <!-- Charts Row -->
  <section class="charts-row" aria-label="Grafy">
    <div class="chart-widget large">
      <div class="widget-header">
        <h2>Tržby za posledních 30 dní</h2>
        <div class="widget-actions">
          <select class="period-select">
            <option>Posledních 7 dní</option>
            <option selected>Posledních 30 dní</option>
            <option>Posledních 90 dní</option>
          </select>
        </div>
      </div>
      <div class="chart-container" id="revenue-chart">
        <!-- Chart renders here -->
      </div>
    </div>

    <div class="chart-widget">
      <div class="widget-header">
        <h2>Objednávky podle zdroje</h2>
      </div>
      <div class="chart-container" id="source-chart">
        <!-- Pie chart -->
      </div>
    </div>
  </section>

  <!-- Data Row -->
  <section class="data-row" aria-label="Nedávná aktivita">
    <div class="data-widget">
      <div class="widget-header">
        <h2>Poslední objednávky</h2>
        <a href="/orders" class="widget-link">Zobrazit vše →</a>
      </div>
      <ul class="recent-list">
        <li class="recent-item">
          <span class="item-id">#12345</span>
          <span class="item-name">Jan Novák</span>
          <span class="item-value">2,450 Kč</span>
          <span class="item-time">před 5 min</span>
        </li>
        <!-- More items -->
      </ul>
    </div>

    <div class="data-widget">
      <div class="widget-header">
        <h2>Upozornění</h2>
        <span class="alert-count">3</span>
      </div>
      <ul class="alert-list">
        <li class="alert-item alert-warning">
          <span class="alert-icon">⚠️</span>
          <span class="alert-text">Nízké zásoby: Produkt XYZ</span>
        </li>
        <li class="alert-item alert-error">
          <span class="alert-icon">🔴</span>
          <span class="alert-text">Platba selhala: Objednávka #12340</span>
        </li>
      </ul>
    </div>
  </section>
</div>
```

```css
/* Dashboard container */
.dashboard {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* KPI Row */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.kpi-label {
  display: block;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kpi-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.kpi-change {
  font-size: 14px;
  font-weight: 600;
}

.kpi-change.positive {
  color: #059669;
}

.kpi-change.positive::before {
  content: '↑ ';
}

.kpi-change.negative {
  color: #dc2626;
}

.kpi-change.negative::before {
  content: '↓ ';
}

.kpi-change.neutral {
  color: #6b7280;
}

.kpi-period {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}

/* Charts Row */
.charts-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.chart-widget {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.widget-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.widget-link {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
}

.widget-link:hover {
  text-decoration: underline;
}

.chart-container {
  height: 250px;
}

/* Data Row */
.data-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.data-widget {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Recent list */
.recent-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.recent-item:last-child {
  border-bottom: none;
}

.item-id {
  font-family: monospace;
  color: #6b7280;
}

.item-name {
  font-weight: 500;
}

.item-value {
  font-weight: 600;
  color: #059669;
}

.item-time {
  font-size: 12px;
  color: #9ca3af;
}

/* Alert list */
.alert-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.alert-warning {
  background: #fef3c7;
}

.alert-error {
  background: #fef2f2;
}

.alert-count {
  background: #ef4444;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 1024px) {
  .charts-row {
    grid-template-columns: 1fr;
  }

  .data-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .recent-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
```

**OČEKÁVANÝ DOPAD:** +20-40% clarity, -30% time to find information

**CHECKLIST:**
- [ ] KPI cards above-the-fold
- [ ] Grid system s konzistentním spacing
- [ ] Largest widget = most important
- [ ] F-pattern respektován
- [ ] Responsive na tablet i mobile
- [ ] Max 4-6 KPI cards viditelných

---

## Practice #31: Data Visualization Guidelines

**PROBLÉM:** Špatný typ grafu = dezinterpretace dat. Uživatelé nerozumí čísslům.

**ŘEŠENÍ:** Vyber správný chart type, použij preattentive processing (NN/g).

**IMPLEMENTACE:**

### Chart type selection:

| Data Type | Best Chart | Avoid |
|-----------|------------|-------|
| Trend over time | Line chart | Pie chart |
| Part-to-whole | Pie/donut (max 5 segments) | Line chart |
| Comparison | Bar chart (horizontal) | Pie chart |
| Distribution | Histogram | Line chart |
| Correlation | Scatter plot | Bar chart |
| Ranking | Horizontal bar | Pie chart |

### NN/g Preattentive cues:
- **Color** - Pro kategorie (max 5-7 barev)
- **Position** - Pro porovnání hodnot
- **Size** - Pro magnitude
- **Orientation** - Pro směr trendu

### Best practices:
1. **Start Y axis at 0** (bar charts)
2. **Label directly** (ne legenda kde možné)
3. **Highlight key insight** (callout)
4. **Interactive tooltips** (detail on hover)

**KÓD:**

```html
<!-- Chart with callout -->
<div class="chart-widget">
  <div class="widget-header">
    <h2>Měsíční tržby</h2>
    <div class="chart-legend">
      <span class="legend-item">
        <span class="legend-color" style="background: #3b82f6"></span>
        2024
      </span>
      <span class="legend-item">
        <span class="legend-color" style="background: #d1d5db"></span>
        2023
      </span>
    </div>
  </div>

  <!-- Insight callout -->
  <div class="chart-callout">
    <span class="callout-value">+23%</span>
    <span class="callout-text">růst oproti loňskému roku</span>
  </div>

  <div class="chart-container" id="revenue-chart">
    <!-- Chart renders here -->
  </div>

  <!-- Axis labels -->
  <div class="chart-footer">
    <span class="axis-label">Měsíc</span>
  </div>
</div>

<!-- Mini KPI with sparkline -->
<div class="kpi-card with-sparkline">
  <div class="kpi-content">
    <span class="kpi-label">Denní návštěvnost</span>
    <span class="kpi-value">12,456</span>
    <span class="kpi-change positive">+5.2%</span>
  </div>
  <div class="sparkline-container" id="visits-sparkline">
    <!-- Sparkline chart -->
  </div>
</div>
```

```css
/* Chart callout */
.chart-callout {
  position: absolute;
  top: 60px;
  right: 24px;
  text-align: right;
}

.callout-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #059669;
}

.callout-text {
  display: block;
  font-size: 12px;
  color: #6b7280;
}

/* Legend */
.chart-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* KPI with sparkline */
.kpi-card.with-sparkline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sparkline-container {
  width: 100px;
  height: 40px;
}

/* Tooltip styling (for chart library) */
.chart-tooltip {
  background: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tooltip-label {
  color: #9ca3af;
  font-size: 11px;
}

.tooltip-value {
  font-weight: 600;
  font-size: 14px;
}
```

```javascript
// Chart.js configuration example
const revenueChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čer'],
    datasets: [
      {
        label: '2024',
        data: [120, 150, 180, 200, 220, 250],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.3
      },
      {
        label: '2023',
        data: [100, 120, 140, 160, 170, 190],
        borderColor: '#d1d5db',
        backgroundColor: 'transparent',
        borderDash: [5, 5]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Using custom legend
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#9ca3af',
        bodyColor: '#ffffff',
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} Kč`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true, // IMPORTANT: Start at 0
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          callback: (value) => value.toLocaleString() + ' Kč'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }
});
```

**OČEKÁVANÝ DOPAD:** +30-55% data comprehension (NN/g research)

**CHECKLIST:**
- [ ] Správný chart type pro data type
- [ ] Y axis začíná na 0 (bar charts)
- [ ] Max 5-7 barev
- [ ] Interactive tooltips
- [ ] Direct labels kde možné
- [ ] Insight callout pro key finding
- [ ] Responsive sizing

---

## Practice #32: Widget Design

**PROBLÉM:** Widgety vypadají všechny stejně. Uživatel neví co je důležité.

**ŘEŠENÍ:** Diferenciuj widgety pomocí velikosti, barvy a typu obsahu.

**IMPLEMENTACE:**

### Widget types:

| Type | Purpose | Size |
|------|---------|------|
| **KPI card** | Single metric | Small |
| **Chart** | Trends, distribution | Medium-Large |
| **Table/List** | Recent items, details | Medium |
| **Alert** | Attention needed | Small |
| **Action** | Quick actions | Small |

### Design principles:
1. **White background** - Cards on gray bg
2. **Subtle shadow** - Depth without noise
3. **Consistent header** - Title + actions
4. **Loading states** - Skeleton während fetch

**KÓD:**

```html
<!-- Different widget sizes -->
<div class="widget-grid">
  <!-- Small: KPI -->
  <div class="widget widget-sm">
    <span class="widget-icon">💰</span>
    <div class="widget-content">
      <span class="widget-label">Dnešní tržby</span>
      <span class="widget-value">45,230 Kč</span>
    </div>
  </div>

  <!-- Small: Alert -->
  <div class="widget widget-sm widget-alert">
    <span class="widget-icon">⚠️</span>
    <div class="widget-content">
      <span class="widget-label">Nízké zásoby</span>
      <span class="widget-value">3 produkty</span>
    </div>
    <a href="/inventory/low" class="widget-action">Zobrazit →</a>
  </div>

  <!-- Medium: Chart -->
  <div class="widget widget-md">
    <div class="widget-header">
      <h3>Návštěvnost</h3>
      <button class="btn-icon widget-menu">⋮</button>
    </div>
    <div class="widget-body">
      <div class="chart-container" id="visits-chart"></div>
    </div>
  </div>

  <!-- Medium: List -->
  <div class="widget widget-md">
    <div class="widget-header">
      <h3>Nedávné objednávky</h3>
      <a href="/orders" class="widget-link">Vše</a>
    </div>
    <div class="widget-body">
      <ul class="widget-list">
        <li>
          <span>#12345</span>
          <span>Jan Novák</span>
          <span class="amount">2,450 Kč</span>
        </li>
        <!-- More items -->
      </ul>
    </div>
  </div>

  <!-- Large: Detailed chart -->
  <div class="widget widget-lg">
    <div class="widget-header">
      <h3>Přehled prodejů</h3>
      <div class="widget-filters">
        <select class="filter-select">
          <option>Posledních 30 dní</option>
        </select>
      </div>
    </div>
    <div class="widget-body">
      <div class="chart-container large" id="sales-chart"></div>
    </div>
    <div class="widget-footer">
      <span class="footer-stat">
        Celkem: <strong>1,234,567 Kč</strong>
      </span>
      <span class="footer-stat">
        Průměr/den: <strong>41,152 Kč</strong>
      </span>
    </div>
  </div>

  <!-- Quick actions widget -->
  <div class="widget widget-sm widget-actions">
    <h4>Rychlé akce</h4>
    <div class="quick-actions">
      <button class="quick-action">
        <span class="action-icon">➕</span>
        Nová objednávka
      </button>
      <button class="quick-action">
        <span class="action-icon">📦</span>
        Přidat produkt
      </button>
      <button class="quick-action">
        <span class="action-icon">📊</span>
        Export reportu
      </button>
    </div>
  </div>
</div>

<!-- Loading skeleton -->
<div class="widget widget-md loading">
  <div class="skeleton skeleton-header"></div>
  <div class="skeleton skeleton-chart"></div>
</div>
```

```css
/* Widget grid */
.widget-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Base widget */
.widget {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Widget sizes */
.widget-sm {
  grid-column: span 1;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.widget-md {
  grid-column: span 2;
}

.widget-lg {
  grid-column: span 4;
}

/* Widget header */
.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
}

.widget-header h3 {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

/* Widget body */
.widget-body {
  padding: 20px;
}

/* Widget footer */
.widget-footer {
  display: flex;
  gap: 24px;
  padding: 12px 20px;
  background: #f9fafb;
  border-top: 1px solid #f3f4f6;
}

.footer-stat {
  font-size: 13px;
  color: #6b7280;
}

/* Small widget variants */
.widget-sm .widget-icon {
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 10px;
}

.widget-sm .widget-label {
  display: block;
  font-size: 13px;
  color: #6b7280;
}

.widget-sm .widget-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

/* Alert widget */
.widget-alert {
  border-left: 4px solid #f59e0b;
}

.widget-alert .widget-icon {
  background: #fef3c7;
}

/* Quick actions widget */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.quick-action {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #f9fafb;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}

.quick-action:hover {
  background: #f3f4f6;
}

.action-icon {
  font-size: 16px;
}

/* Widget list */
.widget-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.widget-list li {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
}

.widget-list li:last-child {
  border-bottom: none;
}

.widget-list .amount {
  font-weight: 600;
  color: #059669;
}

/* Loading skeleton */
.widget.loading {
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-header {
  height: 20px;
  width: 120px;
  margin: 16px 20px;
}

.skeleton-chart {
  height: 200px;
  margin: 20px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive */
@media (max-width: 1200px) {
  .widget-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .widget-lg {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .widget-grid {
    grid-template-columns: 1fr;
  }

  .widget-sm,
  .widget-md,
  .widget-lg {
    grid-column: span 1;
  }
}
```

**OČEKÁVANÝ DOPAD:** +25% dashboard usability, +15% time-on-task efficiency

**CHECKLIST:**
- [ ] Různé velikosti podle důležitosti
- [ ] Konzistentní header struktura
- [ ] Loading skeleton pro async data
- [ ] Alert widgety vizuálně odlišné
- [ ] Quick actions pro časté úkoly
- [ ] Responsive grid

---

## Practice #33: Dashboard Personalization

**PROBLÉM:** Různí uživatelé potřebují různá data. One-size-fits-all dashboard = nikdo není spokojený.

**ŘEŠENÍ:** Umožni personalizaci - dark mode, widget arrangement, saved views.

**IMPLEMENTACE:**

### Personalization features:

| Feature | Complexity | Value |
|---------|------------|-------|
| **Dark mode** | Low | High (eye strain) |
| **Date range selector** | Low | High |
| **Widget toggle** | Medium | Medium |
| **Drag-and-drop** | High | Medium |
| **Saved views** | High | High (power users) |

**KÓD:**

```html
<!-- Dashboard header with personalization -->
<header class="dashboard-header">
  <h1>Dashboard</h1>

  <div class="dashboard-controls">
    <!-- Date range -->
    <div class="date-range-picker">
      <button class="date-btn" id="date-toggle">
        <span class="date-icon">📅</span>
        <span class="date-label">Posledních 30 dní</span>
        <span class="date-arrow">▼</span>
      </button>
      <div class="date-dropdown" hidden>
        <button class="date-option" data-range="7d">Posledních 7 dní</button>
        <button class="date-option active" data-range="30d">Posledních 30 dní</button>
        <button class="date-option" data-range="90d">Posledních 90 dní</button>
        <button class="date-option" data-range="ytd">Od začátku roku</button>
        <hr>
        <button class="date-option" data-range="custom">Vlastní rozsah...</button>
      </div>
    </div>

    <!-- Widget settings -->
    <button class="btn-icon" id="widget-settings" title="Nastavení widgetů">
      ⚙️
    </button>

    <!-- Theme toggle -->
    <button class="btn-icon theme-toggle" id="theme-toggle" title="Přepnout motiv">
      🌙
    </button>
  </div>
</header>

<!-- Widget settings panel -->
<aside class="settings-panel" id="settings-panel" hidden>
  <div class="panel-header">
    <h3>Nastavení dashboardu</h3>
    <button class="btn-close" id="close-settings">×</button>
  </div>

  <div class="panel-section">
    <h4>Zobrazené widgety</h4>
    <ul class="widget-toggles">
      <li>
        <label class="toggle-label">
          <input type="checkbox" checked data-widget="revenue">
          <span class="toggle-text">Tržby</span>
        </label>
      </li>
      <li>
        <label class="toggle-label">
          <input type="checkbox" checked data-widget="orders">
          <span class="toggle-text">Objednávky</span>
        </label>
      </li>
      <li>
        <label class="toggle-label">
          <input type="checkbox" data-widget="inventory">
          <span class="toggle-text">Zásoby</span>
        </label>
      </li>
      <li>
        <label class="toggle-label">
          <input type="checkbox" checked data-widget="recent">
          <span class="toggle-text">Poslední aktivita</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="panel-section">
    <h4>Uložené pohledy</h4>
    <div class="saved-views">
      <button class="view-btn active">Výchozí</button>
      <button class="view-btn">Marketing</button>
      <button class="view-btn">Prodej</button>
      <button class="view-btn view-add">+ Nový pohled</button>
    </div>
  </div>
</aside>
```

```css
/* Dashboard header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
}

.dashboard-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.dashboard-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Date range picker */
.date-range-picker {
  position: relative;
}

.date-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.date-btn:hover {
  border-color: #9ca3af;
}

.date-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 100;
}

.date-option {
  display: block;
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.date-option:hover {
  background: #f3f4f6;
}

.date-option.active {
  color: #3b82f6;
  font-weight: 500;
}

.date-dropdown hr {
  margin: 4px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* Theme toggle */
.theme-toggle {
  transition: transform 0.3s;
}

[data-theme="dark"] .theme-toggle {
  transform: rotate(180deg);
}

/* Settings panel */
.settings-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 200;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
}

.panel-section {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.panel-section h4 {
  margin: 0 0 12px;
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Widget toggles */
.widget-toggles {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
}

.toggle-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}

/* Saved views */
.saved-views {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.view-btn {
  padding: 6px 12px;
  background: #f3f4f6;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.view-btn:hover {
  background: #e5e7eb;
}

.view-btn.active {
  background: #dbeafe;
  border-color: #3b82f6;
  color: #1e40af;
}

.view-btn.view-add {
  background: transparent;
  border: 1px dashed #d1d5db;
  color: #6b7280;
}

/* Dark mode */
[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-tertiary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border-color: #374151;
}

[data-theme="dark"] body {
  background: var(--bg-primary);
  color: var(--text-primary);
}

[data-theme="dark"] .dashboard-header,
[data-theme="dark"] .widget,
[data-theme="dark"] .settings-panel {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

[data-theme="dark"] .kpi-value,
[data-theme="dark"] .widget-header h3 {
  color: var(--text-primary);
}

[data-theme="dark"] .kpi-label,
[data-theme="dark"] .widget-list li {
  color: var(--text-secondary);
}
```

```javascript
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Set initial theme
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
} else if (prefersDark) {
  document.documentElement.dataset.theme = 'dark';
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);

  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// Date range picker
const dateToggle = document.getElementById('date-toggle');
const dateDropdown = dateToggle.nextElementSibling;

dateToggle.addEventListener('click', () => {
  dateDropdown.hidden = !dateDropdown.hidden;
});

document.querySelectorAll('.date-option').forEach(option => {
  option.addEventListener('click', () => {
    const range = option.dataset.range;
    const label = option.textContent;

    // Update button label
    dateToggle.querySelector('.date-label').textContent = label;

    // Update active state
    document.querySelectorAll('.date-option').forEach(o => o.classList.remove('active'));
    option.classList.add('active');

    // Close dropdown
    dateDropdown.hidden = true;

    // Refresh dashboard data
    refreshDashboard(range);
  });
});

// Widget visibility toggle
document.querySelectorAll('[data-widget]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const widgetId = checkbox.dataset.widget;
    const widget = document.querySelector(`[data-widget-id="${widgetId}"]`);
    if (widget) {
      widget.hidden = !checkbox.checked;
    }

    // Save preferences
    saveWidgetPreferences();
  });
});

function saveWidgetPreferences() {
  const preferences = {};
  document.querySelectorAll('[data-widget]').forEach(checkbox => {
    preferences[checkbox.dataset.widget] = checkbox.checked;
  });
  localStorage.setItem('dashboard-widgets', JSON.stringify(preferences));
}

function loadWidgetPreferences() {
  const saved = localStorage.getItem('dashboard-widgets');
  if (!saved) return;

  const preferences = JSON.parse(saved);
  Object.entries(preferences).forEach(([widgetId, visible]) => {
    const checkbox = document.querySelector(`[data-widget="${widgetId}"]`);
    const widget = document.querySelector(`[data-widget-id="${widgetId}"]`);

    if (checkbox) checkbox.checked = visible;
    if (widget) widget.hidden = !visible;
  });
}

// Load on init
loadWidgetPreferences();

// Settings panel
const settingsBtn = document.getElementById('widget-settings');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');

settingsBtn.addEventListener('click', () => {
  settingsPanel.hidden = false;
});

closeSettings.addEventListener('click', () => {
  settingsPanel.hidden = true;
});
```

**OČEKÁVANÝ DOPAD:** +15-25% user satisfaction, +20% dashboard engagement

**CHECKLIST:**
- [ ] Dark mode s persist preference
- [ ] Global date range selector
- [ ] Widget visibility toggle
- [ ] Preferences v localStorage
- [ ] Keyboard shortcut pro theme (D)
- [ ] Respektuj prefers-color-scheme

---

## Sources

- [Nielsen Norman Group: Dashboards](https://www.nngroup.com/articles/dashboards-preattentive/)
- [Smashing Magazine: Dashboard Design](https://www.smashingmagazine.com/2021/11/dashboard-design-research-decluttering-data-viz/)
- [DesignRush: 9 Dashboard Principles](https://www.designrush.com/agency/ui-ux-design/dashboard/trends/dashboard-design-principles)
- [Justinmind: Dashboard Best Practices](https://www.justinmind.com/ui-design/dashboard-design-best-practices-ux)
