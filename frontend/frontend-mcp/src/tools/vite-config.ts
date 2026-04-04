import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface ViteConfigParams {
  topic: 'plugins' | 'optimization' | 'env' | 'build' | 'dev-server' | 'general';
}

export class ViteConfigTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://vitejs.dev';

  private readonly topicMap: Record<string, string> = {
    plugins: 'guide/using-plugins',
    optimization: 'guide/build#build-optimizations',
    env: 'guide/env-and-mode',
    build: 'config/build-options',
    'dev-server': 'config/server-options',
    general: 'config/',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchConfig(params: ViteConfigParams): Promise<string> {
    const topic = params.topic;
    const docPath = this.topicMap[topic];

    if (!docPath) {
      return this.listAvailableTopics();
    }

    const url = `${this.baseUrl}/${docPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, .content, main',
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
    let response = `# Vite Configuration: ${topic}\n\nSource: ${url}\n\n`;

    response += content;

    response += `\n\n---\n\n**Quick Reference:**\n`;
    response += this.getQuickReference(topic);

    return response;
  }

  private getQuickReference(topic: string): string {
    const references: Record<string, string> = {
      plugins: `
\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts(), // Generate TypeScript declarations
  ],
});
\`\`\`

**Common Plugins:**
- \`vite-plugin-dts\` - TypeScript declaration files
- \`@vitejs/plugin-vue\` - Vue 3 support
- \`@vitejs/plugin-react\` - React support
- \`vite-plugin-pwa\` - Progressive Web App
`,
      optimization: `
\`\`\`typescript
// vite.config.ts
export default defineConfig({
  build: {
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['alpine', 'autocomplete'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console in production
      },
    },
  },
});
\`\`\`
`,
      env: `
\`\`\`typescript
// .env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App

// .env.local (gitignored)
VITE_API_KEY=secret123

// Access in code
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
\`\`\`

**Important:**
- Prefix with \`VITE_\` to expose to client
- \`.env.local\` for local overrides (gitignore it)
- \`import.meta.env\` to access (not process.env)
`,
      build: `
\`\`\`typescript
// vite.config.ts
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Library mode
    lib: {
      entry: './src/index.ts',
      name: 'MyLib',
      fileName: 'my-lib',
    },
  },
});
\`\`\`
`,
      'dev-server': `
\`\`\`typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3000,
    open: true, // Auto-open browser
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: true, // Show errors as overlay
    },
  },
});
\`\`\`
`,
      general: `
\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // CSS
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@import "@/styles/variables.scss";\`,
      },
    },
  },
  // Build
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
\`\`\`
`,
    };

    return references[topic] || 'See Vite documentation for examples.';
  }

  private formatError(topic: string, url: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Vite Config Error

Topic: ${topic}
URL: ${url}
Error: ${message}

${this.listAvailableTopics()}`;
  }

  private listAvailableTopics(): string {
    return `# Vite Configuration Topics

**Available Topics:**
- \`plugins\` - Using plugins (DTS, React, Vue, PWA)
- \`optimization\` - Build optimization and code splitting
- \`env\` - Environment variables and modes
- \`build\` - Build options and library mode
- \`dev-server\` - Dev server config, proxy, HMR
- \`general\` - General configuration overview

**Common Configs:**

\`\`\`typescript
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: { '@': '/src' },
  },
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:8080' },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
\`\`\`

Visit https://vitejs.dev/config for complete documentation.`;
  }
}
