import { describe, expect, test } from 'vitest';
import { findOffsetsFromHeaderLine } from './findOffsetsFromHeaderLine';

describe('findOffsetsFromHeaderLine', () => {
  test('should find the correct offsets from a header line', () => {
    const testLine =
      'Name            ID                    Version                        Available Version    Source';
    const offsets = findOffsetsFromHeaderLine(testLine);

    expect(offsets).toHaveLength(5);
    expect(offsets[0]).toStrictEqual({ from: 0, to: 4, text: 'Name', end: 15 });
    expect(offsets[1]).toStrictEqual({ from: 16, to: 18, text: 'ID', end: 37 });
    expect(offsets[2]).toStrictEqual({
      from: 38,
      to: 45,
      text: 'Version',
      end: 68,
    });
    expect(offsets[3]).toStrictEqual({
      from: 69,
      to: 86,
      text: 'Available Version',
      end: 89,
    });
    expect(offsets[4]).toStrictEqual({
      from: 90,
      to: 96,
      text: 'Source',
      end: 96,
    });
  });
});
