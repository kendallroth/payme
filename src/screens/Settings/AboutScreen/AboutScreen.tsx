import React, { ReactElement } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";

// Utilities
import config from "@config";
import { colors } from "@theme";

const AboutScreen = (): ReactElement => {
  const { t } = useTranslation();

  const { links } = config;
  const developerActions = [
    {
      icon: "account",
      name: t("screens.settingsAbout.chipPortfolio"),
      url: links.developerUrl,
    },
    {
      icon: "gitlab",
      name: t("screens.settingsAbout.chipRepository"),
      url: links.gitlabUrl,
    },
    {
      icon: "email",
      name: t("screens.settingsAbout.chipContact"),
      url: `mailto:${links.developerEmail}`,
    },
  ];

  /** Open an external link */
  const onLink = (link: string): void => {
    Linking.openURL(link);
  };

  return (
    <Page>
      <AppBar title={t("screens.settingsAbout.title")} />
      <ScrollView contentContainerStyle={styles.pageContent}>
        <Text style={styles.aboutDescription}>
          {t("screens.settingsAbout.appDescription")}
        </Text>
        <View style={styles.aboutDeveloper}>
          <Text style={styles.aboutDeveloperText}>
            {t("screens.settingsAbout.appDeveloped", {
              date: dayjs().format("YYYY"),
            })}
          </Text>
          <View style={styles.aboutDeveloperActions}>
            {developerActions.map((action) => (
              <Chip
                key={action.name}
                icon={(iconProps): ReactElement => (
                  <Icon
                    {...iconProps}
                    color={`${colors.white}aa`}
                    name={action.icon}
                    size={20}
                  />
                )}
                style={styles.aboutDeveloperActionsChip}
                textStyle={styles.aboutDeveloperActionsText}
                onPress={(): void => onLink(action.url)}
              >
                {action.name}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
    </Page>
  );
};

const pagePadding = 24;
const styles = StyleSheet.create({
  aboutDescription: {
    marginBottom: 16,
    paddingVertical: 4,
    paddingLeft: 16,
    fontSize: 18,
    lineHeight: 24,
    borderLeftWidth: 4,
    borderLeftColor: `${colors.primary}aa`,
    borderRadius: 4,
  },
  aboutDeveloper: {
    marginTop: "auto",
  },
  aboutDeveloperActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  aboutDeveloperActionsChip: {
    marginBottom: 8,
    marginRight: 8,
    backgroundColor: `${colors.primary}aa`,
  },
  aboutDeveloperActionsText: {
    color: colors.white,
    fontSize: 15,
  },
  aboutDeveloperText: {
    color: colors.primary,
    textAlign: "center",
  },
  pageContent: {
    flexGrow: 1,
    padding: pagePadding,
  },
});

export default AboutScreen;
