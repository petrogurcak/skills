import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface FastAPIDocsParams {
  topic: string;
  include_examples?: boolean;
}

export class FastAPIDocsTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://fastapi.tiangolo.com';

  private readonly topicPaths: Record<string, string> = {
    // Tutorial
    'first-steps': '/tutorial/first-steps',
    'path-parameters': '/tutorial/path-params',
    'query-parameters': '/tutorial/query-params',
    'request-body': '/tutorial/body',
    'body-fields': '/tutorial/body-fields',
    'body-nested': '/tutorial/body-nested-models',
    'routing': '/tutorial/path-params',
    'router': '/tutorial/bigger-applications',
    'response-model': '/tutorial/response-model',
    'extra-models': '/tutorial/extra-models',
    'response-status-code': '/tutorial/response-status-code',
    'form-data': '/tutorial/request-forms',
    'request-files': '/tutorial/request-files',
    'error-handling': '/tutorial/handling-errors',
    'dependencies': '/tutorial/dependencies',
    'security': '/tutorial/security',
    'oauth2': '/tutorial/security/oauth2-jwt',
    'middleware': '/tutorial/middleware',
    'cors': '/tutorial/cors',
    'sql-databases': '/tutorial/sql-databases',
    'background-tasks': '/tutorial/background-tasks',
    'testing': '/tutorial/testing',
    'websockets': '/advanced/websockets',

    // Advanced
    'async': '/async',
    'custom-response': '/advanced/custom-response',
    'additional-responses': '/advanced/additional-responses',
    'openapi': '/tutorial/metadata',
    'settings': '/advanced/settings',
    'lifespan': '/advanced/events',
    'events': '/advanced/events',
    'sub-applications': '/advanced/sub-applications',
    'templates': '/advanced/templates',
    'static-files': '/tutorial/static-files',
    'additional-status-codes': '/advanced/additional-status-codes',

    // Reference
    'path-operation': '/reference/apirouter',
    'apirouter': '/reference/apirouter',
    'fastapi-class': '/reference/fastapi',
    'request': '/reference/request',
    'response': '/reference/response',
    'status': '/reference/status',
    'uploadfile': '/reference/uploadfile',
    'exceptions': '/reference/exceptions',
    'depends': '/reference/dependencies',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchFastAPIDocs(params: FastAPIDocsParams): Promise<string> {
    const topic = params.topic.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    let docsPath = this.topicPaths[topic];

    if (!docsPath) {
      // Try to construct path
      docsPath = `/tutorial/${topic}`;
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, main, .md-content, [role="main"]',
      });

      return this.formatResponse(topic, content, url, includeExamples);
    } catch (error) {
      return this.handleError(topic, error);
    }
  }

  private formatResponse(
    topic: string,
    content: string,
    url: string,
    includeExamples: boolean
  ): string {
    let response = `# FastAPI: ${topic}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**FastAPI Version:** 0.115+\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      const summary = this.fetcher.extractSection(content, 'Summary');
      response += summary;
    }

    response += '\n\n---\n\n';
    response += this.getTopicTips(topic);

    return response;
  }

  private getTopicTips(topic: string): string {
    const tips: Record<string, string> = {
      'dependencies': `**Quick Tips:**
- Use \`Annotated[Type, Depends(dep)]\` pattern
- Dependencies can be async or sync
- Use yield for cleanup (database sessions)
- Dependencies can depend on other dependencies`,

      'routing': `**Quick Tips:**
- Use APIRouter for organization
- Group related endpoints with tags
- Use prefix for common path
- response_model for type safety`,

      'response-model': `**Quick Tips:**
- Always specify response_model in decorator
- Use response_model_exclude for sensitive fields
- Pydantic v2: from_attributes=True for ORM
- Different models for create/read/update`,

      'error-handling': `**Quick Tips:**
- Use HTTPException for simple errors
- Custom exception handlers for complex cases
- Always return JSON error responses
- Include error_code for client handling`,

      'testing': `**Quick Tips:**
- Use TestClient for sync, httpx.AsyncClient for async
- Override dependencies for mocking
- Use pytest fixtures for setup
- Test both success and error cases`,

      'security': `**Quick Tips:**
- OAuth2PasswordBearer for token auth
- Use passlib for password hashing
- python-jose for JWT
- Always validate tokens in dependencies`,

      'sql-databases': `**Quick Tips:**
- Use SQLAlchemy 2.0 async
- Dependency for session management
- Use selectinload to avoid N+1
- Repository pattern for complex queries`,
    };

    return tips[topic] || `**More info:** ${this.baseUrl}/tutorial/${topic}`;
  }

  private handleError(topic: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# FastAPI Documentation Not Found: ${topic}

**Error:** ${message}

**Suggestions:**
- Check topic name spelling
- Browse docs: https://fastapi.tiangolo.com

**Common Topics:**
- routing - Path and query parameters
- dependencies - Dependency injection
- response-model - Response schemas
- error-handling - Exception handling
- security - Authentication
- testing - Test client
- sql-databases - SQLAlchemy integration`;
  }
}
