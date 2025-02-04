import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { ExpressionProps } from "./types";

export const Expression = ({ exp, testId }: ExpressionProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View
      style={[styles.expression, { backgroundColor: theme.displayBackground }]}
      testID={testId}
    >
      <Text style={[styles.expressionText, { color: theme.text }]}>{exp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  expression: {
    padding: 12,
    margin: 8,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  expressionText: {
    fontFamily: "SpaceMono",
    fontSize: 18,
    textAlign: "center",
  },
});
