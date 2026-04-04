import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface NetteDocsParams {
  component:
    | 'framework'
    | 'database'
    | 'forms'
    | 'mail'
    | 'utils'
    | 'security';
  topic: string;
  language?: 'en' | 'cs';
}

export class NetteDocsTool {
  private fetcher: BaseFetcher;

  private readonly baseUrls = {
    en: 'https://nette.org/en',
    cs: 'https://nette.org/cs',
  };

  private readonly componentPaths: Record<string, string> = {
    framework: 'application',
    database: 'database',
    forms: 'forms',
    mail: 'mail',
    utils: 'utils',
    security: 'security',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchDocumentation(
    params: NetteDocsParams
  ): Promise<string> {
    const lang = params.language || 'en';
    const baseUrl = this.baseUrls[lang];
    const componentPath =
      this.componentPaths[params.component];

    if (!componentPath) {
      throw new Error(
        `Unknown component: ${params.component}`
      );
    }

    // Build URL
    const topicSlug = params.topic
      .toLowerCase()
      .replace(/\s+/g, '-');
    const url = `${baseUrl}/${componentPath}/${topicSlug}`;

    try {
      // Fetch main content area
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, .content, main, #content',
      });

      return this.formatResponse(params, content, url);
    } catch (error) {
      // Try alternative URL patterns
      const altUrl = `${baseUrl}/documentation#${componentPath}`;

      try {
        const content = await this.fetcher.fetchDoc(altUrl);
        const section = this.fetcher.extractSection(
          content,
          params.topic
        );

        return this.formatResponse(params, section, altUrl);
      } catch (altError) {
        return this.formatError(params, url, error);
      }
    }
  }

  private formatResponse(
    params: NetteDocsParams,
    content: string,
    url: string
  ): string {
    return `# Nette ${params.component} - ${params.topic}\n\nSource: ${url}\n\n${content}`;
  }

  private formatError(
    params: NetteDocsParams,
    url: string,
    error: unknown
  ): string {
    const message =
      error instanceof Error ? error.message : String(error);

    return `# Documentation Not Found

Component: ${params.component}
Topic: ${params.topic}
Attempted URL: ${url}

Error: ${message}

**Suggestions:**
- Check the topic name spelling
- Try a different component
- Visit https://nette.org/en/documentation directly`;
  }
}
