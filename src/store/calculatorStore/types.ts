export type OperationType = "/" | "*" | "-" | "+";

export interface CalculatorState {
  displayValue: string;
  firstOperand: number | null;
  operation: OperationType | null;
  waitingForSecondOperand: boolean;
  calculationHistory: string[];
  expressionHistory: string[];
}

export interface CalculatorActions {
  resetDisplayValue: () => void;
  setExpressionHistory: (exp: string) => void;
  setCalculationHistory: (num: string) => void;
  resetCalculationHistory: () => void;
  appendDigit: (digit: string) => void;
  removeDigit: () => void;
  setOperation: (op: OperationType) => void;
  setPercentOperation: () => void;
  calculate: () => void;
  clear: () => void;
}

export type CalculatorStoreType = CalculatorState & CalculatorActions;

export interface HandlerProps {
  set: (state: Partial<CalculatorStoreType>) => void;
  get?: () => CalculatorStoreType;
}

export interface NumberHandlerProps extends HandlerProps {
  num: string;
  get: () => CalculatorStoreType;
}

export interface OperatorHandlerProps extends HandlerProps {
  op: OperationType;
  get: () => CalculatorStoreType;
}
export interface CalculationHandlerProps extends HandlerProps {
  get: () => CalculatorStoreType;
}

export const initialState: Omit<CalculatorState, "expressionHistory"> = {
  displayValue: "0",
  firstOperand: null,
  operation: null,
  waitingForSecondOperand: false,
  calculationHistory: [],
};
