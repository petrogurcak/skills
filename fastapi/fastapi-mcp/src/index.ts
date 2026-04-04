#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { FastAPIDocsTool } from './tools/fastapi-docs.js';
import { PydanticDocsTool } from './tools/pydantic-docs.js';
import { SQLAlchemyDocsTool } from './tools/sqlalchemy-docs.js';
import { PyPISearchTool } from './tools/pypi-search.js';

// Initialize tools
const fastapiDocsTool = new FastAPIDocsTool();
const pydanticDocsTool = new PydanticDocsTool();
const sqlalchemyDocsTool = new SQLAlchemyDocsTool();
const pypiSearchTool = new PyPISearchTool();

// Create server
const server = new Server(
  {
    name: 'fastapi-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(
  ListToolsRequestSchema,
  async () => {
    return {
      tools: [
        {
          name: 'fetch_fastapi_docs',
          description:
            'Fetch FastAPI documentation from fastapi.tiangolo.com. Returns routing, dependencies, security patterns. MANDATORY before implementing any FastAPI endpoint.',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                description:
                  'FastAPI topic (e.g., "routing", "dependencies", "response-model", "error-handling", "testing", "security")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'fetch_pydantic_docs',
          description:
            'Fetch Pydantic v2 documentation from docs.pydantic.dev. Returns model definition, validators, serialization patterns. MANDATORY before defining Pydantic models.',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                description:
                  'Pydantic topic (e.g., "models", "validators", "config", "fields", "serialization")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'fetch_sqlalchemy_docs',
          description:
            'Fetch SQLAlchemy 2.0 documentation from docs.sqlalchemy.org. Returns async patterns, ORM models, query building. MANDATORY before database operations.',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                description:
                  'SQLAlchemy topic (e.g., "async", "mapped-column", "relationship", "select", "loading")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'search_pypi',
          description:
            'Search Python packages on PyPI and fetch documentation. Returns installation, usage, and API. MANDATORY before using any Python package.',
          inputSchema: {
            type: 'object',
            properties: {
              package_name: {
                type: 'string',
                description:
                  'Python package name (e.g., "pytest", "httpx", "python-jose")',
              },
            },
            required: ['package_name'],
          },
        },
      ],
    };
  }
);

// Handle tool calls
server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: string;

      switch (name) {
        case 'fetch_fastapi_docs':
          result = await fastapiDocsTool.fetchFastAPIDocs(args as any);
          break;

        case 'fetch_pydantic_docs':
          result = await pydanticDocsTool.fetchPydanticDocs(args as any);
          break;

        case 'fetch_sqlalchemy_docs':
          result = await sqlalchemyDocsTool.fetchSQLAlchemyDocs(args as any);
          break;

        case 'search_pypi':
          result = await pypiSearchTool.searchPyPI(args as any);
          break;

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      return {
        content: [
          {
            type: 'text',
            text: `Error: ${message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('FastAPI MCP Server running on stdio');
  console.error('Available tools: 4 core tools');
  console.error('- fetch_fastapi_docs: FastAPI patterns');
  console.error('- fetch_pydantic_docs: Pydantic v2 models');
  console.error('- fetch_sqlalchemy_docs: SQLAlchemy 2.0 async');
  console.error('- search_pypi: Python packages');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
