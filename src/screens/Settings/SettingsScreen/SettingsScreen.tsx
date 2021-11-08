import React, { ReactElement, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import { LanguageModal } from "./LanguageModal";
import { ThemeModal } from "./ThemeModal";
import SettingsListItem from "./SettingsListItem";

// Components
import { LanguageIcon } from "@components/icons";

// Utilities
import config from "@config";
import { useAppDispatch, useAppSelector, useSnackbar } from "@hooks";
import {
  selectLanguageConfig,
  selectThemeConfig,
  setAppLanguage,
  setAppTheme,
} from "@store/slices/settings";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppLanguage, AppTheme } from "@typings";

const SettingsScreen = (): ReactElement => {
  const languageRef = useRef<BottomSheetRef>(null);
  const themeRef = useRef<BottomSheetRef>(null);

  const dispatch = useAppDispatch();
  const { notifyError } = useSnackbar();

  const languageConfig = useAppSelector(selectLanguageConfig);
  const themeConfig = useAppSelector(selectThemeConfig);

  /**
   * Open the language selector
   */
  const onOpenLanguage = (): void => {
    languageRef.current?.open();
  };

  /**
   * Open the theme selector
   */
  const onOpenTheme = (): void => {
    themeRef.current?.open();
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

  /**
   * Set the selected theme
   *
   * @param value - App theme
   */
  const onSelectTheme = (value: AppTheme): void => {
    dispatch(setAppTheme(value));

    if (value !== AppTheme.LIGHT) {
      notifyError("Theme not supported yet");
    }

    themeRef.current?.close();
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
            flag={languageConfig.flag}
            size={32}
            style={styles.settingsLanguageIcon}
          />
        )}
        title="Language"
        onPress={onOpenLanguage}
      />
      <SettingsListItem
        icon="palette"
        right={(rightProps): ReactElement => (
          <List.Icon {...rightProps} icon={themeConfig.icon} />
        )}
        title="Appearance"
        onPress={onOpenTheme}
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
        language={languageConfig.code}
        onSelect={onSelectLanguage}
      />
      <ThemeModal
        ref={themeRef}
        theme={themeConfig.code}
        onSelect={onSelectTheme}
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
