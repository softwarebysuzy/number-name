import { numberToName } from "./numberToName";

const SC_NOTATION_REGEX = /^([1-9])\.([0-9]+)\s*[Ee]\s*([0-9]+)$/;

export function scNotationToNumber(scNotation: string): string {
  const trimmed = scNotation.trim();
  const match = trimmed.match(SC_NOTATION_REGEX);

  if (!match) {
    throw new Error(
      "Invalid scientific notation format. Expected one digit, one decimal point, digits after the decimal, optional spaces around E, and an unsigned integer exponent."
    );
  }

  const [, leadingDigit, fraction, exponentText] = match;
  const exponent = Number(exponentText);

  if (Number.isNaN(exponent)) {
    throw new Error("Exponent must be a non-negative integer.");
  }

  const fractionLength = fraction.length;
  if (exponent < fractionLength) {
    throw new Error(
      "Scientific notation must resolve to an integer. Exponent must be greater than or equal to the number of digits after the decimal."
    );
  }

  const normalized = leadingDigit + fraction;
  const zerosToAdd = exponent - fractionLength;
  return normalized + "0".repeat(zerosToAdd);
}

export function scNotationToName(scNotation: string): string {
  const numberString = scNotationToNumber(scNotation);
  return numberToName(numberString);
}
