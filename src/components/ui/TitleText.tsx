import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks/";

export const TitleText = ({ ...props }): ReactNode => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[{ backgroundColor: theme.operationButton }]}>
      <Text
        style={[
          styles.titleText,
          {
            color: theme.operationButtonText,
          },
          props.style,
        ]}
        adjustsFontSizeToFit
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 26,
    fontWeight: 600,
    textAlign: "center",
    margin: 8,
  },
});
