import { exec } from 'child_process';
import type { WingetSearchOutput } from '../types';
import parseWingetSearchOutput from './parseWingetSearchOutput';

type Options = {
  /** The tag to filter by */
  tag?: string;

  /** How many packages should be returned */
  count?: number;

  /** The source the package should be looked in */
  source?: string;
};

export { Options as SearchByQueryOptions };

/**
 * Searches for packages using the Winget CLI based on a query string.
 *
 * @param {string} query - The search query string.
 * @param {SearchByQueryOptions} - Optional options that can be passed to the query
 * @returns {Promise<WingetSearchOutput[]>} A promise that resolves to an array of Winget search results.
 * @throws {Error} If the search query is empty or if the Winget CLI command fails.
 */
export function searchByQuery(
  query: string,
  options?: Options
): Promise<WingetSearchOutput[]> {
  const command = ['winget search'];

  if (!query) {
    throw new Error('Search query is empty');
  }

  command.push(`--query "${query}"`);

  if (options?.tag) {
    command.push(`--tag "${options.tag}"`);
  }

  if (options?.count) {
    command.push(`--count "${options.count.toString()}"`);
  }

  if (options?.source) {
    command.push(`--source "${options.source}"`);
  }

  return new Promise<WingetSearchOutput[]>((resolve, reject) => {
    exec(command.join(' '), (error, stdout) => {
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
