import React, { ReactElement, useRef, useState } from "react";
import { openURL } from "expo-linking";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";

// Components
import { LanguageIcon } from "@components/icons";
import { AppBar, Page } from "@components/layout";
import { AppResetModal } from "./AppResetModal";
import { LanguageModal } from "./LanguageModal";
import { ThemeModal } from "./ThemeModal";
import SettingsListItem from "./SettingsListItem";

// Utilities
import config from "@config";
import {
  useAppDispatch,
  useAppLoader,
  useAppSelector,
  useSnackbar,
} from "@hooks";
import {
  resetApp,
  selectDeveloperMode,
  selectLanguageConfig,
  selectThemeConfig,
  setAppDeveloper,
  setAppLanguage,
  setAppTheme,
} from "@store/slices/settings";
import { sharedColors } from "@theme";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import {
  AppLanguage,
  AppTheme,
  IAppResetOptions,
} from "@typings/settings.types";

const DEVELOPER_MODE_TAPS = 10;

const SettingsScreen = (): ReactElement => {
  const appResetRef = useRef<BottomSheetRef>(null);
  const languageRef = useRef<BottomSheetRef>(null);
  const themeRef = useRef<BottomSheetRef>(null);
  const [debugCounter, setDebugCounter] = useState(0);

  const dispatch = useAppDispatch();
  const loader = useAppLoader();
  const { notify } = useSnackbar();
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
   * Open the app reset selector
   */
  const onOpenAppReset = (): void => {
    appResetRef.current?.open();
  };

  /**
   * Reset the app state
   *
   * @param resetOptions - App reset options
   */
  const onAppReset = (resetOptions: IAppResetOptions): void => {
    Alert.alert(
      t("screens:settingsDeveloper.resetDataTitle"),
      t("screens:settingsDeveloper.resetDataDescription"),
      [
        { text: t("common:choices.cancel"), style: "cancel" },
        {
          text: t("common:choices.confirm"),
          onPress: async (): Promise<void> => {
            appResetRef.current?.close();
            loader.show(t("screens:settingsDeveloper.resetDataLoading"));
            await dispatch(resetApp(resetOptions));
            loader.hide();
            notify(t("screens:settingsDeveloper.resetDataSuccess"));
          },
        },
      ],
    );
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
    dispatch(setAppTheme(value));

    themeRef.current?.close();
  };

  /**
   * Allow users to suggest an improvement (via email)
   */
  const onSuggestImprovement = (): void => {
    openURL(`mailto:${config.links.developerEmail}?subject=PayMe Suggestion`);
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
      <SettingsListItem
        icon="tools"
        route="Behaviours"
        title={t("screens:settings.listItemBehaviours")}
      />
      <List.Subheader>{t("screens:settings.listSectionHelp")}</List.Subheader>
      <SettingsListItem
        icon="bug"
        route="ReportBug"
        title={t("screens:settings.listItemBug")}
      />
      <SettingsListItem
        // icon="lightbulb-on"
        icon="email"
        title={t("screens:settings.listItemSuggestion")}
        onPress={onSuggestImprovement}
      />
      <List.Item
        description={t("screens:settingsDeveloper.listItemResetDescription")}
        left={(leftProps): ReactElement => (
          <List.Icon {...leftProps} icon="lock-reset" />
        )}
        title={t("screens:settingsDeveloper.listItemResetTitle")}
        onLongPress={onOpenAppReset}
        onPress={(): void => {}}
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
      <AppResetModal ref={appResetRef} onReset={onAppReset} />
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
    color: sharedColors.grey.base,
  },
  settingsFooterVersion: {},
  settingsLanguageIcon: {
    alignSelf: "center",
    left: -12,
  },
});

export default SettingsScreen;
