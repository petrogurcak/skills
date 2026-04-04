import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface RNDocsParams {
  topic: string;
  include_examples?: boolean;
}

export class ReactNativeDocsTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://reactnative.dev';

  // Map of common topics to their docs paths
  private readonly topicPaths: Record<string, string> = {
    // Core Components
    'view': '/docs/view',
    'text': '/docs/text',
    'image': '/docs/image',
    'scrollview': '/docs/scrollview',
    'flatlist': '/docs/flatlist',
    'sectionlist': '/docs/sectionlist',
    'textinput': '/docs/textinput',
    'button': '/docs/button',
    'touchableopacity': '/docs/touchableopacity',
    'pressable': '/docs/pressable',
    'modal': '/docs/modal',
    'activityindicator': '/docs/activityindicator',
    'switch': '/docs/switch',
    'statusbar': '/docs/statusbar',
    'keyboardavoidingview': '/docs/keyboardavoidingview',
    'safeareaview': '/docs/safeareaview',
    'virtualizedlist': '/docs/virtualizedlist',
    'refreshcontrol': '/docs/refreshcontrol',

    // APIs
    'stylesheet': '/docs/stylesheet',
    'animated': '/docs/animated',
    'dimensions': '/docs/dimensions',
    'platform': '/docs/platform',
    'appearance': '/docs/appearance',
    'keyboard': '/docs/keyboard',
    'linking': '/docs/linking',
    'panresponder': '/docs/panresponder',
    'pixelratio': '/docs/pixelratio',
    'alert': '/docs/alert',
    'vibration': '/docs/vibration',
    'share': '/docs/share',
    'layoutanimation': '/docs/layoutanimation',

    // Guides
    'getting-started': '/docs/getting-started',
    'flexbox': '/docs/flexbox',
    'style': '/docs/style',
    'height-and-width': '/docs/height-and-width',
    'handling-touches': '/docs/handling-touches',
    'navigation': '/docs/navigation',
    'images': '/docs/images',
    'animations': '/docs/animations',
    'accessibility': '/docs/accessibility',
    'performance': '/docs/performance',
    'testing': '/docs/testing-overview',
    'typescript': '/docs/typescript',
    'networking': '/docs/network',
    'security': '/docs/security',

    // New Architecture
    'new-architecture': '/docs/new-architecture-intro',
    'turbomodules': '/docs/turbo-native-modules-introduction',
    'fabric': '/docs/fabric-native-components-introduction',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchRNDocs(params: RNDocsParams): Promise<string> {
    const topic = params.topic.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    // Get docs path
    let docsPath = this.topicPaths[topic];

    if (!docsPath) {
      // Try to construct path
      docsPath = `/docs/${topic}`;
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'article, main, .docMainContainer, [role="main"]',
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
    let response = `# React Native: ${topic}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**React Native Version:** 0.76+ (New Architecture)\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      // Extract just the core content
      const props = this.fetcher.extractSection(content, 'Props');
      const methods = this.fetcher.extractSection(content, 'Methods');
      response += props + '\n\n' + methods;
    }

    response += '\n\n---\n\n';
    response += this.getTopicTips(topic);

    return response;
  }

  private getTopicTips(topic: string): string {
    const tips: Record<string, string> = {
      'view': `**Quick Tips:**
- Base container component
- Use for layout (flexbox)
- accessibilityRole for semantics
- Use Pressable for touch, not View`,

      'text': `**Quick Tips:**
- Only component for text content
- Text inherits styles from parent Text
- numberOfLines for truncation
- selectable={true} for copy/paste`,

      'flatlist': `**Quick Tips:**
- Use for long lists (virtualized)
- keyExtractor required for performance
- Use getItemLayout for fixed height items
- Consider FlashList for better performance`,

      'pressable': `**Quick Tips:**
- Modern replacement for Touchable*
- Use style as function for pressed state
- android_ripple for Material ripple
- hitSlop for larger touch area`,

      'stylesheet': `**Quick Tips:**
- StyleSheet.create for optimization
- Use styles outside component
- No inline styles for performance
- Use StyleSheet.flatten sparingly`,

      'animated': `**Quick Tips:**
- Use useNativeDriver: true when possible
- Reanimated 3 for complex animations
- Animated.Value for single values
- Animated.ValueXY for x/y positions`,

      'flexbox': `**Quick Tips:**
- flexDirection: 'column' is default (different from web)
- flex: 1 to fill available space
- justifyContent for main axis
- alignItems for cross axis`,
    };

    return tips[topic] || `**More info:** ${this.baseUrl}/docs/${topic}`;
  }

  private handleError(topic: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# React Native Documentation Not Found: ${topic}

**Error:** ${message}

**Suggestions:**
- Check topic name spelling
- Browse docs: https://reactnative.dev/docs/getting-started
- Search: https://reactnative.dev/search?q=${encodeURIComponent(topic)}

**Common Topics:**
- Components: View, Text, Image, FlatList, Pressable
- APIs: StyleSheet, Animated, Dimensions, Platform
- Guides: flexbox, style, navigation, accessibility

**For Expo-specific modules, use fetch_expo_sdk instead.**`;
  }
}
