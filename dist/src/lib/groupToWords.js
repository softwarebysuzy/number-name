"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupToWords = groupToWords;
const numberWords_1 = require("./numberWords");
function validateGroup(group) {
    if (group.length < 1 || group.length > 3) {
        throw new Error("Invalid group: must be 1-3 digits");
    }
    if (!/^[0-9]+$/.test(group)) {
        throw new Error("Invalid group: must contain only digits");
    }
}
function digitValue(char) {
    return char.charCodeAt(0) - 48;
}
function twoDigitWords(group) {
    if (group.length === 1) {
        const digit = digitValue(group[0]);
        return digit === 0 ? "" : numberWords_1.ones[digit];
    }
    const tensDigit = digitValue(group[0]);
    const onesDigit = digitValue(group[1]);
    if (tensDigit === 0) {
        return onesDigit === 0 ? "" : numberWords_1.ones[onesDigit];
    }
    if (tensDigit === 1) {
        return numberWords_1.teens[onesDigit];
    }
    if (onesDigit === 0) {
        return numberWords_1.tens[tensDigit];
    }
    return `${numberWords_1.tens[tensDigit]}-${numberWords_1.ones[onesDigit]}`;
}
function groupToWords(group) {
    validateGroup(group);
    const normalized = group;
    if (/^0+$/.test(normalized)) {
        return "";
    }
    if (normalized.length < 3) {
        return twoDigitWords(normalized);
    }
    const hundredsDigit = digitValue(normalized[0]);
    const remainder = normalized.slice(1);
    const hundredsPart = hundredsDigit === 0 ? "" : `${numberWords_1.ones[hundredsDigit]} ${numberWords_1.hundredWord}`;
    const remainderPart = twoDigitWords(remainder);
    if (hundredsPart && remainderPart) {
        return `${hundredsPart} ${remainderPart}`;
    }
    return hundredsPart || remainderPart;
}
