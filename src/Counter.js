import React, { useState } from "react";
import "./App.css";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1 className="greeting">Counter App</h1>
      <p className="weather-info">Count: {count}</p>
      <button
        onClick={decrement}
        style={{
          backgroundColor: "#cbcbcb",
          color: "#000",
          border: "none",
          padding: "10px",
          borderRadius: "20px",
          marginRight: "10px",
        }}
      >
        Decrement
      </button>
      <button
        onClick={increment}
        style={{
          backgroundColor: "#cbcbcb",
          color: "#000",
          border: "none",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        Increment
      </button>
    </div>
  );
};
