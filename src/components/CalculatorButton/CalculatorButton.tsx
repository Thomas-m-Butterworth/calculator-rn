import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks";
import { ButtonText } from "./ButtonText";
import { CalculatorButtonProps } from "./types";

export const CalculatorButton = ({
  label = "",
  onPress,
  isOperation = false,
  isWide = false,
  icon,
}: CalculatorButtonProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor = isOperation
    ? Colors[colorScheme ?? "light"].operationButton
    : Colors[colorScheme ?? "light"].button;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, isWide && styles.wideButton]}
    >
      {icon ? icon : <ButtonText label={label} isOperation={isOperation} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wideButton: {
    flex: 2,
    aspectRatio: 2,
  },
});
