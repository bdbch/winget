import { exec } from 'child_process';
import type { WingetListOutput } from '../types';
import parseWingetListOutput from './parseWingetListOutput';

type Options = {
  /** The tag to filter by */
  tag?: string;

  /** How many packages should be returned */
  count?: number;

  /** The source of the package */
  source?: string;
};

export { Options as ListByQueryOptions };

/**
 * Lists installed packages using the Winget CLI and parses the output.
 *
 * @param {string} [query] - An optional query to filter the list of packages.
 * @returns {Promise<WingetListOutput[]>} A promise that resolves to an array of Winget list results.
 * @throws {Error} If the Winget CLI command fails.
 */
export function listByQuery(
  query?: string,
  options?: Options
): Promise<WingetListOutput[]> {
  const command = ['winget list'];

  if (query) {
    command.push(`--query "${query}"`);
  }

  if (options?.tag) {
    command.push(`--tag "${options.tag}"`);
  }

  if (options?.count) {
    command.push(`--count "${options.count.toString()}"`);
  }

  if (options?.source) {
    command.push(`--source "${options.source}"`);
  }

  return new Promise<WingetListOutput[]>((resolve, reject) => {
    exec(command.join(' '), (error, stdout) => {
      if (error) {
        return reject(error);
      }

      try {
        const results: WingetListOutput[] = parseWingetListOutput(stdout);
        resolve(results);
      } catch (e) {
        reject(e);
      }
    });
  });
}
