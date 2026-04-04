import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface SQLAlchemyDocsParams {
  topic: string;
  include_examples?: boolean;
}

export class SQLAlchemyDocsTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://docs.sqlalchemy.org/en/20';

  private readonly topicPaths: Record<string, string> = {
    // Core
    'async': '/orm/extensions/asyncio.html',
    'asyncio': '/orm/extensions/asyncio.html',
    'session': '/orm/session_basics.html',
    'async-session': '/orm/extensions/asyncio.html',
    'engine': '/core/engines.html',
    'async-engine': '/orm/extensions/asyncio.html',

    // ORM
    'orm': '/orm/quickstart.html',
    'quickstart': '/orm/quickstart.html',
    'declarative': '/orm/declarative_tables.html',
    'mapped-column': '/orm/declarative_tables.html',
    'relationship': '/orm/basic_relationships.html',
    'relationships': '/orm/basic_relationships.html',
    'query': '/orm/queryguide/index.html',
    'select': '/orm/queryguide/select.html',
    'insert': '/orm/queryguide/dml.html',
    'update': '/orm/queryguide/dml.html',
    'delete': '/orm/queryguide/dml.html',
    'loading': '/orm/queryguide/relationships.html',
    'eager-loading': '/orm/queryguide/relationships.html',
    'lazy-loading': '/orm/queryguide/relationships.html',

    // Types
    'types': '/core/types.html',
    'column-types': '/core/types.html',
    'mapped': '/orm/declarative_tables.html',

    // Migration
    'migration': '/changelog/migration_20.html',
    '2.0': '/changelog/migration_20.html',

    // Patterns
    'unit-of-work': '/orm/session_basics.html',
    'transaction': '/orm/session_transaction.html',
    'cascade': '/orm/cascades.html',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchSQLAlchemyDocs(params: SQLAlchemyDocsParams): Promise<string> {
    const topic = params.topic.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    let docsPath = this.topicPaths[topic];

    if (!docsPath) {
      docsPath = `/orm/${topic}.html`;
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: '.body, .document, main, article',
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
    let response = `# SQLAlchemy 2.0: ${topic}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**SQLAlchemy Version:** 2.0+ (async support)\n\n`;
    response += '---\n\n';

    // Add 2.0 style reminder
    response += `**IMPORTANT:** SQLAlchemy 2.0 syntax:\n`;
    response += `- Use \`Mapped[type]\` and \`mapped_column()\` for columns\n`;
    response += `- Use \`select(Model)\` instead of \`session.query(Model)\`\n`;
    response += `- Use \`async_session\` for async operations\n\n`;
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
      'async': `**Quick Tips - Async SQLAlchemy:**
\`\`\`python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine("postgresql+asyncpg://...")
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
\`\`\``,

      'mapped-column': `**Quick Tips - SQLAlchemy 2.0 Models:**
\`\`\`python
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str | None]  # nullable

    posts: Mapped[list["Post"]] = relationship(back_populates="author")
\`\`\``,

      'select': `**Quick Tips - SQLAlchemy 2.0 Queries:**
\`\`\`python
from sqlalchemy import select
from sqlalchemy.orm import selectinload

# Simple select
stmt = select(User).where(User.id == 1)
result = await session.execute(stmt)
user = result.scalar_one_or_none()

# With eager loading
stmt = select(User).options(selectinload(User.posts))
result = await session.execute(stmt)
users = result.scalars().all()
\`\`\``,

      'relationship': `**Quick Tips - Relationships:**
\`\`\`python
from sqlalchemy.orm import Mapped, relationship

class User(Base):
    posts: Mapped[list["Post"]] = relationship(
        back_populates="author",
        cascade="all, delete-orphan",
    )

class Post(Base):
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    author: Mapped["User"] = relationship(back_populates="posts")
\`\`\``,

      'loading': `**Quick Tips - Eager Loading:**
\`\`\`python
from sqlalchemy.orm import selectinload, joinedload

# selectinload - separate SELECT for related (best for collections)
stmt = select(User).options(selectinload(User.posts))

# joinedload - JOIN in same query (best for single items)
stmt = select(Post).options(joinedload(Post.author))
\`\`\``,
    };

    return tips[topic] || `**More info:** ${this.baseUrl}/orm/`;
  }

  private handleError(topic: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# SQLAlchemy Documentation Not Found: ${topic}

**Error:** ${message}

**Suggestions:**
- Check topic name spelling
- Browse docs: https://docs.sqlalchemy.org/en/20/

**Common Topics:**
- async - Async engine and session
- mapped-column - Model definition
- select - Query building
- relationship - Model relationships
- loading - Eager loading strategies

**SQLAlchemy 2.0 Migration:**
See: https://docs.sqlalchemy.org/en/20/changelog/migration_20.html`;
  }
}
