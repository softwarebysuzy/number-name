import { scNotationToNumber, scNotationToName } from "../src/lib/scNotation";

const validNumberCases: Array<[string, string]> = [
  ["1.0E3", "1000"],
  ["1.234E5", "123400"],
  ["9.87654321E8", "987654321"],
  ["1.2345 E 6", "1234500"],
  ["7.0 e 2", "700"],
  ["9.87654321E9", "9876543210"],
];

for (const [input, expected] of validNumberCases) {
  const actual = scNotationToNumber(input);
  if (actual !== expected) {
    throw new Error(`scNotationToNumber(${JSON.stringify(input)}) expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
  }
}

const validNameCases: Array<[string, string]> = [
  ["1.0E3", "one thousand"],
  ["1.234E5", "one hundred twenty-three thousand four hundred"],
  ["7.0 e 2", "seven hundred"],
];

for (const [input, expected] of validNameCases) {
  const actual = scNotationToName(input);
  if (actual !== expected) {
    throw new Error(`scNotationToName(${JSON.stringify(input)}) expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
  }
}

const invalidCases: string[] = [
  "",                    // empty
  "1.23E-4",            // negative exponent
  "0.123E4",            // leading digit must be 1-9
  "1.23E4.5",           // invalid exponent
  "1.2.3E4",            // invalid format
  "1.E4",               // missing fraction digits
  "1.23 E 1",           // exponent too small for integer result
  "1.23 E +4",          // plus sign not allowed
  "1.23E",
  "1.23E 4 5",
];

for (const input of invalidCases) {
  let threw = false;
  try {
    scNotationToNumber(input);
  } catch (error) {
    threw = true;
    if (!(error instanceof Error)) {
      throw new Error(`Expected Error for input ${JSON.stringify(input)}, got ${String(error)}`);
    }
  }
  if (!threw) {
    throw new Error(`scNotationToNumber(${JSON.stringify(input)}) did not throw`);
  }
}

console.log("All scNotation tests passed.");
