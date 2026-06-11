"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberWords_1 = require("../src/lib/numberWords");
if (numberWords_1.ones.length !== 10) {
    throw new Error("Expected ones to have length 10");
}
if (numberWords_1.teens.length !== 10) {
    throw new Error("Expected teens to have length 10");
}
if (numberWords_1.tens.length !== 10) {
    throw new Error("Expected tens to have length 10");
}
const expectedOnes = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];
for (let i = 0; i < expectedOnes.length; i++) {
    if (numberWords_1.ones[i] !== expectedOnes[i]) {
        throw new Error(`ones[${i}] expected ${expectedOnes[i]} got ${numberWords_1.ones[i]}`);
    }
}
const expectedTeens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
];
for (let i = 0; i < expectedTeens.length; i++) {
    if (numberWords_1.teens[i] !== expectedTeens[i]) {
        throw new Error(`teens[${i}] expected ${expectedTeens[i]} got ${numberWords_1.teens[i]}`);
    }
}
if (numberWords_1.tens[2] !== "twenty" || numberWords_1.tens[3] !== "thirty" || numberWords_1.tens[9] !== "ninety") {
    throw new Error("Tens table values are incorrect");
}
if (numberWords_1.hundredWord !== "hundred") {
    throw new Error("hundredWord should be 'hundred'");
}
if (numberWords_1.useAnd !== false) {
    throw new Error("useAnd should be false for American style");
}
if (numberWords_1.wordToOnes.one !== 1 || numberWords_1.wordToOnes.zero !== 0 || numberWords_1.wordToOnes.nine !== 9) {
    throw new Error("wordToOnes mapping is incorrect");
}
if (numberWords_1.wordToTeens.twelve !== 12 || numberWords_1.wordToTeens.nineteen !== 19) {
    throw new Error("wordToTeens mapping is incorrect");
}
if (numberWords_1.wordToTens.twenty !== 20 || numberWords_1.wordToTens.ninety !== 90) {
    throw new Error("wordToTens mapping is incorrect");
}
if (numberWords_1.wordToHundred.hundred !== 100) {
    throw new Error("wordToHundred mapping is incorrect");
}
console.log("All numberWords tests passed.");
