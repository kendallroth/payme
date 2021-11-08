import React, { ReactElement, useRef } from "react";
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
import { useAppDispatch, useAppSelector } from "@hooks";
import { selectLanguageConfig, setAppLanguage } from "@store/slices/settings";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppLanguage } from "@typings";

const SettingsScreen = (): ReactElement => {
  const languageRef = useRef<BottomSheetRef>(null);

  const dispatch = useAppDispatch();
  const languageConfig = useAppSelector(selectLanguageConfig);

  const languageCode = languageConfig.code;
  const languageFlag = languageConfig.flag;

  /**
   * Open the language selector
   */
  const onOpenLanguage = (): void => {
    languageRef.current?.open();
  };

  /**
   * Set the selected app language
   *
   * @param value - App language
   */
  const onSelectLanguage = (value: AppLanguage): void => {
    dispatch(setAppLanguage(value));

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
        language={languageCode}
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
