import type { WingetListOutput } from '../types';
import { findOffsetsFromHeaderLine } from './findOffsetsFromHeaderLine';

export function parseWingetListOutput(input: string): WingetListOutput[] {
  const fullLines = input.trim().split('\n');

  const headerLine = fullLines[0];

  const headerOffsets = findOffsetsFromHeaderLine(headerLine);

  const lines = fullLines.slice(2, fullLines.length);

  const packages: WingetListOutput[] = [];

  for (const line of lines) {
    const [name, id, version, availableVersion, source] = headerOffsets.map(
      (offset) => {
        return line.slice(offset.from, offset.end).trim() || undefined;
      }
    );

    packages.push({
      id: id || '',
      moniker: id || '',
      name: name || '',
      version: version || '',
      availableVersion,
      source,
    });
  }

  return packages;
}

/**
 * Parses the output of the Winget list command into a structured format.
 *
 * @param {string} input - The raw output string from the Winget list command.
 * @returns {WingetListOutput[]} An array of parsed Winget list results.
 */
export default parseWingetListOutput;
