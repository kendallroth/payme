import React, { ReactElement, useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Utilities
import { colors } from "@theme";
import { IconButton } from "react-native-paper";

const MainScreen = (): ReactElement | null => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const onAboutPress = () => navigation.navigate("About");

    navigation.setOptions({
      headerRight: () => (
        <IconButton
          color={colors.primary}
          icon="information"
          onPress={onAboutPress}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <Image source={require("@assets/icon.png")} style={styles.pageLogo} />
      <Text style={styles.pageTitle}>PayMe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pageLogo: {
    height: 64,
    width: 64,
    borderRadius: 16,
  },
  pageTitle: {
    marginTop: 16,
    fontSize: 24,
    color: colors.primary,
  },
});

export default MainScreen;
