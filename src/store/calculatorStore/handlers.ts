import { formatHistory, isLastEntryOperator } from "@/src/utils";
import {
  CalculationHandlerProps,
  HandlerProps,
  initialState,
  NumberHandlerProps,
  OperatorHandlerProps,
} from "./types";
import { performCalculation } from "./utils";

export const handleSetCalculationHistory = ({
  set,
  get,
  num,
}: NumberHandlerProps) => {
  const { calculationHistory } = get();
  set({ calculationHistory: [...calculationHistory, num] });
};

export const handleResetCalculationHistory = ({ set }: HandlerProps) =>
  set({ calculationHistory: [] });

export const handleAppendDigit = ({ set, get, num }: NumberHandlerProps) => {
  const { displayValue, waitingForSecondOperand, calculationHistory } = get();
  const emptyDisplay = displayValue === "0";

  const updatedDisplay = emptyDisplay ? num : displayValue + num;
  const updatedHistory = [...calculationHistory, num];

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

export const handleSetOperation = ({ set, get, op }: OperatorHandlerProps) => {
  const { calculationHistory, displayValue, firstOperand, operation } = get();
  const inputValue = parseFloat(displayValue);

  if (inputValue === 0) return;
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

export const createExpressionString = (history: string[], result: string) => {
  const newExpression = [...history, "=", result];
  const expressionString = formatHistory(newExpression);
  return expressionString;
};

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
  const resultExpressionString = createExpressionString(
    calculationHistory,
    resultString
  );

  set({
    displayValue: resultString,
    firstOperand: null,
    operation: null,
    waitingForSecondOperand: false,
    calculationHistory: [],
    expressionHistory: [...expressionHistory, resultExpressionString],
  });
};

export const handleClear = ({ set }: HandlerProps) => {
  set(initialState);
};

export const handleSetExpressionHistory = ({
  set,
  get,
  num,
}: NumberHandlerProps) => {
  const { expressionHistory } = get();
  set({ expressionHistory: [...expressionHistory, num] });
};

export const handleResetDisplayValue = ({ set }: HandlerProps) => {
  set({ displayValue: "0" });
};
