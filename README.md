# Number Name

A lightweight TypeScript library for converting integer numeric strings into English number names.

## Current Status

- Implemented library files:
  - `src/lib/scaleNames.ts`
  - `src/lib/numberWords.ts`
  - `src/lib/groupDigits.ts`
  - `src/lib/groupToWords.ts`
  - `src/lib/numberToName.ts`
- Planned core module:
  - `src/lib/nameToNumber.ts` (reverse name-to-number conversion)
- The codebase is tracking a six-module core design, with the five number-to-name modules currently implemented.
- Test flow:
  - `npm test` compiles the TypeScript project and runs `dist/tests/scaleNames.test.js`

## Known Limitations

- `getScaleName(index)` supports non-negative scale indexes up to `1000`.
- The library uses American-style wording without the optional `and` connector (for example, `101` is rendered as `one hundred one`).
- Current conversion support is focused on integer numeric strings only.
- Reverse conversion (`nameToNumber.ts`) is planned but not implemented yet.
- There is no UI in this repository yet.

## Next Step

Build a minimal user interface with two tabs:
- `Number → Name`
- `Name → Number`

## Quick Start

### Prerequisites
- Node.js v18+ or later
- npm

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Project Structure

```
src/
  lib/
    scaleNames.ts
    numberWords.ts
    groupDigits.ts
    groupToWords.ts
    numberToName.ts
    # nameToNumber.ts is planned
tests/
  scaleNames.test.ts
package.json
tsconfig.json
```

## Available Scripts

```bash
npm run build   # Compile TypeScript to JavaScript
npm test        # Build and run tests
```

## Notes

This project is currently focused on the number-to-name conversion path. The next milestone is a minimal front end for bidirectional number/name conversion.
