import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks";

type Variant = "display" | "history";

type DisplayTextProps = TextProps & {
  variant: Variant;
};

const variantColorMap: Record<Variant, keyof typeof Colors.light> = {
  display: "displayText",
  history: "historyText",
};

export const DisplayText = ({ variant, style, ...props }: DisplayTextProps) => {
  const colorScheme = useColorScheme();

  const colorKey = variantColorMap[variant];
  const color = Colors[colorScheme ?? "light"][colorKey];

  return (
    <Text
      style={[styles[variant], { color }, style]}
      adjustsFontSizeToFit
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  display: {
    fontSize: 48,
    fontFamily: "SpaceMono",
    fontWeight: "600",
  },
  history: {
    fontSize: 20,
    fontFamily: "SpaceMono",
    position: "absolute",
    textAlign: "right",
    letterSpacing: -0.5,
    top: 16,
    right: 16,
  },
});
