import { groupDigits } from "../src/lib/groupDigits";

const cases: Array<[string, string[]]> = [
  ["0", ["0"]],
  ["7", ["7"]],
  ["123", ["123"]],
  ["1234", ["1", "234"]],
  ["1234567", ["1", "234", "567"]],
  ["123456789", ["123", "456", "789"]],
  ["1000", ["1", "000"]],
  ["007", ["7"]],
  ["000", ["0"]],
  ["000123456", ["123", "456"]],
];

for (const [input, expected] of cases) {
  const actual = groupDigits(input);
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`groupDigits(${JSON.stringify(input)}) expected ${expectedJson} got ${actualJson}`);
  }
}

const invalidCases: Array<[string, string]> = [
  ["", "Input must be a non-empty digit string"],
  ["12a4", "Input must contain only digits"],
];

for (const [input, expectedMessage] of invalidCases) {
  let threw = false;
  try {
    groupDigits(input);
  } catch (error) {
    threw = true;
    if (!(error instanceof Error) || error.message !== expectedMessage) {
      throw new Error(`groupDigits(${JSON.stringify(input)}) throw message expected ${JSON.stringify(expectedMessage)} got ${JSON.stringify(error instanceof Error ? error.message : error)}`);
    }
  }
  if (!threw) {
    throw new Error(`groupDigits(${JSON.stringify(input)}) did not throw`);
  }
}

const longInput = "1".repeat(100);
const longResult = groupDigits(longInput);
if (longResult.length !== 34) {
  throw new Error(`Expected 34 groups for 100-digit input, got ${longResult.length}`);
}
if (longResult[0].length !== 1) {
  throw new Error(`Expected leftmost group length 1, got ${longResult[0].length}`);
}
for (let i = 1; i < longResult.length; i++) {
  if (longResult[i].length !== 3) {
    throw new Error(`Expected group ${i} length 3, got ${longResult[i].length}`);
  }
}

console.log("All groupDigits tests passed.");
