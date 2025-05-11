import { describe, expect, test } from 'vitest';
import parseWingetSearchOutput from './parseWingetSearchOutput';

const testString = `Name                         ID                     Version              Übereinstimmung         Quelle
--------------------------------------------------------------------------------------------------------
Spotify - Music and Podcasts 9NCBCSZSJRSB           Unknown                                      msstore
Spotify                      Spotify.Spotify        1.2.63.394.g126b0d89 ProductCode: spotify    winget
Toastify                     Aleab.Toastify         1.11.2               Tag: spotify            winget
Spotube                      KRTirtho.Spotube       4.0.0                Tag: spotify            winget
Moosync                      Ovenoboyo.Moosync      11.0.2               Tag: spotify            winget
Spicetify                    Spicetify.Spicetify    2.40.7               Tag: spotify            winget
Harmony                      VincentL.Harmony       0.9.1                Tag: spotify            winget
spotify_player               aome510.spotify-player 0.20.4               Tag: spotify            winget
ncspot                       hrkfdn.ncspot          1.2.2                Tag: spotify            winget
muffon                       staniel359.muffon      2.2.0                Tag: spotify            winget
tuna                         univrsal.tuna          1.9.10               Tag: spotify            winget
Go Spotify Cli               Envoy49.go-spotify-cli 1.0.80                                       winget
SpotiFlyer                   Shabinder.SpotiFlyer   3.6.3                Tag: spotify-downloader winget`;

describe('parseWingetSearchOutput', () => {
  test('it parses a test string correctly');

  const parsed = parseWingetSearchOutput(testString.trim());
  expect(parsed).toHaveLength(13);

  parsed.forEach((pkg) => {
    expect(pkg.name).toBeDefined();
    expect(pkg.name).toBeTypeOf('string');

    expect(pkg.version).toBeDefined();
    expect(pkg.version).toBeTypeOf('string');

    expect(pkg.moniker).toBeDefined();
    expect(pkg.moniker).toBeTypeOf('string');

    if (pkg.match) {
      expect(pkg.match).toBeTypeOf('string');
    } else {
      expect(pkg.match).toBeUndefined();
    }

    if (pkg.source) {
      expect(pkg.source).toBeTypeOf('string');
    } else {
      expect(pkg.source).toBeUndefined();
    }
  });
});
