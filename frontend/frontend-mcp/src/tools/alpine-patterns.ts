import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface AlpinePatternsParams {
  directive:
    | 'x-data'
    | 'x-model'
    | 'x-show'
    | 'x-if'
    | 'x-for'
    | '@event'
    | 'x-transition'
    | 'x-init'
    | 'general';
  use_case?: string;
}

export class AlpinePatternsTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://alpinejs.dev';

  private readonly directiveMap: Record<string, string> = {
    'x-data': 'directives/data',
    'x-model': 'directives/model',
    'x-show': 'directives/show',
    'x-if': 'directives/if',
    'x-for': 'directives/for',
    '@event': 'directives/on',
    'x-on': 'directives/on',
    'x-transition': 'directives/transition',
    'x-init': 'directives/init',
    'x-text': 'directives/text',
    'x-html': 'directives/html',
    'x-bind': 'directives/bind',
    'x-cloak': 'directives/cloak',
    general: 'essentials/state',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchPattern(
    params: AlpinePatternsParams
  ): Promise<string> {
    const directive = params.directive;
    const useCase = params.use_case;

    // Map directive to doc page
    const docPage = this.directiveMap[directive];
    if (!docPage) {
      return this.listAvailableDirectives();
    }

    const url = `${this.baseUrl}/${docPage}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, .prose, main, .content',
      });

      return this.formatResponse(
        directive,
        useCase || '',
        content,
        url
      );
    } catch (error) {
      return this.formatError(directive, url, error);
    }
  }

  private formatResponse(
    directive: string,
    useCase: string,
    content: string,
    url: string
  ): string {
    let response = `# Alpine.js: ${directive}\n\n`;
    if (useCase) response += `Use Case: ${useCase}\n\n`;
    response += `Source: ${url}\n\n`;

    response += content;

    response += `\n\n---\n\n**Quick Reference:**\n`;
    response += this.getQuickReference(directive);

    response += `\n\n**Best Practices:**\n`;
    response += this.getBestPractices(directive);

    return response;
  }

  private getQuickReference(directive: string): string {
    const references: Record<string, string> = {
      'x-data': `
\`\`\`html
<!-- Basic state -->
<div x-data="{ open: false, count: 0 }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Content</div>
</div>

<!-- With methods -->
<div x-data="{
  items: [],
  addItem(item) {
    this.items.push(item);
  }
}">
  <button @click="addItem('New')">Add</button>
  <span x-text="items.length"></span> items
</div>

<!-- Component with init -->
<div x-data="{
  data: null,
  async init() {
    this.data = await fetch('/api').then(r => r.json());
  }
}">
  <template x-if="data">
    <div x-text="data.title"></div>
  </template>
</div>
\`\`\`
`,
      'x-model': `
\`\`\`html
<!-- Text input -->
<div x-data="{ search: '' }">
  <input type="text" x-model="search">
  <p>Searching for: <span x-text="search"></span></p>
</div>

<!-- Checkbox -->
<div x-data="{ agree: false }">
  <input type="checkbox" x-model="agree">
  <button :disabled="!agree">Submit</button>
</div>

<!-- Select -->
<div x-data="{ selected: 'option1' }">
  <select x-model="selected">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
</div>

<!-- Modifiers -->
<input x-model.debounce.500ms="search">
<input x-model.number="quantity">
\`\`\`
`,
      'x-show': `
\`\`\`html
<!-- Basic show/hide -->
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">
    This content shows/hides
  </div>
</div>

<!-- With transition -->
<div x-show="open" x-transition>
  Smooth transition
</div>

<!-- Important -->
<div x-show.important="open">
  Uses !important for display
</div>
\`\`\`
`,
      'x-if': `
\`\`\`html
<!-- Conditional rendering (removes from DOM) -->
<div x-data="{ show: false }">
  <template x-if="show">
    <div>This is added/removed from DOM</div>
  </template>
</div>

<!-- With x-for -->
<div x-data="{ items: ['a', 'b'] }">
  <template x-if="items.length > 0">
    <ul>
      <template x-for="item in items">
        <li x-text="item"></li>
      </template>
    </ul>
  </template>
  <template x-if="items.length === 0">
    <p>No items</p>
  </template>
</div>
\`\`\`
`,
      'x-for': `
\`\`\`html
<!-- Basic loop -->
<div x-data="{ items: ['Apple', 'Orange', 'Banana'] }">
  <template x-for="item in items">
    <div x-text="item"></div>
  </template>
</div>

<!-- With index -->
<template x-for="(item, index) in items">
  <div>
    <span x-text="index + 1"></span>:
    <span x-text="item"></span>
  </div>
</template>

<!-- With key (for performance) -->
<template x-for="item in items" :key="item.id">
  <div x-text="item.name"></div>
</template>

<!-- Objects -->
<template x-for="(value, key) in {a: 1, b: 2}">
  <div><span x-text="key"></span>: <span x-text="value"></span></div>
</template>
\`\`\`
`,
      '@event': `
\`\`\`html
<!-- Click event -->
<button @click="count++">Increment</button>

<!-- Prevent default -->
<form @submit.prevent="handleSubmit()">
  <button type="submit">Submit</button>
</form>

<!-- Event modifiers -->
<div @click.away="open = false">Closes on click outside</div>
<input @keyup.enter="submit()">
<button @click.once="init()">Run once</button>
<div @click.stop="handleClick()">Stop propagation</div>

<!-- Custom events -->
<div @custom-event="handleCustom($event.detail)">
  Listens for custom events
</div>

<!-- Window events -->
<div @resize.window="handleResize()">
  Listens to window resize
</div>
\`\`\`
`,
      'x-transition': `
\`\`\`html
<!-- Default transition -->
<div x-show="open" x-transition>
  Fades in/out with default timing
</div>

<!-- Custom duration -->
<div x-show="open" x-transition.duration.500ms>
  500ms transition
</div>

<!-- Custom classes -->
<div
  x-show="open"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0 transform scale-90"
  x-transition:enter-end="opacity-100 transform scale-100"
  x-transition:leave="transition ease-in duration-300"
  x-transition:leave-start="opacity-100"
  x-transition:leave-end="opacity-0"
>
  Custom transition
</div>
\`\`\`
`,
      'x-init': `
\`\`\`html
<!-- Initialize component -->
<div x-data="{ data: null }" x-init="console.log('Component initialized')">
  Component
</div>

<!-- Async initialization -->
<div
  x-data="{ users: [] }"
  x-init="users = await fetch('/api/users').then(r => r.json())"
>
  <template x-for="user in users">
    <div x-text="user.name"></div>
  </template>
</div>

<!-- Multiple statements -->
<div x-init="
  console.log('Init');
  $watch('count', value => console.log(value));
">
  Component
</div>
\`\`\`
`,
    };

    return (
      references[directive] ||
      'See Alpine.js documentation for examples.'
    );
  }

  private getBestPractices(directive: string): string {
    const practices: Record<string, string> = {
      'x-data': `
- Keep state close to where it's used
- Use x-data on the parent component container
- Initialize all state upfront for reactivity
- Use methods for complex logic
- Consider extracting to Alpine.data() for reusability
`,
      'x-model': `
- Works with input, textarea, select
- Use .debounce modifier for search inputs
- Use .number for numeric inputs
- Combines :value and @input automatically
- Prefer over manual binding for forms
`,
      'x-show': `
- Use x-show when toggling frequently (keeps in DOM)
- Use x-if when rarely shown (removes from DOM)
- Add x-transition for smooth show/hide
- x-show vs x-if: x-show = display toggle, x-if = DOM add/remove
`,
      'x-if': `
- MUST wrap in <template> tag
- Removes element from DOM completely
- Better for rarely shown content
- Use x-show for frequent toggling
- Can't be on same element as x-for
`,
      'x-for': `
- MUST wrap in <template> tag
- Use :key for list updates performance
- Can loop arrays or objects
- Access index with (item, index) syntax
- Don't use with x-if on same element
`,
      '@event': `
- Shorthand for x-on:event
- Use modifiers: .prevent, .stop, .once, .away
- Access event object with $event
- Listen to window/document with .window/.document
- Debounce events with .debounce modifier
`,
      'x-transition': `
- Works with x-show (not x-if)
- Default transitions provided
- Customize with Tailwind classes
- Control enter/leave separately
- Use .duration modifier for timing
`,
      'x-init': `
- Runs when Alpine initializes component
- Good for API calls on mount
- Can be async
- Access Alpine context ($watch, $el, etc.)
- Runs before first render
`,
    };

    return (
      practices[directive] ||
      'Follow Alpine.js documentation for best practices.'
    );
  }

  private formatError(
    directive: string,
    url: string,
    error: unknown
  ): string {
    const message =
      error instanceof Error ? error.message : String(error);

    return `# Alpine.js Pattern Error

Directive: ${directive}
URL: ${url}
Error: ${message}

${this.listAvailableDirectives()}`;
  }

  private listAvailableDirectives(): string {
    return `# Alpine.js Available Directives

**State & Data:**
- \`x-data\` - Define component state and methods
- \`x-init\` - Run code when component initializes

**Rendering:**
- \`x-show\` - Toggle visibility (keeps in DOM)
- \`x-if\` - Conditional rendering (removes from DOM)
- \`x-for\` - Loop over arrays/objects
- \`x-text\` - Set text content
- \`x-html\` - Set HTML content

**Binding:**
- \`x-bind\` or \`:\` - Bind attributes
- \`x-model\` - Two-way data binding for forms

**Events:**
- \`@event\` or \`x-on:event\` - Listen to events
- Modifiers: .prevent, .stop, .once, .away, .debounce

**Transitions:**
- \`x-transition\` - Animate show/hide with transitions

**Utility:**
- \`x-cloak\` - Hide until Alpine loads

Visit https://alpinejs.dev for complete documentation.`;
  }
}
