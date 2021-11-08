import React, { ReactElement, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import { LanguageModal } from "./LanguageModal";
import SettingsListItem from "./SettingsListItem";

// Components
import { LanguageIcon } from "@components/icons";

// Utilities
import config from "@config";
import { LANGUAGES } from "@utilities/constants";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppLanguage } from "@typings";

const SettingsScreen = (): ReactElement => {
  const languageRef = useRef<BottomSheetRef>(null);

  // TODO: Move to store
  const [language, setLanguage] = useState(AppLanguage.ENGLISH);

  const languageFlag = LANGUAGES[language].flag;

  const onOpenLanguage = (): void => {
    languageRef.current?.open();
  };

  const onSelectLanguage = (value: AppLanguage): void => {
    // TODO: Refactor to use store
    setLanguage(value);

    languageRef.current?.close();
  };

  return (
    <Page>
      <AppBar title="Settings" />
      <SettingsListItem icon="information" route="About" title="About" />
      <List.Subheader>Customize</List.Subheader>
      <SettingsListItem
        icon="flag"
        right={(rightProps): ReactElement => (
          <LanguageIcon
            {...rightProps}
            flag={languageFlag}
            size={32}
            style={styles.settingsLanguageIcon}
          />
        )}
        title="Language"
        onPress={onOpenLanguage}
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
      <LanguageModal
        ref={languageRef}
        language={language}
        onSelect={onSelectLanguage}
      />
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
  settingsLanguageIcon: {
    alignSelf: "center",
    left: -12,
  },
});

export default SettingsScreen;
