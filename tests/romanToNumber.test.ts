import { romanToNumber } from "../src/lib/romanToNumber";

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

const overline = "\u0305";

expectEqual(romanToNumber("I"), "1");
expectEqual(romanToNumber("IV"), "4");
expectEqual(romanToNumber("IX"), "9");
expectEqual(romanToNumber("LVIII"), "58");
expectEqual(romanToNumber("MCMXCIV"), "1994");
expectEqual(romanToNumber(`I${overline}V${overline}`), "4000");
expectEqual(romanToNumber(`X${overline}`), "10000");
expectEqual(romanToNumber(`M${overline}M${overline}M${overline}C${overline}M${overline}X${overline}C${overline}I${overline}X${overline}CMXCIX`), "3999999");

expectThrows(() => romanToNumber(""), "Roman numerals cannot represent an empty value");
expectThrows(() => romanToNumber("ABC"), "Invalid Roman numeral character");

console.log("romanToNumber tests passed");
