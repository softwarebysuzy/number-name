import { groupToWords } from "../src/lib/groupToWords";

const cases: Array<[string, string]> = [
  ["0", ""],
  ["00", ""],
  ["000", ""],
  ["7", "seven"],
  ["17", "seventeen"],
  ["45", "forty-five"],
  ["40", "forty"],
  ["100", "one hundred"],
  ["105", "one hundred five"],
  ["117", "one hundred seventeen"],
  ["450", "four hundred fifty"],
  ["456", "four hundred fifty-six"],
  ["007", "seven"],
  ["070", "seventy"],
  ["999", "nine hundred ninety-nine"],
];

for (const [input, expected] of cases) {
  const actual = groupToWords(input);
  if (actual !== expected) {
    throw new Error(`groupToWords(${JSON.stringify(input)}) expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
  }
}

const invalidCases: Array<[string, string]> = [
  ["1234", "Invalid group: must be 1-3 digits"],
  ["12a", "Invalid group: must contain only digits"],
];

for (const [input, expectedMessage] of invalidCases) {
  let threw = false;
  try {
    groupToWords(input);
  } catch (error) {
    threw = true;
    if (!(error instanceof Error) || error.message !== expectedMessage) {
      throw new Error(`groupToWords(${JSON.stringify(input)}) expected throw message ${JSON.stringify(expectedMessage)} got ${JSON.stringify(error instanceof Error ? error.message : error)}`);
    }
  }
  if (!threw) {
    throw new Error(`groupToWords(${JSON.stringify(input)}) did not throw`);
  }
}

console.log("All groupToWords tests passed.");
