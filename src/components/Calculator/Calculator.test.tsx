import React from "react";
import { render } from "@testing-library/react-native";
import { Calculator } from "@/src/components/Calculator";

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}));

jest.mock("@/src/store/calculatorStore", () => ({
  useCalculatorStore: jest.fn(() => ({
    displayValue: "123",
    calculationHistory: ["12", "+", "10"],
    appendDigit: jest.fn(),
    removeDigit: jest.fn(),
    setOperation: jest.fn(),
    calculate: jest.fn(),
    clear: jest.fn(),
    setPercentOperation: jest.fn(),
  })),
}));

describe("Calculator", () => {
  it("should render as expected", () => {
    const { toJSON } = render(<Calculator />);
    expect(toJSON()).toMatchSnapshot();
  });
});
