import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks";
import { formatHistory, truncateStart } from "@/src/utils";
import { DisplayText } from "../ui";

export interface CalculatorDisplayProps {
  displayValue: string;
  calculationHistory: string[];
}

export const CalculatorDisplay = ({
  displayValue,
  calculationHistory,
}: CalculatorDisplayProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].displayBackground;

  return (
    <View style={[styles.display, { backgroundColor }]}>
      <DisplayText variant="display" numberOfLines={1}>
        {displayValue}
      </DisplayText>
      {calculationHistory.length > 0 && (
        <DisplayText variant="history" numberOfLines={2}>
          {truncateStart(formatHistory(calculationHistory), 58)}
        </DisplayText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    height: 170,
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 16,
    marginTop: 18,
  },
});
