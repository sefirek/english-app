import { useState } from "react";
import "./Counter.css";

export default function Counter({ max, onChange }) {
  const [counter, setCounter] = useState(0);

  const toFirst = () => {
    setCounter(0);
    onChange?.(0);
  };

  const toLast = () => {
    setCounter(max - 1);
    onChange?.(max - 1);
  };

  const increment = () => {
    if (counter !== max - 1) {
      setCounter(counter + 1);
      onChange?.(counter + 1);
    }
  };

  const decrement = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
      onChange?.(counter - 1);
    }
  };

  return (
    <div className="counter-wrapper">
      <button className="counter-button" onClick={toFirst}>
        &lt;&lt;
      </button>
      <button className="counter-button" onClick={decrement}>
        -
      </button>
      <span className="counter-counter">{counter + 1}</span>
      <button className="counter-button" onClick={increment}>
        +
      </button>
      <button className="counter-button" onClick={toLast}>
        &gt;&gt;
      </button>
    </div>
  );
}
