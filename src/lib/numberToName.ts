import { groupDigits } from "./groupDigits";
import { groupToWords } from "./groupToWords";
import { getScaleName } from "./scaleNames";

export function numberToName(numStr: string): string {
  const groups = groupDigits(numStr);

  if (groups.length === 1 && groups[0] === "0") {
    return "zero";
  }

  const parts: string[] = [];
  const totalGroups = groups.length;

  groups.forEach((group, index) => {
    const words = groupToWords(group);
    if (!words) {
      return;
    }

    const scaleIndex = totalGroups - 1 - index;
    const scaleName = scaleIndex === 0 ? "" : getScaleName(scaleIndex);
    parts.push(scaleName ? `${words} ${scaleName}` : words);
  });

  return parts.join(" ");
}
