import { numberToSCNotation } from "../src/lib/numberToSC";

const cases: Array<[string, string]> = [
  ["0", "0.0 E 0"],
  ["1", "1.0 E 0"],
  ["12", "1.2 E 1"],
  ["1234", "1.234 E 3"],
  ["1200", "1.2 E 3"],
  ["1000", "1.0 E 3"],
  ["1000000", "1.0 E 6"],
  ["1002000", "1.002 E 6"],
  ["0001234000", "1.234 E 6"],
];

for (const [input, expected] of cases) {
  const actual = numberToSCNotation(input);
  if (actual !== expected) {
    throw new Error(`numberToSCNotation(${JSON.stringify(input)}) expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
  }
}

console.log("All numberToSCNotation tests passed.");
