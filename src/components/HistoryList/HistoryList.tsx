import React from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useCalculatorStore } from "@/src/store";
import { EmptyHistoryList } from "./EmptyHistoryList";
import { Expression } from "./Expression";

export const HistoryList = () => {
  const { expressionHistory } = useCalculatorStore();
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={expressionHistory}
        renderItem={({ item, index }) => (
          <Expression
            exp={item}
            key={`expression-${index}`}
            testId={`expression-${index}`}
          />
        )}
        style={styles.expressionList}
        ListEmptyComponent={<EmptyHistoryList />}
        testID="historyList"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: { flex: 1 },
  expressionList: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 50 : 0,
    marginTop: 8,
  },
});
