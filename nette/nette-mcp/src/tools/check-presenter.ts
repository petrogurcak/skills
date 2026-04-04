/**
 * PHP Presenter Structure Checker
 *
 * Validates Nette Presenter PHP code for:
 * - Modern PHP patterns (strict_types, type hints)
 * - Nette conventions (final class, action/render methods)
 * - Best practices (constructor injection, naming)
 *
 * Uses regex-based parsing (no PHP interpreter needed)
 */

export interface CheckPresenterParams {
  code: string;
}

export interface PresenterIssue {
  line: number;
  message: string;
  type: 'error' | 'warning' | 'suggestion';
  rule: string;
}

export interface CheckResult {
  valid: boolean;
  issues: PresenterIssue[];
  info: {
    className?: string;
    namespace?: string;
    extendsClass?: string;
    methods: string[];
    injections: string[];
  };
}

export class CheckPresenterTool {
  async check(params: CheckPresenterParams): Promise<string> {
    const result = this.checkPresenter(params.code);

    if (result.valid && result.issues.length === 0) {
      let output = '✅ Presenter structure is valid\n\n';
      output += `📋 Info:\n`;
      if (result.info.namespace) output += `  - Namespace: ${result.info.namespace}\n`;
      if (result.info.className) output += `  - Class: ${result.info.className}\n`;
      if (result.info.extendsClass) output += `  - Extends: ${result.info.extendsClass}\n`;
      if (result.info.methods.length > 0) {
        output += `  - Methods: ${result.info.methods.join(', ')}\n`;
      }
      if (result.info.injections.length > 0) {
        output += `  - Injections: ${result.info.injections.join(', ')}\n`;
      }
      return output;
    }

    let output = result.valid
      ? '⚠️ Presenter has suggestions\n\n'
      : '❌ Presenter has issues\n\n';

    const errors = result.issues.filter((i) => i.type === 'error');
    const warnings = result.issues.filter((i) => i.type === 'warning');
    const suggestions = result.issues.filter((i) => i.type === 'suggestion');

    if (errors.length > 0) {
      output += `🔴 Errors (${errors.length}):\n`;
      errors.forEach((e) => {
        output += `  Line ${e.line}: ${e.message} [${e.rule}]\n`;
      });
      output += '\n';
    }

    if (warnings.length > 0) {
      output += `⚠️ Warnings (${warnings.length}):\n`;
      warnings.forEach((w) => {
        output += `  Line ${w.line}: ${w.message} [${w.rule}]\n`;
      });
      output += '\n';
    }

    if (suggestions.length > 0) {
      output += `💡 Suggestions (${suggestions.length}):\n`;
      suggestions.forEach((s) => {
        output += `  Line ${s.line}: ${s.message} [${s.rule}]\n`;
      });
    }

    return output;
  }

  private checkPresenter(code: string): CheckResult {
    const issues: PresenterIssue[] = [];
    const lines = code.split('\n');
    const info: CheckResult['info'] = {
      methods: [],
      injections: [],
    };

    // Track state
    let hasStrictTypes = false;
    let hasFinalClass = false;
    let hasNamespace = false;
    let classLine = 0;
    let hasConstructor = false;
    let constructorCallsParent = false;
    let inConstructor = false;
    let constructorBraceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const line = lines[i];
      const trimmed = line.trim();

      // Check for strict_types
      if (trimmed.match(/declare\s*\(\s*strict_types\s*=\s*1\s*\)/)) {
        hasStrictTypes = true;
      }

      // Check for namespace
      const namespaceMatch = trimmed.match(/^namespace\s+([\w\\]+);/);
      if (namespaceMatch) {
        hasNamespace = true;
        info.namespace = namespaceMatch[1];
      }

      // Check for class declaration
      const classMatch = trimmed.match(
        /^(abstract\s+)?(final\s+)?class\s+(\w+)(?:\s+extends\s+(\w+))?/
      );
      if (classMatch) {
        classLine = lineNum;
        hasFinalClass = !!classMatch[2];
        info.className = classMatch[3];
        info.extendsClass = classMatch[4];

        // Check if it's a presenter (ends with Presenter or extends Presenter)
        const isPresenter =
          info.className?.endsWith('Presenter') ||
          info.extendsClass?.includes('Presenter');

        if (isPresenter && !hasFinalClass && !classMatch[1]) {
          // Not final and not abstract
          issues.push({
            line: lineNum,
            message: 'Presenter class should be final (unless abstract)',
            type: 'suggestion',
            rule: 'FINAL_CLASS',
          });
        }
      }

      // Check for constructor
      if (trimmed.match(/public\s+function\s+__construct\s*\(/)) {
        hasConstructor = true;
        inConstructor = true;
        constructorBraceCount = 0;

        // Check for constructor promotion (PHP 8.0+)
        const hasPromotion = trimmed.match(
          /private\s+(readonly\s+)?[\w\\]+\s+\$|public\s+(readonly\s+)?[\w\\]+\s+\$|protected\s+(readonly\s+)?[\w\\]+\s+\$/
        );

        // Extract injected dependencies from constructor
        const paramMatch = code
          .substring(code.indexOf('__construct'))
          .match(/\(([^)]+)\)/);
        if (paramMatch) {
          const params = paramMatch[1];
          const typeMatches = params.matchAll(
            /(?:private|public|protected)?\s*(?:readonly\s+)?([\w\\]+)\s+\$(\w+)/g
          );
          for (const match of typeMatches) {
            info.injections.push(`${match[2]}: ${match[1]}`);
          }
        }
      }

      // Track constructor body
      if (inConstructor) {
        constructorBraceCount +=
          (line.match(/\{/g) || []).length -
          (line.match(/\}/g) || []).length;
        if (constructorBraceCount <= 0 && line.includes('}')) {
          inConstructor = false;
        }

        // Check for parent::__construct() call
        if (trimmed.match(/parent\s*::\s*__construct\s*\(/)) {
          constructorCallsParent = true;
        }
      }

      // Check for inject* methods (Nette DI pattern)
      const injectMatch = trimmed.match(
        /public\s+function\s+(inject\w+)\s*\(/
      );
      if (injectMatch) {
        info.methods.push(injectMatch[1]);
        issues.push({
          line: lineNum,
          message: `Consider constructor injection instead of ${injectMatch[1]}()`,
          type: 'suggestion',
          rule: 'PREFER_CONSTRUCTOR_INJECTION',
        });
      }

      // Check for action/render/handle methods
      const methodMatch = trimmed.match(
        /public\s+function\s+(action|render|handle)(\w+)\s*\(/
      );
      if (methodMatch) {
        const methodName = methodMatch[1] + methodMatch[2];
        info.methods.push(methodName);

        // Check for return type on action/render
        if (!line.includes('): void') && !line.includes('):void')) {
          // Check if void is on next line (multi-line signature)
          const nextLine = lines[i + 1]?.trim() || '';
          if (!nextLine.startsWith('): void') && !nextLine.startsWith('):void')) {
            issues.push({
              line: lineNum,
              message: `${methodName}() should have return type void`,
              type: 'warning',
              rule: 'RETURN_TYPE_VOID',
            });
          }
        }
      }

      // Check for createComponent methods
      const componentMatch = trimmed.match(
        /protected\s+function\s+(createComponent\w+)\s*\(/
      );
      if (componentMatch) {
        info.methods.push(componentMatch[1]);

        // Check for return type
        if (!line.includes('):') && !lines[i + 1]?.trim().startsWith('):')) {
          issues.push({
            line: lineNum,
            message: `${componentMatch[1]}() should have a return type`,
            type: 'warning',
            rule: 'RETURN_TYPE_MISSING',
          });
        }
      }

      // Check for public properties (should use constructor promotion or private)
      if (
        trimmed.match(/public\s+([\w\\]+\s+)?\$\w+/) &&
        !trimmed.includes('function')
      ) {
        // Check for #[Inject] attribute
        const prevLine = lines[i - 1]?.trim() || '';
        if (!prevLine.includes('#[Inject]') && !prevLine.includes('@inject')) {
          issues.push({
            line: lineNum,
            message: 'Public properties should be private or use #[Inject] for DI',
            type: 'warning',
            rule: 'AVOID_PUBLIC_PROPERTIES',
          });
        }
      }

      // Check for method parameter types
      const funcMatch = trimmed.match(/function\s+\w+\s*\(([^)]*)\)/);
      if (funcMatch && funcMatch[1]) {
        const params = funcMatch[1].split(',');
        for (const param of params) {
          const trimmedParam = param.trim();
          if (trimmedParam && !trimmedParam.match(/^[\w\\?]+\s+\$/)) {
            // No type hint
            if (trimmedParam.match(/^\$\w+/)) {
              issues.push({
                line: lineNum,
                message: `Parameter ${trimmedParam} is missing type hint`,
                type: 'warning',
                rule: 'PARAM_TYPE_MISSING',
              });
            }
          }
        }
      }

      // Check for deprecated @inject annotation
      if (trimmed === '@inject' || trimmed.match(/\*\s*@inject\s*$/)) {
        issues.push({
          line: lineNum,
          message: 'Use #[Inject] attribute instead of @inject annotation',
          type: 'suggestion',
          rule: 'USE_ATTRIBUTE',
        });
      }

      // Check for deprecated @persistent annotation
      if (trimmed.match(/\*\s*@persistent\s*$/)) {
        issues.push({
          line: lineNum,
          message:
            'Use #[Persistent] attribute instead of @persistent annotation',
          type: 'suggestion',
          rule: 'USE_ATTRIBUTE',
        });
      }

      // Check for $this->template->setFile() - usually wrong
      if (trimmed.match(/\$this->template->setFile\s*\(/)) {
        issues.push({
          line: lineNum,
          message:
            'Avoid setFile() - use conventional template paths or setView()',
          type: 'warning',
          rule: 'AVOID_SET_FILE',
        });
      }

      // Check for $this->terminate() without return
      if (
        trimmed.match(/\$this->terminate\s*\(\s*\)/) &&
        !trimmed.startsWith('return')
      ) {
        issues.push({
          line: lineNum,
          message: 'Add return after $this->terminate() for clarity',
          type: 'suggestion',
          rule: 'RETURN_AFTER_TERMINATE',
        });
      }

      // Check for redirect without return
      if (
        trimmed.match(/\$this->redirect\s*\(/) &&
        !trimmed.startsWith('return') &&
        !trimmed.includes('return ')
      ) {
        issues.push({
          line: lineNum,
          message: 'Add return after $this->redirect() for clarity',
          type: 'suggestion',
          rule: 'RETURN_AFTER_REDIRECT',
        });
      }

      // Check for direct $_GET/$_POST access
      if (trimmed.match(/\$_(GET|POST|REQUEST|SESSION|COOKIE)\[/)) {
        issues.push({
          line: lineNum,
          message: 'Use Nette\\Http\\Request instead of superglobals',
          type: 'error',
          rule: 'NO_SUPERGLOBALS',
        });
      }

      // Check for echo/print in presenter
      if (
        trimmed.match(/^echo\s|^print\s|^print\(/) &&
        !trimmed.includes('//')
      ) {
        issues.push({
          line: lineNum,
          message: 'Avoid echo/print in presenter - use template or sendResponse()',
          type: 'error',
          rule: 'NO_ECHO',
        });
      }

      // Check for die/exit
      if (trimmed.match(/^(die|exit)\s*\(/) && !trimmed.includes('//')) {
        issues.push({
          line: lineNum,
          message: 'Use $this->terminate() instead of die/exit',
          type: 'error',
          rule: 'NO_DIE_EXIT',
        });
      }
    }

    // Post-processing checks

    // Check for strict_types
    if (!hasStrictTypes) {
      issues.unshift({
        line: 1,
        message: 'Missing declare(strict_types=1);',
        type: 'error',
        rule: 'STRICT_TYPES',
      });
    }

    // Check for namespace
    if (!hasNamespace && info.className) {
      issues.push({
        line: classLine || 1,
        message: 'Class should have a namespace',
        type: 'error',
        rule: 'NAMESPACE_REQUIRED',
      });
    }

    // Check if presenter extends Presenter
    if (info.className?.endsWith('Presenter')) {
      if (
        info.extendsClass &&
        !info.extendsClass.includes('Presenter')
      ) {
        issues.push({
          line: classLine,
          message: `Presenter should extend Presenter, not ${info.extendsClass}`,
          type: 'error',
          rule: 'EXTENDS_PRESENTER',
        });
      }
    }

    // Check for parent::__construct() in constructor
    if (
      hasConstructor &&
      !constructorCallsParent &&
      info.extendsClass
    ) {
      issues.push({
        line: classLine,
        message: 'Constructor should call parent::__construct()',
        type: 'warning',
        rule: 'CALL_PARENT_CONSTRUCT',
      });
    }

    // Determine validity
    const hasErrors = issues.some((i) => i.type === 'error');

    return {
      valid: !hasErrors,
      issues,
      info,
    };
  }
}
