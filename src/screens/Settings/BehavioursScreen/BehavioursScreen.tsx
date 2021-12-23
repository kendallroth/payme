import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

// Components
import { AppBar, Page } from "@components/layout";
import BehavioursScreenListItemSwitch from "./BehavioursScreenListItemSwitch";

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
        <BehavioursScreenListItemSwitch
          description={t(
            "screens:settingsBehaviours.listItemTabHistoryResetDescription",
          )}
          stateKey="tabsResetHistory"
          title={t("screens:settingsBehaviours.listItemTabHistoryResetTitle")}
          value={appBehaviours.tabsResetHistory}
          onChange={onBooleanChange}
        />
        <BehavioursScreenListItemSwitch
          description={t(
            "screens:settingsBehaviours.listItemSelectAttendeeCheckboxRowsDescription",
          )}
          stateKey="selectAttendeeCheckboxRows"
          title={t(
            "screens:settingsBehaviours.listItemSelectAttendeeCheckboxRowsTitle",
          )}
          value={appBehaviours.selectAttendeeCheckboxRows}
          onChange={onBooleanChange}
        />
        <BehavioursScreenListItemSwitch
          description={t(
            "screens:settingsBehaviours.listItemShowPaymentProgressDescription",
          )}
          stateKey="showPaymentPercentage"
          title={t(
            "screens:settingsBehaviours.listItemShowPaymentProgressTitle",
          )}
          value={appBehaviours.showPaymentPercentage}
          onChange={onBooleanChange}
        />
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
  },
});

export default BehavioursScreen;
