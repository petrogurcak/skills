import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface TracyFeatureParams {
  feature:
    | 'bar-dump'
    | 'logger'
    | 'bluescreen'
    | 'custom-panel'
    | 'production-mode'
    | 'debugger'
    | 'email';
}

export class TracyFeatureTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://tracy.nette.org/en';

  private readonly featureMap: Record<string, string> = {
    'bar-dump': 'guide#bar-dump',
    logger: 'guide#logger',
    bluescreen: 'guide#bluescreen',
    'custom-panel': 'extensions#custom-panel',
    'production-mode': 'guide#production-mode',
    debugger: 'guide',
    email: 'guide#email',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async getFeature(
    params: TracyFeatureParams
  ): Promise<string> {
    const topicPath = this.featureMap[params.feature];

    if (!topicPath) {
      return this.listAvailableFeatures();
    }

    const [page, section] = topicPath.split('#');
    const url = `${this.baseUrl}/${page}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, .content, main',
      });

      let result = content;

      // Extract specific section if provided
      if (section) {
        const extracted = this.fetcher.extractSection(
          content,
          section.replace(/-/g, ' ')
        );
        if (!extracted.includes('not found')) {
          result = extracted;
        }
      }

      return this.formatResponse(params.feature, result, url);
    } catch (error) {
      return this.formatError(params.feature, url, error);
    }
  }

  private formatResponse(
    feature: string,
    content: string,
    url: string
  ): string {
    return `# Tracy: ${feature}\n\nSource: ${url}\n\n${content}\n\n---\n\n**Quick Tips:**\n${this.getQuickTips(feature)}`;
  }

  private getQuickTips(feature: string): string {
    const tips: Record<string, string> = {
      'bar-dump': `
- Use \`Tracy\\Debugger::barDump($var, 'label')\` for complex variables
- Use \`dump($var)\` for quick simple dumps
- barDump keeps variables in Tracy bar for later inspection
`,
      logger: `
- \`Tracy\\Debugger::log($message)\` - log info
- \`Tracy\\Debugger::log($exception, Tracy\\ILogger::EXCEPTION)\` - log exception
- Logs are stored in \`log/\` directory
- Email notifications configurable in config
`,
      bluescreen: `
- Blue screen appears automatically on errors in debug mode
- Shows stack trace, variables, file context
- Customizable with custom panels
- Disable in production with \`Debugger::enable(Debugger::PRODUCTION)\`
`,
      'custom-panel': `
- Implement \`Tracy\\IBarPanel\` interface
- Methods: \`getTab()\` and \`getPanel()\`
- Register: \`Tracy\\Debugger::getBar()->addPanel(new MyPanel())\`
- Useful for DB queries, performance metrics, etc.
`,
      'production-mode': `
- Set via \`Debugger::enable(Debugger::PRODUCTION)\`
- Or detect automatically: \`Debugger::enable(['127.0.0.1'])\`
- Production: errors logged, email sent, no bluescreen
- Development: bluescreen shown, Tracy bar visible
`,
    };

    return (
      tips[feature] ||
      'Visit https://tracy.nette.org for more information.'
    );
  }

  private formatError(
    feature: string,
    url: string,
    error: unknown
  ): string {
    const message =
      error instanceof Error ? error.message : String(error);

    return `# Tracy Feature Error

Feature: ${feature}
URL: ${url}
Error: ${message}

${this.listAvailableFeatures()}`;
  }

  private listAvailableFeatures(): string {
    return `# Tracy Available Features

**Debugging:**
- \`bar-dump\` - Variable dumping to Tracy bar
- \`debugger\` - General debugger usage

**Logging & Errors:**
- \`logger\` - Logging messages and exceptions
- \`bluescreen\` - Error screen configuration
- \`production-mode\` - Production vs development mode
- \`email\` - Email notifications for errors

**Extensions:**
- \`custom-panel\` - Creating custom Tracy bar panels

Visit https://tracy.nette.org/en for complete documentation.`;
  }
}
