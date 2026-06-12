export function numberToSCNotation(numStr: string): string {
  // Normalize: remove commas and leading zeros
  const sanitized = numStr.replace(/,/g, "").trim().replace(/^0+/, "");

  if (sanitized === "") {
    // treat as zero
    return "0.0 E 0";
  }

  if (!/^[0-9]+$/.test(sanitized)) {
    throw new Error("Input must be an integer digit string");
  }

  if (sanitized === "0") {
    return "0.0 E 0";
  }

  const len = sanitized.length;
  const leading = sanitized[0];
  let fraction = sanitized.slice(1); // may be empty
  const exponent = len - 1;

  // Remove trailing zeros from fraction but keep at least one digit
  fraction = fraction.replace(/0+$/g, "");
  if (fraction === "") {
    fraction = "0";
  }

  return `${leading}.${fraction} E ${exponent}`;
}

export default numberToSCNotation;
