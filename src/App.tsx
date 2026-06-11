import { useState } from "react";
import { numberToName } from "./lib/numberToName";
import { nameToNumber } from "./lib/nameToNumber";

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

const App = () => {
  const [numberValue, setNumberValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const hasNumber = !isEmpty(numberValue);
    const hasName = !isEmpty(nameValue);

    if (!hasNumber && !hasName) {
      setMessage("Enter a number or a number name to convert.");
      return;
    }

    if (hasNumber && hasName) {
      setNumberValue("");
      setNameValue("");
      setMessage("Please fill only one field at a time.");
      return;
    }

    try {
      if (hasNumber) {
        const normalized = stripCommas(numberValue);
        const convertedName = numberToName(normalized);
        setNameValue(convertedName);
        setNumberValue(formatNumberWithCommas(normalized));
        setMessage("");
      } else {
        const normalized = normalizeNameInput(nameValue);
        const convertedNumber = nameToNumber(normalized);
        setNumberValue(formatNumberWithCommas(convertedNumber));
        setNameValue(nameValue.trim());
        setMessage("");
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
    setMessage("");
  };

  return (
    <div className="app-shell">
      <div className="panel">
        <h1>Number Name Converter</h1>
        <p className="instructions">Enter an integer in one of the fields below (3003 digits max).</p>
        <form onSubmit={handleSubmit} className="form-grid">
          <label htmlFor="numberInput">Number</label>
          <textarea
            id="numberInput"
            value={numberValue}
            onChange={(event) => {
              if (!isEmpty(nameValue)) {
                setNameValue("");
              }
              // Allow only digits and commas
              const filtered = event.target.value.replace(/[^0-9,]/g, "");
              setNumberValue(filtered);
            }}
            placeholder="1234 or 1,234"
            rows={4}
            className="scrollable"
          />

          <label htmlFor="nameInput">Number Name</label>
          <textarea
            id="nameInput"
            value={nameValue}
            onChange={(event) => {
              if (!isEmpty(numberValue)) {
                setNumberValue("");
              }
              // Allow only letters, spaces, and hyphens
              const filtered = event.target.value.replace(/[^A-Za-z\s-]/g, "");
              setNameValue(filtered);
            }}
            placeholder="one thousand two hundred thirty-four"
            rows={8}
            className="scrollable"
          />

          <div className="button-row">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear} className="secondary">
              Clear
            </button>
          </div>
        </form>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default App;
