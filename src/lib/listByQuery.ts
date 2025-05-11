import { exec } from 'child_process';
import type { WingetListOutput } from '../types';
import parseWingetListOutput from './parseWingetListOutput';

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
