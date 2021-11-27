import React, { ReactElement } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { openURL } from "expo-linking";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";

// Utilities
import config from "@config";

const ReportBugScreen = (): ReactElement => {
  const { t } = useTranslation(["screens"]);

  const { colors } = useTheme();

  const { links } = config;

  /** Open GitHub issues */
  const onOpenGitHub = (): void => {
    openURL(`${links.repositoryUrl}/issues`);
  };

  return (
    <Page>
      <AppBar title={t("screens:settingsReportBug.title")} />
      <ScrollView contentContainerStyle={styles.pageContent}>
        <Icon
          color={colors.error}
          name="bug"
          size={64}
          style={styles.pageIcon}
        />
        <Text style={styles.pageTitle}>
          {t("screens:settingsReportBug.reportTitle")}
        </Text>
        <Text style={styles.pageDescription}>
          {t("screens:settingsReportBug.reportDescription")}
        </Text>
        <Button
          color={colors.error}
          icon="open-in-new"
          style={styles.pageActionGitHub}
          onPress={onOpenGitHub}
        >
          {t("screens:settingsReportBug.actionGitHub")}
        </Button>
      </ScrollView>
    </Page>
  );
};

const pagePadding = 24;
const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
    padding: pagePadding,
  },
  pageDescription: {
    fontSize: 16,
  },
  pageIcon: {
    alignSelf: "center",
    marginBottom: 16,
  },
  pageActionGitHub: {
    alignSelf: "center",
    marginTop: 16,
    padding: 16,
  },
  pageTitle: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReportBugScreen;
