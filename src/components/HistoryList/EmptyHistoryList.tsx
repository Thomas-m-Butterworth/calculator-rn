import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";

export const EmptyHistoryList = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View
      style={[
        styles.emptyContainer,
        { backgroundColor: theme.displayBackground },
      ]}
      testID="emptyHistoryList"
    >
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        You've not completed any calculations yet
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    borderRadius: 12,
    margin: 18,
  },
  emptyTitle: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: "SpaceMono",
    textAlign: "center",
    padding: 18,
    paddingTop: 22,
    fontWeight: "600",
  },
});
