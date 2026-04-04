import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface ApiSearchParams {
  query: string;
  scope?: 'all' | 'framework' | 'latte' | 'tracy' | 'di';
}

export class ApiSearchTool {
  private fetcher: BaseFetcher;

  private readonly searchUrls: Record<string, string[]> = {
    framework: [
      'https://nette.org/en/application',
      'https://nette.org/en/database',
      'https://nette.org/en/forms',
      'https://nette.org/en/security',
    ],
    latte: [
      'https://latte.nette.org/en/syntax',
      'https://latte.nette.org/en/tags',
      'https://latte.nette.org/en/filters',
    ],
    tracy: [
      'https://tracy.nette.org/en/guide',
      'https://tracy.nette.org/en/extensions',
    ],
    di: [
      'https://nette.org/en/dependency-injection/services',
      'https://nette.org/en/dependency-injection/configuration',
    ],
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async search(params: ApiSearchParams): Promise<string> {
    const scope = params.scope || 'all';
    const results: string[] = [];

    const urlsToSearch =
      scope === 'all'
        ? Object.values(this.searchUrls).flat()
        : this.searchUrls[scope] || [];

    if (urlsToSearch.length === 0) {
      return this.formatNoScope(scope);
    }

    // Search each URL
    for (const url of urlsToSearch) {
      try {
        const matches = await this.fetcher.searchInPage(
          url,
          params.query,
          'article, .content, main'
        );

        if (!matches.includes('No results found')) {
          const urlParts = new URL(url);
          const source = `${urlParts.hostname}${urlParts.pathname}`;
          results.push(`## ${source}\n\n${matches}`);
        }
      } catch {
        // Skip failed searches
        continue;
      }
    }

    if (results.length > 0) {
      return this.formatResults(params.query, scope, results);
    }

    return this.formatNoResults(params.query, scope);
  }

  private formatResults(
    query: string,
    scope: string,
    results: string[]
  ): string {
    return `# API Search Results: "${query}"

Scope: ${scope}
Found in ${results.length} location(s)

${results.join('\n\n---\n\n')}`;
  }

  private formatNoResults(
    query: string,
    scope: string
  ): string {
    return `# No Results Found

Query: "${query}"
Scope: ${scope}

**Suggestions:**
- Try different keywords
- Try broader search scope (use "all")
- Check spelling
- Visit https://nette.org/en directly for full documentation

**Available scopes:**
- all - Search everything
- framework - Nette Framework (presenters, components, database, forms)
- latte - Latte template engine
- tracy - Tracy debugger
- di - Dependency injection`;
  }

  private formatNoScope(scope: string): string {
    return `# Invalid Scope: "${scope}"

**Available scopes:**
- all - Search all Nette documentation
- framework - Nette Framework components
- latte - Latte template engine
- tracy - Tracy debugger
- di - Dependency injection

Please use one of the above scopes.`;
  }
}
