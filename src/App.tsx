import { useState } from "react";
import headerImage from "./lib/SoftwareBySuzyBanner2.jpg";
import { numberToName } from "./lib/numberToName";
import { nameToNumber } from "./lib/nameToNumber";
import { scNotationToName, scNotationToNumber } from "./lib/scNotation";
import { numberToSCNotation } from "./lib/numberToSC";

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
  const [message, setMessage] = useState("");

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement> | null) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    setMessage("");

    const hasNumber = !isEmpty(numberValue);
    const hasName = !isEmpty(nameValue);
    const hasScNotation = !isEmpty(scNotationValue);

    if (!hasNumber && !hasName && !hasScNotation) {
      setMessage("Enter a number, a number name, or scientific notation to convert.");
      return;
    }

    const filledFields = [hasNumber, hasName, hasScNotation].filter(Boolean).length;
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
        setNameValue(convertedName);
        setScNotationValue(sc);
        setNumberValue(formatNumberWithCommas(normalized));
      } else if (hasName) {
        const normalizedName = normalizeNameInput(nameValue);
        const convertedNumber = nameToNumber(normalizedName);
        const sc = numberToSCNotation(convertedNumber);
        setNumberValue(formatNumberWithCommas(convertedNumber));
        setScNotationValue(sc);
        setNameValue(nameValue.trim());
      } else {
        const normalized = normalizeScNotationInput(scNotationValue);
        const convertedNumber = scNotationToNumber(normalized);
        const convertedName = scNotationToName(normalized);
        setNumberValue(formatNumberWithCommas(convertedNumber));
        setNameValue(convertedName);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Conversion failed. Please check your input.");
      }
    }
  };

  const handleClear = () => {
    setNumberValue("");
    setNameValue("");
    setScNotationValue("");
    setMessage("");
  };

  const handleNumberInput = (value: string) => {
    if (!isEmpty(nameValue) || !isEmpty(scNotationValue)) {
      setNameValue("");
      setScNotationValue("");
      setMessage("");
    }

    const filtered = value.replace(/[^0-9,]/g, "");
    setNumberValue(filtered);
  };

  const handleNameInput = (value: string) => {
    if (!isEmpty(numberValue) || !isEmpty(scNotationValue)) {
      setNumberValue("");
      setScNotationValue("");
      setMessage("");
    }

    const filtered = value.replace(/[^A-Za-z\s-]/g, "");
    setNameValue(filtered);
  };

  const handleScNotationInput = (value: string) => {
    if (!isEmpty(numberValue) || !isEmpty(nameValue)) {
      setNumberValue("");
      setNameValue("");
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

          <div className="button-row">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear} className="secondary">
              Clear
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
