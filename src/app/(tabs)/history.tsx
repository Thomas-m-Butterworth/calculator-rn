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

export const Expression = ({ exp }: { exp: string }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View
      style={[styles.expression, { backgroundColor: theme.displayBackground }]}
    >
      <Text style={[styles.expressionText, { color: theme.text }]}>{exp}</Text>
    </View>
  );
};

export const HistoryList = () => {
  const { expressionHistory } = useCalculatorStore();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expressionHistory}
        renderItem={({ item }) => <Expression exp={item} />}
        style={styles.expressionList}
      />
    </View>
  );
};

export default function HistoryScreen() {
  return (
    <PageContainer>
      <TitleText>History</TitleText>
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
});
