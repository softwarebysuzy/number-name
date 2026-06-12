export function normalizeHexInput(value: string): string {
  return value.toUpperCase().trim();
}

export function sanitizeHexInput(value: string): string {
  return value.replace(/[\s.,]/g, "");
}

export function hexToNumber(hexValue: string): string {
  const sanitized = sanitizeHexInput(normalizeHexInput(hexValue));

  if (sanitized === "") {
    throw new Error("Empty hexadecimal input is not supported");
  }

  if (!/^[0-9A-F]*$/.test(sanitized)) {
    throw new Error("Hexadecimal input must contain only digits 0-9 and letters A-F.");
  }

  const numeric = BigInt(`0x${sanitized}`);
  return numeric.toString();
}

export function numberToHex(numStr: string): string {
  const sanitized = numStr.replace(/,/g, "").trim();

  if (!/^[0-9]+$/.test(sanitized)) {
    throw new Error("Number must contain only digits and commas.");
  }

  if (sanitized === "") {
    throw new Error("Input must be a non-empty integer string");
  }

  const value = BigInt(sanitized.replace(/^0+/, "") || "0");
  return value.toString(16).toUpperCase();
}
