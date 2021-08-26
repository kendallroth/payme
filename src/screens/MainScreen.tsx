import React, { ReactElement, useCallback, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Utilities
import { colors } from "@theme";

const MainScreen = (): ReactElement | null => {
  const navigation = useNavigation();

  /*useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="About" onPress={onAboutPress} />,
    });
  }, [navigation, onAboutPress]);*/

  /** Go to "About" page */
  const onAboutPress = useCallback(() => {
    navigation.navigate("About");
  }, [navigation]);

  return (
    <View style={styles.page}>
      <Text>Welcome!</Text>
      <Button title="About" onPress={onAboutPress} />
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

export default MainScreen;
