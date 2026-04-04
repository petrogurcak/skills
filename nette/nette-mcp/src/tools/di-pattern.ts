import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface DIPatternParams {
  pattern:
    | 'services'
    | 'factories'
    | 'decorators'
    | 'extensions'
    | 'autowiring'
    | 'configuration';
}

export class DIPatternTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://nette.org/en';

  private readonly patternMap: Record<string, string> = {
    services: 'dependency-injection/services',
    factories: 'dependency-injection/factories',
    decorators: 'dependency-injection/configuration#decorators',
    extensions:
      'dependency-injection/extensions',
    autowiring: 'dependency-injection/autowiring',
    configuration: 'dependency-injection/configuration',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async lookupPattern(
    params: DIPatternParams
  ): Promise<string> {
    const topicPath = this.patternMap[params.pattern];

    if (!topicPath) {
      return this.listAvailablePatterns();
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
          section
        );
        if (!extracted.includes('not found')) {
          result = extracted;
        }
      }

      return this.formatResponse(
        params.pattern,
        result,
        url
      );
    } catch (error) {
      return this.formatError(params.pattern, url, error);
    }
  }

  private formatResponse(
    pattern: string,
    content: string,
    url: string
  ): string {
    return `# Nette DI: ${pattern}\n\nSource: ${url}\n\n${content}\n\n---\n\n**Quick Reference:**\n${this.getQuickReference(pattern)}`;
  }

  private getQuickReference(pattern: string): string {
    const references: Record<string, string> = {
      services: `
\`\`\`neon
services:
    - App\\Model\\UserRepository
    - App\\Model\\ArticleRepository(%appDir%)

    userManager:
        factory: App\\Model\\UserManager
        setup:
            - setLogger(@logger)
\`\`\`
`,
      factories: `
\`\`\`neon
services:
    - UserGridFactory

# Or manual factory
userGridFactory:
    implement: UserGridFactory
    arguments: [%tempDir%]
\`\`\`

\`\`\`php
interface UserGridFactory
{
    public function create(): UserGrid;
}
\`\`\`
`,
      decorators: `
\`\`\`neon
decorator:
    App\\Model\\ICache:
        setup:
            - setCache(@cache.storage)

    PDO:
        setup:
            - setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION)
\`\`\`
`,
      extensions: `
\`\`\`neon
extensions:
    api: App\\DI\\ApiExtension
    console: Contributte\\Console\\DI\\ConsoleExtension(%consoleMode%)
\`\`\`

\`\`\`php
class ApiExtension extends Nette\\DI\\CompilerExtension
{
    public function loadConfiguration(): void
    {
        $builder = $this->getContainerBuilder();
        // Register services
    }
}
\`\`\`
`,
      autowiring: `
Constructor injection (automatic):
\`\`\`php
public function __construct(
    private UserRepository $userRepository,
    private Authenticator $auth,
) {}
\`\`\`

Disable autowiring for service:
\`\`\`neon
services:
    myService:
        factory: MyService
        autowired: false
\`\`\`
`,
      configuration: `
\`\`\`neon
services:
    - App\\Model\\UserRepository

parameters:
    appDir: %appDir%
    tempDir: %tempDir%

includes:
    - local.neon
\`\`\`
`,
    };

    return (
      references[pattern] ||
      'See documentation for examples.'
    );
  }

  private formatError(
    pattern: string,
    url: string,
    error: unknown
  ): string {
    const message =
      error instanceof Error ? error.message : String(error);

    return `# DI Pattern Error

Pattern: ${pattern}
URL: ${url}
Error: ${message}

${this.listAvailablePatterns()}`;
  }

  private listAvailablePatterns(): string {
    return `# Nette DI Available Patterns

**Basic:**
- \`services\` - Service registration and configuration
- \`autowiring\` - Automatic dependency injection
- \`configuration\` - NEON configuration basics

**Advanced:**
- \`factories\` - Generated factories for components
- \`decorators\` - Service decoration and modification
- \`extensions\` - Compiler extensions for custom configuration

Visit https://nette.org/en/dependency-injection for complete documentation.`;
  }
}
