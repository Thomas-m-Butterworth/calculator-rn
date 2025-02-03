import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useButtonLayout } from "@/src/hooks";
import { useCalculatorStore } from "@store/calculatorStore";
import { CalculatorButton } from "../CalculatorButton";
import { CalculatorDisplay } from "../CalculatorDisplay";

export const Calculator = () => {
  const {
    displayValue,
    appendDigit,
    removeDigit,
    setOperation,
    calculate,
    calculationHistory,
    clear,
    setPercentOperation,
  } = useCalculatorStore();

  const buttonLayout = useButtonLayout(
    appendDigit,
    removeDigit,
    setOperation,
    calculate,
    clear,
    setPercentOperation
  );

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <CalculatorDisplay
        displayValue={displayValue}
        calculationHistory={calculationHistory}
      />
      <View style={styles.buttonGrid}>
        {buttonLayout.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((buttonProps, buttonIndex) => (
              <CalculatorButton key={buttonIndex} {...buttonProps} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 12,
  },
  buttonGrid: {
    justifyContent: "center",
    flex: 1,
    gap: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
});
