import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface LatteSyntaxParams {
  query: string;
}

export class LatteSyntaxTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://latte.nette.org/en';

  private readonly topicMap: Record<string, string> = {
    // Attributes
    'n:if': 'syntax#n:attribute',
    'n:foreach': 'syntax#n:attribute',
    'n:class': 'syntax#n:attribute',
    'n:href': 'syntax#n:attribute',
    'n:attr': 'syntax#n:attribute',

    // Macros
    if: 'tags#if',
    foreach: 'tags#foreach',
    for: 'tags#for',
    while: 'tags#while',
    block: 'template-inheritance#blocks',
    define: 'template-inheritance#definitions',
    include: 'template-inheritance#include',
    layout: 'template-inheritance#layout-inheritance',

    // Filters
    filter: 'filters',
    filters: 'filters',
    'custom filter': 'develop#filters',
    'custom filters': 'develop#filters',

    // Functions
    function: 'functions',
    functions: 'functions',

    // Types and safety
    type: 'type-system',
    types: 'type-system',
    'type system': 'type-system',

    // Custom development
    'custom tag': 'develop#tags',
    'custom tags': 'develop#tags',
    'custom macro': 'develop#tags',
    extension: 'develop',
    extensions: 'develop',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async searchSyntax(
    params: LatteSyntaxParams
  ): Promise<string> {
    const query = params.query.toLowerCase().trim();

    // Try to find exact topic match
    const topicPath = this.findTopicPath(query);

    if (topicPath) {
      return await this.fetchTopic(topicPath, query);
    }

    // Fall back to search across multiple pages
    return await this.searchAcrossPages(query);
  }

  private findTopicPath(query: string): string | null {
    // Direct match
    if (this.topicMap[query]) {
      return this.topicMap[query];
    }

    // Partial match
    for (const [key, path] of Object.entries(this.topicMap)) {
      if (
        query.includes(key) ||
        key.includes(query)
      ) {
        return path;
      }
    }

    return null;
  }

  private async fetchTopic(
    topicPath: string,
    query: string
  ): Promise<string> {
    const [page, section] = topicPath.split('#');
    const url = `${this.baseUrl}/${page}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, .content, main',
      });

      let result = content;

      // If there's a section, try to extract it
      if (section) {
        const extracted = this.fetcher.extractSection(
          content,
          section
        );
        if (!extracted.includes('not found')) {
          result = extracted;
        }
      }

      return this.formatResponse(query, result, url);
    } catch (error) {
      return this.formatError(query, url, error);
    }
  }

  private async searchAcrossPages(
    query: string
  ): Promise<string> {
    const pagesToSearch = [
      'syntax',
      'tags',
      'filters',
      'functions',
      'type-system',
      'template-inheritance',
      'develop',
    ];

    const results: string[] = [];

    for (const page of pagesToSearch) {
      try {
        const url = `${this.baseUrl}/${page}`;
        const matches = await this.fetcher.searchInPage(
          url,
          query,
          'article, .content, main'
        );

        if (!matches.includes('No results found')) {
          results.push(`## From ${page}\n\n${matches}`);
        }
      } catch {
        // Skip failed pages
        continue;
      }
    }

    if (results.length > 0) {
      return `# Latte Syntax Search: "${query}"\n\n${results.join('\n\n---\n\n')}`;
    }

    return this.formatNotFound(query);
  }

  private formatResponse(
    query: string,
    content: string,
    url: string
  ): string {
    return `# Latte: ${query}\n\nSource: ${url}\n\n${content}`;
  }

  private formatError(
    query: string,
    url: string,
    error: unknown
  ): string {
    const message =
      error instanceof Error ? error.message : String(error);

    return `# Latte Documentation Error

Query: "${query}"
URL: ${url}
Error: ${message}

Try visiting https://latte.nette.org/en directly.`;
  }

  private formatNotFound(query: string): string {
    return `# No Results for "${query}"

The query didn't match any known Latte syntax topics.

**Common topics you can search for:**
- n:if, n:foreach, n:class, n:href (n:attributes)
- if, foreach, block, define, include, layout (macros)
- filters, custom filters
- functions
- types, type system
- custom tags, extensions

Try one of these or visit https://latte.nette.org/en for the full documentation.`;
  }
}
