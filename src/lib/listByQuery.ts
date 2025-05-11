import { exec } from 'child_process';
import type { WingetListOutput } from '../types';
import parseWingetListOutput from './parseWingetListOutput';

/**
 * Lists installed packages using the Winget CLI and parses the output.
 *
 * @param {string} [query] - An optional query to filter the list of packages.
 * @returns {Promise<WingetListOutput[]>} A promise that resolves to an array of Winget list results.
 * @throws {Error} If the Winget CLI command fails.
 */
export function listByQuery(query?: string): Promise<WingetListOutput[]> {
  const command = ['winget list'];

  if (query) {
    command.push(`--query "${query}"`);
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
