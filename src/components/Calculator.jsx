import "../styles/_calculator.scss";
import { Square, Divide, Plus, Minus, X } from "lucide-react";

export function Calculator({ onInput }) {
  const buttons = [
    ["√", "÷", "7", "8", "9", "<>"],
    ["×", "-", "4", "5", "6", "+"],
    ["√x", ":", "1", "2", "3", "="],
    ["(", ")", ".", "0", ",", ";"],
  ];

  const handleClick = (value) => {
    onInput(value);
  };

  const getIcon = (value) => {
    switch (value) {
      case "×":
        return <X size={20} />;
      case "÷":
        return <Divide size={20} />;
      case "+":
        return <Plus size={20} />;
      case "-":
        return <Minus size={20} />;
      case "√":
        return <Square size={20} />;
      default:
        return value;
    }
  };

  return (
    <div className="calculator">
      <div className="grid">
        {buttons.map((row, i) =>
          row.map((btn, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClick(btn)}
              className={btn === "=" ? "equals" : ""}
            >
              {getIcon(btn)}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
