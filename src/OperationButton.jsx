import React from "react";
export default function OperationButton({operation, chooseOperation}) {
  return (
    <button onClick={() => chooseOperation(operation)}
    >
      {operation}
    </button>
  );
}
