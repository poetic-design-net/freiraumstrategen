import MagicString from 'magic-string';
import { cleanText } from '../utils/textCleaner.js';

export function sanitizeTextPreprocessor() {
  return {
    markup({ content, filename }) {
      const s = new MagicString(content);
      
      // Find all text expressions {text} that aren't already wrapped with sanitizeText
      const regex = /{(?!@)(?!sanitizeText\()([^}]+)}/g;
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        const fullMatch = match[0];
        const expression = match[1];
        
        // Skip if it's a control flow expression or event handler
        if (expression.startsWith('#') || 
            expression.startsWith('@') || 
            expression.startsWith('on:') ||
            expression.startsWith('/') ||
            expression.startsWith(':')) {
          continue;
        }
        
        // Skip if it's a prop binding or spread props
        if (expression.includes('bind:') || 
            expression.startsWith('...')) {
          continue;
        }
        
        // Clean the expression content using the new cleanText function
        const cleanedExpression = cleanText(expression);
        
        // Replace the expression with cleaned version
        s.overwrite(
          match.index,
          match.index + fullMatch.length,
          `{${cleanedExpression}}`
        );
      }
      
      return {
        code: s.toString(),
        map: s.generateMap({ hires: true })
      };
    }
  };
}
