import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";

// Types
import { RootRouterNavigation } from "src/AppRouter";

const HomeScreen = (): ReactElement | null => {
  const navigation = useNavigation<RootRouterNavigation>();

  const { t } = useTranslation(["screens"]);

  return (
    <Page>
      <AppBar back={false} title="PayMe">
        <AppBar.Action
          icon="cog"
          onPress={(): void => navigation.navigate("SettingsRouter")}
        />
      </AppBar>
      <Image source={require("@assets/icon.png")} style={styles.pageLogo} />
      <Text style={styles.pageWelcome}>{t("screens:home.welcomeText")}</Text>
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
  pageWelcome: {
    marginTop: 32,
    fontSize: 28,
    textAlign: "center",
  },
});

export default HomeScreen;
