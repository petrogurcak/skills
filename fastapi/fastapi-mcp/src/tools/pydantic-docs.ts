import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface PydanticDocsParams {
  topic: string;
  include_examples?: boolean;
}

export class PydanticDocsTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://docs.pydantic.dev/latest';

  private readonly topicPaths: Record<string, string> = {
    // Core concepts
    'models': '/concepts/models',
    'fields': '/concepts/fields',
    'validators': '/concepts/validators',
    'validation': '/concepts/validators',
    'config': '/concepts/config',
    'json-schema': '/concepts/json_schema',
    'serialization': '/concepts/serialization',
    'types': '/concepts/types',
    'aliases': '/concepts/alias',
    'strict-mode': '/concepts/strict_mode',
    'conversion': '/concepts/conversion_table',
    'unions': '/concepts/unions',

    // API
    'basemodel': '/api/base_model',
    'field': '/api/fields',
    'field-validator': '/api/functional_validators',
    'model-validator': '/api/functional_validators',
    'configdict': '/api/config',
    'computed-field': '/api/fields/#pydantic.fields.computed_field',

    // Migration
    'migration': '/migration',
    'v1-to-v2': '/migration',

    // Usage
    'dataclasses': '/concepts/dataclasses',
    'settings': '/concepts/pydantic_settings',
    'postponed-annotations': '/concepts/postponed_annotations',
    'performance': '/concepts/performance',
    'errors': '/errors/errors',
    'error-messages': '/errors/errors',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchPydanticDocs(params: PydanticDocsParams): Promise<string> {
    const topic = params.topic.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    let docsPath = this.topicPaths[topic];

    if (!docsPath) {
      docsPath = `/concepts/${topic}`;
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
    let response = `# Pydantic v2: ${topic}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**Pydantic Version:** 2.x (v2 syntax)\n\n`;
    response += '---\n\n';

    // Add v2 migration reminder
    response += `**IMPORTANT:** This is Pydantic v2. Key differences from v1:\n`;
    response += `- Use \`model_config = ConfigDict(...)\` instead of \`class Config\`\n`;
    response += `- Use \`@field_validator\` instead of \`@validator\`\n`;
    response += `- Use \`@model_validator\` instead of \`@root_validator\`\n`;
    response += `- Use \`from_attributes=True\` instead of \`orm_mode=True\`\n\n`;
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
      'models': `**Quick Tips - Pydantic v2 Models:**
\`\`\`python
from pydantic import BaseModel, ConfigDict, Field

class User(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,  # For ORM objects
        str_strip_whitespace=True,
    )

    id: int
    name: str = Field(min_length=1)
    email: str | None = None  # Use | not Optional
\`\`\``,

      'validators': `**Quick Tips - Pydantic v2 Validators:**
\`\`\`python
from pydantic import BaseModel, field_validator, model_validator

class User(BaseModel):
    name: str

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        return v.strip().title()

    @model_validator(mode='after')
    def validate_model(self) -> 'User':
        # Cross-field validation
        return self
\`\`\``,

      'config': `**Quick Tips - Pydantic v2 Config:**
\`\`\`python
from pydantic import BaseModel, ConfigDict

class User(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,     # ORM mode
        str_strip_whitespace=True,
        validate_assignment=True,
        extra='forbid',           # No extra fields
    )
\`\`\``,

      'fields': `**Quick Tips - Pydantic v2 Fields:**
\`\`\`python
from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    price: float = Field(gt=0, description="Must be positive")
    quantity: int = Field(ge=0, default=0)
    tags: list[str] = Field(default_factory=list)
\`\`\``,

      'serialization': `**Quick Tips - Pydantic v2 Serialization:**
\`\`\`python
# To dict
user.model_dump()
user.model_dump(exclude={'password'})

# To JSON
user.model_dump_json()

# From dict
User.model_validate(data)

# From JSON
User.model_validate_json(json_str)
\`\`\``,
    };

    return tips[topic] || `**More info:** ${this.baseUrl}/concepts/${topic}`;
  }

  private handleError(topic: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Pydantic Documentation Not Found: ${topic}

**Error:** ${message}

**Suggestions:**
- Check topic name spelling
- Browse docs: https://docs.pydantic.dev/latest/

**Common Topics:**
- models - BaseModel usage
- validators - @field_validator, @model_validator
- config - ConfigDict options
- fields - Field constraints
- serialization - model_dump, model_validate

**Pydantic v2 Migration:**
See: https://docs.pydantic.dev/latest/migration/`;
  }
}
