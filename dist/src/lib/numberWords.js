"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordToHundred = exports.wordToTens = exports.wordToTeens = exports.wordToOnes = exports.useAnd = exports.hundredWord = exports.tens = exports.teens = exports.ones = void 0;
exports.ones = [
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
exports.teens = [
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
exports.tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
];
exports.hundredWord = "hundred";
exports.useAnd = false; // American-style: "one hundred one"
exports.wordToOnes = Object.fromEntries(exports.ones.map((word, index) => [word, index]));
exports.wordToTeens = Object.fromEntries(exports.teens.map((word, index) => [word, 10 + index]));
exports.wordToTens = Object.fromEntries(exports.tens.map((word, index) => [word, index * 10]).filter(([word]) => word !== ""));
exports.wordToHundred = {
    [exports.hundredWord]: 100,
};
// Note: callers that build multi-group names should not use ones[0] for
// internal groups. For example, "one thousand zero hundred" is invalid.
// Zero should be handled as a special case at the top-level number conversion.
