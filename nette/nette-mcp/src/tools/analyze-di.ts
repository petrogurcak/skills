/**
 * Nette DI Configuration Analyzer
 *
 * Analyzes NEON DI configuration for:
 * - Circular dependencies (via DFS cycle detection)
 * - Missing services (referenced but not defined)
 * - Unused services (defined but never referenced)
 * - Configuration anti-patterns
 */

export interface AnalyzeDIParams {
  neonContent: string;
}

export interface ServiceInfo {
  name: string;
  class?: string;
  factory?: string;
  dependencies: string[];
  line?: number;
  isAnonymous: boolean;
}

export interface DIIssue {
  type: 'circular' | 'missing' | 'unused' | 'warning';
  message: string;
  services?: string[];
}

export interface AnalysisResult {
  services: ServiceInfo[];
  issues: DIIssue[];
  graph: Map<string, string[]>;
}

export class AnalyzeDITool {
  // Built-in Nette services that are always available
  private builtinServices = new Set([
    'container',
    'application',
    'application.application',
    'router',
    'routing.router',
    'http.request',
    'http.response',
    'httpRequest',
    'httpResponse',
    'session',
    'session.session',
    'user',
    'security.user',
    'database',
    'database.default',
    'database.context',
    'cache',
    'cache.storage',
    'cache.journal',
    'templateFactory',
    'latte.templateFactory',
    'presenterFactory',
    'application.presenterFactory',
    'linkGenerator',
    'application.linkGenerator',
    'translator',
    'tracy.logger',
    'tracy.blueScreen',
    'tracy.bar',
  ]);

  async analyze(params: AnalyzeDIParams): Promise<string> {
    const result = this.analyzeDI(params.neonContent);

    let output = '';

    // Services summary
    output += `📦 Services Found (${result.services.length}):\n`;
    for (const service of result.services) {
      const deps =
        service.dependencies.length > 0
          ? ` → depends on: ${service.dependencies.join(', ')}`
          : '';
      const type = service.isAnonymous ? '(anonymous)' : '';
      output += `  - ${service.name} ${type}${deps}\n`;
    }
    output += '\n';

    if (result.issues.length === 0) {
      output = '✅ DI Configuration is healthy\n\n' + output;
      return output;
    }

    // Group issues by type
    const circular = result.issues.filter((i) => i.type === 'circular');
    const missing = result.issues.filter((i) => i.type === 'missing');
    const unused = result.issues.filter((i) => i.type === 'unused');
    const warnings = result.issues.filter((i) => i.type === 'warning');

    output =
      (circular.length > 0
        ? '❌ DI Configuration has issues\n\n'
        : '⚠️ DI Configuration has warnings\n\n') + output;

    if (circular.length > 0) {
      output += `🔄 Circular Dependencies (${circular.length}):\n`;
      for (const issue of circular) {
        output += `  - ${issue.message}\n`;
        if (issue.services) {
          output += `    Cycle: ${issue.services.join(' → ')} → ${issue.services[0]}\n`;
        }
      }
      output += '\n';
    }

    if (missing.length > 0) {
      output += `❓ Missing Services (${missing.length}):\n`;
      for (const issue of missing) {
        output += `  - ${issue.message}\n`;
      }
      output += '\n';
    }

    if (unused.length > 0) {
      output += `📭 Unused Services (${unused.length}):\n`;
      for (const issue of unused) {
        output += `  - ${issue.message}\n`;
      }
      output += '\n';
    }

    if (warnings.length > 0) {
      output += `⚠️ Warnings (${warnings.length}):\n`;
      for (const issue of warnings) {
        output += `  - ${issue.message}\n`;
      }
    }

    return output;
  }

  private analyzeDI(content: string): AnalysisResult {
    const services: ServiceInfo[] = [];
    const issues: DIIssue[] = [];
    const graph: Map<string, string[]> = new Map();

    // Parse services from NEON
    const parsedServices = this.parseServices(content);
    services.push(...parsedServices);

    // Build dependency graph
    for (const service of services) {
      graph.set(service.name, service.dependencies);
    }

    // Detect circular dependencies
    const cycles = this.findCycles(graph);
    for (const cycle of cycles) {
      issues.push({
        type: 'circular',
        message: `Circular dependency detected in services`,
        services: cycle,
      });
    }

    // Collect all referenced services
    const referencedServices = new Set<string>();
    for (const service of services) {
      for (const dep of service.dependencies) {
        referencedServices.add(dep);
      }
    }

    // Find missing services
    const definedServiceNames = new Set(services.map((s) => s.name));
    for (const ref of referencedServices) {
      if (!definedServiceNames.has(ref) && !this.builtinServices.has(ref)) {
        // Could be a class name reference, not a service name
        if (!ref.includes('\\')) {
          issues.push({
            type: 'missing',
            message: `Service @${ref} is referenced but not defined`,
          });
        }
      }
    }

    // Find unused services (optional, might have false positives)
    for (const service of services) {
      if (
        !service.isAnonymous &&
        !referencedServices.has(service.name) &&
        !this.isLikelyEntryPoint(service)
      ) {
        issues.push({
          type: 'unused',
          message: `Service '${service.name}' is defined but never referenced`,
        });
      }
    }

    // Check for common anti-patterns
    this.checkAntiPatterns(content, issues);

    return { services, issues, graph };
  }

  private parseServices(content: string): ServiceInfo[] {
    const services: ServiceInfo[] = [];
    const lines = content.split('\n');

    let inServicesSection = false;
    let currentIndent = 0;
    let currentService: Partial<ServiceInfo> | null = null;
    let baseIndent = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Skip comments and empty lines
      if (trimmed === '' || trimmed.startsWith('#')) {
        continue;
      }

      const indent = line.search(/\S/);

      // Detect services section
      if (indent === 0 && trimmed === 'services:') {
        inServicesSection = true;
        baseIndent = this.detectBaseIndent(lines.slice(i + 1));
        continue;
      }

      // Exit services section when we hit another top-level section
      if (indent === 0 && trimmed.endsWith(':') && trimmed !== 'services:') {
        inServicesSection = false;
        continue;
      }

      if (!inServicesSection) {
        continue;
      }

      // Named service definition: serviceName:
      const namedMatch = trimmed.match(/^(\w+):$/);
      if (namedMatch && indent === baseIndent) {
        if (currentService && currentService.name) {
          services.push(this.finalizeService(currentService));
        }
        currentService = {
          name: namedMatch[1],
          dependencies: [],
          line: i + 1,
          isAnonymous: false,
        };
        currentIndent = indent;
        continue;
      }

      // Anonymous service: - App\Model\UserRepository
      const anonMatch = trimmed.match(/^-\s+([A-Z][\w\\]+)(?:\(|$)/);
      if (anonMatch && indent === baseIndent) {
        if (currentService && currentService.name) {
          services.push(this.finalizeService(currentService));
        }
        // Generate name from class
        const className = anonMatch[1].split('\\').pop() || 'unknown';
        const serviceName =
          className.charAt(0).toLowerCase() + className.slice(1);

        currentService = {
          name: serviceName,
          class: anonMatch[1],
          dependencies: [],
          line: i + 1,
          isAnonymous: true,
        };
        currentIndent = indent;

        // Check for inline constructor arguments
        const argsMatch = trimmed.match(/\(([^)]+)\)/);
        if (argsMatch) {
          const deps = this.extractDependencies(argsMatch[1]);
          currentService.dependencies = deps;
        }
        continue;
      }

      // Service properties
      if (currentService && indent > currentIndent) {
        // factory: ClassName or factory: @service::method
        const factoryMatch = trimmed.match(
          /factory:\s*(?:@(\w+)|([A-Z][\w\\]+))/
        );
        if (factoryMatch) {
          if (factoryMatch[1]) {
            currentService.dependencies?.push(factoryMatch[1]);
          }
          currentService.factory = factoryMatch[1] || factoryMatch[2];
        }

        // arguments: [@service, %param%]
        const argsMatch = trimmed.match(/arguments:\s*\[([^\]]+)\]/);
        if (argsMatch) {
          const deps = this.extractDependencies(argsMatch[1]);
          currentService.dependencies = [
            ...(currentService.dependencies || []),
            ...deps,
          ];
        }

        // setup: [setLogger(@logger)]
        const setupMatch = trimmed.match(/setup:/);
        if (setupMatch) {
          // Look for @references in setup
          const serviceRefs = trimmed.matchAll(/@(\w+)/g);
          for (const ref of serviceRefs) {
            if (!currentService.dependencies?.includes(ref[1])) {
              currentService.dependencies?.push(ref[1]);
            }
          }
        }

        // Individual setup call: - setLogger(@logger)
        if (trimmed.startsWith('- ') && trimmed.includes('@')) {
          const serviceRefs = trimmed.matchAll(/@(\w+)/g);
          for (const ref of serviceRefs) {
            if (!currentService.dependencies?.includes(ref[1])) {
              currentService.dependencies?.push(ref[1]);
            }
          }
        }

        // class: ClassName
        const classMatch = trimmed.match(/class:\s*([A-Z][\w\\]+)/);
        if (classMatch) {
          currentService.class = classMatch[1];
        }

        // implement: FactoryInterface
        const implementMatch = trimmed.match(/implement:\s*([A-Z][\w\\]+)/);
        if (implementMatch) {
          currentService.factory = implementMatch[1];
        }
      }
    }

    // Don't forget the last service
    if (currentService && currentService.name) {
      services.push(this.finalizeService(currentService));
    }

    return services;
  }

  private finalizeService(partial: Partial<ServiceInfo>): ServiceInfo {
    return {
      name: partial.name || 'unknown',
      class: partial.class,
      factory: partial.factory,
      dependencies: partial.dependencies || [],
      line: partial.line,
      isAnonymous: partial.isAnonymous || false,
    };
  }

  private extractDependencies(args: string): string[] {
    const deps: string[] = [];
    const serviceRefs = args.matchAll(/@(\w+)/g);
    for (const ref of serviceRefs) {
      deps.push(ref[1]);
    }
    return deps;
  }

  private detectBaseIndent(lines: string[]): number {
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '' || trimmed.startsWith('#')) {
        continue;
      }
      const indent = line.search(/\S/);
      if (indent > 0) {
        return indent;
      }
    }
    return 4;
  }

  private findCycles(graph: Map<string, string[]>): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const path: string[] = [];

    const dfs = (node: string): boolean => {
      visited.add(node);
      recursionStack.add(node);
      path.push(node);

      const neighbors = graph.get(node) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) {
            return true;
          }
        } else if (recursionStack.has(neighbor)) {
          // Found a cycle
          const cycleStart = path.indexOf(neighbor);
          const cycle = path.slice(cycleStart);
          cycles.push(cycle);
          return true;
        }
      }

      path.pop();
      recursionStack.delete(node);
      return false;
    };

    for (const node of graph.keys()) {
      if (!visited.has(node)) {
        dfs(node);
      }
    }

    return cycles;
  }

  private isLikelyEntryPoint(service: ServiceInfo): boolean {
    // Services that are typically entry points (not referenced but used)
    const entryPointPatterns = [
      /Router/i,
      /Presenter/i,
      /Command/i,
      /Controller/i,
      /Handler/i,
      /Listener/i,
      /Subscriber/i,
      /Factory$/,
    ];

    const name = service.name;
    const className = service.class || '';

    return entryPointPatterns.some(
      (pattern) => pattern.test(name) || pattern.test(className)
    );
  }

  private checkAntiPatterns(content: string, issues: DIIssue[]): void {
    // Check for service locator pattern
    if (content.includes('@container')) {
      issues.push({
        type: 'warning',
        message:
          'Injecting @container is a service locator anti-pattern. Inject specific services instead.',
      });
    }

    // Check for too many setup calls (might indicate poor design)
    const setupMatches = content.match(/setup:/g);
    if (setupMatches && setupMatches.length > 10) {
      issues.push({
        type: 'warning',
        message: `Found ${setupMatches.length} setup: blocks. Consider using constructor injection instead.`,
      });
    }

    // Check for factory with too many services
    const factoryMatches = content.match(/implement:\s*\w+Factory/g);
    if (factoryMatches && factoryMatches.length > 20) {
      issues.push({
        type: 'warning',
        message: `Found ${factoryMatches.length} factory implementations. Consider if all are necessary.`,
      });
    }

    // Check for autowiring disabled globally
    if (content.match(/autowiring:\s*false/)) {
      issues.push({
        type: 'warning',
        message:
          'Autowiring is disabled. This requires manual dependency wiring.',
      });
    }
  }
}
