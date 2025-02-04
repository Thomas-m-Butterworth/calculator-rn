import { CalculatorState, CalculatorStoreType, initialState } from "../types";

type MockStore = CalculatorStoreType & {
  setState: (updates: Partial<CalculatorState>) => void;
  getState: () => MockStore;
};

jest.mock("../calculatorStore", () => ({
  useCalculatorStore: jest.fn(),
}));

describe("Calculator Store", () => {
  let mockStore: MockStore;

  beforeEach(() => {
    mockStore = {
      ...initialState,
      resetDisplayValue: jest.fn(),
      expressionHistory: [],
      appendDigit: jest.fn(),
      setOperation: jest.fn(),
      clear: jest.fn(),
      calculate: jest.fn(),
      removeDigit: jest.fn(),
      setCalculationHistory: jest.fn(),
      resetCalculationHistory: jest.fn(),
      setExpressionHistory: jest.fn(),
      setPercentOperation: jest.fn(),
      setState: jest.fn((updates: Partial<CalculatorState>) => {
        Object.assign(mockStore, updates);
      }),
      getState: jest.fn(() => mockStore),
    };
  });

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

  describe("handleSetOperation", () => {
    const { handleSetOperation } = require("../handlers");

    it("should allow negative sign at the start of a calculation", () => {
      mockStore.displayValue = "0";
      mockStore.calculationHistory = [];

      handleSetOperation({
        set: mockStore.setState,
        get: mockStore.getState,
        op: "-",
      });

      expect(mockStore.displayValue).toBe("-");
      expect(mockStore.calculationHistory).toEqual(["-"]);
    });

    it("should not allow multiple negative signs", () => {
      mockStore.displayValue = "-";
      mockStore.calculationHistory = ["-"];

      handleSetOperation({
        set: mockStore.setState,
        get: mockStore.getState,
        op: "-",
      });

      expect(mockStore.displayValue).toBe("-");
      expect(mockStore.calculationHistory).toEqual(["-"]);
    });

    it("should handle normal operation selection", () => {
      mockStore.displayValue = "5";
      mockStore.calculationHistory = ["5"];

      handleSetOperation({
        set: mockStore.setState,
        get: mockStore.getState,
        op: "+",
      });

      expect(mockStore.operation).toBe("+");
      expect(mockStore.waitingForSecondOperand).toBe(true);
      expect(mockStore.firstOperand).toBe(5);
      expect(mockStore.calculationHistory).toEqual(["5", "+"]);
    });
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
