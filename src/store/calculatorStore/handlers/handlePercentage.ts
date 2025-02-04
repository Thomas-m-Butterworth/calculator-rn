import { CalculationHandlerProps } from "../types";

export const handlePercentage = ({ set, get }: CalculationHandlerProps) => {
  const { displayValue, calculationHistory } = get();
  const num = parseFloat(displayValue);
  const percentageResult = num / 100;
  const percentageResultString = percentageResult.toString();

  set({
    displayValue: percentageResultString,
    calculationHistory: [...calculationHistory, "%", percentageResultString],
  });
};
