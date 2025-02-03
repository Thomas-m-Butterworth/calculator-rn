import { useColorScheme } from "react-native";
import { renderHook } from "@testing-library/react";
import { Colors } from "@/constants/Colors";
import useButtonLayout from "../useButtonLayout";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("react-native", () => ({
  useColorScheme: jest.fn(),
}));

describe("useButtonLayout", () => {
  const appendDigit = jest.fn();
  const removeDigit = jest.fn();
  const setOperation = jest.fn();
  const calculate = jest.fn();
  const clear = jest.fn();
  const resetDisplayValue = jest.fn();
  const setCalculationHistory = jest.fn();
  const displayValue = "123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the correct button layout with light mode", () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");

    const { result } = renderHook(() =>
      useButtonLayout(
        appendDigit,
        removeDigit,
        setOperation,
        calculate,
        clear,
        displayValue,
        resetDisplayValue,
        setCalculationHistory
      )
    );
    const backspaceButton = result.current[4][2];

    expect(result.current).toHaveLength(5);
    expect(result.current[0]).toHaveLength(3);
    expect(result.current[4]).toHaveLength(4);
    expect(backspaceButton.label).toBe("<-");
    expect(backspaceButton.onPress).toBe(removeDigit);
  });

  it("returns the correct button layout with dark mode", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    const { result } = renderHook(() =>
      useButtonLayout(
        appendDigit,
        removeDigit,
        setOperation,
        calculate,
        clear,
        displayValue,
        resetDisplayValue,
        setCalculationHistory
      )
    );

    const expectedColor = Colors.dark.buttonText;
    const backspaceButton = result.current[4][2];
    const icon = backspaceButton.icon as React.ReactElement;
    expect(icon.props.color).toBe(expectedColor);
  });

  it("correctly assigns functions to buttons", () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");

    const { result } = renderHook(() =>
      useButtonLayout(
        appendDigit,
        removeDigit,
        setOperation,
        calculate,
        clear,
        displayValue,
        resetDisplayValue,
        setCalculationHistory
      )
    );

    const equalsButton = result.current[4][3];
    expect(equalsButton.label).toBe("=");
    expect(equalsButton.onPress).toBe(calculate);

    const plusButton = result.current[3][3];
    expect(plusButton.label).toBe("+");
  });
});
