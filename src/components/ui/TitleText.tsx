import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks/";

export const TitleText = ({ ...props }): ReactNode => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[{ backgroundColor: theme.displayBackground }]}>
      <Text
        style={[
          styles.titleText,
          {
            color: theme.displayText,
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
    marginBottom: 8,
    padding: 12,
  },
});
