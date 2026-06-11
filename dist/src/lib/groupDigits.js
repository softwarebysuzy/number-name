"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupDigits = groupDigits;
function stripLeadingZeros(numStr) {
    const stripped = numStr.replace(/^0+/, "");
    return stripped === "" ? "0" : stripped;
}
function validateInput(numStr) {
    if (numStr.length === 0) {
        throw new Error("Input must be a non-empty digit string");
    }
    if (!/^[0-9]+$/.test(numStr)) {
        throw new Error("Input must contain only digits");
    }
}
function groupDigits(numStr) {
    validateInput(numStr);
    const normalized = stripLeadingZeros(numStr);
    if (normalized === "0") {
        return ["0"];
    }
    const groups = [];
    let remaining = normalized;
    while (remaining.length > 3) {
        const group = remaining.slice(-3);
        groups.unshift(group);
        remaining = remaining.slice(0, -3);
    }
    groups.unshift(remaining);
    return groups;
}
