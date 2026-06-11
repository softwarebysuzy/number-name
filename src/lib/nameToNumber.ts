import { getScaleName } from "./scaleNames";
import {
  wordToOnes,
  wordToTeens,
  wordToTens,
  wordToHundred,
} from "./numberWords";

const scaleNameToValue: Map<string, bigint> = new Map(
  Array.from({ length: 1000 }, (_, index) => {
    const scaleIndex = index + 1;
    const scaleName = getScaleName(scaleIndex);
    const scaleValue = 10n ** BigInt(scaleIndex * 3);
    return [scaleName, scaleValue];
  })
);

const validWordSet = new Set<string>([
  ...Object.keys(wordToOnes),
  ...Object.keys(wordToTeens),
  ...Object.keys(wordToTens),
  ...Object.keys(wordToHundred),
  ...scaleNameToValue.keys(),
]);

function normalizeInput(nameStr: string): string {
  return nameStr.trim().toLowerCase().replace(/-/g, " ");
}

function parseWordValue(word: string): bigint | null {
  if (wordToOnes[word] !== undefined) {
    return BigInt(wordToOnes[word]);
  }
  if (wordToTeens[word] !== undefined) {
    return BigInt(wordToTeens[word]);
  }
  if (wordToTens[word] !== undefined) {
    return BigInt(wordToTens[word]);
  }
  if (wordToHundred[word] !== undefined) {
    return BigInt(wordToHundred[word]);
  }
  return null;
}

export function nameToNumber(nameStr: string): string {
  const normalized = normalizeInput(nameStr);
  if (normalized.length === 0) {
    throw new Error("Input must be a non-empty number name");
  }

  const tokens = normalized.split(/\s+/);

  if (tokens.length === 1 && tokens[0] === "zero") {
    return "0";
  }

  let total = 0n;
  let currentGroup = 0n;

  for (const rawToken of tokens) {
    if (!validWordSet.has(rawToken)) {
      throw new Error(`Unrecognized number name token: ${rawToken}`);
    }

    const scaleValue = scaleNameToValue.get(rawToken);
    if (scaleValue !== undefined) {
      if (currentGroup === 0n) {
        throw new Error(`Invalid number name structure: ${rawToken} has no leading value`);
      }
      total += currentGroup * scaleValue;
      currentGroup = 0n;
      continue;
    }

    const value = parseWordValue(rawToken);
    if (value === null) {
      throw new Error(`Unrecognized number name token: ${rawToken}`);
    }

    if (value === 100n) {
      if (currentGroup === 0n) {
        throw new Error("Invalid number name structure: 'hundred' must follow a digit");
      }
      currentGroup *= 100n;
      continue;
    }

    currentGroup += value;
  }

  total += currentGroup;

  if (total === 0n) {
    throw new Error("Invalid number name input");
  }

  return total.toString();
}
