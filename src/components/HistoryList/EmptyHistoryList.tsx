import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";

export const EmptyHistoryList = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].displayBackground;
  return (
    <View
      style={[styles.emptyContainer, { backgroundColor }]}
      testID="emptyHistoryList"
    >
      <Text style={styles.emptyTitle}>
        You've not completed any calculations yet
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    borderRadius: 12,
    margin: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: "SpaceMono",
    lineHeight: 22,
    textAlign: "center",
    padding: 16,
    fontWeight: "600",
  },
});
