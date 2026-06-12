import { numberToRomanNumerals } from "../src/lib/numberToRomanNumerals";

function expectEqual(actual: string, expected: string): void {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}`);
  }
}

function expectThrows(fn: () => void, message: string): void {
  try {
    fn();
  } catch (error) {
    if (error instanceof Error && error.message === message) {
      return;
    }
    throw new Error(`Expected error message '${message}', got '${error instanceof Error ? error.message : error}'`);
  }
  throw new Error(`Expected error '${message}', but no exception was thrown`);
}

expectEqual(numberToRomanNumerals("1"), "I");
expectEqual(numberToRomanNumerals("4"), "IV");
expectEqual(numberToRomanNumerals("9"), "IX");
expectEqual(numberToRomanNumerals("58"), "LVIII");
const overline = "\u0305";
expectEqual(numberToRomanNumerals("1994"), "MCMXCIV");
expectEqual(numberToRomanNumerals("4000"), `I${overline}V${overline}`);
expectEqual(numberToRomanNumerals("10000"), `X${overline}`);
expectEqual(
  numberToRomanNumerals("3999999"),
  `M${overline}M${overline}M${overline}C${overline}M${overline}X${overline}C${overline}I${overline}X${overline}CMXCIX`
);

expectThrows(() => numberToRomanNumerals("0"), "Roman numerals cannot represent zero");
expectThrows(() => numberToRomanNumerals("4000000"), "Maximum supported Roman numeral value is 3,999,999");
expectThrows(() => numberToRomanNumerals("12.3"), "Input must be an integer digit string");
expectThrows(() => numberToRomanNumerals("abc"), "Input must be an integer digit string");

console.log("numberToRomanNumerals tests passed");
