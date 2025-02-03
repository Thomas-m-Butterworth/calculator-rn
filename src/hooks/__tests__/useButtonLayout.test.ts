import { useColorScheme } from "react-native";
import { renderHook } from "@testing-library/react-native";
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
  const setPercentoperation = jest.fn();

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
        setPercentoperation
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
        setPercentoperation
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
        setPercentoperation
      )
    );

    const equalsButton = result.current[4][3];
    expect(equalsButton.label).toBe("=");
    expect(equalsButton.onPress).toBe(calculate);

    const plusButton = result.current[3][3];
    expect(plusButton.label).toBe("+");
  });

  it("correct onPress for each button", () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");

    const { result } = renderHook(() =>
      useButtonLayout(
        appendDigit,
        removeDigit,
        setOperation,
        calculate,
        clear,
        setPercentoperation
      )
    );

    const acButton = result.current[0][0];
    acButton.onPress();
    expect(clear).toHaveBeenCalled();

    const percentButton = result.current[0][1];
    percentButton.onPress();
    expect(setPercentoperation).toHaveBeenCalled();

    const divideButton = result.current[0][2];
    divideButton.onPress();
    expect(setOperation).toHaveBeenCalledWith("/");

    const sevenButton = result.current[1][0];
    sevenButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("7");

    const eightButton = result.current[1][1];
    eightButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("8");

    const nineButton = result.current[1][2];
    nineButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("9");

    const multiplyButton = result.current[1][3];
    multiplyButton.onPress();
    expect(setOperation).toHaveBeenCalledWith("*");

    const sixButton = result.current[2][0];
    sixButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("4");

    const fiveButton = result.current[2][1];
    fiveButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("5");

    const fourButton = result.current[2][2];
    fourButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("6");

    const subtractButton = result.current[2][3];
    subtractButton.onPress();
    expect(setOperation).toHaveBeenCalledWith("-");

    const oneButton = result.current[3][0];
    oneButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("1");

    const twoButton = result.current[3][1];
    twoButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("2");

    const threeButton = result.current[3][2];
    threeButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("3");

    const additionButton = result.current[3][3];
    additionButton.onPress();
    expect(setOperation).toHaveBeenCalledWith("+");

    const zeroButton = result.current[4][0];
    zeroButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith("2");

    const decimalButton = result.current[4][1];
    decimalButton.onPress();
    expect(appendDigit).toHaveBeenCalledWith(".");

    const backspaceButton = result.current[4][2];
    backspaceButton.onPress();
    expect(removeDigit).toHaveBeenCalled();

    const equalsButton = result.current[4][3];
    equalsButton.onPress();
    expect(calculate).toHaveBeenCalled();
  });
});
