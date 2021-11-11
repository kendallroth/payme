import React, { ReactElement } from "react";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List, useTheme } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import DeveloperListItem from "./DeveloperListItem";

// Utilities
import config from "@config";
import { useAppDispatch, useAppLoader, useSnackbar } from "@hooks";
import { resetApp, setAppDeveloper } from "@store/slices/settings";

// Types
import { SettingsRouterNavigation } from "@screens/Settings/SettingsRouter";

const DeveloperScreen = (): ReactElement => {
  const { t } = useTranslation(["common", "screens"]);
  const dispatch = useAppDispatch();
  const loader = useAppLoader();
  const navigator = useNavigation<SettingsRouterNavigation>();
  const { notify } = useSnackbar();
  const { colors } = useTheme();

  /**
   * Reset the app state
   */
  const onAppResetPress = (): void => {
    Alert.alert(
      t("screens:settingsDeveloper.resetDataTitle"),
      t("screens:settingsDeveloper.resetDataDescription"),
      [
        { text: t("common:confirmations.cancel"), style: "cancel" },
        {
          text: t("common:confirmations.confirm"),
          onPress: async (): Promise<void> => {
            loader.show(t("screens:settingsDeveloper.resetDataLoading"));
            await dispatch(resetApp());
            loader.hide();
            notify(t("screens:settingsDeveloper.resetDataSuccess"));
          },
        },
      ],
    );
  };

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
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemVersion")}
          value={Constants.nativeAppVersion ?? "N/A"}
        />
        <DeveloperListItem
          title={t("screens:settingsDeveloper.listItemExpo")}
          value={Constants.expoRuntimeVersion ?? "N/A"}
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
        <List.Subheader style={styles.listSubheader}>
          {t("screens:settingsDeveloper.listSectionActions")}
        </List.Subheader>
        <List.Item
          description={t("screens:settingsDeveloper.listItemResetDescription")}
          left={(leftProps): ReactElement => (
            <List.Icon {...leftProps} icon="lock-reset" />
          )}
          title={t("screens:settingsDeveloper.listItemResetTitle")}
          onLongPress={onAppResetPress}
          onPress={(): void => {}}
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
