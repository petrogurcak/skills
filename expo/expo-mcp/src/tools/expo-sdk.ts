import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface ExpoSDKParams {
  module: string;
  include_examples?: boolean;
}

export class ExpoSDKTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://docs.expo.dev';

  // Map of common module names to their docs paths
  private readonly modulePaths: Record<string, string> = {
    'expo-camera': '/versions/latest/sdk/camera',
    'expo-image': '/versions/latest/sdk/image',
    'expo-video': '/versions/latest/sdk/video',
    'expo-audio': '/versions/latest/sdk/audio',
    'expo-av': '/versions/latest/sdk/av',
    'expo-file-system': '/versions/latest/sdk/filesystem',
    'expo-notifications': '/versions/latest/sdk/notifications',
    'expo-location': '/versions/latest/sdk/location',
    'expo-sensors': '/versions/latest/sdk/sensors',
    'expo-secure-store': '/versions/latest/sdk/securestore',
    'expo-haptics': '/versions/latest/sdk/haptics',
    'expo-linear-gradient': '/versions/latest/sdk/linear-gradient',
    'expo-blur': '/versions/latest/sdk/blur',
    'expo-calendar': '/versions/latest/sdk/calendar',
    'expo-contacts': '/versions/latest/sdk/contacts',
    'expo-media-library': '/versions/latest/sdk/media-library',
    'expo-image-picker': '/versions/latest/sdk/imagepicker',
    'expo-document-picker': '/versions/latest/sdk/document-picker',
    'expo-font': '/versions/latest/sdk/font',
    'expo-splash-screen': '/versions/latest/sdk/splash-screen',
    'expo-status-bar': '/versions/latest/sdk/status-bar',
    'expo-constants': '/versions/latest/sdk/constants',
    'expo-device': '/versions/latest/sdk/device',
    'expo-application': '/versions/latest/sdk/application',
    'expo-linking': '/versions/latest/sdk/linking',
    'expo-web-browser': '/versions/latest/sdk/webbrowser',
    'expo-auth-session': '/versions/latest/sdk/auth-session',
    'expo-local-authentication': '/versions/latest/sdk/local-authentication',
    'expo-clipboard': '/versions/latest/sdk/clipboard',
    'expo-sharing': '/versions/latest/sdk/sharing',
    'expo-store-review': '/versions/latest/sdk/storereview',
    'expo-updates': '/versions/latest/sdk/updates',
    'expo-asset': '/versions/latest/sdk/asset',
    'expo-keep-awake': '/versions/latest/sdk/keep-awake',
    'expo-screen-orientation': '/versions/latest/sdk/screen-orientation',
    'expo-brightness': '/versions/latest/sdk/brightness',
    'expo-battery': '/versions/latest/sdk/battery',
    'expo-network': '/versions/latest/sdk/network',
    'expo-cellular': '/versions/latest/sdk/cellular',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchExpoSDK(params: ExpoSDKParams): Promise<string> {
    const moduleName = params.module.toLowerCase().replace(/^expo-?/, 'expo-');
    const includeExamples = params.include_examples ?? true;

    // Get docs path
    let docsPath = this.modulePaths[moduleName];

    if (!docsPath) {
      // Try to construct path from module name
      const simpleName = moduleName.replace('expo-', '');
      docsPath = `/versions/latest/sdk/${simpleName}`;
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'main, article, .doc-content, [role="main"]',
      });

      return this.formatResponse(moduleName, content, url, includeExamples);
    } catch (error) {
      return this.handleError(moduleName, error);
    }
  }

  private formatResponse(
    moduleName: string,
    content: string,
    url: string,
    includeExamples: boolean
  ): string {
    let response = `# Expo SDK: ${moduleName}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**SDK Version:** 54+ (React Native 0.79+, React 19)\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      // Extract just installation and basic usage
      const installation = this.fetcher.extractSection(content, 'Installation');
      const usage = this.fetcher.extractSection(content, 'Usage');
      response += installation + '\n\n' + usage;
    }

    response += '\n\n---\n\n';
    response += this.getModuleTips(moduleName);

    return response;
  }

  private getModuleTips(moduleName: string): string {
    const tips: Record<string, string> = {
      'expo-camera': `**Quick Tips:**
- Use CameraView (not legacy Camera)
- useCameraPermissions() hook for permissions
- barcodeScannerSettings for QR/barcode scanning
- facing="back" or "front" for camera direction`,

      'expo-image': `**Quick Tips:**
- Use Image from expo-image (not React Native Image)
- useImage hook for preloading (v2)
- contentFit="cover" | "contain" | "fill"
- transition={ms} for smooth loading
- blurhash for placeholder`,

      'expo-video': `**Quick Tips:**
- Stable since SDK 52, replaces expo-av Video in SDK 54
- Supports Picture-in-Picture
- Lock screen controls available
- useVideoPlayer hook for control
- expo-av Video is DEPRECATED`,

      'expo-audio': `**Quick Tips:**
- Stable in SDK 54 (replaces expo-av Audio)
- expo-av is DEPRECATED and no longer maintained
- Use this for all new audio features
- Check migration guide from expo-av`,

      'expo-av': `**WARNING: DEPRECATED**
- expo-av is no longer maintained as of SDK 54
- Use expo-video for video playback
- Use expo-audio for audio playback
- Migration guide: https://docs.expo.dev/versions/latest/sdk/av/`,

      'expo-notifications': `**Quick Tips:**
- Needs config plugin in app.json
- Get push token with getExpoPushTokenAsync
- Handle foreground/background differently
- Test with Expo push notification tool`,

      'expo-location': `**Quick Tips:**
- Request foreground/background permissions separately
- Use requestForegroundPermissionsAsync()
- For background: add config plugin
- getCurrentPositionAsync() for one-time`,

      'expo-secure-store': `**Quick Tips:**
- For sensitive data (tokens, keys)
- Encrypted storage
- 2KB limit per value
- Use for auth tokens, not large data`,
    };

    return tips[moduleName] || `**Installation:**\n\`npx expo install ${moduleName}\``;
  }

  private handleError(moduleName: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Expo SDK Module Not Found: ${moduleName}

**Error:** ${message}

**Suggestions:**
- Check module name spelling
- Module might be: expo-${moduleName.replace('expo-', '')}
- Browse SDK reference: https://docs.expo.dev/versions/latest/

**Common Modules:**
- expo-camera - Camera access
- expo-image - Optimized images
- expo-video - Video playback
- expo-notifications - Push notifications
- expo-location - GPS location
- expo-file-system - File operations
- expo-secure-store - Encrypted storage

**Installation:**
\`\`\`bash
npx expo install ${moduleName}
\`\`\``;
  }
}
