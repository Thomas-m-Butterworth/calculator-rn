import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks";
import { ButtonTextProps } from "./types";

export const ButtonText = ({ label, isOperation }: ButtonTextProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Text
      style={[
        styles.buttonText,
        { color: theme.text },
        isOperation && { color: theme.operationButtonText },
      ]}
    >
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
  },
});
