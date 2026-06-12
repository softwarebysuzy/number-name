function withOverline(symbol: string): string {
  const overline = "\u0305";
  return symbol.split("").map((char) => `${char}${overline}`).join("");
}

const romanPairs: Array<[number, string]> = [
  [1000000, withOverline("M")],
  [900000, withOverline("CM")],
  [500000, withOverline("D")],
  [400000, withOverline("CD")],
  [100000, withOverline("C")],
  [90000, withOverline("XC")],
  [50000, withOverline("L")],
  [40000, withOverline("XL")],
  [10000, withOverline("X")],
  [9000, withOverline("IX")],
  [5000, withOverline("V")],
  [4000, withOverline("IV")],
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function numberToRomanNumerals(numStr: string): string {
  const sanitized = numStr.replace(/,/g, "").trim();

  if (!/^[0-9]+$/.test(sanitized)) {
    throw new Error("Input must be an integer digit string");
  }

  if (sanitized === "") {
    throw new Error("Input must be a non-empty integer string");
  }

  const value = Number(sanitized.replace(/^0+/, ""));
  if (Number.isNaN(value)) {
    throw new Error("Input must be an integer digit string");
  }

  if (value === 0) {
    throw new Error("Roman numerals cannot represent zero");
  }

  if (value > 3999999) {
    throw new Error("Maximum supported Roman numeral value is 3,999,999");
  }

  let remaining = value;
  let result = "";

  for (const [amount, numeral] of romanPairs) {
    while (remaining >= amount) {
      result += numeral;
      remaining -= amount;
    }
  }

  return result;
}

export default numberToRomanNumerals;
