import React, { ReactNode } from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks";

export const PageContainer = ({
  children,
  isHeaderEnabled,
}: {
  children: ReactNode;
  isHeaderEnabled?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: isHeaderEnabled ? 12 : styles.container.paddingTop,
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 70 : 12,
  },
});
