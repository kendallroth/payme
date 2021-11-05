import React, { ReactElement } from "react";
import { Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
import { AppBar, Page } from "@components/layout";

// Utilities
// import { colors } from "@theme";

const HomeScreen = (): ReactElement | null => {
  const navigation = useNavigation();

  return (
    <Page>
      <AppBar back={false} title="PayMe">
        <AppBar.Action
          icon="cog"
          onPress={(): void => navigation.navigate("SettingsRouter")}
        />
      </AppBar>
      <Image source={require("@assets/icon.png")} style={styles.pageLogo} />
    </Page>
  );
};

const styles = StyleSheet.create({
  pageLogo: {
    height: 64,
    width: 64,
    alignSelf: "center",
    borderRadius: 16,
  },
});

export default HomeScreen;
