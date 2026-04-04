export interface EcommercePatternParams {
  pattern:
    | 'product-grid'
    | 'product-card'
    | 'cart-item'
    | 'checkout-form'
    | 'price-display'
    | 'quantity-selector'
    | 'add-to-cart'
    | 'filter-sidebar'
    | 'search-bar'
    | 'breadcrumbs';
  framework?: 'alpine' | 'vanilla';
}

export class EcommercePatternsTool {
  async getPattern(
    params: EcommercePatternParams
  ): Promise<string> {
    const pattern = params.pattern;
    const framework = params.framework || 'alpine';

    const patternContent = this.patterns[pattern];

    if (!patternContent) {
      return this.listAvailablePatterns();
    }

    return this.formatPattern(pattern, framework, patternContent);
  }

  private formatPattern(
    pattern: string,
    framework: string,
    content: PatternContent
  ): string {
    let response = `# E-commerce UI Pattern: ${pattern}\n\n`;
    response += `**Framework:** ${framework === 'alpine' ? 'Alpine.js' : 'Vanilla JS'}\n\n`;
    response += `**Description:**\n${content.description}\n\n`;
    response += `**Best Practices:**\n${content.bestPractices}\n\n`;
    response += `---\n\n`;

    if (framework === 'alpine') {
      response += `## Alpine.js Implementation\n\n`;
      response += content.alpineCode;
    } else {
      response += `## Vanilla JavaScript Implementation\n\n`;
      response += content.vanillaCode;
    }

    response += `\n\n---\n\n`;
    response += `**Accessibility Notes:**\n${content.a11y}\n\n`;
    response += `**SEO Considerations:**\n${content.seo}\n\n`;
    response += `**Performance Tips:**\n${content.performance}\n`;

    return response;
  }

  private patterns: Record<string, PatternContent> = {
    'product-grid': {
      description: `Responsive product grid layout with automatic wrapping, hover effects, and lazy loading support. Optimized for e-commerce product listings.`,
      bestPractices: `
- Use CSS Grid for layout consistency
- Implement lazy loading for images
- Add skeleton loaders for better UX
- Maintain consistent card sizes
- Include hover states for interactivity
- Support keyboard navigation`,
      alpineCode: `
\`\`\`html
<div
  x-data="{
    products: [],
    loading: true,
    async init() {
      this.products = await fetch('/api/products').then(r => r.json());
      this.loading = false;
    }
  }"
  class="container mx-auto px-4 py-8"
>
  <!-- Loading State -->
  <template x-if="loading">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <template x-for="i in 8">
        <div class="bg-gray-200 animate-pulse rounded-lg h-80"></div>
      </template>
    </div>
  </template>

  <!-- Product Grid -->
  <template x-if="!loading">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <template x-for="product in products" :key="product.id">
        <article
          class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
        >
          <!-- Product Image -->
          <div class="relative aspect-square overflow-hidden bg-gray-100">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div
              x-show="product.discount"
              class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold"
            >
              -<span x-text="product.discount"></span>%
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2 line-clamp-2" x-text="product.name"></h3>
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-2xl font-bold text-gray-900" x-text="'$' + product.price"></span>
              <span
                x-show="product.originalPrice"
                class="text-sm text-gray-500 line-through"
                x-text="'$' + product.originalPrice"
              ></span>
            </div>
            <button
              @click="$dispatch('add-to-cart', product)"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </article>
      </template>
    </div>
  </template>
</div>
\`\`\`
`,
      vanillaCode: `
\`\`\`html
<div id="product-grid" class="container mx-auto px-4 py-8">
  <div id="grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- Loading skeletons inserted here -->
  </div>
</div>

<script>
class ProductGrid {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.products = [];
    this.init();
  }

  async init() {
    this.showLoading();
    this.products = await this.fetchProducts();
    this.render();
  }

  showLoading() {
    const skeletons = Array(8).fill(null).map(() =>
      '<div class="bg-gray-200 animate-pulse rounded-lg h-80"></div>'
    ).join('');
    this.container.innerHTML = skeletons;
  }

  async fetchProducts() {
    const response = await fetch('/api/products');
    return response.json();
  }

  render() {
    this.container.innerHTML = this.products.map(product => \`
      <article class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        <div class="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src="\${product.image}"
            alt="\${product.name}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          \${product.discount ? \`
            <div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              -\${product.discount}%
            </div>
          \` : ''}
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2 line-clamp-2">\${product.name}</h3>
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-2xl font-bold text-gray-900">$\${product.price}</span>
            \${product.originalPrice ? \`
              <span class="text-sm text-gray-500 line-through">$\${product.originalPrice}</span>
            \` : ''}
          </div>
          <button
            onclick="addToCart(\${product.id})"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </article>
    \`).join('');
  }
}

// Initialize
new ProductGrid('grid-container');
</script>
\`\`\`
`,
      a11y: `
- Use semantic HTML: <article> for products
- Include alt text for all images
- Ensure buttons have clear labels
- Support keyboard navigation
- Maintain focus indicators
- ARIA labels for dynamic content`,
      seo: `
- Use semantic HTML structure
- Include product schema markup (JSON-LD)
- Optimize image alt texts with product names
- Use descriptive heading hierarchy
- Implement proper link structure
- Add structured data for rich snippets`,
      performance: `
- Lazy load images below the fold
- Use responsive images with srcset
- Implement skeleton loaders
- Optimize image sizes (WebP format)
- Consider pagination or infinite scroll
- Cache API responses
- Use CSS Grid for better performance than Flexbox for grids`,
    },

    'product-card': {
      description: `Individual product card component with image, title, price, and add-to-cart action. Reusable across product listings.`,
      bestPractices: `
- Consistent sizing across all cards
- Clear call-to-action button
- Visual feedback on hover
- Display discount badges prominently
- Show availability status
- Include product rating if available`,
      alpineCode: `
\`\`\`html
<article
  x-data="{
    quantity: 1,
    adding: false,
    async addToCart() {
      this.adding = true;
      await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.id,
          quantity: this.quantity
        })
      });
      this.adding = false;
      $dispatch('cart-updated');
    }
  }"
  class="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
>
  <!-- Image -->
  <a :href="'/products/' + product.id" class="block relative aspect-square overflow-hidden bg-gray-100">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
      loading="lazy"
    />
    <div
      x-show="product.discount"
      class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
    >
      -<span x-text="product.discount"></span>%
    </div>
    <div
      x-show="!product.inStock"
      class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <span class="text-white font-semibold text-lg">Out of Stock</span>
    </div>
  </a>

  <!-- Content -->
  <div class="p-4">
    <!-- Title -->
    <a :href="'/products/' + product.id">
      <h3 class="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors" x-text="product.name"></h3>
    </a>

    <!-- Rating -->
    <div class="flex items-center gap-2 mb-3">
      <div class="flex text-yellow-400">
        <template x-for="i in 5">
          <svg
            class="w-4 h-4"
            :class="i <= product.rating ? 'fill-current' : 'fill-gray-300'"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        </template>
      </div>
      <span class="text-sm text-gray-600" x-text="'(' + product.reviewCount + ')'"></span>
    </div>

    <!-- Price -->
    <div class="flex items-baseline gap-2 mb-4">
      <span class="text-2xl font-bold text-gray-900" x-text="'$' + product.price"></span>
      <span
        x-show="product.originalPrice"
        class="text-base text-gray-500 line-through"
        x-text="'$' + product.originalPrice"
      ></span>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <button
        @click="addToCart"
        :disabled="!product.inStock || adding"
        class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        <span x-show="!adding">Add to Cart</span>
        <span x-show="adding">Adding...</span>
      </button>
      <button
        @click="$dispatch('toggle-wishlist', product.id)"
        class="p-2 border border-gray-300 rounded hover:border-red-500 hover:text-red-500 transition-colors"
        :aria-label="'Add ' + product.name + ' to wishlist'"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
    </div>
  </div>
</article>
\`\`\`
`,
      vanillaCode: `See product-grid vanilla implementation for similar pattern.`,
      a11y: `
- Descriptive alt text for images
- ARIA labels for icon buttons
- Disabled state for out-of-stock
- Keyboard accessible
- Focus indicators
- Screen reader announcements for cart updates`,
      seo: `
- Semantic HTML structure
- Product microdata
- Descriptive links
- Optimized images
- Proper heading levels`,
      performance: `
- Lazy load images
- Optimize image sizes
- Minimize re-renders
- Debounce cart actions
- Cache product data`,
    },

    'cart-item': {
      description: `Shopping cart item with quantity controls, price display, and remove action.`,
      bestPractices: `
- Show clear product image
- Display unit price and total
- Easy quantity adjustment
- Confirm before removal
- Update totals in real-time
- Show availability warnings`,
      alpineCode: `
\`\`\`html
<div
  x-data="{
    quantity: item.quantity,
    updating: false,
    async updateQuantity(newQty) {
      if (newQty < 1) return;
      this.updating = true;
      await fetch('/api/cart/items/' + item.id, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: newQty })
      });
      this.quantity = newQty;
      this.updating = false;
      $dispatch('cart-updated');
    },
    async remove() {
      if (confirm('Remove this item from cart?')) {
        await fetch('/api/cart/items/' + item.id, {
          method: 'DELETE'
        });
        $dispatch('item-removed', item.id);
      }
    }
  }"
  class="flex gap-4 p-4 bg-white rounded-lg shadow-sm"
>
  <!-- Image -->
  <a :href="'/products/' + item.productId" class="flex-shrink-0">
    <img
      :src="item.image"
      :alt="item.name"
      class="w-24 h-24 object-cover rounded"
    />
  </a>

  <!-- Details -->
  <div class="flex-1">
    <a :href="'/products/' + item.productId">
      <h3 class="font-semibold text-lg hover:text-blue-600" x-text="item.name"></h3>
    </a>
    <p class="text-gray-600 text-sm" x-text="item.variant"></p>
    <div class="mt-2">
      <span class="text-lg font-bold" x-text="'$' + (item.price * quantity).toFixed(2)"></span>
      <span class="text-sm text-gray-500" x-text="'($' + item.price + ' each)'"></span>
    </div>
  </div>

  <!-- Quantity Controls -->
  <div class="flex flex-col items-end justify-between">
    <button
      @click="remove"
      class="text-gray-400 hover:text-red-500 transition-colors"
      aria-label="Remove item"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <div class="flex items-center gap-2">
      <button
        @click="updateQuantity(quantity - 1)"
        :disabled="quantity <= 1 || updating"
        class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span class="w-12 text-center font-semibold" x-text="quantity"></span>
      <button
        @click="updateQuantity(quantity + 1)"
        :disabled="updating"
        class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  </div>
</div>
\`\`\`
`,
      vanillaCode: `Similar to Alpine implementation but with event listeners.`,
      a11y: `
- Clear button labels
- Keyboard accessible controls
- Screen reader quantity announcements
- Confirmation dialogs
- Focus management`,
      seo: `N/A - Cart is typically not indexed`,
      performance: `
- Debounce quantity updates
- Optimistic UI updates
- Batch API calls
- Local state caching`,
    },

    'add-to-cart': {
      description: `Add to cart button with loading state, success feedback, and error handling.`,
      bestPractices: `
- Clear loading state
- Success confirmation
- Error messages
- Prevent double-clicks
- Update cart count
- Accessibility feedback`,
      alpineCode: `
\`\`\`html
<div
  x-data="{
    quantity: 1,
    state: 'idle', // idle, loading, success, error
    errorMsg: '',
    async addToCart() {
      this.state = 'loading';
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            quantity: this.quantity
          })
        });

        if (!response.ok) throw new Error('Failed to add to cart');

        this.state = 'success';
        $dispatch('cart-updated');

        setTimeout(() => {
          this.state = 'idle';
        }, 2000);
      } catch (error) {
        this.state = 'error';
        this.errorMsg = error.message;
        setTimeout(() => {
          this.state = 'idle';
        }, 3000);
      }
    }
  }"
>
  <!-- Quantity Selector -->
  <div class="flex items-center gap-3 mb-4">
    <label class="font-semibold">Quantity:</label>
    <div class="flex items-center border border-gray-300 rounded">
      <button
        @click="quantity = Math.max(1, quantity - 1)"
        class="px-3 py-2 hover:bg-gray-100"
        :disabled="state === 'loading'"
      >
        -
      </button>
      <input
        type="number"
        x-model.number="quantity"
        min="1"
        class="w-16 text-center border-x border-gray-300 py-2"
        :disabled="state === 'loading'"
      />
      <button
        @click="quantity++"
        class="px-3 py-2 hover:bg-gray-100"
        :disabled="state === 'loading'"
      >
        +
      </button>
    </div>
  </div>

  <!-- Add to Cart Button -->
  <button
    @click="addToCart"
    :disabled="state === 'loading' || state === 'success'"
    class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300"
    :class="{
      'bg-blue-600 hover:bg-blue-700 text-white': state === 'idle',
      'bg-gray-400 cursor-not-allowed text-white': state === 'loading',
      'bg-green-600 text-white': state === 'success',
      'bg-red-600 hover:bg-red-700 text-white': state === 'error'
    }"
  >
    <span x-show="state === 'idle'">Add to Cart</span>
    <span x-show="state === 'loading'" class="flex items-center justify-center gap-2">
      <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      Adding...
    </span>
    <span x-show="state === 'success'" class="flex items-center justify-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      Added to Cart!
    </span>
    <span x-show="state === 'error'">Try Again</span>
  </button>

  <!-- Error Message -->
  <p x-show="state === 'error'" x-text="errorMsg" class="mt-2 text-red-600 text-sm"></p>
</div>
\`\`\`
`,
      vanillaCode: `Similar pattern with DOM manipulation for state changes.`,
      a11y: `
- ARIA live regions for status updates
- Clear button states
- Keyboard accessible
- Screen reader friendly
- Focus management`,
      seo: `N/A - Interactive component`,
      performance: `
- Prevent double submissions
- Optimistic UI updates
- Debounce quantity changes
- Minimize re-renders`,
    },

    // Additional patterns abbreviated for space
    'checkout-form': {
      description: `Multi-step checkout form with validation.`,
      bestPractices: `See common form validation patterns`,
      alpineCode: `See form-with-validation workflow`,
      vanillaCode: `Use native form validation + fetch API`,
      a11y: `Form labels, error messages, keyboard navigation`,
      seo: `N/A`,
      performance: `Validate on blur, submit once`,
    },

    'price-display': {
      description: `Price component with currency formatting, discounts, and tax display.`,
      bestPractices: `Clear pricing, show savings, include tax info`,
      alpineCode: `\`\`\`html
<div class="space-y-2">
  <div class="flex items-baseline gap-2">
    <span class="text-3xl font-bold" x-text="'$' + price.toFixed(2)"></span>
    <span x-show="originalPrice" class="text-lg text-gray-500 line-through" x-text="'$' + originalPrice.toFixed(2)"></span>
    <span x-show="discount" class="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">Save <span x-text="discount"></span>%</span>
  </div>
  <p class="text-sm text-gray-600">Tax included · Free shipping over $50</p>
</div>
\`\`\``,
      vanillaCode: `Similar with template literals`,
      a11y: `Clear price communication, screen reader friendly`,
      seo: `Structured data for prices`,
      performance: `Minimal calculations`,
    },
  };

  private listAvailablePatterns(): string {
    return `# E-commerce UI Patterns

**Available Patterns:**

**Product Display:**
- \`product-grid\` - Responsive product grid layout
- \`product-card\` - Individual product card component
- \`price-display\` - Price with discounts and formatting

**Shopping Cart:**
- \`cart-item\` - Cart line item with quantity controls
- \`add-to-cart\` - Add to cart button with states
- \`quantity-selector\` - Quantity input component

**Checkout:**
- \`checkout-form\` - Multi-step checkout form

**Navigation & Filters:**
- \`filter-sidebar\` - Product filtering sidebar
- \`search-bar\` - Product search with autocomplete
- \`breadcrumbs\` - Navigation breadcrumbs

**Usage:**
\`\`\`javascript
// Get Alpine.js implementation
get_ecommerce_ui_pattern({
  pattern: "product-grid",
  framework: "alpine"
})

// Get vanilla JS implementation
get_ecommerce_ui_pattern({
  pattern: "add-to-cart",
  framework: "vanilla"
})
\`\`\`

**Each pattern includes:**
- Complete code implementation
- Best practices
- Accessibility guidelines
- SEO considerations
- Performance tips

**Tailwind CSS Required:**
All patterns use Tailwind CSS utility classes. Make sure Tailwind is configured in your project.

**Alpine.js vs Vanilla:**
- Alpine.js: Recommended for simpler, declarative code
- Vanilla JS: More control, no dependencies`;
  }
}

interface PatternContent {
  description: string;
  bestPractices: string;
  alpineCode: string;
  vanillaCode: string;
  a11y: string;
  seo: string;
  performance: string;
}
