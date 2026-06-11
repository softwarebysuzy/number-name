# PRD — Number Name Converter

## Project Overview

A lightweight TypeScript utility for converting integer numeric strings into English number names, with a future reverse conversion path from names back to numeric values.

This repository currently contains the core number-to-name engine and an initial scale name test. The next milestone is a minimal bidirectional UI.

---

## Problem Statement

Users need a dependable tool for converting numbers into English words and eventually the reverse process for typed number names.

This project reduces manual transcription errors and enables a consistent conversion experience.

---

## Target User / Customer

- Writers, editors, and learners who want accurate English number naming
- Developers needing a reusable number-to-name utility
- Anyone building a small conversion interface for numeric text

---

## Core Features

1. **Number → Name conversion** — Convert integer numeric strings into English words.
2. **Scale name generation** — Support large numbers with scale names through index `1000`.
3. **Modular library design** — Separate scale logic, group formatting, and naming rules.
4. **Build/test workflow** — Compile TypeScript and run automated tests with `npm test`.
5. **UI prototype** — Minimal interface for `Number → Name` and `Name → Number` flows.

---

## Out of Scope

- Decimal, fraction, and negative number support
- Non-English localization
- Full natural language parsing beyond standard numeric names
- Authentication, database, or deployment plumbing

---

## Success Metrics

- [ ] Integer numeric strings convert correctly to English names.
- [ ] Scale indexes from `0` through `1000` produce valid scale names.
- [ ] A minimal interface is available for both `Number → Name` and `Name → Number`.
- [ ] Tests pass on build and core conversion logic.

---

## Tech Stack

- **Frontend**: TypeScript
- **Backend**: Node.js
- **Database**: None
- **Authentication**: None
- **Hosting**: None
- **Package Manager**: npm
- **Language/Runtime**: Node.js + TypeScript

---

## Known Limitations

- Current support is limited to integers and scale name generation.
- Uses American-style naming without mandatory `and` (`101` → `one hundred one`).
- Reverse conversion via `nameToNumber.ts` is planned but not implemented.
- There is no UI yet; the next step is a simple tabbed interface.

---

## Current State

- Implemented modules:
  - `src/lib/scaleNames.ts`
  - `src/lib/numberWords.ts`
  - `src/lib/groupDigits.ts`
  - `src/lib/groupToWords.ts`
  - `src/lib/numberToName.ts`
- Planned module:
  - `src/lib/nameToNumber.ts`
- Tests:
  - `tests/scaleNames.test.ts`

---

## Build & Development Commands

```bash
npm install
npm run build
npm test
```

---

## Project Structure

```
src/
  lib/
    scaleNames.ts
    numberWords.ts
    groupDigits.ts
    groupToWords.ts
    numberToName.ts
tests/
  scaleNames.test.ts
package.json
tsconfig.json
```

---

## Next Step

Build the minimal UI with two tabs:
- `Number → Name`
- `Name → Number`

Then add reverse parsing support in `src/lib/nameToNumber.ts`.
