import { getScaleName } from "../src/lib/scaleNames";

type TestCase = [number, string];

const positiveCases: TestCase[] = [
  [0, ""],
  [1, "thousand"],
  [2, "million"],
  [3, "billion"],
  [4, "trillion"],
  [5, "quadrillion"],
  [11, "decillion"],
  [12, "undecillion"],
  [21, "vigintillion"],
  [22, "unvigintillion"],
  [24, "trevigintillion"],
  [101, "centillion"],
];

for (const [index, expected] of positiveCases) {
  const actual = getScaleName(index);
  if (actual !== expected) {
    throw new Error(`Expected getScaleName(${index}) === "${expected}", got "${actual}"`);
  }
}

const negativeCases: Array<() => void> = [
  () => getScaleName(-1),
  () => getScaleName(1.5),
];

for (const fn of negativeCases) {
  let threw = false;
  try {
    fn();
  } catch (error) {
    threw = true;
  }
  if (!threw) {
    throw new Error("Expected function to throw for invalid input");
  }
}

console.log("All scaleNames tests passed.");
