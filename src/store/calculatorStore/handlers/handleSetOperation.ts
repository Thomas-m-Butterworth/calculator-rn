import { isLastEntryOperator } from "@/src/utils";
import { OperatorHandlerProps } from "../types";
import { performCalculation } from "../utils";

export const handleSetOperation = ({ set, get, op }: OperatorHandlerProps) => {
  const {
    calculationHistory,
    displayValue,
    firstOperand,
    operation,
    isExpressionComplete,
  } = get();
  const inputValue = parseFloat(displayValue);
  const isEmptyPositive = displayValue === "0" && op !== "-";
  const isEmptyNegative = displayValue === "0" && op === "-";
  const isDisplayedNegative = displayValue === "-";

  if (isEmptyNegative) {
    set({
      displayValue: "-",
      calculationHistory: [...calculationHistory, "-"],
    });
    return;
  }

  if (isDisplayedNegative || isEmptyPositive || isExpressionComplete) return;

  if (isLastEntryOperator(calculationHistory)) return;

  if (firstOperand === null) {
    set({
      firstOperand: inputValue,
      waitingForSecondOperand: true,
      operation: op,
      calculationHistory: [...calculationHistory, op],
    });
  } else if (operation) {
    const result = performCalculation(firstOperand, inputValue, operation);
    set({
      firstOperand: result,
      waitingForSecondOperand: true,
      operation: op,
      calculationHistory: [...calculationHistory, op],
      displayValue: result.toString(),
    });
  }
};
