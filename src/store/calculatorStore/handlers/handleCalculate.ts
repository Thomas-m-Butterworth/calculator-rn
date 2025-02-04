import { createExpressionSring } from "@/src/utils";
import { CalculationHandlerProps } from "../types";
import { performCalculation } from "../utils";

export const handleCalculate = ({ set, get }: CalculationHandlerProps) => {
  const {
    calculationHistory,
    expressionHistory,
    firstOperand,
    displayValue,
    operation,
  } = get();
  if (firstOperand === null || !operation) return;

  const secondOperand = parseFloat(displayValue);
  const result = performCalculation(firstOperand, secondOperand, operation);
  const resultString = result.toString();
  const resultExpressionString = createExpressionSring(
    calculationHistory,
    resultString
  );

  set({
    displayValue: resultString,
    firstOperand: null,
    operation: null,
    waitingForSecondOperand: false,
    calculationHistory: [],
    expressionHistory: [resultExpressionString, ...expressionHistory],
    isExpressionComplete: true,
  });
};
