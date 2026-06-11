"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameToNumber = nameToNumber;
const scaleNames_1 = require("./scaleNames");
const numberWords_1 = require("./numberWords");
const scaleNameToValue = new Map(Array.from({ length: 1000 }, (_, index) => {
    const scaleIndex = index + 1;
    const scaleName = (0, scaleNames_1.getScaleName)(scaleIndex);
    const scaleValue = 10n ** BigInt(scaleIndex * 3);
    return [scaleName, scaleValue];
}));
const validWordSet = new Set([
    ...Object.keys(numberWords_1.wordToOnes),
    ...Object.keys(numberWords_1.wordToTeens),
    ...Object.keys(numberWords_1.wordToTens),
    ...Object.keys(numberWords_1.wordToHundred),
    ...scaleNameToValue.keys(),
]);
function normalizeInput(nameStr) {
    return nameStr.trim().toLowerCase().replace(/-/g, " ");
}
function parseWordValue(word) {
    if (numberWords_1.wordToOnes[word] !== undefined) {
        return BigInt(numberWords_1.wordToOnes[word]);
    }
    if (numberWords_1.wordToTeens[word] !== undefined) {
        return BigInt(numberWords_1.wordToTeens[word]);
    }
    if (numberWords_1.wordToTens[word] !== undefined) {
        return BigInt(numberWords_1.wordToTens[word]);
    }
    if (numberWords_1.wordToHundred[word] !== undefined) {
        return BigInt(numberWords_1.wordToHundred[word]);
    }
    return null;
}
function nameToNumber(nameStr) {
    const normalized = normalizeInput(nameStr);
    if (normalized.length === 0) {
        throw new Error("Input must be a non-empty number name");
    }
    const tokens = normalized.split(/\s+/);
    if (tokens.length === 1 && tokens[0] === "zero") {
        return "0";
    }
    let total = 0n;
    let currentGroup = 0n;
    for (const rawToken of tokens) {
        if (!validWordSet.has(rawToken)) {
            throw new Error(`Unrecognized number name token: ${rawToken}`);
        }
        const scaleValue = scaleNameToValue.get(rawToken);
        if (scaleValue !== undefined) {
            if (currentGroup === 0n) {
                throw new Error(`Invalid number name structure: ${rawToken} has no leading value`);
            }
            total += currentGroup * scaleValue;
            currentGroup = 0n;
            continue;
        }
        const value = parseWordValue(rawToken);
        if (value === null) {
            throw new Error(`Unrecognized number name token: ${rawToken}`);
        }
        if (value === 100n) {
            if (currentGroup === 0n) {
                throw new Error("Invalid number name structure: 'hundred' must follow a digit");
            }
            currentGroup *= 100n;
            continue;
        }
        currentGroup += value;
    }
    total += currentGroup;
    if (total === 0n) {
        throw new Error("Invalid number name input");
    }
    return total.toString();
}
