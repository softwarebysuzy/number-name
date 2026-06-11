"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScaleName = getScaleName;
const illionPrefixes = [
    "",
    "m",
    "b",
    "tr",
    "quadr",
    "quint",
    "sext",
    "sept",
    "oct",
    "non",
    "dec",
    "undec",
    "duodec",
    "tredec",
    "quattuordec",
    "quindec",
    "sexdec",
    "septendec",
    "octodec",
    "novemdec",
    "vigint",
    "unvigint",
    "duovigint",
    "trevigint",
    "quattuorvigint",
    "quinvigint",
    "sexvigint",
    "septenvigint",
    "octovigint",
    "novemvigint",
    "trigint",
    "untrigint",
    "duotrigint",
    "tretrigint",
    "quattuortrigint",
    "quintrigint",
    "sextrigint",
    "septentrigint",
    "octotrigint",
    "novemtrigint",
    "quadragint",
    "unquadragint",
    "duoquadragint",
    "trequadragint",
    "quattuorquadragint",
    "quinquadragint",
    "sexquadragint",
    "septenquadragint",
    "octoquadragint",
    "novemquadragint",
    "quinquagint",
    "unquinquagint",
    "duoquinquagint",
    "trequinquagint",
    "quattuorquinquagint",
    "quinquinquagint",
    "sexquinquagint",
    "septenquinquagint",
    "octoquinquagint",
    "novemquinquagint",
    "sexagint",
    "unsexagint",
    "duosexagint",
    "tresexagint",
    "quattuorsexagint",
    "quinsexagint",
    "sexsexagint",
    "septensexagint",
    "octosexagint",
    "novemsexagint",
    "septuagint",
    "unseptuagint",
    "duoseptuagint",
    "treseptuagint",
    "quattuorseptuagint",
    "quinseptuagint",
    "sexseptuagint",
    "septenseptuagint",
    "octoseptuagint",
    "novemseptuagint",
    "octogint",
    "unoctogint",
    "duooctogint",
    "treoctogint",
    "quattuoroctogint",
    "quinoctogint",
    "sexoctogint",
    "septenoctogint",
    "octooctogint",
    "novemoctogint",
    "nonagint",
    "unnonagint",
    "duononagint",
    "trenonagint",
    "quattuornonagint",
    "quinnonagint",
    "sexnonagint",
    "septennonagint",
    "octononagint",
    "novemnonagint",
];
const unitsComponent = [
    "",
    "un",
    "duo",
    "tre",
    "quattuor",
    "quin",
    "sex",
    "septen",
    "octo",
    "novem",
];
const teensComponent = [
    "dec",
    "undec",
    "duodec",
    "tredec",
    "quattuordec",
    "quindec",
    "sexdec",
    "septendec",
    "octodec",
    "novemdec",
];
const tensComponent = [
    "",
    "vigint",
    "trigint",
    "quadragint",
    "quinquagint",
    "sexagint",
    "septuagint",
    "octogint",
    "nonagint",
];
const hundredsComponent = [
    "",
    "centi",
    "ducenti",
    "trecenti",
    "quadringenti",
    "quingenti",
    "sescenti",
    "septingenti",
    "octingenti",
    "nongenti",
];
const hundredsExact = [
    "",
    "cent",
    "ducent",
    "trecent",
    "quadringent",
    "quingent",
    "sescent",
    "septingent",
    "octingent",
    "nongent",
];
function buildUnderHundredPrefix(n) {
    if (n < 0 || n >= 100) {
        throw new Error("Invalid under-hundred prefix value");
    }
    if (n < 10) {
        return unitsComponent[n];
    }
    if (n < 20) {
        return teensComponent[n - 10];
    }
    const tens = Math.floor(n / 10);
    const units = n % 10;
    if (units === 0) {
        return tensComponent[tens];
    }
    return `${unitsComponent[units]}${tensComponent[tens]}`;
}
function assertValidIndex(index) {
    if (!Number.isInteger(index) || index < 0) {
        throw new Error("Invalid scale index: must be a non-negative integer");
    }
}
function getScaleName(index) {
    assertValidIndex(index);
    if (index === 0) {
        return "";
    }
    if (index === 1) {
        return "thousand";
    }
    const n = index - 1;
    if (n < illionPrefixes.length) {
        return `${illionPrefixes[n]}illion`;
    }
    if (n < 1000) {
        const hundreds = Math.floor(n / 100);
        const remainder = n % 100;
        if (remainder === 0) {
            return `${hundredsExact[hundreds]}illion`;
        }
        const prefix = `${hundredsComponent[hundreds]}${buildUnderHundredPrefix(remainder)}`;
        return `${prefix}illion`;
    }
    throw new Error("Scale index too large: supported index range is 0–1000");
}
