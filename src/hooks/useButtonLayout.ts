import React from "react";
import { useColorScheme } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { CalculatorButtonProps } from "../components/CalculatorButton/types";
import { OperationType } from "../store/calculatorStore/types";

export const useButtonLayout = (
  appendDigit: (digit: string) => void,
  removeDigit: () => void,
  setOperation: (operation: OperationType) => void,
  calculate: () => void,
  clear: () => void,
  setPercentOperation: () => void
): CalculatorButtonProps[][] => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"].buttonText;
  const backspaceIcon = React.createElement(Ionicons, {
    name: "backspace-outline",
    size: 32,
    color: color,
  });
  const backspaceButton: CalculatorButtonProps = {
    label: "<-",
    onPress: removeDigit,
    icon: backspaceIcon,
    testId: "backspaceButton",
  };

  return [
    [
      {
        label: "AC",
        onPress: clear,
        isOperation: true,
        isWide: true,
        testId: "clearButton",
      },
      {
        label: "%",
        onPress: setPercentOperation,
        isOperation: true,
        testId: "percentButton",
      },
      {
        label: "÷",
        onPress: () => setOperation("/"),
        isOperation: true,
        testId: "divideButton",
      },
    ],
    [
      { label: "7", onPress: () => appendDigit("7"), testId: "sevenButton" },
      { label: "8", onPress: () => appendDigit("8"), testId: "eightButton" },
      { label: "9", onPress: () => appendDigit("9"), testId: "nineButton" },
      {
        label: "×",
        onPress: () => setOperation("*"),
        isOperation: true,
        testId: "multiplyButton",
      },
    ],
    [
      { label: "4", onPress: () => appendDigit("4"), testId: "fourButton" },
      { label: "5", onPress: () => appendDigit("5"), testId: "fiveButton" },
      { label: "6", onPress: () => appendDigit("6"), testId: "sixButton" },
      {
        label: "-",
        onPress: () => setOperation("-"),
        isOperation: true,
        testId: "subtractButton",
      },
    ],
    [
      { label: "1", onPress: () => appendDigit("1"), testId: "oneButton" },
      { label: "2", onPress: () => appendDigit("2"), testId: "twoButton" },
      { label: "3", onPress: () => appendDigit("3"), testId: "threeButton" },
      {
        label: "+",
        onPress: () => setOperation("+"),
        isOperation: true,
        testId: "addButton",
      },
    ],
    [
      { label: "0", onPress: () => appendDigit("0"), testId: "zeroButton" },
      { label: ".", onPress: () => appendDigit("."), testId: "decimalButton" },
      backspaceButton,
      {
        label: "=",
        onPress: calculate,
        isOperation: true,
        testId: "equalsButton",
      },
    ],
  ];
};

export default useButtonLayout;
