const COMBINING_OVERLINE = "\u0305";
const STANDARD_ROMAN_REGEX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

const basePairs: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

type RomanSegment = { letters: string; overlined: boolean };

function normalizeRomanInput(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

export function parseRomanSegments(value: string): RomanSegment[] {
  const normalized = normalizeRomanInput(value);
  const segments: RomanSegment[] = [];

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (ch === COMBINING_OVERLINE) {
      if (!segments.length) {
        throw new Error("Invalid Roman numeral format");
      }
      segments[segments.length - 1].overlined = true;
      continue;
    }

    if (!/[IVXLCDM]/.test(ch)) {
      throw new Error("Invalid Roman numeral character");
    }

    const isOverlined = normalized[i + 1] === COMBINING_OVERLINE;
    if (segments.length && segments[segments.length - 1].overlined === isOverlined) {
      segments[segments.length - 1].letters += ch;
    } else {
      segments.push({ letters: ch, overlined: isOverlined });
    }

    if (isOverlined) {
      i += 1;
    }
  }

  return segments;
}

function validateRomanGroup(group: string): string {
  const normalized = normalizeRomanInput(group);
  if (normalized.length === 0) {
    throw new Error("Roman numeral group cannot be empty");
  }
  if (!STANDARD_ROMAN_REGEX.test(normalized)) {
    throw new Error("Invalid Roman numeral section");
  }
  return normalized;
}

function parseRomanGroupValue(group: string): number {
  let remaining = group;
  let value = 0;

  for (const [amount, letters] of basePairs) {
    while (remaining.startsWith(letters)) {
      value += amount;
      remaining = remaining.slice(letters.length);
    }
  }

  if (remaining.length > 0) {
    throw new Error("Invalid Roman numeral section");
  }

  return value;
}

export function romanToNumber(romanStr: string): string {
  const normalized = romanStr.trim();
  if (normalized.length === 0) {
    throw new Error("Roman numerals cannot represent an empty value");
  }

  const segments = parseRomanSegments(normalized);
  if (segments.length === 0) {
    throw new Error("Roman numerals cannot represent an empty value");
  }

  let total = 0;
  for (const segment of segments) {
    if (!segment.letters) {
      continue;
    }
    const validated = validateRomanGroup(segment.letters);
    const amount = parseRomanGroupValue(validated);
    total += segment.overlined ? amount * 1000 : amount;
  }

  if (total === 0) {
    throw new Error("Roman numerals cannot represent zero");
  }
  if (total > 3999999) {
    throw new Error("Maximum supported value is 3,999,999");
  }

  return total.toString();
}

export default romanToNumber;
