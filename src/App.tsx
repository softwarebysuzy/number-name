import { useState, useRef } from "react";
import headerImage from "./lib/SoftwareBySuzyBanner2.jpg";
import { numberToName } from "./lib/numberToName";
import { nameToNumber } from "./lib/nameToNumber";
import { scNotationToName, scNotationToNumber } from "./lib/scNotation";
import { numberToSCNotation } from "./lib/numberToSC";
import { numberToRomanNumerals } from "./lib/numberToRomanNumerals";
import { romanToNumber } from "./lib/romanToNumber";

function formatNumberWithCommas(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function stripCommas(value: string): string {
  return value.replace(/,/g, "");
}

function isEmpty(value: string): boolean {
  return value.trim() === "";
}

function normalizeNameInput(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeScNotationInput(value: string): string {
  return value.trim();
}

const App = () => {
  const [numberValue, setNumberValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [scNotationValue, setScNotationValue] = useState("");
  const [romanValue, setRomanValue] = useState("");
  const [message, setMessage] = useState("");
  const romanRef = useRef<HTMLTextAreaElement | null>(null);
  const OVERLINE = "\u0305";
  const [romanHelp, setRomanHelp] = useState("Enter Roman numerals in the Roman field. Select a contiguous Roman substring and press Insert overline to apply a ×1,000 vinculum.");

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement> | null) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    setMessage("");

    const hasNumber = !isEmpty(numberValue);
    const hasName = !isEmpty(nameValue);
    const hasScNotation = !isEmpty(scNotationValue);
    const hasRoman = !isEmpty(romanValue);

    if (!hasNumber && !hasName && !hasScNotation && !hasRoman) {
      setMessage("Enter a number, a number name, scientific notation, or Roman numerals to convert.");
      return;
    }

    const filledFields = [hasNumber, hasName, hasScNotation, hasRoman].filter(Boolean).length;
    if (filledFields > 1) {
      setMessage("Please fill only one field at a time.");
      return;
    }

    try {
      if (hasNumber) {
        const normalized = stripCommas(numberValue);
        if (!/^[0-9]+$/.test(normalized)) {
          throw new Error("Number must contain only digits and commas.");
        }
        const convertedName = numberToName(normalized);
        const sc = numberToSCNotation(normalized);
        let roman = "";
        try {
          roman = numberToRomanNumerals(normalized);
        } catch (innerError) {
          if (innerError instanceof Error) {
            setMessage(innerError.message);
          } else {
            setMessage("Roman numerals conversion failed.");
          }
        }
        setNameValue(convertedName);
        setScNotationValue(sc);
        setRomanValue(roman);
        setNumberValue(formatNumberWithCommas(normalized));
      } else if (hasName) {
        const normalizedName = normalizeNameInput(nameValue);
        const convertedNumber = nameToNumber(normalizedName);
        const sc = numberToSCNotation(convertedNumber);
        let roman = "";
        try {
          roman = numberToRomanNumerals(convertedNumber);
        } catch (innerError) {
          if (innerError instanceof Error) {
            setMessage(innerError.message);
          } else {
            setMessage("Roman numerals conversion failed.");
          }
        }
        setNumberValue(formatNumberWithCommas(convertedNumber));
        setScNotationValue(sc);
        setRomanValue(roman);
        setNameValue(nameValue.trim());
      } else if (hasRoman) {
        const convertedNumber = romanToNumber(romanValue);
        const sc = numberToSCNotation(convertedNumber);
        const convertedName = numberToName(convertedNumber);
        setNumberValue(formatNumberWithCommas(convertedNumber));
        setScNotationValue(sc);
        setNameValue(convertedName);
        setRomanValue(romanValue.trim());
      } else {
        const normalized = normalizeScNotationInput(scNotationValue);
        const convertedNumber = scNotationToNumber(normalized);
        const convertedName = scNotationToName(normalized);
        let roman = "";
        try {
          roman = numberToRomanNumerals(convertedNumber);
        } catch (innerError) {
          if (innerError instanceof Error) {
            setMessage(innerError.message);
          } else {
            setMessage("Roman numerals conversion failed.");
          }
        }
        setNumberValue(formatNumberWithCommas(convertedNumber));
        setNameValue(convertedName);
        setRomanValue(roman);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Conversion failed. Please check your input.");
      }
    }
  };

  const handleRomanInput = (value: string) => {
    if (!isEmpty(numberValue) || !isEmpty(nameValue) || !isEmpty(scNotationValue)) {
      setNumberValue("");
      setNameValue("");
      setScNotationValue("");
      setMessage("");
    }

    const filtered = value.toUpperCase().replace(/[^IVXLCDM\u0305\s]/g, "");
    setRomanValue(filtered);
  };

  const insertRomanOverline = () => {
    if (!isEmpty(numberValue) || !isEmpty(nameValue) || !isEmpty(scNotationValue)) {
      setNumberValue("");
      setNameValue("");
      setScNotationValue("");
      setMessage("");
    }

    const el = romanRef.current;
    if (!el) return;

    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? start;
    if (start === end) {
      setMessage("Select a Roman substring to overline.");
      return;
    }

    const value = el.value;
    const selected = value.slice(start, end);
    const cleaned = selected.replace(new RegExp(OVERLINE, "g"), "");
    if (cleaned.length === 0) {
      setMessage("Select a Roman substring to overline.");
      return;
    }

    const before = value.slice(0, start);
    const after = value.slice(end);
    const overlined = cleaned.split("").map((ch) => ch + OVERLINE).join("");
    const nextValue = before + overlined + after;
    setRomanValue(nextValue);
    setMessage("");
    requestAnimationFrame(() => {
      el.focus();
      const pos = before.length + overlined.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const handleClear = () => {
    setNumberValue("");
    setNameValue("");
    setScNotationValue("");
    setRomanValue("");
    setMessage("");
  };

  const handleNumberInput = (value: string) => {
    if (!isEmpty(nameValue) || !isEmpty(scNotationValue) || !isEmpty(romanValue)) {
      setNameValue("");
      setScNotationValue("");
      setRomanValue("");
      setMessage("");
    }

    const filtered = value.replace(/[^0-9,]/g, "");
    setNumberValue(filtered);
  };

  const handleNameInput = (value: string) => {
    if (!isEmpty(numberValue) || !isEmpty(scNotationValue) || !isEmpty(romanValue)) {
      setNumberValue("");
      setScNotationValue("");
      setRomanValue("");
      setMessage("");
    }

    const filtered = value.replace(/[^A-Za-z\s-]/g, "");
    setNameValue(filtered);
  };

  const handleScNotationInput = (value: string) => {
    if (!isEmpty(numberValue) || !isEmpty(nameValue) || !isEmpty(romanValue)) {
      setNumberValue("");
      setNameValue("");
      setRomanValue("");
      setMessage("");
    }

    const raw = value;
    let filtered = raw.replace(/[^0-9Ee.\s]/g, "");

    const ePos = Math.max(filtered.indexOf("E"), filtered.indexOf("e"));
    let beforeE = ePos === -1 ? filtered : filtered.slice(0, ePos);
    const afterE = ePos === -1 ? "" : filtered.slice(ePos);
    const firstDot = beforeE.indexOf(".");
    if (firstDot !== -1) {
      beforeE = beforeE.slice(0, firstDot + 1) + beforeE.slice(firstDot + 1).replace(/\./g, "");
    }
    filtered = beforeE + afterE;
    setScNotationValue(filtered);
  };

  return (
    <div className="app-shell">
      <div className="panel">
        <img src={headerImage} alt="Software by Suzy banner" className="header-banner" />
        <h1>Number Name Converter</h1>
        <p className="instructions">Enter an integer in one of the fields below (3003 digits max).</p>
        <form onSubmit={handleSubmit} className="form-grid">
          <label htmlFor="numberInput">Number</label>
          <textarea
            id="numberInput"
            value={numberValue}
            onChange={(event) => handleNumberInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(null);
              }
            }}
            placeholder="1234 or 1,234"
            rows={4}
            className="scrollable"
          />

          <label htmlFor="nameInput">Number Name</label>
          <textarea
            id="nameInput"
            value={nameValue}
            onChange={(event) => handleNameInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(null);
              }
            }}
            placeholder="one thousand two hundred thirty-four"
            rows={8}
            className="scrollable"
          />

          <label htmlFor="scNotationInput">Scientific Notation</label>
          <textarea
            id="scNotationInput"
            value={scNotationValue}
            onChange={(event) => handleScNotationInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === ".") {
                const current = (event.target as HTMLTextAreaElement).value;
                const eIndex = Math.max(current.indexOf("E"), current.indexOf("e"));
                const beforeE = eIndex === -1 ? current : current.slice(0, eIndex);
                if (beforeE.includes(".")) {
                  event.preventDefault();
                }
              }
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(null);
              }
            }}
            onPaste={(event) => {
              event.preventDefault();
              const paste = event.clipboardData?.getData("text") || "";
              handleScNotationInput(paste);
            }}
            placeholder="1.23456789 E 147"
            rows={3}
            className="scrollable"
          />
          <p className="field-note">Format: one digit, a decimal point, digits after the decimal, optional spaces around E, and an unsigned exponent.</p>

          <label htmlFor="romanInput">Roman Numerals</label>
          <textarea
            id="romanInput"
            value={romanValue}
            ref={romanRef}
            onChange={(event) => handleRomanInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(null);
              }
            }}
            placeholder="e.g. IV or V̅ (overline = \u0305)"
            rows={2}
            className="scrollable"
          />
          <p className="field-note">{romanHelp}</p>

          <div className="button-row">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear} className="secondary">
              Clear
            </button>
            <button type="button" onClick={insertRomanOverline} className="overline-button">
              Insert overline
            </button>
          </div>
        </form>

        {message && <div className="message">{message}</div>}
        <div className="footer-note">Copyright 2026 Software by Suzy</div>
      </div>
    </div>
  );
};

export default App;
