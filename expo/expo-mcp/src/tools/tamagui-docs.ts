import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface TamaguiDocsParams {
  topic: string;
  include_examples?: boolean;
}

export class TamaguiDocsTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://tamagui.dev';

  // Map of topics to their docs paths
  private readonly topicPaths: Record<string, string> = {
    // Getting Started
    'introduction': '/docs/intro/introduction',
    'installation': '/docs/intro/installation',
    'configuration': '/docs/intro/configuration',
    'compiler': '/docs/intro/compiler',
    'themes': '/docs/intro/themes',
    'tokens': '/docs/intro/tokens',
    'props': '/docs/intro/props',

    // Core
    'stack': '/docs/core/stack',
    'text': '/docs/core/text',
    'styled': '/docs/core/styled',
    'variants': '/docs/core/variants',
    'animations': '/docs/core/animations',
    'theme': '/docs/core/theme',
    'use-theme': '/docs/core/use-theme',
    'font-language': '/docs/core/font-language',
    'exports': '/docs/core/exports',

    // Components - Layout
    'view': '/docs/components/stacks/view',
    'xstack': '/docs/components/stacks/xstack',
    'ystack': '/docs/components/stacks/ystack',
    'zstack': '/docs/components/stacks/zstack',
    'scroll-view': '/docs/components/scroll-view',

    // Components - Forms
    'button': '/docs/components/button',
    'input': '/docs/components/inputs/input',
    'text-area': '/docs/components/inputs/text-area',
    'checkbox': '/docs/components/checkbox',
    'switch': '/docs/components/switch',
    'slider': '/docs/components/slider',
    'select': '/docs/components/select/select',
    'radio-group': '/docs/components/radio-group',
    'toggle-group': '/docs/components/toggle-group',
    'form': '/docs/components/form',
    'label': '/docs/components/label',

    // Components - Display
    'card': '/docs/components/card',
    'image': '/docs/components/image',
    'avatar': '/docs/components/avatar',
    'heading': '/docs/components/headings',
    'paragraph': '/docs/components/text',
    'separator': '/docs/components/separator',
    'spinner': '/docs/components/spinner',
    'progress': '/docs/components/progress',

    // Components - Overlay
    'sheet': '/docs/components/sheet',
    'dialog': '/docs/components/dialog',
    'alert-dialog': '/docs/components/alert-dialog',
    'popover': '/docs/components/popover',
    'tooltip': '/docs/components/tooltip',
    'toast': '/docs/components/toast',

    // Components - Navigation
    'tabs': '/docs/components/tabs',
    'navigation-menu': '/docs/components/navigation-menu',

    // Components - Other
    'accordion': '/docs/components/accordion',
    'group': '/docs/components/group',
    'list-item': '/docs/components/list-item',

    // Guides
    'next-js': '/docs/guides/next-js',
    'expo': '/docs/guides/expo',
    'vite': '/docs/guides/vite',
    'create-tamagui': '/docs/guides/create-tamagui',
    'design-systems': '/docs/guides/design-systems',
    'how-it-works': '/docs/guides/how-it-works',

    // API
    'create-tamagui-config': '/docs/core/configuration',
    'create-tokens': '/docs/core/tokens',
    'create-themes': '/docs/intro/themes',
    'create-animations': '/docs/core/animations',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchTamaguiDocs(params: TamaguiDocsParams): Promise<string> {
    const topic = params.topic.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    // Get docs path
    let docsPath = this.topicPaths[topic];

    if (!docsPath) {
      // Try to find partial match
      const matchingKey = Object.keys(this.topicPaths).find(key =>
        key.includes(topic) || topic.includes(key)
      );
      if (matchingKey) {
        docsPath = this.topicPaths[matchingKey];
      } else {
        // Default to docs path
        docsPath = `/docs/${topic}`;
      }
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'main, article, .docs-content, [role="main"]',
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
    let response = `# Tamagui: ${topic}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**Version:** Tamagui 1.x (React Native + Web)\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      // Extract key sections
      const installation = this.fetcher.extractSection(content, 'Installation');
      const usage = this.fetcher.extractSection(content, 'Usage');
      const api = this.fetcher.extractSection(content, 'API');
      response += installation + '\n\n' + usage + '\n\n' + api;
    }

    response += '\n\n---\n\n';
    response += this.getTopicTips(topic);

    return response;
  }

  private getTopicTips(topic: string): string {
    const tips: Record<string, string> = {
      'configuration': `**Setup Tips:**
\`\`\`bash
npx expo install @tamagui/core @tamagui/config
npx expo install @tamagui/animations-react-native
\`\`\`

Create tamagui.config.ts:
\`\`\`tsx
import { createTamagui, createTokens } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-react-native';

const tokens = createTokens({
  color: { primary: '#22C55E', ... },
  space: { sm: 8, md: 16, lg: 24 },
  radius: { sm: 8, md: 12, lg: 16 },
});

export const config = createTamagui({ tokens, ... });
\`\`\``,

      'themes': `**Theme Tips:**
- Define light and dark themes
- Use theme nesting for variants
- Access via useTheme() hook
- Token values resolved at runtime

\`\`\`tsx
themes: {
  light: { background: '$background', color: '$text' },
  dark: { background: '$backgroundDark', color: '$textDark' },
}
\`\`\``,

      'tokens': `**Token Tips:**
- Define once, use everywhere with $ prefix
- Tokens: color, space, size, radius, zIndex
- Compile-time optimization

\`\`\`tsx
<Stack padding="$md" backgroundColor="$primary" />
\`\`\``,

      'animations': `**Animation Tips:**
- Use @tamagui/animations-react-native for native
- Define named animations in config
- Use animation prop on components

\`\`\`tsx
animations: createAnimations({
  fast: { type: 'spring', damping: 20, stiffness: 250 },
  medium: { type: 'spring', damping: 15, stiffness: 200 },
})

<Stack animation="fast" enterStyle={{ opacity: 0 }} />
\`\`\``,

      'sheet': `**Sheet Tips:**
- Bottom sheet component
- dismissOnSnapToBottom for swipe dismiss
- Combine with BlurView for glass effect
- Use Sheet.Frame, Sheet.Overlay, Sheet.Handle

\`\`\`tsx
<Sheet modal dismissOnSnapToBottom>
  <Sheet.Overlay />
  <Sheet.Frame>
    <Sheet.Handle />
    {children}
  </Sheet.Frame>
</Sheet>
\`\`\``,

      'button': `**Button Tips:**
- Use variants for different styles
- Built-in press states
- Combine with haptics

\`\`\`tsx
<Button
  variant="primary"
  size="md"
  onPress={() => Haptics.impactAsync()}
>
  Press Me
</Button>
\`\`\``,

      'styled': `**styled() Tips:**
- Create reusable styled components
- Define variants for states
- Use defaultVariants

\`\`\`tsx
const Card = styled(Stack, {
  padding: '$md',
  borderRadius: '$lg',
  variants: {
    elevated: {
      true: { elevation: 4 },
    },
  },
});
\`\`\``,
    };

    return tips[topic] || `**Reference:** ${this.baseUrl}/docs`;
  }

  private handleError(topic: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Tamagui Topic Not Found: ${topic}

**Error:** ${message}

**Available Topics:**

**Getting Started:** introduction, installation, configuration, themes, tokens

**Core:** stack, text, styled, variants, animations, theme

**Components - Forms:** button, input, checkbox, switch, slider, select

**Components - Display:** card, image, avatar, heading, separator, spinner

**Components - Overlay:** sheet, dialog, alert-dialog, popover, tooltip, toast

**Guides:** expo, next-js, design-systems

**Reference:** https://tamagui.dev/docs`;
  }
}
