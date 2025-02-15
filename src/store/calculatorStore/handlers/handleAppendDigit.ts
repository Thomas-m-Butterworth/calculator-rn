import { NumberHandlerProps } from "../types";

export const handleAppendDigit = ({ set, get, num }: NumberHandlerProps) => {
  const {
    displayValue,
    waitingForSecondOperand,
    calculationHistory,
    isExpressionComplete,
  } = get();
  const emptyDisplay = displayValue === "0";
  const updatedDisplay = emptyDisplay ? num : displayValue + num;
  const updatedHistory = [...calculationHistory, num];

  if (isExpressionComplete) {
    set({
      displayValue: num,
      isExpressionComplete: false,
      calculationHistory: updatedHistory,
    });
    return;
  }

  if (waitingForSecondOperand) {
    set({
      displayValue: num,
      waitingForSecondOperand: false,
      calculationHistory: updatedHistory,
    });
  } else {
    set({
      displayValue: updatedDisplay,
      calculationHistory: updatedHistory,
    });
  }
};
