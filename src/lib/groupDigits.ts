function stripLeadingZeros(numStr: string): string {
  const stripped = numStr.replace(/^0+/, "");
  return stripped === "" ? "0" : stripped;
}

function validateInput(numStr: string): string {
  if (numStr.length === 0) {
    throw new Error("Input must be a non-empty digit string");
  }

  // Allow commas as thousands separators; strip them for further validation
  const sanitized = numStr.replace(/,/g, "").trim();

  if (sanitized.length === 0) {
    throw new Error("Input must contain digits");
  }

  if (!/^[0-9]+$/.test(sanitized)) {
    throw new Error("Input must contain only digits and optional commas");
  }

  return sanitized;
}

export function groupDigits(numStr: string): string[] {
  const sanitized = validateInput(numStr);
  const normalized = stripLeadingZeros(sanitized);
  if (normalized === "0") {
    return ["0"];
  }

  const groups: string[] = [];
  let remaining = normalized;

  while (remaining.length > 3) {
    const group = remaining.slice(-3);
    groups.unshift(group);
    remaining = remaining.slice(0, -3);
  }

  groups.unshift(remaining);
  return groups;
}
