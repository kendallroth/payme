import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

// Utilities
import { colors } from "@theme";

const AboutScreen = (): ReactElement | null => {
  return (
    <View style={styles.page}>
      <Text>About!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});

export default AboutScreen;
