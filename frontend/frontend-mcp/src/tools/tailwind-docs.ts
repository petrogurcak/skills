import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface TailwindDocsParams {
  topic: string;
  include_examples?: boolean;
}

export class TailwindDocsTool {
  private fetcher: BaseFetcher;
  // Tailwind CSS v4.1 - CSS-first configuration, improved utilities
  private readonly baseUrl = 'https://tailwindcss.com/docs';

  private readonly topicMap: Record<string, string> = {
    // Layout
    grid: 'grid-template-columns',
    flex: 'flex',
    flexbox: 'flex',
    columns: 'columns',
    'break-after': 'break-after',

    // Spacing
    padding: 'padding',
    margin: 'margin',
    space: 'space',
    gap: 'gap',

    // Sizing
    width: 'width',
    height: 'height',
    'min-width': 'min-width',
    'max-width': 'max-width',

    // Typography
    'font-size': 'font-size',
    'font-weight': 'font-weight',
    'text-align': 'text-align',
    'text-color': 'text-color',
    'line-height': 'line-height',

    // Backgrounds
    'background-color': 'background-color',
    'background-image': 'background-image',

    // Borders
    'border-radius': 'border-radius',
    'border-width': 'border-width',
    'border-color': 'border-color',

    // Effects
    'box-shadow': 'box-shadow',
    opacity: 'opacity',

    // Responsive
    responsive: 'responsive-design',
    breakpoints: 'responsive-design',

    // Dark mode
    'dark-mode': 'dark-mode',
    dark: 'dark-mode',

    // Forms
    forms: 'forms',

    // General
    installation: 'installation',
    configuration: 'configuration',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchDocs(
    params: TailwindDocsParams
  ): Promise<string> {
    const topic = params.topic.toLowerCase();
    const includeExamples = params.include_examples ?? true;

    // Map topic to doc page
    const docPage =
      this.topicMap[topic] || topic.replace(/\s+/g, '-');
    const url = `${this.baseUrl}/${docPage}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, .prose, main, #content',
      });

      return this.formatResponse(
        topic,
        content,
        url,
        includeExamples
      );
    } catch (error) {
      // Try searching in docs
      return await this.searchInDocs(topic, error);
    }
  }

  private async searchInDocs(
    topic: string,
    originalError: unknown
  ): Promise<string> {
    try {
      // Try main docs page
      const searchUrl = `${this.baseUrl}/installation`;
      const content = await this.fetcher.searchInPage(
        searchUrl,
        topic
      );

      return this.formatSearchResponse(
        topic,
        content,
        searchUrl
      );
    } catch (searchError) {
      return this.formatError(
        topic,
        originalError,
        searchError
      );
    }
  }

  private formatResponse(
    topic: string,
    content: string,
    url: string,
    includeExamples: boolean
  ): string {
    let response = `# Tailwind CSS: ${topic}\n\nSource: ${url}\n\n`;

    if (includeExamples) {
      response += content;
    } else {
      // Extract just utility classes and values
      const utilities = this.extractUtilities(content);
      response += utilities;
    }

    response += `\n\n---\n\n**Quick Tips:**\n`;
    response += this.getQuickTips(topic);

    return response;
  }

  private extractUtilities(content: string): string {
    // Try to extract utility class tables/lists
    const lines = content.split('\n');
    const utilityLines: string[] = [];
    let inUtilities = false;

    for (const line of lines) {
      if (
        line.includes('Class') ||
        line.includes('Utility') ||
        line.includes('Properties')
      ) {
        inUtilities = true;
      }
      if (
        inUtilities &&
        (line.includes('##') || utilityLines.length > 50)
      ) {
        break;
      }
      if (inUtilities) {
        utilityLines.push(line);
      }
    }

    return utilityLines.length > 0
      ? utilityLines.join('\n')
      : content.substring(0, 1000); // First 1000 chars as fallback
  }

  private getQuickTips(topic: string): string {
    const tips: Record<string, string> = {
      grid: `
- Use grid-cols-{n} for column count (1-12)
- Responsive: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- Gap between items: gap-4, gap-x-4, gap-y-2
- Auto-fit columns: grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
`,
      flex: `
- Flex direction: flex-row, flex-col
- Justify (main axis): justify-center, justify-between, justify-around
- Align (cross axis): items-center, items-start, items-end
- Flex grow/shrink: flex-1, flex-auto, flex-none
`,
      responsive: `
- Mobile-first: base styles apply to all sizes
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Apply at breakpoint: md:text-lg, lg:grid-cols-3
- Hide/show: hidden sm:block, block lg:hidden
`,
      padding: `
- All sides: p-4 (1rem / 16px)
- Individual: pt-4, pr-2, pb-4, pl-2
- Horizontal/vertical: px-4, py-2
- Spacing scale: 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...
`,
      margin: `
- All sides: m-4
- Individual: mt-4, mr-2, mb-4, ml-2
- Auto centering: mx-auto
- Negative margins: -m-4, -mt-2
`,
    };

    return (
      tips[topic] ||
      'Use Tailwind utilities for consistency. Check the docs for all available values.'
    );
  }

  private formatSearchResponse(
    topic: string,
    content: string,
    url: string
  ): string {
    return `# Search Results: ${topic}\n\nSearched in: ${url}\n\n${content}\n\n**Note:** Direct documentation page not found. Results from search.`;
  }

  private formatError(
    topic: string,
    apiError: unknown,
    searchError: unknown
  ): string {
    const apiMsg =
      apiError instanceof Error
        ? apiError.message
        : String(apiError);
    const searchMsg =
      searchError instanceof Error
        ? searchError.message
        : String(searchError);

    return `# Tailwind Documentation Not Found: ${topic}

**Direct Page Error:**
${apiMsg}

**Search Error:**
${searchMsg}

**Suggestions:**
- Check topic spelling
- Try related topics: "grid", "flex", "responsive", "padding", "colors"
- Visit https://tailwindcss.com/docs directly
- Try searching for specific utility class

**Common Topics:**
- Layout: grid, flex, columns, container
- Spacing: padding, margin, space, gap
- Sizing: width, height, min-width, max-width
- Typography: font-size, font-weight, text-align, text-color
- Colors: background-color, text-color, border-color
- Responsive: responsive-design, breakpoints
- Dark mode: dark-mode

Visit https://tailwindcss.com/docs for complete documentation.`;
  }
}
