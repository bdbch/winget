import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { exec } from 'child_process';
import { listByQuery } from './listByQuery';

const defaultMockStd = `
Name                                    ID                                  Version      Verfügbar    Quelle
------------------------------------------------------------------------------------------------------------
Brave                                   BraveSoftware.Brave                 138.0.1                   winget
Mozilla Firefox                         Mozilla.Firefox                     138.0.1                   winget
Mozilla Firefox (Nightly)               Mozilla.Firefox.Nightly             139.0.1                   winget
`;

const withUpgradesMockStd = `
Name                                    ID                                  Version      Verfügbar    Quelle
------------------------------------------------------------------------------------------------------------
Brave                                   BraveSoftware.Brave                 138.0.1      138.2.1      winget
Mozilla Firefox                         Mozilla.Firefox                     138.0.1      138.4.1      winget
Mozilla Firefox (Nightly)               Mozilla.Firefox.Nightly             139.0.1      139.7.5      winget
`;

const noResultMockStd = `Es wurde kein installiertes Paket gefunden, das den Eingabekriterien entspricht.`;

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

  it('should return a correct result for a normal list', async () => {
    mockExec.mockImplementation((_cmd, callback) => {
      callback(null, defaultMockStd);
    });

    const result = await listByQuery();
    expect(result).toEqual([
      {
        name: 'Brave',
        id: 'BraveSoftware.Brave',
        moniker: 'BraveSoftware.Brave',
        version: '138.0.1',
        availableVersion: undefined,
        source: 'winget',
      },
      {
        name: 'Mozilla Firefox',
        id: 'Mozilla.Firefox',
        moniker: 'Mozilla.Firefox',
        version: '138.0.1',
        availableVersion: undefined,
        source: 'winget',
      },
      {
        name: 'Mozilla Firefox (Nightly)',
        id: 'Mozilla.Firefox.Nightly',
        moniker: 'Mozilla.Firefox.Nightly',
        version: '139.0.1',
        availableVersion: undefined,
        source: 'winget',
      },
    ]);
  });

  it('should return a correct result for a upgradable list', async () => {
    mockExec.mockImplementation((_cmd, callback) => {
      callback(null, withUpgradesMockStd);
    });

    const result = await listByQuery();
    expect(result).toEqual([
      {
        name: 'Brave',
        id: 'BraveSoftware.Brave',
        moniker: 'BraveSoftware.Brave',
        version: '138.0.1',
        availableVersion: '138.2.1',
        source: 'winget',
      },
      {
        name: 'Mozilla Firefox',
        id: 'Mozilla.Firefox',
        moniker: 'Mozilla.Firefox',
        version: '138.0.1',
        availableVersion: '138.4.1',
        source: 'winget',
      },
      {
        name: 'Mozilla Firefox (Nightly)',
        id: 'Mozilla.Firefox.Nightly',
        moniker: 'Mozilla.Firefox.Nightly',
        version: '139.0.1',
        availableVersion: '139.7.5',
        source: 'winget',
      },
    ]);
  });

  it('should return a correct result for no results', async () => {
    mockExec.mockImplementation((_cmd, callback) => {
      callback(null, noResultMockStd);
    });

    const result = await listByQuery();
    expect(result).toEqual([]);
  });
});
