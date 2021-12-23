import React, { ReactElement } from "react";
import { openURL } from "expo-linking";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Components
import { AppBar, Page } from "@components/layout";
import { Quote } from "@components/typography";
import ContributorListItem from "./ContributorListItem";
import { Button } from "react-native-paper";

// Utilities
import config from "@config";

export type ContributorActionType =
  | "development"
  | "documentation"
  | "localization"
  | "testing";

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
    color: "#3F51B5",
    name: "Lukasz Antos",
  },
  {
    actions: [{ description: "Testing", type: "testing" }],
    color: "#FFA500",
    name: "Kyle Roth",
  },
];

const ContributorsScreen = (): ReactElement => {
  const { t } = useTranslation(["screens"]);

  /** Open an external link */
  const onLink = (link: string): void => {
    openURL(link);
  };

  return (
    <Page>
      <AppBar title={t("screens:settingsContributors.title")} />
      <ScrollView contentContainerStyle={styles.pageContent}>
        <Quote>{t("screens:settingsContributors.contributorThanks")}</Quote>
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
        <View style={styles.aboutContributorsPrompt}>
          <Text style={styles.alignContributorsPromptText}>
            {t("screens:settingsContributors.contributorPrompt")}
          </Text>
          <Button
            icon="github"
            style={styles.alignContributorsPromptButton}
            onPress={(): void => onLink(`${config.links.repositoryUrl}/issues`)}
          >
            GitHub
          </Button>
        </View>
      </ScrollView>
    </Page>
  );
};

const pagePadding = 24;
const styles = StyleSheet.create({
  aboutContributorsList: {
    marginHorizontal: -pagePadding,
    marginVertical: 24,
  },
  aboutContributorsPrompt: {
    alignItems: "center",
  },
  alignContributorsPromptButton: {
    marginVertical: 16,
  },
  alignContributorsPromptText: {
    fontSize: 16,
  },
  pageContent: {
    flexGrow: 1,
    padding: pagePadding,
  },
});

export default ContributorsScreen;
