import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface ExpoRouterParams {
  topic: string;
  include_examples?: boolean;
}

export class ExpoRouterTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://docs.expo.dev/router';

  // Map of topics to their docs paths
  private readonly topicPaths: Record<string, string> = {
    'introduction': '/introduction',
    'installation': '/installation',
    'file-based-routing': '/create-pages',
    'create-pages': '/create-pages',
    'navigation': '/navigating-pages',
    'navigating-pages': '/navigating-pages',
    'layouts': '/layouts',
    'stack': '/advanced/stack',
    'tabs': '/advanced/tabs',
    'drawer': '/advanced/drawer',
    'modal': '/advanced/modal',
    'nesting': '/advanced/nesting-navigators',
    'groups': '/layouts',
    'route-groups': '/layouts',
    'dynamic-routes': '/create-pages',
    'params': '/navigating-pages',
    'link': '/navigating-pages',
    'hooks': '/hooks',
    'use-router': '/hooks',
    'use-local-search-params': '/hooks',
    'use-segments': '/hooks',
    'use-pathname': '/hooks',
    'deep-linking': '/linking',
    'linking': '/linking',
    'typed-routes': '/typed-routes',
    'error-handling': '/error-handling',
    'not-found': '/error-handling',
    'loading': '/appearance',
    'splash-screen': '/appearance',
    'head': '/seo',
    'seo': '/seo',
    'static-rendering': '/static-rendering',
    'api-routes': '/reference/api-routes',
    'authentication': '/reference/authentication',
    'testing': '/reference/testing',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchExpoRouter(params: ExpoRouterParams): Promise<string> {
    const topic = params.topic.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    // Get docs path
    let docsPath = this.topicPaths[topic];

    if (!docsPath) {
      // Try introduction as fallback
      docsPath = '/introduction';
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'main, article, .doc-content, [role="main"]',
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
    let response = `# Expo Router: ${topic}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**Expo Router Version:** 3.x+ (SDK 52)\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      const usage = this.fetcher.extractSection(content, 'Usage');
      response += usage;
    }

    response += '\n\n---\n\n';
    response += this.getTopicGuide(topic);

    return response;
  }

  private getTopicGuide(topic: string): string {
    const guides: Record<string, string> = {
      'file-based-routing': `**File-Based Routing Quick Guide:**

\`\`\`
app/
├── _layout.tsx      # Root layout
├── index.tsx        # / (home)
├── about.tsx        # /about
├── (tabs)/          # Route group (not in URL)
│   ├── _layout.tsx  # Tab layout
│   ├── index.tsx    # / (tab home)
│   └── settings.tsx # /settings
├── user/
│   ├── _layout.tsx  # Nested layout
│   ├── index.tsx    # /user
│   └── [id].tsx     # /user/123 (dynamic)
└── [...missing].tsx # Catch-all 404
\`\`\``,

      'navigation': `**Navigation Quick Guide:**

\`\`\`tsx
// Declarative (preferred)
import { Link } from 'expo-router';
<Link href="/about">About</Link>
<Link href={{ pathname: '/user/[id]', params: { id: '123' } }}>User</Link>

// Imperative
import { router } from 'expo-router';
router.push('/about');
router.replace('/home');
router.back();

// Get params
import { useLocalSearchParams } from 'expo-router';
const { id } = useLocalSearchParams<{ id: string }>();
\`\`\``,

      'tabs': `**Tab Navigation Quick Guide:**

\`\`\`tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
\`\`\``,

      'stack': `**Stack Navigation Quick Guide:**

\`\`\`tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal' }}
      />
    </Stack>
  );
}
\`\`\``,

      'hooks': `**Expo Router Hooks:**

\`\`\`tsx
import {
  useRouter,           // router.push(), router.back()
  useLocalSearchParams, // Route params { id: '123' }
  useGlobalSearchParams, // Global search params
  useSegments,         // Current route segments
  usePathname,         // Current pathname
  useFocusEffect,      // Focus effect (from React Navigation)
} from 'expo-router';
\`\`\``,

      'deep-linking': `**Deep Linking Setup:**

\`\`\`json
// app.json
{
  "expo": {
    "scheme": "myapp",
    "web": {
      "bundler": "metro"
    }
  }
}
\`\`\`

**Test deep links:**
- iOS Simulator: \`xcrun simctl openurl booted myapp://path\`
- Android: \`adb shell am start -a android.intent.action.VIEW -d "myapp://path"\``,
    };

    return guides[topic] || `**More info:** https://docs.expo.dev/router/`;
  }

  private handleError(topic: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Expo Router Topic Not Found: ${topic}

**Error:** ${message}

**Suggestions:**
- Check topic name spelling
- Browse docs: https://docs.expo.dev/router/introduction

**Common Topics:**
- file-based-routing - How routes work
- navigation - Link and router
- tabs - Tab navigation
- stack - Stack navigation
- hooks - useRouter, useLocalSearchParams
- deep-linking - Universal links

**Quick Start:**
\`\`\`bash
npx create-expo-app@latest --template tabs
\`\`\``;
  }
}
