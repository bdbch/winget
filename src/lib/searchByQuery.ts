import { exec } from 'child_process';
import type { WingetSearchOutput } from '../types';
import parseWingetSearchOutput from './parseWingetSearchOutput';

/**
 * Searches for packages using the Winget CLI based on a query string.
 *
 * @param {string} query - The search query string.
 * @returns {Promise<WingetSearchOutput[]>} A promise that resolves to an array of Winget search results.
 * @throws {Error} If the search query is empty or if the Winget CLI command fails.
 */
export function searchByQuery(query: string): Promise<WingetSearchOutput[]> {
  if (!query) {
    throw new Error('Search query is empty');
  }

  const command = `winget search --query "${query}"`;

  return new Promise<WingetSearchOutput[]>((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      try {
        const results: WingetSearchOutput[] = parseWingetSearchOutput(stdout);
        resolve(results);
      } catch (e) {
        reject(e);
      }
    });
  });
}
