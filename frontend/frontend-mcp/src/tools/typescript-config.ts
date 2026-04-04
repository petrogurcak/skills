import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface TypeScriptConfigParams {
  topic: 'strict-mode' | 'path-aliases' | 'module-resolution' | 'general';
}

export class TypeScriptConfigTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://www.typescriptlang.org';

  private readonly topicMap: Record<string, string> = {
    'strict-mode': 'tsconfig#strict',
    'path-aliases': 'tsconfig#paths',
    'module-resolution': 'tsconfig#moduleResolution',
    general: 'docs/handbook/tsconfig-json.html',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchConfig(params: TypeScriptConfigParams): Promise<string> {
    const topic = params.topic;
    const docPath = this.topicMap[topic];

    if (!docPath) {
      return this.listAvailableTopics();
    }

    const url = `${this.baseUrl}/${docPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, .markdown, main, #content',
      });

      return this.formatResponse(topic, content, url);
    } catch (error) {
      return this.formatError(topic, url, error);
    }
  }

  private formatResponse(
    topic: string,
    content: string,
    url: string
  ): string {
    let response = `# TypeScript Configuration: ${topic}\n\nSource: ${url}\n\n`;

    response += content;

    response += `\n\n---\n\n**Quick Reference:**\n`;
    response += this.getQuickReference(topic);

    response += `\n\n**Vite-Specific Config:**\n`;
    response += this.getViteSpecificConfig();

    return response;
  }

  private getQuickReference(topic: string): string {
    const references: Record<string, string> = {
      'strict-mode': `
\`\`\`json
{
  "compilerOptions": {
    "strict": true,              // Enable all strict checks
    "noImplicitAny": true,       // No implicit 'any' types
    "strictNullChecks": true,    // Null and undefined are distinct
    "strictFunctionTypes": true, // Strict function type checking
    "strictBindCallApply": true, // Strict bind/call/apply
    "strictPropertyInitialization": true, // Class properties must be initialized
    "noImplicitThis": true,      // 'this' must have explicit type
    "alwaysStrict": true         // Use 'use strict'
  }
}
\`\`\`

**What strict mode catches:**
- Implicit any types → Must specify types
- Null/undefined bugs → Handle explicitly
- Uninitialized properties → Must initialize in constructor
- Type mismatches → Caught at compile time
`,
      'path-aliases': `
\`\`\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}
\`\`\`

**Usage:**
\`\`\`typescript
// Instead of: import { Button } from '../../../components/Button'
import { Button } from '@components/Button';

// Instead of: import { formatPrice } from '../../utils/format'
import { formatPrice } from '@utils/format';
\`\`\`

**Don't forget:** Also configure aliases in vite.config.ts!
`,
      'module-resolution': `
\`\`\`json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // For Vite (recommended)
    // or
    "moduleResolution": "node",     // For Node.js

    "module": "ESNext",             // Modern ES modules
    "target": "ES2022",            // Modern JavaScript
    "esModuleInterop": true,       // Import CommonJS as ES modules
    "allowSyntheticDefaultImports": true
  }
}
\`\`\`

**For Vite projects:** Use "bundler" for moduleResolution
`,
      general: `
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,

    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    "types": ["vite/client"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`
`,
    };

    return references[topic] || 'See TypeScript documentation for examples.';
  }

  private getViteSpecificConfig(): string {
    return `
\`\`\`json
// tsconfig.json for Vite projects
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",  // Important for Vite
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    // Strict mode (recommended)
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    // Vite-specific
    "types": ["vite/client"],      // Vite type definitions
    "isolatedModules": true,       // Required for Vite
    "noEmit": true,                // Vite handles emit

    // Path aliases (match vite.config.ts)
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*", "src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

**Corresponding vite.config.ts:**
\`\`\`typescript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
\`\`\`
`;
  }

  private formatError(topic: string, url: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# TypeScript Config Error

Topic: ${topic}
URL: ${url}
Error: ${message}

${this.listAvailableTopics()}`;
  }

  private listAvailableTopics(): string {
    return `# TypeScript Configuration Topics

**Available Topics:**
- \`strict-mode\` - Strict type checking options
- \`path-aliases\` - Path mapping and aliases
- \`module-resolution\` - Module resolution strategies
- \`general\` - General tsconfig.json overview

**Recommended tsconfig.json for Vite + TypeScript:**

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
\`\`\`

**Key Options:**
- \`strict: true\` → Enable all strict checks
- \`moduleResolution: "bundler"\` → For Vite
- \`types: ["vite/client"]\` → Vite type definitions
- \`isolatedModules: true\` → Required for Vite
- \`noEmit: true\` → Vite handles compilation

Visit https://www.typescriptlang.org/tsconfig for complete documentation.`;
  }
}
