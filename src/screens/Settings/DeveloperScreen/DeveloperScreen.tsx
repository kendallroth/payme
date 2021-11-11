import React, { ReactElement } from "react";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List } from "react-native-paper";

// Components
import { AppBar, Page, Spacer } from "@components/layout";
import DeveloperListItem from "./DeveloperListItem";

// Utilities
import config from "@config";
import { useAppDispatch } from "@hooks";
import { setAppDeveloper } from "@store/slices/settings";
import { colors } from "@theme";

// Types
import { SettingsRouterNavigation } from "@screens/Settings/SettingsRouter";

const DeveloperScreen = (): ReactElement => {
  const { t } = useTranslation(["screens"]);
  const dispatch = useAppDispatch();
  const navigator = useNavigation<SettingsRouterNavigation>();

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
        <List.Subheader>
          {t("screens:settingsDeveloper.listSectionApp")}
        </List.Subheader>
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemEnvironment")}
          value={config.environment}
        />
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemVersion")}
          value={Constants.nativeAppVersion ?? "N/A"}
        />
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemExpo")}
          value={Constants.expoRuntimeVersion ?? "N/A"}
        />
        <List.Subheader>
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
          value={Device.isDevice ? "Phone" : "Emulator"}
        />
        <Button
          color={colors.error}
          style={styles.exitButton}
          onPress={onExitDeveloper}
        >
          Exit Developer Mode
        </Button>
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
  },
  exitButton: {
    margin: 24,
    marginTop: "auto",
  },
});

export default DeveloperScreen;
