import React, { ReactElement } from "react";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List, useTheme } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import DeveloperListItem from "./DeveloperListItem";

// Utilities
import config from "@config";
import { useAppDispatch } from "@hooks";
import { setAppDeveloper } from "@store/slices/settings";

// Types
import { SettingsRouterNavigation } from "@screens/Settings/SettingsRouter";

const DeveloperScreen = (): ReactElement => {
  const { t } = useTranslation(["common", "screens"]);
  const dispatch = useAppDispatch();
  const navigator = useNavigation<SettingsRouterNavigation>();
  const { colors } = useTheme();

  /**
   * Exit developer mode
   */
  const onExitDeveloper = (): void => {
    dispatch(setAppDeveloper(false));

    navigator.goBack();
  };

  return (
    <Page>
      <AppBar title={t("screens:settingsDeveloper.title")} />
      <ScrollView contentContainerStyle={styles.pageContent}>
        <List.Subheader style={styles.listSubheader}>
          {t("screens:settingsDeveloper.listSectionApp")}
        </List.Subheader>
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemEnvironment")}
          value={config.environment}
        />
        {/* NOTE: Apparently 'Constants.nativeAppVersion' shows Expo version??? */}
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemVersion")}
          value={Constants.manifest?.version ?? config.version ?? "N/A"}
        />
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemExpo")}
          value={Constants.expoVersion ?? "N/A"}
        />
        <List.Subheader style={styles.listSubheader}>
          {t("screens:settingsDeveloper.listSectionDevice")}
        </List.Subheader>
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemDeviceModel")}
          value={Device.modelName ?? "N/A"}
        />
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemDeviceOS")}
          value={`${Device.osName} ${Device.osVersion}`}
        />
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemDeviceType")}
          value={
            Device.isDevice
              ? t("screens:settingsDeveloper.listItemDeviceTypePhone")
              : t("screens:settingsDeveloper.listItemDeviceTypeEmulator")
          }
        />
        <Button
          color={colors.error}
          style={styles.exitButton}
          onPress={onExitDeveloper}
        >
          {t("screens:settingsDeveloper.buttonExitDeveloper")}
        </Button>
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
  },
  listSubheader: {
    marginTop: 16,
  },
  exitButton: {
    margin: 24,
    marginTop: "auto",
  },
});

export default DeveloperScreen;
