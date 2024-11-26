import { Square, Divide, Plus, Minus, X } from "lucide-react";

interface CalculatorProps {
  onInput: (value: string) => void;
}

export function Calculator({ onInput }: CalculatorProps) {
  const buttons = [
    ["√", "÷", "7", "8", "9", "<>"],
    ["×", "-", "4", "5", "6", "+"],
    ["√x", ":", "1", "2", "3", "="],
    ["(", ")", ".", "0", ",", ";"],
  ];

  const handleClick = (value: string) => {
    onInput(value);
  };

  const getIcon = (value: string) => {
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
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
      <div className="grid grid-cols-6 gap-2">
        {buttons.map((row, i) =>
          row.map((btn, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClick(btn)}
              className={`${
                btn === "=" ? "col-span-1" : ""
              } h-12  flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-400 transition-colors text-gray-700 font-bold text-xl`}
            >
              {getIcon(btn)}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
