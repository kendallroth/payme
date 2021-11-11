import React, { ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  selectDeveloperMode,
  selectLanguageConfig,
  selectThemeConfig,
  setAppDeveloper,
  setAppLanguage,
  setAppTheme,
} from "@store/slices/settings";
import { colors } from "@theme";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppLanguage, AppTheme } from "@typings";

const DEVELOPER_MODE_TAPS = 10;

const SettingsScreen = (): ReactElement => {
  const languageRef = useRef<BottomSheetRef>(null);
  const themeRef = useRef<BottomSheetRef>(null);
  const [debugCounter, setDebugCounter] = useState(0);

  const dispatch = useAppDispatch();
  const { notifyError } = useSnackbar();
  const { i18n, t } = useTranslation(["common", "screens"]);

  const languageConfig = useAppSelector(selectLanguageConfig);
  const themeConfig = useAppSelector(selectThemeConfig);
  const developerMode = useAppSelector(selectDeveloperMode);

  const releaseString = config.environment && ` @ ${config.environment}`;
  const showEnvironment = developerMode && Boolean(releaseString);

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
    // Change language in localization context
    i18n.changeLanguage(value);

    dispatch(setAppLanguage(value));

    languageRef.current?.close();
  };

  /**
   * Set the selected theme
   *
   * @param value - App theme
   */
  const onSelectTheme = (value: AppTheme): void => {
    // TODO: Support dark theme
    if (value !== AppTheme.LIGHT) {
      notifyError(t("common:errors.notImplemented"));
    } else {
      dispatch(setAppTheme(value));
    }

    themeRef.current?.close();
  };

  /**
   * Increase developer tap counter
   */
  const onTapVersion = (): void => {
    if (developerMode) return;

    const newCount = debugCounter + 1;

    // Enable developer mode once enough taps have accumulated
    if (newCount >= DEVELOPER_MODE_TAPS) {
      setDebugCounter(0);
      dispatch(setAppDeveloper(true));
    } else {
      setDebugCounter(newCount);
    }
  };

  return (
    <Page>
      <AppBar title={t("screens:settings.title")} />
      <SettingsListItem
        icon="information"
        route="About"
        title={t("screens:settingsAbout.title")}
      />
      <List.Subheader>
        {t("screens:settings.listSectionCustomize")}
      </List.Subheader>
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
        title={t("screens:settings.listItemLanguage")}
        onPress={onOpenLanguage}
      />
      <SettingsListItem
        icon="palette"
        right={(rightProps): ReactElement => (
          <List.Icon {...rightProps} icon={themeConfig.icon} />
        )}
        title={t("screens:settings.listItemAppearance")}
        onPress={onOpenTheme}
      />
      <List.Subheader>{t("screens:settings.listSectionHelp")}</List.Subheader>
      <SettingsListItem
        implemented={false}
        icon="bug"
        title={t("screens:settings.listItemBug")}
      />
      {developerMode && (
        <SettingsListItem
          icon="cellphone-information"
          route="Developer"
          title={t("screens:settingsDeveloper.title")}
        />
      )}
      <View style={styles.settingsFooter}>
        <View style={styles.settingsFooterDebug}>
          <Text style={styles.settingsFooterVersion} onPress={onTapVersion}>
            v{config.version}
          </Text>
          {showEnvironment && (
            <Text style={styles.settingsFooterEnvironment}>
              {releaseString}
            </Text>
          )}
        </View>
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
    alignItems: "center",
    paddingVertical: 16,
  },
  settingsFooterDebug: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
  settingsFooterEnvironment: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: colors.grey.base,
  },
  settingsFooterVersion: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  settingsLanguageIcon: {
    alignSelf: "center",
    left: -12,
  },
});

export default SettingsScreen;
