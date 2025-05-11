import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { exec } from 'child_process';
import { searchByQuery } from './searchByQuery';

const defaultMockStd = `
Name                          ID                          Version      Übereinstimmung    Quelle
------------------------------------------------------------------------------------------------
Mozilla Firefox               Mozilla.Firefox             138.0.1                         winget
`;

const multipleMockStd = `
Name                                    ID                                  Version    Übereinstimmung      Quelle
------------------------------------------------------------------------------------------------------------------
Mozilla Firefox                         Mozilla.Firefox                     138.0.1                         winget
Mozilla Firefox (Nightly)               Mozilla.Firefox.Nightly             139.0.1                         winget
`;

const noResultMockStd = `Es wurde kein Paket gefunden, das den Eingabekriterien entspricht.`;

vi.mock('child_process', () => {
  return {
    exec: vi.fn(),
  };
});

describe('searchByQuery', () => {
  const mockExec = exec as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a correct result for a normal search query', async () => {
    mockExec.mockImplementation((_cmd, callback) => {
      callback(null, defaultMockStd);
    });

    const result = await searchByQuery('Mozilla');
    expect(result).toEqual([
      {
        name: 'Mozilla Firefox',
        id: 'Mozilla.Firefox',
        moniker: 'Mozilla.Firefox',
        version: '138.0.1',
        match: undefined,
        source: 'winget',
      },
    ]);
  });

  it('should return a correct result for a search query with multiple results', async () => {
    mockExec.mockImplementation((_cmd, callback) => {
      callback(null, multipleMockStd);
    });

    const result = await searchByQuery('Mozilla');
    expect(result).toEqual([
      {
        name: 'Mozilla Firefox',
        id: 'Mozilla.Firefox',
        moniker: 'Mozilla.Firefox',
        version: '138.0.1',
        match: undefined,
        source: 'winget',
      },
      {
        name: 'Mozilla Firefox (Nightly)',
        id: 'Mozilla.Firefox.Nightly',
        moniker: 'Mozilla.Firefox.Nightly',
        version: '139.0.1',
        match: undefined,
        source: 'winget',
      },
    ]);
  });

  it('should return a correct result for no results', async () => {
    mockExec.mockImplementation((_cmd, callback) => {
      callback(null, noResultMockStd);
    });

    const result = await searchByQuery('Mozilla');
    expect(result).toEqual([]);
  });
});
