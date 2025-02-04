import { CalculationHandlerProps } from "../types";

export const handleRemoveDigit = ({ set, get }: CalculationHandlerProps) => {
  const { displayValue, calculationHistory } = get();

  if (displayValue.length <= 1) {
    set({
      displayValue: "0",
      calculationHistory: [],
    });
  } else {
    const newDisplay = displayValue.slice(0, -1);
    const newHistory = calculationHistory.slice(0, -1);
    set({
      displayValue: newDisplay,
      calculationHistory: newHistory,
    });
  }
};
