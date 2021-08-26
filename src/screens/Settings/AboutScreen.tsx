import dayjs from "dayjs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

// Utilities
import config from "@config";
import { colors } from "@theme";
import { ScrollView } from "react-native-gesture-handler";

const AboutScreen = (): ReactElement | null => {
  const { links } = config;
  const developerActions = [
    { icon: "account", name: "Portfolio", url: links.developerUrl },
    { icon: "gitlab", name: "Repository", url: links.gitlabUrl },
    { icon: "email", name: "Contact", url: `mailto:${links.developerEmail}` },
  ];

  /** Open an external link */
  const onLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.pageContent}>
        <Text style={styles.aboutDescription}>
          &ldquo;PayMe&rdquo; is a simple mobile app to track who has paid for
          an event.
        </Text>
        <View style={styles.aboutDeveloper}>
          <Text style={styles.aboutDeveloperText}>
            Developed by Kendall Roth &copy; {dayjs().format("YYYY")}
          </Text>
          <View style={styles.aboutDeveloperActions}>
            {developerActions.map((action) => (
              <Chip
                key={action.name}
                icon={(iconProps) => (
                  <Icon
                    {...iconProps}
                    color={`${colors.white}aa`}
                    name={action.icon}
                    size={20}
                  />
                )}
                style={styles.aboutDeveloperActionsChip}
                textStyle={styles.aboutDeveloperActionsText}
                onPress={() => onLink(action.url)}
              >
                {action.name}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 15,
  },
  aboutDeveloperText: {
    color: colors.primary,
    textAlign: "center",
  },
  page: {
    flexGrow: 1,
  },
  pageContent: {
    flexGrow: 1,
    padding: pagePadding,
  },
});

export default AboutScreen;
