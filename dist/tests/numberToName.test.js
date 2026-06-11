"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberToName_1 = require("../src/lib/numberToName");
const cases = [
    ["0", "zero"],
    ["00", "zero"],
    ["7", "seven"],
    ["45", "forty-five"],
    ["100", "one hundred"],
    ["1000", "one thousand"],
    ["1234", "one thousand two hundred thirty-four"],
    ["1000000", "one million"],
    ["1000007", "one million seven"],
    ["1234567", "one million two hundred thirty-four thousand five hundred sixty-seven"],
    ["123456789", "one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine"],
    ["1000000000000", "one trillion"],
];
for (const [input, expected] of cases) {
    const actual = (0, numberToName_1.numberToName)(input);
    if (actual !== expected) {
        throw new Error(`numberToName(${JSON.stringify(input)}) expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
    }
}
console.log("All numberToName tests passed.");
