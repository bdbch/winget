import type { WingetSearchOutput } from '../types';
import { findOffsetsFromHeaderLine } from './findOffsetsFromHeaderLine';

export function parseWingetSearchOutput(input: string): WingetSearchOutput[] {
  const fullLines = input.trim().split('\n');

  const headerLine = fullLines[0];

  const headerOffsets = findOffsetsFromHeaderLine(headerLine);

  const lines = fullLines.slice(2, fullLines.length);

  const packages: WingetSearchOutput[] = [];

  for (const line of lines) {
    const [name, id, version, match, source] = headerOffsets.map((offset) => {
      return line.slice(offset.from, offset.end).trim() || undefined;
    });

    packages.push({
      id: id || '',
      moniker: id || '',
      name: name || '',
      version: version || '',
      source: source || '',
      match: match,
    });
  }

  return packages;
}

/**
 * Parses the output of the Winget search command into a structured format.
 *
 * @param {string} input - The raw output string from the Winget search command.
 * @returns {WingetSearchOutput[]} An array of parsed Winget search results.
 */

export default parseWingetSearchOutput;
