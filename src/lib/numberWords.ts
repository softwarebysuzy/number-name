export const ones: string[] = [
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

export const teens: string[] = [
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

export const tens: string[] = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

export const hundredWord = "hundred";
export const useAnd = false; // American-style: "one hundred one"

export const wordToOnes: Record<string, number> = Object.fromEntries(
  ones.map((word, index) => [word, index])
) as Record<string, number>;

export const wordToTeens: Record<string, number> = Object.fromEntries(
  teens.map((word, index) => [word, 10 + index])
) as Record<string, number>;

export const wordToTens: Record<string, number> = Object.fromEntries(
  tens.map((word, index) => [word, index * 10]).filter(([word]) => word !== "")
) as Record<string, number>;

export const wordToHundred: Record<string, number> = {
  [hundredWord]: 100,
};

// Note: callers that build multi-group names should not use ones[0] for
// internal groups. For example, "one thousand zero hundred" is invalid.
// Zero should be handled as a special case at the top-level number conversion.
