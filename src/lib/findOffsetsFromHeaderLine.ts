/**
 * Finds the column offsets from a header line in the Winget CLI output.
 *
 * @param {string} line - The header line from the Winget CLI output.
 * @returns {Array<{ from: number; to: number; end: number; text: string }>} An array of objects representing column offsets and their text.
 */
export function findOffsetsFromHeaderLine(
  line: string
): Array<{ from: number; to: number; end: number; text: string }> {
  const colPositions = [...line.matchAll(/(\S+(?:\s\S+)?)(\s{3,})?/g)].map(
    (match) => {
      return {
        from: match.index,
        to: match.index + match[1].length,
        end:
          match.index + match[1].length + (match[2] ? match[2].length - 1 : 0),
        text: match[1],
      };
    }
  );

  return colPositions;
}
