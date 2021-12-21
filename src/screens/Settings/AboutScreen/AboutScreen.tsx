import React, { ReactElement, useMemo } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { openURL } from "expo-linking";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import ContributorListItem from "./ContributorListItem";

// Utilities
import config from "@config";
import { sharedColors } from "@theme";
import { MaterialCommunityIcons } from "@typings/app.types";

interface IDeveloperActions {
  icon: keyof MaterialCommunityIcons;
  name: string;
  url: string;
}

export type ContributorActionType =
  | "development"
  | "documentation"
  | "localization";

interface ContributorActions {
  /** Contributor action description */
  description: string;
  /** Contributor action type */
  type: ContributorActionType;
}

export interface Contributor {
  /** List of contributor's actions */
  actions: ContributorActions[];
  /** Avatar colour */
  color?: string;
  /** Contributor name */
  name: string;
  /** Contributor website */
  website?: string;
}

const contributors: Contributor[] = [
  {
    actions: [
      { description: "Primary developer", type: "development" },
      { description: "English", type: "localization" },
    ],
    color: "#B80F0A",
    name: "Kendall Roth",
    website: "https://www.kendallroth.ca",
  },
  {
    actions: [{ description: "Spanish", type: "localization" }],
    color: "#FFA500",
    name: "Lukasz Antos",
  },
];

const AboutScreen = (): ReactElement => {
  const { t } = useTranslation(["screens"]);

  const { colors } = useTheme();

  const { links } = config;
  const developerActions: IDeveloperActions[] = [
    {
      icon: "account",
      name: t("screens:settingsAbout.chipPortfolio"),
      url: links.developerUrl,
    },
    {
      icon: "github",
      name: t("screens:settingsAbout.chipRepository"),
      url: links.repositoryUrl,
    },
    {
      icon: "email",
      name: t("screens:settingsAbout.chipContact"),
      url: `mailto:${links.developerEmail}`,
    },
  ];

  const themeStyles = useMemo(
    () => ({
      aboutDescription: {
        borderLeftColor: colors.primary,
      },
      developerChips: {
        backgroundColor: `${colors.primary}aa`,
      },
    }),
    [colors],
  );

  /** Open an external link */
  const onLink = (link: string): void => {
    openURL(link);
  };

  return (
    <Page>
      <AppBar title={t("screens:settingsAbout.title")} />
      <ScrollView contentContainerStyle={styles.pageContent}>
        <View style={[styles.aboutDescription, themeStyles.aboutDescription]}>
          <Text style={styles.aboutDescriptionText}>
            {t("screens:settingsAbout.appDescription")}
          </Text>
        </View>
        <Text style={styles.aboutContributorsTitle}>
          {t("screens:settingsAbout.contributorsTitle")}
        </Text>
        <View style={styles.aboutContributorsList}>
          {contributors.map(
            (c, idx): ReactElement => (
              <ContributorListItem
                key={c.name}
                align={idx % 2 ? "left" : "right"}
                contributor={c}
              />
            ),
          )}
        </View>
        <View style={styles.aboutDeveloper}>
          <Text style={styles.aboutDeveloperText}>
            {t("screens:settingsAbout.appDeveloped", {
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
                    color={`${sharedColors.white}aa`}
                    name={action.icon}
                    size={20}
                  />
                )}
                style={[
                  styles.aboutDeveloperActionsChip,
                  themeStyles.developerChips,
                ]}
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
  aboutContributorsList: {
    marginHorizontal: -pagePadding,
    marginBottom: 24,
  },
  aboutContributorsTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  aboutDescription: {
    marginBottom: 16,
    paddingVertical: 4,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderRadius: 4,
  },
  aboutDescriptionText: {
    fontSize: 18,
    lineHeight: 24,
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
  },
  aboutDeveloperActionsText: {
    color: sharedColors.white,
    fontSize: 15,
  },
  aboutDeveloperText: {
    textAlign: "center",
  },
  pageContent: {
    flexGrow: 1,
    padding: pagePadding,
  },
});

export default AboutScreen;
