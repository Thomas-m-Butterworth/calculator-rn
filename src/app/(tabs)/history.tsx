import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { PageContainer, TitleText } from "@/src/components/ui";
import { useCalculatorStore } from "@/src/store";

export const Expression = ({
  exp,
  testId,
}: {
  exp: string;
  testId: string;
}) => {
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

export const HistoryList = () => {
  const { expressionHistory } = useCalculatorStore();
  return (
    <View style={{ flex: 1 }}>
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

export default function HistoryScreen() {
  return (
    <PageContainer>
      <TitleText testId={"historyTitle"}>History</TitleText>
      <HistoryList />
    </PageContainer>
  );
}

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
  expressionList: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 50 : 0,
    marginTop: 8,
  },
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
