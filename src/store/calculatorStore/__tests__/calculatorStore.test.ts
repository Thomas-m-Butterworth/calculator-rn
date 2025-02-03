import { CalculatorState, CalculatorStoreType, initialState } from "../types";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

type MockStore = CalculatorStoreType & {
  setState: (updates: Partial<CalculatorState>) => void;
  getState: () => MockStore;
};

jest.mock("../calculatorStore", () => ({
  useCalculatorStore: jest.fn(),
}));

describe("Calculator Store", () => {
  const mockStore: MockStore = {
    ...initialState,
    expressionHistory: [],
    appendDigit: jest.fn(),
    setOperation: jest.fn(),
    clear: jest.fn(),
    calculate: jest.fn(),
    removeDigit: jest.fn(),
    setCalculationHistory: jest.fn(),
    resetCalculationHistory: jest.fn(),
    setExpressionHistory: jest.fn(),
    setState: jest.fn((updates: Partial<CalculatorState>) => {
      Object.assign(mockStore, updates);
    }),
    getState: jest.fn(() => mockStore),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should append digit to display value", () => {
    mockStore.displayValue = "0";
    mockStore.calculationHistory = [];
    const { handleAppendDigit } = require("../handlers");

    handleAppendDigit({
      set: mockStore.setState,
      get: mockStore.getState,
      num: "1",
    });

    expect(mockStore.displayValue).toBe("1");
    expect(mockStore.calculationHistory).toEqual(["1"]);
  });

  it("should handle operation", () => {
    mockStore.displayValue = "1";
    mockStore.calculationHistory = ["1"];
    const { handleSetOperation } = require("../handlers");

    handleSetOperation({
      set: mockStore.setState,
      get: mockStore.getState,
      op: "+",
    });

    expect(mockStore.operation).toBe("+");
    expect(mockStore.waitingForSecondOperand).toBe(true);
    expect(mockStore.firstOperand).toBe(1);
    expect(mockStore.calculationHistory).toEqual(["1", "+"]);
  });

  it("should clear the calculator state", () => {
    mockStore.displayValue = "123";
    mockStore.calculationHistory = ["1", "2", "3"];
    const { handleClear } = require("../handlers");

    handleClear({
      set: mockStore.setState,
    });

    expect(mockStore).toMatchObject(initialState);
  });

  it("should handle calculation", () => {
    mockStore.firstOperand = 1;
    mockStore.displayValue = "2";
    mockStore.operation = "+";
    mockStore.calculationHistory = ["1", "+", "2"];
    mockStore.expressionHistory = [];
    const { handleCalculate } = require("../handlers");

    handleCalculate({
      set: mockStore.setState,
      get: mockStore.getState,
    });

    expect(mockStore.displayValue).toBe("3");
    expect(mockStore.firstOperand).toBeNull();
    expect(mockStore.operation).toBeNull();
    expect(mockStore.waitingForSecondOperand).toBe(false);
    expect(mockStore.calculationHistory).toEqual([]);
    expect(mockStore.expressionHistory).toEqual(["1 + 2 = 3"]);
  });

  it("should remove a digit", () => {
    mockStore.displayValue = "123";
    mockStore.calculationHistory = ["1", "2", "3"];
    const { handleRemoveDigit } = require("../handlers");

    handleRemoveDigit({
      set: mockStore.setState,
      get: mockStore.getState,
    });

    expect(mockStore.displayValue).toBe("12");
    expect(mockStore.calculationHistory).toEqual(["1", "2"]);
  });

  it("should set calculation history", () => {
    mockStore.calculationHistory = [];
    const { handleSetCalculationHistory } = require("../handlers");

    handleSetCalculationHistory({
      set: mockStore.setState,
      get: mockStore.getState,
      num: "5",
    });

    expect(mockStore.calculationHistory).toEqual(["5"]);
  });

  it("should reset calculation history", () => {
    mockStore.calculationHistory = ["1", "2", "3"];
    const { handleResetCalculationHistory } = require("../handlers");

    handleResetCalculationHistory({
      set: mockStore.setState,
    });

    expect(mockStore.calculationHistory).toEqual([]);
  });

  it("should set expression history", () => {
    mockStore.expressionHistory = [];
    const { handleSetExpressionHistory } = require("../handlers");

    handleSetExpressionHistory({
      set: mockStore.setState,
      get: mockStore.getState,
      num: "1 + 2 = 3",
    });

    expect(mockStore.expressionHistory).toEqual(["1 + 2 = 3"]);
  });
});
