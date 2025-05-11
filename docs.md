# Documentation for @bdbchgg/winget

This document provides an overview of the functions available in the `@bdbchgg/winget` library and how to use them.

---

## Functions

### `searchByQuery`

```typescript
searchByQuery(query: string): Promise<WingetSearchOutput[]>
```

**Description**: Searches for packages using the Winget CLI based on a query string.

**Parameters**:

- `query` (string): The search query string.

**Returns**: A promise that resolves to an array of Winget search results.

**Throws**: An error if the search query is empty or if the Winget CLI command fails.

---

### `parseWingetListOutput`

```typescript
parseWingetListOutput(input: string): WingetListOutput[]
```

**Description**: Parses the output of the Winget list command into a structured format.

**Parameters**:

- `input` (string): The raw output string from the Winget list command.

**Returns**: An array of parsed Winget list results.

---

### `parseWingetSearchOutput`

```typescript
parseWingetSearchOutput(input: string): WingetSearchOutput[]
```

**Description**: Parses the output of the Winget search command into a structured format.

**Parameters**:

- `input` (string): The raw output string from the Winget search command.

**Returns**: An array of parsed Winget search results.

---

### `findOffsetsFromHeaderLine`

```typescript
findOffsetsFromHeaderLine(line: string): Array<{ from: number; to: number; end: number; text: string }>
```

**Description**: Finds the column offsets from a header line in the Winget CLI output.

**Parameters**:

- `line` (string): The header line from the Winget CLI output.

**Returns**: An array of objects representing column offsets and their text.

---

For more details, refer to the source code or contact the maintainer.
