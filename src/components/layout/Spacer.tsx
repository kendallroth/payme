import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

/** Insert space between elements (exploiting 'flexGrow') */
const Spacer = (): ReactElement => {
  return <View style={styles.spacer} />;
};

const styles = StyleSheet.create({
  spacer: {
    flexGrow: 1,
  },
});

export default Spacer;
