import { describe, expect, it } from 'vitest';
import { clipText, sanitizeFreeText } from '@/lib/normalize';

describe('sanitizeFreeText', () => {
  it('trims and strips control characters', () => {
    expect(sanitizeFreeText('  hello\u0000 world  ')).toBe('hello world');
  });

  it('neutralizes spreadsheet formula prefixes', () => {
    expect(sanitizeFreeText('=HYPERLINK("http://evil")')).toBe('\'=HYPERLINK("http://evil")');
    expect(sanitizeFreeText('+cmd')).toBe("'+cmd");
    expect(sanitizeFreeText('-1+1')).toBe("'-1+1");
    expect(sanitizeFreeText('@SUM(1)')).toBe("'@SUM(1)");
  });

  it('leaves ordinary answers unchanged', () => {
    expect(clipText('  parking  ')).toBe('parking');
    expect(sanitizeFreeText('Toon Plaza')).toBe('Toon Plaza');
  });
});
