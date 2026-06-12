import { hexToNumber, numberToHex } from "../src/lib/hex";

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

expectEqual(hexToNumber("1A"), "26");
expectEqual(hexToNumber("ff"), "255");
expectEqual(hexToNumber("0,1A"), "26");
expectEqual(hexToNumber("AB.C"), "2748");
expectEqual(hexToNumber(" a f "), "175");

expectThrows(() => hexToNumber("1G"), "Hexadecimal input must contain only digits 0-9 and letters A-F.");
expectThrows(() => hexToNumber(""), "Empty hexadecimal input is not supported");

expectEqual(numberToHex("26"), "1A");
expectEqual(numberToHex("255"), "FF");
expectEqual(numberToHex("00010"), "A");

console.log("hex tests passed");
