import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface PyPISearchParams {
  package_name: string;
}

export class PyPISearchTool {
  private fetcher: BaseFetcher;

  // Popular Python packages with their documentation URLs
  private readonly packageDocs: Record<string, string> = {
    // FastAPI ecosystem
    'fastapi': 'https://fastapi.tiangolo.com',
    'pydantic': 'https://docs.pydantic.dev/latest',
    'starlette': 'https://www.starlette.io',
    'uvicorn': 'https://www.uvicorn.org',
    'httpx': 'https://www.python-httpx.org',

    // Database
    'sqlalchemy': 'https://docs.sqlalchemy.org/en/20',
    'alembic': 'https://alembic.sqlalchemy.org/en/latest',
    'asyncpg': 'https://magicstack.github.io/asyncpg/current',
    'psycopg': 'https://www.psycopg.org/psycopg3/docs',
    'redis': 'https://redis-py.readthedocs.io/en/stable',
    'aioredis': 'https://aioredis.readthedocs.io',

    // Auth & Security
    'python-jose': 'https://python-jose.readthedocs.io',
    'passlib': 'https://passlib.readthedocs.io/en/stable',
    'pyjwt': 'https://pyjwt.readthedocs.io',
    'python-multipart': 'https://andrew-d.github.io/python-multipart',

    // Testing
    'pytest': 'https://docs.pytest.org/en/stable',
    'pytest-asyncio': 'https://pytest-asyncio.readthedocs.io',
    'factory-boy': 'https://factoryboy.readthedocs.io',
    'faker': 'https://faker.readthedocs.io',

    // Utilities
    'python-dotenv': 'https://saurabh-kumar.com/python-dotenv',
    'pydantic-settings': 'https://docs.pydantic.dev/latest/concepts/pydantic_settings',
    'celery': 'https://docs.celeryq.dev/en/stable',
    'aiofiles': 'https://github.com/Tinche/aiofiles',
    'orjson': 'https://github.com/ijl/orjson',
    'ujson': 'https://github.com/ultrajson/ultrajson',

    // Logging & Monitoring
    'loguru': 'https://loguru.readthedocs.io',
    'structlog': 'https://www.structlog.org',
    'sentry-sdk': 'https://docs.sentry.io/platforms/python',

    // API clients
    'boto3': 'https://boto3.amazonaws.com/v1/documentation/api/latest',
    'google-cloud': 'https://cloud.google.com/python/docs',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async searchPyPI(params: PyPISearchParams): Promise<string> {
    const packageName = params.package_name.toLowerCase();

    // Check known packages first
    const docsUrl = this.packageDocs[packageName];
    if (docsUrl) {
      return await this.fetchFromDocs(packageName, docsUrl);
    }

    // Try PyPI API
    return await this.fetchFromPyPI(packageName);
  }

  private async fetchFromDocs(packageName: string, docsUrl: string): Promise<string> {
    try {
      const content = await this.fetcher.fetchDoc(docsUrl, {
        selector: 'main, article, .content, .document',
      });

      return this.formatResponse(packageName, content, docsUrl);
    } catch (error) {
      return this.fetchFromPyPI(packageName);
    }
  }

  private async fetchFromPyPI(packageName: string): Promise<string> {
    const pypiUrl = `https://pypi.org/project/${packageName}/`;

    try {
      const content = await this.fetcher.fetchDoc(pypiUrl, {
        selector: '.project-description, .release-timeline, article',
      });

      return this.formatResponse(packageName, content, pypiUrl);
    } catch (error) {
      return this.handleError(packageName, error);
    }
  }

  private formatResponse(
    packageName: string,
    content: string,
    url: string
  ): string {
    let response = `# Python Package: ${packageName}\n\n`;
    response += `**Source:** ${url}\n\n`;
    response += '---\n\n';
    response += content;
    response += '\n\n---\n\n';
    response += this.getInstallInstructions(packageName);

    return response;
  }

  private getInstallInstructions(packageName: string): string {
    const asyncPackages = ['asyncpg', 'aioredis', 'aiofiles', 'httpx'];
    const extraDeps: Record<string, string> = {
      'fastapi': 'uvicorn[standard]',
      'sqlalchemy': 'asyncpg psycopg2-binary',
      'pydantic': 'email-validator',
    };

    let instructions = `**Installation:**\n\`\`\`bash\npip install ${packageName}\n`;

    if (extraDeps[packageName]) {
      instructions += `# With common extras:\npip install ${packageName} ${extraDeps[packageName]}\n`;
    }

    instructions += `\`\`\`\n`;

    if (asyncPackages.includes(packageName)) {
      instructions += `\n**Note:** This is an async package. Use with \`async/await\`.\n`;
    }

    return instructions;
  }

  private handleError(packageName: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Package Not Found: ${packageName}

**Error:** ${message}

**Suggestions:**
- Check package name spelling
- Search PyPI: https://pypi.org/search/?q=${encodeURIComponent(packageName)}

**Popular FastAPI Packages:**
- fastapi - Web framework
- pydantic - Data validation
- sqlalchemy - Database ORM
- uvicorn - ASGI server
- pytest - Testing
- httpx - HTTP client
- python-jose - JWT tokens
- passlib - Password hashing`;
  }
}
