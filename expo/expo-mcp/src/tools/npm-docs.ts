import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface NpmDocsParams {
  package_name: string;
  version?: string;
}

export class NpmDocsTool {
  private fetcher: BaseFetcher;

  // Popular RN packages with their GitHub READMEs
  private readonly packageRepos: Record<string, string> = {
    // State Management
    'zustand': 'https://raw.githubusercontent.com/pmndrs/zustand/main/readme.md',
    'jotai': 'https://raw.githubusercontent.com/pmndrs/jotai/main/readme.md',
    '@tanstack/react-query': 'https://raw.githubusercontent.com/TanStack/query/main/packages/react-query/README.md',
    'react-query': 'https://raw.githubusercontent.com/TanStack/query/main/packages/react-query/README.md',
    '@reduxjs/toolkit': 'https://raw.githubusercontent.com/reduxjs/redux-toolkit/master/README.md',
    'redux-toolkit': 'https://raw.githubusercontent.com/reduxjs/redux-toolkit/master/README.md',

    // Navigation
    '@react-navigation/native': 'https://raw.githubusercontent.com/react-navigation/react-navigation/main/packages/native/README.md',
    'react-navigation': 'https://raw.githubusercontent.com/react-navigation/react-navigation/main/README.md',

    // UI Libraries
    'nativewind': 'https://raw.githubusercontent.com/marklawlor/nativewind/main/packages/nativewind/README.md',
    'tamagui': 'https://raw.githubusercontent.com/tamagui/tamagui/master/README.md',
    'react-native-paper': 'https://raw.githubusercontent.com/callstack/react-native-paper/main/README.md',
    '@gluestack-ui/themed': 'https://raw.githubusercontent.com/gluestack/gluestack-ui/main/README.md',

    // Utilities
    'react-native-reanimated': 'https://raw.githubusercontent.com/software-mansion/react-native-reanimated/main/README.md',
    'react-native-gesture-handler': 'https://raw.githubusercontent.com/software-mansion/react-native-gesture-handler/main/README.md',
    'react-native-svg': 'https://raw.githubusercontent.com/software-mansion/react-native-svg/main/README.md',
    'react-native-mmkv': 'https://raw.githubusercontent.com/mrousavy/react-native-mmkv/master/README.md',
    '@react-native-async-storage/async-storage': 'https://raw.githubusercontent.com/react-native-async-storage/async-storage/main/README.md',
    'async-storage': 'https://raw.githubusercontent.com/react-native-async-storage/async-storage/main/README.md',

    // Forms
    'react-hook-form': 'https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/README.md',
    'formik': 'https://raw.githubusercontent.com/jaredpalmer/formik/main/README.md',
    'zod': 'https://raw.githubusercontent.com/colinhacks/zod/master/README.md',

    // Lists
    '@shopify/flash-list': 'https://raw.githubusercontent.com/Shopify/flash-list/main/README.md',
    'flash-list': 'https://raw.githubusercontent.com/Shopify/flash-list/main/README.md',

    // Icons
    '@expo/vector-icons': 'https://docs.expo.dev/guides/icons/',
    'react-native-vector-icons': 'https://raw.githubusercontent.com/oblador/react-native-vector-icons/master/README.md',

    // Date/Time
    'date-fns': 'https://raw.githubusercontent.com/date-fns/date-fns/main/README.md',
    'dayjs': 'https://raw.githubusercontent.com/iamkun/dayjs/dev/README.md',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchNpmDocs(params: NpmDocsParams): Promise<string> {
    const packageName = params.package_name.toLowerCase();

    // Try known repos first
    const repoUrl = this.packageRepos[packageName];
    if (repoUrl) {
      return await this.fetchFromGitHub(packageName, repoUrl);
    }

    // Try npm registry
    return await this.fetchFromNpm(packageName);
  }

  private async fetchFromGitHub(
    packageName: string,
    url: string
  ): Promise<string> {
    try {
      // For Expo docs, use web fetch
      if (url.includes('docs.expo.dev')) {
        const content = await this.fetcher.fetchDoc(url, {
          selector: 'main, article, .doc-content',
        });
        return this.formatResponse(packageName, content, url);
      }

      // For raw GitHub, fetch directly
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ExpoMCP/1.0)',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const content = await response.text();
      return this.formatResponse(packageName, content, url);
    } catch (error) {
      return this.fetchFromNpm(packageName);
    }
  }

  private async fetchFromNpm(packageName: string): Promise<string> {
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;

    try {
      const content = await this.fetcher.fetchDoc(npmUrl, {
        selector: '#readme, .readme, article',
      });

      return this.formatResponse(packageName, content, npmUrl);
    } catch (error) {
      return this.handleError(packageName, error);
    }
  }

  private formatResponse(
    packageName: string,
    content: string,
    url: string
  ): string {
    let response = `# npm Package: ${packageName}\n\n`;
    response += `**Source:** ${url}\n\n`;
    response += '---\n\n';
    response += content;
    response += '\n\n---\n\n';
    response += this.getInstallInstructions(packageName);

    return response;
  }

  private getInstallInstructions(packageName: string): string {
    // Check if it's an Expo-compatible package
    const expoCompatible = [
      'zustand', 'jotai', '@tanstack/react-query', 'react-query',
      'nativewind', 'react-hook-form', 'zod', 'date-fns', 'dayjs',
      '@expo/vector-icons', '@shopify/flash-list',
    ].includes(packageName);

    if (expoCompatible) {
      return `**Installation (Expo):**
\`\`\`bash
npx expo install ${packageName}
\`\`\``;
    }

    // Check if it needs special Expo handling
    const needsConfigPlugin = [
      'react-native-reanimated',
      'react-native-gesture-handler',
      'react-native-svg',
      'react-native-mmkv',
    ].includes(packageName);

    if (needsConfigPlugin) {
      return `**Installation (Expo):**
\`\`\`bash
npx expo install ${packageName}
\`\`\`

**Note:** This package may need a config plugin in app.json:
\`\`\`json
{
  "expo": {
    "plugins": ["${packageName}"]
  }
}
\`\`\`

Run \`npx expo prebuild\` after adding the plugin.`;
    }

    return `**Installation:**
\`\`\`bash
# Expo (recommended)
npx expo install ${packageName}

# npm
npm install ${packageName}

# yarn
yarn add ${packageName}
\`\`\``;
  }

  private handleError(packageName: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Package Not Found: ${packageName}

**Error:** ${message}

**Suggestions:**
- Check package name spelling
- Search npm: https://www.npmjs.com/search?q=${encodeURIComponent(packageName)}
- Check Expo compatibility: https://reactnative.directory/

**Popular React Native Packages:**
- zustand, jotai - State management
- @tanstack/react-query - Server state
- nativewind - Tailwind for RN
- @shopify/flash-list - Fast lists
- react-native-reanimated - Animations
- zod - Schema validation`;
  }
}

// Helper for raw fetch
async function fetch(url: string, options: { headers: Record<string, string> }) {
  const nodeFetch = (await import('node-fetch')).default;
  return nodeFetch(url, options);
}
