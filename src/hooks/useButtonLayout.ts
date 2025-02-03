import React from "react";
import { useColorScheme } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { CalculatorButtonProps } from "../components/CalculatorButton/types";
import { OperationType } from "../store/calculatorStore/types";
import { onPercentage } from "../utils";

export const useButtonLayout = (
  appendDigit: (digit: string) => void,
  removeDigit: () => void,
  setOperation: (operation: OperationType) => void,
  calculate: () => void,
  clear: () => void,
  displayValue: string,
  resetDisplayValue: () => void,
  setCalculationHistory: (num: string) => void
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
  };

  return [
    [
      { label: "AC", onPress: clear, isOperation: true, isWide: true },
      {
        label: "%",
        onPress: () =>
          onPercentage({
            displayValue,
            setCalculationHistory,
            resetDisplayValue,
            appendDigit,
          }),
        isOperation: true,
      },
      { label: "÷", onPress: () => setOperation("/"), isOperation: true },
    ],
    [
      { label: "7", onPress: () => appendDigit("7") },
      { label: "8", onPress: () => appendDigit("8") },
      { label: "9", onPress: () => appendDigit("9") },
      { label: "×", onPress: () => setOperation("*"), isOperation: true },
    ],
    [
      { label: "4", onPress: () => appendDigit("4") },
      { label: "5", onPress: () => appendDigit("5") },
      { label: "6", onPress: () => appendDigit("6") },
      { label: "-", onPress: () => setOperation("-"), isOperation: true },
    ],
    [
      { label: "1", onPress: () => appendDigit("1") },
      { label: "2", onPress: () => appendDigit("2") },
      { label: "3", onPress: () => appendDigit("3") },
      { label: "+", onPress: () => setOperation("+"), isOperation: true },
    ],
    [
      { label: "0", onPress: () => appendDigit("0") },
      { label: ".", onPress: () => appendDigit(".") },
      backspaceButton,
      { label: "=", onPress: calculate, isOperation: true },
    ],
  ];
};

export default useButtonLayout;
