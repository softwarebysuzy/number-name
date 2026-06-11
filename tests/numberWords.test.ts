import {
  ones,
  teens,
  tens,
  hundredWord,
  useAnd,
  wordToOnes,
  wordToTeens,
  wordToTens,
  wordToHundred,
} from "../src/lib/numberWords";

if (ones.length !== 10) {
  throw new Error("Expected ones to have length 10");
}
if (teens.length !== 10) {
  throw new Error("Expected teens to have length 10");
}
if (tens.length !== 10) {
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
  if (ones[i] !== expectedOnes[i]) {
    throw new Error(`ones[${i}] expected ${expectedOnes[i]} got ${ones[i]}`);
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
  if (teens[i] !== expectedTeens[i]) {
    throw new Error(`teens[${i}] expected ${expectedTeens[i]} got ${teens[i]}`);
  }
}

if (tens[2] !== "twenty" || tens[3] !== "thirty" || tens[9] !== "ninety") {
  throw new Error("Tens table values are incorrect");
}

if (hundredWord !== "hundred") {
  throw new Error("hundredWord should be 'hundred'");
}
if (useAnd !== false) {
  throw new Error("useAnd should be false for American style");
}

if (wordToOnes.one !== 1 || wordToOnes.zero !== 0 || wordToOnes.nine !== 9) {
  throw new Error("wordToOnes mapping is incorrect");
}
if (wordToTeens.twelve !== 12 || wordToTeens.nineteen !== 19) {
  throw new Error("wordToTeens mapping is incorrect");
}
if (wordToTens.twenty !== 20 || wordToTens.ninety !== 90) {
  throw new Error("wordToTens mapping is incorrect");
}
if (wordToHundred.hundred !== 100) {
  throw new Error("wordToHundred mapping is incorrect");
}

console.log("All numberWords tests passed.");
