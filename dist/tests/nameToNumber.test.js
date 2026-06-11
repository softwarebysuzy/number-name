"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nameToNumber_1 = require("../src/lib/nameToNumber");
const cases = [
    ["zero", "0"],
    ["one", "1"],
    ["ten", "10"],
    ["twenty-one", "21"],
    ["one hundred one", "101"],
    ["one thousand two hundred thirty-four", "1234"],
    ["one million", "1000000"],
];
for (const [input, expected] of cases) {
    const actual = (0, nameToNumber_1.nameToNumber)(input);
    if (actual !== expected) {
        throw new Error(`Expected nameToNumber(${JSON.stringify(input)}) === ${expected}, got ${actual}`);
    }
}
console.log("All nameToNumber tests passed.");
