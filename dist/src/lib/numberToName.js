"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToName = numberToName;
const groupDigits_1 = require("./groupDigits");
const groupToWords_1 = require("./groupToWords");
const scaleNames_1 = require("./scaleNames");
function numberToName(numStr) {
    const groups = (0, groupDigits_1.groupDigits)(numStr);
    if (groups.length === 1 && groups[0] === "0") {
        return "zero";
    }
    const parts = [];
    const totalGroups = groups.length;
    groups.forEach((group, index) => {
        const words = (0, groupToWords_1.groupToWords)(group);
        if (!words) {
            return;
        }
        const scaleIndex = totalGroups - 1 - index;
        const scaleName = scaleIndex === 0 ? "" : (0, scaleNames_1.getScaleName)(scaleIndex);
        parts.push(scaleName ? `${words} ${scaleName}` : words);
    });
    return parts.join(" ");
}
