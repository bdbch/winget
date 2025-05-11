import { describe, expect, test } from 'vitest';
import parseWingetListOutput from './parseWingetListOutput';

const testString = `Name                                                               ID                                                                         Version                 Verfügbar               Quelle
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
NVM for Windows 1.2.2                                              CoreyButler.NVMforWindows                                                  1.2.2                                           winget
CPUID HWMonitor 1.57                                               CPUID.HWMonitor                                                            1.57                                            winget
Git                                                                Git.Git                                                                    2.49.0                                          winget
Mozilla Firefox (x64 de)                                           Mozilla.Firefox.de                                                         138.0.1                                         winget
Mozilla Thunderbird (x64 en-US)                                    Mozilla.Thunderbird                                                        138.0                                           winget
Mozilla Maintenance Service                                        ARP\\Machine\\X64\\MozillaMaintenanceService                                  140.0a1
Nightly (x64 en-US)                                                ARP\\Machine\\X64\\Nightly 140.0a1 (x64 en-US)                                140.0a1
Unity 6000.1.0f1                                                   Unity.Unity.2020                                                           6000.1.0f1                                      winget
Unity Hub 3.12.1                                                   Unity.UnityHub                                                             3.12.1                                          winget
Zen Browser (x64 en-US)                                            Zen-Team.Zen-Browser                                                       1.12.3b                                         winget
Zen Browser (x64 en-US)                                            Zen-Team.Zen-Browser                                                       1.12b                                           winget
Zen Twilight (x64 en-US)                                           Zen-Team.Zen-Browser.Twilight                                              1.12.3t                                         winget
Zen Twilight (x64 en-US)                                           Zen-Team.Zen-Browser.Twilight                                              1.12.1t                                         winget
Microsoft Visual C++ 2010  x64 Redistributable - 10.0.40219        Microsoft.VCRedist.2010.x64                                                10.0.40219                                      winget
Logi Options+                                                      Logitech.OptionsPlus                                                       1.89.705126                                     winget
Spotify                                                            Spotify.Spotify                                                            1.2.62.580.gb27ad23e    1.2.63.394.g126b0d89    winget`;

describe('parseWingetListOutput', () => {
  test('it parses a test string correctly');

  const parsed = parseWingetListOutput(testString.trim());
  expect(parsed).toHaveLength(16);

  parsed.forEach((pkg) => {
    expect(pkg.name).toBeDefined();
    expect(pkg.name).toBeTypeOf('string');

    expect(pkg.version).toBeDefined();
    expect(pkg.version).toBeTypeOf('string');

    expect(pkg.moniker).toBeDefined();
    expect(pkg.moniker).toBeTypeOf('string');

    if (pkg.availableVersion) {
      expect(pkg.availableVersion).toBeTypeOf('string');
    } else {
      expect(pkg.availableVersion).toBeUndefined();
    }

    if (pkg.source) {
      expect(pkg.source).toBeTypeOf('string');
    } else {
      expect(pkg.source).toBeUndefined();
    }
  });
});
