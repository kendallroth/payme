import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = (): ReactElement | null => {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
