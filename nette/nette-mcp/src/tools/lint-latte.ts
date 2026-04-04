/**
 * Latte Template Linter
 *
 * Lints Latte templates for:
 * - Syntax errors (unclosed tags, invalid nesting)
 * - Security issues (href vs n:href, |noescape usage)
 * - Best practices (deprecated macros, proper escaping)
 */

export interface LintLatteParams {
  template: string;
}

export interface LintIssue {
  line: number;
  column?: number;
  message: string;
  type: 'error' | 'warning' | 'security';
  code: string;
  suggestion?: string;
}

export interface LintResult {
  valid: boolean;
  issues: LintIssue[];
  stats: {
    blocks: number;
    includes: number;
    variables: number;
    filters: number;
  };
}

export class LintLatteTool {
  // Tags that require closing
  private blockTags = [
    'if',
    'ifset',
    'ifcontent',
    'foreach',
    'for',
    'while',
    'switch',
    'try',
    'block',
    'define',
    'embed',
    'form',
    'formContainer',
    'snippet',
    'snippetArea',
    'capture',
    'spaceless',
    'syntax',
    'translate',
  ];

  // Deprecated or dangerous patterns
  private deprecatedPatterns = [
    {
      pattern: /\{cache\s/,
      message: '{cache} macro is deprecated, use caching in presenter',
      code: 'DEPRECATED_CACHE',
    },
    {
      pattern: /\{status\s/,
      message: '{status} macro is deprecated',
      code: 'DEPRECATED_STATUS',
    },
  ];

  async lint(params: LintLatteParams): Promise<string> {
    const result = this.lintTemplate(params.template);

    if (result.valid && result.issues.length === 0) {
      let output = '✅ Latte template is valid\n\n';
      output += `📊 Stats:\n`;
      output += `  - Blocks: ${result.stats.blocks}\n`;
      output += `  - Includes: ${result.stats.includes}\n`;
      output += `  - Variables: ${result.stats.variables}\n`;
      output += `  - Filters: ${result.stats.filters}\n`;
      return output;
    }

    let output = result.valid
      ? '⚠️ Latte template has warnings\n\n'
      : '❌ Latte template has errors\n\n';

    const errors = result.issues.filter((i) => i.type === 'error');
    const security = result.issues.filter((i) => i.type === 'security');
    const warnings = result.issues.filter((i) => i.type === 'warning');

    if (errors.length > 0) {
      output += `🔴 Errors (${errors.length}):\n`;
      errors.forEach((e) => {
        output += `  Line ${e.line}: ${e.message} [${e.code}]\n`;
        if (e.suggestion) output += `    → ${e.suggestion}\n`;
      });
      output += '\n';
    }

    if (security.length > 0) {
      output += `🔒 Security Issues (${security.length}):\n`;
      security.forEach((s) => {
        output += `  Line ${s.line}: ${s.message} [${s.code}]\n`;
        if (s.suggestion) output += `    → ${s.suggestion}\n`;
      });
      output += '\n';
    }

    if (warnings.length > 0) {
      output += `⚠️ Warnings (${warnings.length}):\n`;
      warnings.forEach((w) => {
        output += `  Line ${w.line}: ${w.message} [${w.code}]\n`;
        if (w.suggestion) output += `    → ${w.suggestion}\n`;
      });
    }

    return output;
  }

  private lintTemplate(template: string): LintResult {
    const issues: LintIssue[] = [];
    const lines = template.split('\n');

    // Stack for tracking open tags
    const tagStack: Array<{ tag: string; line: number }> = [];

    // Stats
    let blocks = 0;
    let includes = 0;
    let variables = 0;
    let filters = 0;

    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const line = lines[i];

      // Count stats
      const blockMatches = line.match(/\{block\s/g);
      if (blockMatches) blocks += blockMatches.length;

      const includeMatches = line.match(/\{include\s/g);
      if (includeMatches) includes += includeMatches.length;

      const varMatches = line.match(/\{\$[\w]+/g);
      if (varMatches) variables += varMatches.length;

      const filterMatches = line.match(/\|[\w]+/g);
      if (filterMatches) filters += filterMatches.length;

      // ===== SECURITY CHECKS =====

      // Check for href="{link ...}" instead of n:href
      if (line.match(/href\s*=\s*["']\{link\s/)) {
        issues.push({
          line: lineNum,
          message: 'Use n:href instead of href="{link ...}"',
          type: 'security',
          code: 'USE_N_HREF',
          suggestion: 'Change to: <a n:href="Presenter:action">',
        });
      }

      // Check for class="{...}" instead of n:class
      if (line.match(/class\s*=\s*["']\{(?:if|$)/)) {
        issues.push({
          line: lineNum,
          message: 'Consider using n:class for conditional classes',
          type: 'warning',
          code: 'USE_N_CLASS',
          suggestion: 'Use: n:class="$condition ? class1 : class2"',
        });
      }

      // Check for |noescape usage
      if (line.match(/\|noescape/)) {
        issues.push({
          line: lineNum,
          message: '|noescape disables auto-escaping - ensure content is safe',
          type: 'security',
          code: 'NOESCAPE_USED',
          suggestion: 'Verify that the variable contains sanitized HTML only',
        });
      }

      // Check for raw HTML output with {=...}
      if (line.match(/\{=\s*\$/)) {
        issues.push({
          line: lineNum,
          message: '{= $var} outputs raw value - use {$var} for auto-escaping',
          type: 'security',
          code: 'RAW_OUTPUT',
          suggestion: 'Use {$var} instead of {= $var}',
        });
      }

      // Check for inline JavaScript with Latte variables
      if (
        line.match(
          /<script[^>]*>[\s\S]*\{[\$_]/
        ) ||
        line.match(/on\w+\s*=\s*["'][^"']*\{\$/)
      ) {
        issues.push({
          line: lineNum,
          message:
            'Latte variable in JavaScript context - ensure proper escaping',
          type: 'security',
          code: 'JS_CONTEXT',
          suggestion:
            'Use |escapeJs filter or pass data via data-* attributes',
        });
      }

      // ===== SYNTAX CHECKS =====

      // Find opening tags
      const openTagRegex = /\{(if|ifset|ifcontent|foreach|for|while|switch|try|block|define|embed|form|formContainer|snippet|snippetArea|capture|spaceless|syntax|translate)\s/g;
      let match;
      while ((match = openTagRegex.exec(line)) !== null) {
        tagStack.push({ tag: match[1], line: lineNum });
      }

      // Find closing tags
      const closeTagRegex = /\{\/(if|ifset|ifcontent|foreach|for|while|switch|try|block|define|embed|form|formContainer|snippet|snippetArea|capture|spaceless|syntax|translate)\}/g;
      while ((match = closeTagRegex.exec(line)) !== null) {
        const closeTag = match[1];
        if (tagStack.length === 0) {
          issues.push({
            line: lineNum,
            message: `Unexpected closing tag {/${closeTag}} - no matching opening tag`,
            type: 'error',
            code: 'UNEXPECTED_CLOSE',
          });
        } else {
          const lastOpen = tagStack.pop()!;
          if (lastOpen.tag !== closeTag) {
            issues.push({
              line: lineNum,
              message: `Mismatched tag: expected {/${lastOpen.tag}} but found {/${closeTag}}. Opening tag at line ${lastOpen.line}`,
              type: 'error',
              code: 'TAG_MISMATCH',
            });
          }
        }
      }

      // Check for n:inner-* and n:tag-* on wrong elements
      if (line.match(/n:inner-foreach\s*=.*n:foreach/)) {
        issues.push({
          line: lineNum,
          message: 'Cannot use both n:foreach and n:inner-foreach on same element',
          type: 'error',
          code: 'DUPLICATE_FOREACH',
        });
      }

      // Check for undefined Latte syntax
      if (line.match(/\{[a-z]+(?!\s|\}|:)/)) {
        const possibleTag = line.match(/\{([a-z]+)/);
        if (possibleTag) {
          const tag = possibleTag[1];
          const validTags = [
            'if',
            'else',
            'elseif',
            'elseifset',
            'ifset',
            'ifcontent',
            'foreach',
            'for',
            'while',
            'continueIf',
            'breakIf',
            'first',
            'last',
            'sep',
            'switch',
            'case',
            'default',
            'try',
            'rollback',
            'var',
            'default',
            'parameters',
            'capture',
            'spaceless',
            'syntax',
            'include',
            'block',
            'define',
            'import',
            'embed',
            'layout',
            'extends',
            'snippet',
            'snippetArea',
            'control',
            'dump',
            'debugbreak',
            'contentType',
            'php',
            'do',
            'trace',
            'form',
            'formContainer',
            'input',
            'inputError',
            'label',
            'name',
            'translate',
            'l',
            'r',
          ];
          if (!validTags.includes(tag) && !tag.startsWith('/')) {
            issues.push({
              line: lineNum,
              message: `Unknown Latte tag {${tag}}`,
              type: 'warning',
              code: 'UNKNOWN_TAG',
            });
          }
        }
      }

      // Check for deprecated patterns
      for (const pattern of this.deprecatedPatterns) {
        if (pattern.pattern.test(line)) {
          issues.push({
            line: lineNum,
            message: pattern.message,
            type: 'warning',
            code: pattern.code,
          });
        }
      }

      // Check for empty blocks (likely mistakes)
      if (line.match(/\{block\s+\w+\}\s*\{\/block\}/)) {
        issues.push({
          line: lineNum,
          message: 'Empty block definition - intentional?',
          type: 'warning',
          code: 'EMPTY_BLOCK',
        });
      }

      // Check for control without name
      if (line.match(/\{control\s*\}/)) {
        issues.push({
          line: lineNum,
          message: '{control} requires component name',
          type: 'error',
          code: 'CONTROL_NO_NAME',
        });
      }

      // Check for form without name
      if (line.match(/\{form\s*\}/)) {
        issues.push({
          line: lineNum,
          message: '{form} requires form name',
          type: 'error',
          code: 'FORM_NO_NAME',
        });
      }

      // Check for unclosed Latte tags on same line
      const openBraces = (line.match(/\{(?!\*)/g) || []).length;
      const closeBraces = (line.match(/(?<!\*)\}/g) || []).length;
      const comments = (line.match(/\{\*/g) || []).length;
      const commentEnds = (line.match(/\*\}/g) || []).length;

      // Simple check - might have false positives with strings
      if (openBraces - comments !== closeBraces - commentEnds) {
        // Could be multi-line, only warn
        issues.push({
          line: lineNum,
          message: 'Possible unclosed Latte tag on this line',
          type: 'warning',
          code: 'UNCLOSED_TAG',
        });
      }

      // Check for common typos
      if (line.match(/\{forech\s/)) {
        issues.push({
          line: lineNum,
          message: 'Typo: {forech} should be {foreach}',
          type: 'error',
          code: 'TYPO',
        });
      }

      if (line.match(/\{elsefi\s/)) {
        issues.push({
          line: lineNum,
          message: 'Typo: {elsefi} should be {elseif}',
          type: 'error',
          code: 'TYPO',
        });
      }

      // Check for n:href on non-link elements (warning, might be intentional)
      if (line.match(/<(?!a\s)[^>]+n:href/)) {
        issues.push({
          line: lineNum,
          message: 'n:href is typically used on <a> elements',
          type: 'warning',
          code: 'N_HREF_NON_LINK',
        });
      }
    }

    // Check for unclosed tags at end of file
    for (const unclosed of tagStack) {
      issues.push({
        line: unclosed.line,
        message: `Unclosed {${unclosed.tag}} tag - missing {/${unclosed.tag}}`,
        type: 'error',
        code: 'UNCLOSED_TAG',
      });
    }

    // Determine validity
    const hasErrors = issues.some((i) => i.type === 'error');
    const hasSecurityIssues = issues.some((i) => i.type === 'security');

    return {
      valid: !hasErrors,
      issues,
      stats: {
        blocks,
        includes,
        variables,
        filters,
      },
    };
  }
}
