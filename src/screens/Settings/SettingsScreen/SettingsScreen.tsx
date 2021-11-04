import React, { ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import SettingsListItem from "./SettingsListItem";

// Utilities
import config from "@config";

const SettingsScreen = (): ReactElement => {
  return (
    <Page>
      <AppBar title="Settings" />
      <SettingsListItem icon="information" route="About" title="About" />
      <List.Subheader>Customize</List.Subheader>
      <SettingsListItem
        implemented={false}
        icon="flag"
        route="SettingsLanguage"
        title="Language"
      />
      <SettingsListItem
        implemented={false}
        icon="palette"
        route="Appearance"
        title="Appearance"
      />
      <List.Subheader>Help</List.Subheader>
      <SettingsListItem
        implemented={false}
        icon="bug"
        route="SettingsBug"
        title="Report a bug"
      />
      <View style={styles.settingsFooter}>
        <Text style={styles.settingsFooterVersion}>v{config.version}</Text>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  settingsFooter: {
    marginTop: "auto",
    paddingVertical: 16,
  },
  settingsFooterVersion: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});

export default SettingsScreen;
