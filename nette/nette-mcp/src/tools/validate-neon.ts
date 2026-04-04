/**
 * NEON Configuration Validator
 *
 * Validates Nette NEON configuration files for:
 * - Syntax errors (indentation, brackets, colons)
 * - Service reference validation (@service)
 * - Parameter reference validation (%param%)
 * - Common configuration mistakes
 */

export interface ValidateNeonParams {
  content: string;
}

export interface ValidationIssue {
  line: number;
  column?: number;
  message: string;
  severity: 'error' | 'warning';
  code: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  services: string[];
  parameters: string[];
}

export class ValidateNeonTool {
  private knownSections = [
    'application',
    'database',
    'di',
    'extensions',
    'forms',
    'http',
    'includes',
    'latte',
    'mail',
    'parameters',
    'php',
    'routing',
    'search',
    'security',
    'services',
    'session',
    'tracy',
  ];

  async validate(params: ValidateNeonParams): Promise<string> {
    const result = this.validateNeon(params.content);

    if (result.valid) {
      let output = '✅ NEON configuration is valid\n\n';

      if (result.services.length > 0) {
        output += `📦 Services found (${result.services.length}):\n`;
        result.services.forEach((s) => (output += `  - ${s}\n`));
      }

      if (result.warnings.length > 0) {
        output += `\n⚠️ Warnings (${result.warnings.length}):\n`;
        result.warnings.forEach((w) => {
          output += `  Line ${w.line}: ${w.message} [${w.code}]\n`;
        });
      }

      return output;
    } else {
      let output = '❌ NEON configuration has errors\n\n';

      output += `🔴 Errors (${result.errors.length}):\n`;
      result.errors.forEach((e) => {
        output += `  Line ${e.line}: ${e.message} [${e.code}]\n`;
      });

      if (result.warnings.length > 0) {
        output += `\n⚠️ Warnings (${result.warnings.length}):\n`;
        result.warnings.forEach((w) => {
          output += `  Line ${w.line}: ${w.message} [${w.code}]\n`;
        });
      }

      return output;
    }
  }

  private validateNeon(content: string): ValidationResult {
    const errors: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];
    const services: string[] = [];
    const parameters: string[] = [];

    const lines = content.split('\n');
    let inServicesSection = false;
    let inParametersSection = false;
    let expectedIndent = 0;
    const indentStack: number[] = [0];
    const serviceReferences: Set<string> = new Set();
    const parameterReferences: Set<string> = new Set();
    const definedServices: Set<string> = new Set();
    const definedParameters: Set<string> = new Set();

    // Bracket tracking
    let openBrackets = { round: 0, square: 0, curly: 0 };
    let bracketLines = { round: 0, square: 0, curly: 0 };

    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const line = lines[i];
      const trimmed = line.trim();

      // Skip empty lines and comments
      if (trimmed === '' || trimmed.startsWith('#')) {
        continue;
      }

      // Track brackets
      for (const char of line) {
        switch (char) {
          case '(':
            if (openBrackets.round === 0) bracketLines.round = lineNum;
            openBrackets.round++;
            break;
          case ')':
            openBrackets.round--;
            break;
          case '[':
            if (openBrackets.square === 0) bracketLines.square = lineNum;
            openBrackets.square++;
            break;
          case ']':
            openBrackets.square--;
            break;
          case '{':
            if (openBrackets.curly === 0) bracketLines.curly = lineNum;
            openBrackets.curly++;
            break;
          case '}':
            openBrackets.curly--;
            break;
        }
      }

      // Check for negative brackets (closed without opening)
      if (openBrackets.round < 0) {
        errors.push({
          line: lineNum,
          message: 'Unexpected closing parenthesis )',
          severity: 'error',
          code: 'BRACKET_MISMATCH',
        });
        openBrackets.round = 0;
      }
      if (openBrackets.square < 0) {
        errors.push({
          line: lineNum,
          message: 'Unexpected closing bracket ]',
          severity: 'error',
          code: 'BRACKET_MISMATCH',
        });
        openBrackets.square = 0;
      }
      if (openBrackets.curly < 0) {
        errors.push({
          line: lineNum,
          message: 'Unexpected closing brace }',
          severity: 'error',
          code: 'BRACKET_MISMATCH',
        });
        openBrackets.curly = 0;
      }

      // Calculate indentation
      const indent = line.search(/\S/);

      // Check for tabs (NEON prefers spaces)
      if (line.includes('\t')) {
        warnings.push({
          line: lineNum,
          message: 'Use spaces instead of tabs for indentation',
          severity: 'warning',
          code: 'TABS_USED',
        });
      }

      // Check section headers (top-level keys)
      if (indent === 0 && trimmed.endsWith(':') && !trimmed.startsWith('-')) {
        const sectionName = trimmed.slice(0, -1).trim();

        // Track current section
        inServicesSection = sectionName === 'services';
        inParametersSection = sectionName === 'parameters';

        // Warn about unknown sections
        if (
          !this.knownSections.includes(sectionName) &&
          !sectionName.includes('.')
        ) {
          warnings.push({
            line: lineNum,
            message: `Unknown section '${sectionName}'. Common sections: ${this.knownSections.slice(0, 5).join(', ')}...`,
            severity: 'warning',
            code: 'UNKNOWN_SECTION',
          });
        }
      }

      // Track service definitions
      if (inServicesSection && indent > 0) {
        // Named service: serviceName:
        const namedServiceMatch = trimmed.match(/^(\w+):$/);
        if (namedServiceMatch) {
          definedServices.add(namedServiceMatch[1]);
          services.push(namedServiceMatch[1]);
        }

        // Anonymous service: - App\Model\UserRepository
        const anonServiceMatch = trimmed.match(/^-\s+([A-Z][\w\\]+)/);
        if (anonServiceMatch) {
          // Extract class name for anonymous service
          const className = anonServiceMatch[1].split('\\').pop() || '';
          const serviceName = className.charAt(0).toLowerCase() + className.slice(1);
          definedServices.add(serviceName);
          services.push(`(anonymous) ${anonServiceMatch[1]}`);
        }

        // Factory service: - SomeFactory
        const factoryMatch = trimmed.match(/factory:\s*([A-Z][\w\\]+)/);
        if (factoryMatch) {
          services.push(`(factory) ${factoryMatch[1]}`);
        }
      }

      // Track parameter definitions
      if (inParametersSection && indent > 0) {
        const paramMatch = trimmed.match(/^(\w+):/);
        if (paramMatch) {
          definedParameters.add(paramMatch[1]);
          parameters.push(paramMatch[1]);
        }
      }

      // Find service references @serviceName
      const serviceRefs = line.matchAll(/@(\w+)/g);
      for (const match of serviceRefs) {
        serviceReferences.add(match[1]);
      }

      // Find parameter references %paramName%
      const paramRefs = line.matchAll(/%(\w+)%/g);
      for (const match of paramRefs) {
        parameterReferences.add(match[1]);
      }

      // Check for common syntax errors

      // Missing colon after key
      if (
        indent > 0 &&
        !trimmed.startsWith('-') &&
        !trimmed.startsWith('#') &&
        !trimmed.includes(':') &&
        !trimmed.includes('=') &&
        !trimmed.match(/^[\[\]{}()@%]/)
      ) {
        // Could be a multi-line value, but warn anyway
        warnings.push({
          line: lineNum,
          message: 'Line might be missing a colon (:) after key',
          severity: 'warning',
          code: 'MISSING_COLON',
        });
      }

      // Check for = instead of :
      if (trimmed.match(/^\w+\s*=\s*\S/) && !trimmed.includes(':')) {
        errors.push({
          line: lineNum,
          message: "Use ':' instead of '=' for key-value pairs in NEON",
          severity: 'error',
          code: 'WRONG_SEPARATOR',
        });
      }

      // Check for proper list item syntax
      if (trimmed.startsWith('-') && !trimmed.match(/^-\s/)) {
        if (trimmed !== '-') {
          errors.push({
            line: lineNum,
            message: "List items should have a space after '-'",
            severity: 'error',
            code: 'LIST_SYNTAX',
          });
        }
      }

      // Check indentation consistency (should be multiple of base indent)
      if (indent > 0) {
        const baseIndent = this.detectBaseIndent(lines);
        if (baseIndent > 0 && indent % baseIndent !== 0) {
          warnings.push({
            line: lineNum,
            message: `Inconsistent indentation (${indent} spaces). Expected multiple of ${baseIndent}`,
            severity: 'warning',
            code: 'INDENT_INCONSISTENT',
          });
        }
      }
    }

    // Check unclosed brackets at end of file
    if (openBrackets.round > 0) {
      errors.push({
        line: bracketLines.round,
        message: `Unclosed parenthesis ( opened on line ${bracketLines.round}`,
        severity: 'error',
        code: 'UNCLOSED_BRACKET',
      });
    }
    if (openBrackets.square > 0) {
      errors.push({
        line: bracketLines.square,
        message: `Unclosed bracket [ opened on line ${bracketLines.square}`,
        severity: 'error',
        code: 'UNCLOSED_BRACKET',
      });
    }
    if (openBrackets.curly > 0) {
      errors.push({
        line: bracketLines.curly,
        message: `Unclosed brace { opened on line ${bracketLines.curly}`,
        severity: 'error',
        code: 'UNCLOSED_BRACKET',
      });
    }

    // Check for referenced but undefined services (skip built-in services)
    const builtinServices = new Set([
      'container',
      'application',
      'router',
      'httpRequest',
      'httpResponse',
      'session',
      'user',
      'database',
      'cache',
      'storage',
      'templateFactory',
      'presenterFactory',
      'linkGenerator',
      'translator',
      'logger',
    ]);

    for (const ref of serviceReferences) {
      if (!definedServices.has(ref) && !builtinServices.has(ref)) {
        warnings.push({
          line: 0,
          message: `Service @${ref} is referenced but not defined in this file`,
          severity: 'warning',
          code: 'UNDEFINED_SERVICE',
        });
      }
    }

    // Check for referenced but undefined parameters (skip built-in)
    const builtinParams = new Set([
      'appDir',
      'wwwDir',
      'tempDir',
      'vendorDir',
      'debugMode',
      'productionMode',
      'consoleMode',
    ]);

    for (const ref of parameterReferences) {
      if (!definedParameters.has(ref) && !builtinParams.has(ref)) {
        warnings.push({
          line: 0,
          message: `Parameter %${ref}% is referenced but not defined`,
          severity: 'warning',
          code: 'UNDEFINED_PARAMETER',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      services,
      parameters,
    };
  }

  private detectBaseIndent(lines: string[]): number {
    for (const line of lines) {
      const indent = line.search(/\S/);
      if (indent > 0) {
        return indent;
      }
    }
    return 4; // Default to 4 spaces
  }
}
