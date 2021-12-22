import React, { ReactElement } from "react";
import { openURL } from "expo-linking";
import { StyleSheet, View } from "react-native";
import { Avatar, Chip, IconButton, Text, useTheme } from "react-native-paper";

// Utilities
import { getInitials } from "@utilities/string";

// Types
import { Contributor, ContributorActionType } from "./ContributorsScreen";
import { LeftRight, MaterialCommunityIcons } from "@typings/app.types";
import { getShadowStyles } from "@styles/utilities";

type ContributorListItemProps = {
  /** List item alignment */
  align?: LeftRight;
  /** Contributor */
  contributor: Contributor;
};

const ContributorActionIconMap: Record<
  ContributorActionType,
  keyof MaterialCommunityIcons
> = {
  development: "code-tags",
  documentation: "file-document-edit",
  localization: "flag",
};

const ContributorListItem = (props: ContributorListItemProps): ReactElement => {
  const { align, contributor } = props;

  const { colors } = useTheme();

  const themeStyles = {
    contributor: {
      backgroundColor: colors.surface,
    },
    contributorAvatar: {
      backgroundColor: contributor.color,
    },
  };

  /** Open an external link */
  const onLink = (link: string): void => {
    openURL(link);
  };

  return (
    <View
      key={contributor.name}
      style={[
        styles.contributor,
        themeStyles.contributor,
        align === "left" ? styles.contributorLeft : styles.contributorRight,
      ]}
    >
      <Avatar.Text
        label={getInitials(contributor.name)}
        size={48}
        style={[styles.contributorAvatar, themeStyles.contributorAvatar]}
      />
      <View style={styles.contributorContent}>
        <Text style={styles.contributorName}>{contributor.name}</Text>
        <View style={styles.contributorActions}>
          {contributor.actions.map((a): ReactElement => {
            const icon = ContributorActionIconMap[a.type];
            return (
              <Chip
                key={a.type}
                icon={icon}
                style={styles.contributorActionsChip}
              >
                {a.description}
              </Chip>
            );
          })}
        </View>
      </View>
      {Boolean(contributor.website) && (
        <IconButton
          color={colors.accent}
          icon="link"
          style={styles.contributorWebsite}
          onPress={(): void => onLink(contributor.website as string)}
        />
      )}
    </View>
  );
};

const chipSpacing = 4;
const styles = StyleSheet.create({
  contributor: {
    marginVertical: 8,
    flexDirection: "row",
    padding: 16,
    elevation: 2,
    ...getShadowStyles(),
  },
  contributorAvatar: {
    elevation: 2,
    ...getShadowStyles(1),
  },
  contributorLeft: {
    marginRight: 24,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  contributorRight: {
    marginLeft: 24,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  contributorActions: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: -chipSpacing,
    marginTop: 8,
  },
  contributorActionsChip: {
    margin: chipSpacing,
  },
  contributorContent: {
    flexGrow: 1,
    marginLeft: 16,
  },
  contributorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contributorWebsite: {
    marginLeft: 8,
  },
});

export default ContributorListItem;
