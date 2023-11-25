import { useState, useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

function App() {
  const [calc, setCalc] = useState({
    currentOperand: "",
    previousOperand: "",
    operation: undefined,
    overwrite: false,
  });

  function addDigit(digit) {
    setCalc((prevData) => {
      if (prevData.overwrite) {
        return {
          ...prevData,
          overwrite: false,
          currentOperand: `${
            prevData.currentOperand ? "" : prevData.currentOperand
          }${digit}`,
          previousOperand: null,
        };
      }
      if (digit === "." && prevData.currentOperand.includes("."))
        return prevData;
      return {
        ...prevData,
        currentOperand: `${prevData.currentOperand || ""}${digit}`,
      };
    });
  }
  console.log(calc);
  function chooseOperation(operation) {
    setCalc((prevData) => {
      if (prevData.previousOperand && prevData.currentOperand) {
        return {
          ...prevData,
          previousOperand: evaluate(prevData),
          currentOperand: null,
          operation: operation,
        };
      }
      if (
        prevData.previousOperand &&
        !prevData.currentOperand &&
        prevData.operation
      ) {
        return {
          ...prevData,
          operation: operation,
        };
      }
      //if the calc if initiated and there are still no operand, you cannot choose an operation
      if (!prevData.currentOperand && !prevData.previousOperand) {
        return { ...prevData };
      }
      return {
        ...prevData,
        previousOperand: prevData.currentOperand,
        currentOperand: "",
        operation: operation,
        overwrite: false,
      };
    });
  }

  function evaluate({ previousOperand, currentOperand, operation }) {
    let prev = Number(previousOperand);
    let current = Number(currentOperand);
    let result = "";
    if (isNaN(prev) || isNaN(current)) return "";
    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "/":
        result = prev / current;
        break;
      case "*":
        result = prev * current;
        break;
    }
    return result.toString();
  }

  function calculate() {
    setCalc((prevData) => {
      if (
        !prevData.previousOperand ||
        !prevData.currentOperand ||
        !prevData.operation
      ) {
        return prevData;
      }
      return {
        ...prevData,
        overwrite: true,
        currentOperand: evaluate(prevData),
        previousOperand: null,
        operation: undefined,
      };
    });
  }

  function deleteDigit() {
    setCalc((prevData) => {
      return {
        ...prevData,
        currentOperand: prevData.currentOperand.slice(0, -1),
      };
    });
  }

  function clearState() {
    setCalc({
      currentOperand: "",
      previousOperand: "",
      operation: undefined,
    });
  }

  return (
    <div className="calculator-container">
      <div className="output">
        <div className="previous-operand">
          {calc.previousOperand}
          {calc.operation}
        </div>
        <div className="current-operand">{calc.currentOperand}</div>
      </div>
      <button onClick={deleteDigit}>Del</button>
      <button onClick={clearState} className="span-two">
        C
      </button>
      <OperationButton chooseOperation={chooseOperation} operation="*" />
      <DigitButton addDigit={addDigit} digit="7" />
      <DigitButton addDigit={addDigit} digit="8" />
      <DigitButton addDigit={addDigit} digit="9" />
      <OperationButton chooseOperation={chooseOperation} operation="/" />
      <DigitButton addDigit={addDigit} digit="4" />
      <DigitButton addDigit={addDigit} digit="5" />
      <DigitButton addDigit={addDigit} digit="6" />
      <OperationButton chooseOperation={chooseOperation} operation="+" />
      <DigitButton addDigit={addDigit} digit="1" />
      <DigitButton addDigit={addDigit} digit="2" />
      <DigitButton addDigit={addDigit} digit="3" />
      <OperationButton chooseOperation={chooseOperation} operation="-" />
      <DigitButton addDigit={addDigit} digit="0" />
      <DigitButton addDigit={addDigit} digit="." />
      <button onClick={() => calculate()} className="span-two">
        =
      </button>
    </div>
  );
}

export default App;
