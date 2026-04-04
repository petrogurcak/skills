import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface IOSHIGParams {
  pattern: string;
  include_examples?: boolean;
}

export class IOSHIGTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://developer.apple.com/design/human-interface-guidelines';

  // Map of patterns to their HIG paths
  private readonly patternPaths: Record<string, string> = {
    // Foundations
    'accessibility': '/accessibility',
    'app-icons': '/app-icons',
    'branding': '/branding',
    'color': '/color',
    'dark-mode': '/dark-mode',
    'icons': '/icons',
    'images': '/images',
    'inclusion': '/inclusion',
    'layout': '/layout',
    'materials': '/materials',
    'motion': '/motion',
    'right-to-left': '/right-to-left',
    'sf-symbols': '/sf-symbols',
    'typography': '/typography',

    // Patterns
    'accessing-private-data': '/patterns/accessing-private-data',
    'drag-and-drop': '/patterns/drag-and-drop',
    'entering-data': '/patterns/entering-data',
    'feedback': '/patterns/feedback',
    'file-management': '/patterns/file-management',
    'launching': '/patterns/launching',
    'loading': '/patterns/loading',
    'managing-accounts': '/patterns/managing-accounts',
    'modality': '/patterns/modality',
    'multitasking': '/patterns/multitasking',
    'notifications': '/patterns/notifications',
    'offering-help': '/patterns/offering-help',
    'onboarding': '/patterns/onboarding',
    'playing-audio': '/patterns/playing-audio',
    'playing-video': '/patterns/playing-video',
    'searching': '/patterns/searching',
    'settings': '/patterns/settings',
    'undo-and-redo': '/patterns/undo-and-redo',
    'workouts': '/patterns/workouts',

    // Components
    'buttons': '/components/buttons-and-controls',
    'menus': '/components/menus-and-actions',
    'navigation-and-search': '/components/navigation-and-search',
    'presentation': '/components/presentation',
    'selection-and-input': '/components/selection-and-input',
    'status': '/components/status',
    'system-experiences': '/components/system-experiences',

    // iOS specific
    'designing-for-ios': '/platforms/designing-for-ios',
    'live-activities': '/components/system-experiences/live-activities',
    'widgets': '/components/system-experiences/widgets',
    'app-shortcuts': '/components/system-experiences/app-shortcuts',
    'home-screen-quick-actions': '/components/system-experiences/home-screen-quick-actions',

    // Inputs
    'apple-pencil': '/inputs/apple-pencil',
    'focus-and-selection': '/inputs/focus-and-selection',
    'game-controllers': '/inputs/game-controllers',
    'gyro-and-accelerometer': '/inputs/gyro-and-accelerometer',
    'haptics': '/inputs/haptics',
    'keyboards': '/inputs/keyboards',
    'pointing-devices': '/inputs/pointing-devices',
    'spatial-interactions': '/inputs/spatial-interactions',
    'touch-id-and-face-id': '/inputs/touch-id-and-face-id',
    'touchscreen-gestures': '/inputs/touchscreen-gestures',

    // Technologies
    'airplay': '/technologies/airplay',
    'always-on-display': '/technologies/always-on-display',
    'app-clips': '/technologies/app-clips',
    'augmented-reality': '/technologies/augmented-reality',
    'carplay': '/technologies/carplay',
    'game-center': '/technologies/game-center',
    'healthkit': '/technologies/healthkit',
    'homekit': '/technologies/homekit',
    'in-app-purchase': '/technologies/in-app-purchase',
    'live-photos': '/technologies/live-photos',
    'mac-catalyst': '/technologies/mac-catalyst',
    'machine-learning': '/technologies/machine-learning',
    'maps': '/technologies/maps',
    'messages-for-business': '/technologies/messages-for-business',
    'nfc': '/technologies/nfc',
    'photo-editing': '/technologies/photo-editing',
    'shareplay': '/technologies/shareplay',
    'shazamkit': '/technologies/shazamkit',
    'sign-in-with-apple': '/technologies/sign-in-with-apple',
    'siri': '/technologies/siri',
    'wallet': '/technologies/wallet',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchIOSHIG(params: IOSHIGParams): Promise<string> {
    const pattern = params.pattern.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    // Get docs path
    let docsPath = this.patternPaths[pattern];

    if (!docsPath) {
      // Try to find partial match
      const matchingKey = Object.keys(this.patternPaths).find(key =>
        key.includes(pattern) || pattern.includes(key)
      );
      if (matchingKey) {
        docsPath = this.patternPaths[matchingKey];
      } else {
        docsPath = `/${pattern}`;
      }
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'main, article, .content, [role="main"]',
      });

      return this.formatResponse(pattern, content, url, includeExamples);
    } catch (error) {
      return this.handleError(pattern, error);
    }
  }

  private formatResponse(
    pattern: string,
    content: string,
    url: string,
    includeExamples: boolean
  ): string {
    let response = `# Apple Human Interface Guidelines: ${pattern}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**Platform:** iOS 18+ / iPadOS 18+\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      // Extract key sections
      const overview = this.fetcher.extractSection(content, 'Overview');
      const bestPractices = this.fetcher.extractSection(content, 'Best practices');
      response += overview + '\n\n' + bestPractices;
    }

    response += '\n\n---\n\n';
    response += this.getPatternTips(pattern);

    return response;
  }

  private getPatternTips(pattern: string): string {
    const tips: Record<string, string> = {
      'materials': `**iOS Premium UI Tips:**
- Use blur/vibrancy to create depth
- Materials help content stand out
- Respect "Reduce Transparency" accessibility setting
- Light/dark mode affects material appearance
- In React Native: use expo-blur or @callstack/liquid-glass`,

      'haptics': `**Haptic Feedback Tips:**
- Use expo-haptics in React Native
- Light: selections, toggles
- Medium: actions, confirmations
- Heavy: errors, warnings
- Always respect "Reduce Motion" setting`,

      'motion': `**Animation Tips:**
- Keep animations under 300ms
- Use spring animations for natural feel
- Respect "Reduce Motion" setting
- In React Native: use react-native-reanimated
- Tamagui has built-in animation support`,

      'buttons': `**Button Design Tips:**
- Minimum 44pt touch target
- Clear visual feedback on press
- Use haptics for important actions
- Primary actions should be prominent
- In Tamagui: use Button with variants`,

      'color': `**Color Tips:**
- Support light and dark mode
- Use semantic colors
- Minimum contrast ratio 4.5:1
- Use Tamagui tokens for consistency
- Test with color blindness simulators`,

      'typography': `**Typography Tips:**
- Use SF Pro (system font) or custom
- Support Dynamic Type
- Create clear hierarchy
- In Tamagui: define type scale in tokens`,

      'accessibility': `**Accessibility Requirements:**
- VoiceOver support (accessibilityLabel)
- Dynamic Type support
- Minimum 44pt touch targets
- 4.5:1 contrast ratio
- Reduce Motion support
- Reduce Transparency support`,

      'dark-mode': `**Dark Mode Tips:**
- Define separate color tokens
- Test both modes thoroughly
- Use Tamagui themes for easy switching
- Materials look different in dark mode
- In React Native: useColorScheme() hook`,
    };

    return tips[pattern] || `**Reference:** ${this.baseUrl}/${pattern}`;
  }

  private handleError(pattern: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# iOS HIG Pattern Not Found: ${pattern}

**Error:** ${message}

**Available Patterns:**

**Foundations:** accessibility, color, dark-mode, icons, layout, materials, motion, typography

**Components:** buttons, menus, navigation-and-search, presentation, selection-and-input

**Inputs:** haptics, touchscreen-gestures, keyboards

**iOS Specific:** designing-for-ios, widgets, live-activities

**Reference:** https://developer.apple.com/design/human-interface-guidelines`;
  }
}
