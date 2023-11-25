import React from 'react'
 
export default function DigitButton({digit, addDigit}) {
  return (
    <button onClick={() => addDigit(digit)}>
      {digit}
    </button>
  )
}
