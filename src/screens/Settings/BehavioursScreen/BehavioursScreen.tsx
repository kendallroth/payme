import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { List, Switch } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import { Alert } from "@components/typography";

// Utilities
import { useAppDispatch, useAppSelector } from "@hooks";
import { selectBehaviours, setAppBehaviour } from "@store/slices/settings";

// Types
import { IAppBehaviours } from "@typings/settings.types";

const BehavioursScreen = (): ReactElement => {
  const dispatch = useAppDispatch();
  const appBehaviours = useAppSelector(selectBehaviours);
  const { t } = useTranslation(["screens"]);

  /**
   * Change a boolean behaviour setting
   *
   * @param key   - Behaviour setting key
   * @param value - Behaviour value
   */
  const onBooleanChange = (key: keyof IAppBehaviours, value: boolean): void => {
    dispatch(
      setAppBehaviour({
        [key]: value,
      }),
    );
  };

  return (
    <Page>
      <AppBar title={t("screens:settingsBehaviours.title")} />
      <ScrollView contentContainerStyle={styles.pageContent}>
        <List.Item
          description={t(
            "screens:settingsBehaviours.listItemTabHistoryResetDescription",
          )}
          right={(): ReactElement => (
            <Switch
              value={appBehaviours.tabsResetHistory}
              onValueChange={(val: boolean): void =>
                onBooleanChange("tabsResetHistory", val)
              }
            />
          )}
          title={t("screens:settingsBehaviours.listItemTabHistoryResetTitle")}
        />
        <Alert style={styles.pageAlert}>
          {t("screens:settingsBehaviours.moreBehavioursAlert")}
        </Alert>
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
  },
  pageAlert: {
    marginTop: 24,
    paddingHorizontal: 24,
    alignSelf: "center",
  },
});

export default BehavioursScreen;
