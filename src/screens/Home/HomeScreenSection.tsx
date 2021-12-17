import React, { Fragment, ReactElement, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Badge, Surface, Text, useTheme } from "react-native-paper";

// Components
import { ProgressIcon } from "@components/icons";

// Types
import { LeftRight } from "@typings/app.types";

type HomeScreenSectionProps<ItemType> = {
  /** Completed section text */
  completedText: string;
  /** Empty section text */
  emptyText: string;
  /** Whether section is left/right aligned */
  direction: LeftRight;

  items: ItemType[];
  renderItem?: (item: ItemType) => ReactElement;

  /** Styles */
  style?: StyleProp<ViewStyle>;
  /** Section title */
  title: string;
  /** Total number of items */
  total?: number;
  /** Number of unpaid items */
  unpaid?: number;
};

const HomeScreenSection = <T extends object>(
  props: HomeScreenSectionProps<T>,
): ReactElement | null => {
  const {
    completedText,
    direction,
    emptyText,
    items,
    renderItem,
    style,
    title,
    total = 0,
    unpaid = 0,
  } = props;

  const { colors } = useTheme();

  const themeStyles = useMemo(
    () => ({
      sectionTitle: {
        backgroundColor: colors.primary,
      },
      sectionTitleText: {
        color: colors.white,
      },
      sectionTitleBadge: {
        backgroundColor: colors.white,
      },
    }),
    [colors],
  );

  const progress = (total - unpaid) / total;

  return (
    <Surface
      style={[
        styles.section,
        direction === "left" ? styles.sectionLeft : styles.sectionRight,
        style,
      ]}
    >
      <View style={[styles.sectionTitle, themeStyles.sectionTitle]}>
        <Text style={[styles.sectionTitleText, themeStyles.sectionTitleText]}>
          {title}
        </Text>
        {Boolean(total) && (
          <Badge style={themeStyles.sectionTitleBadge}>{total}</Badge>
        )}
      </View>
      <View style={styles.sectionContent}>
        {total && progress < 1 ? (
          <View style={styles.sectionContentList}>
            {renderItem ? items.map((item) => renderItem(item)) : null}
          </View>
        ) : (
          <Fragment>
            <ProgressIcon
              progress={progress}
              style={styles.sectionContentProgress}
              value={unpaid}
            />
            <Text style={styles.sectionContentProgressText}>
              {progress >= 1 && completedText}
              {!total && !unpaid && emptyText}
            </Text>
          </Fragment>
        )}
      </View>
    </Surface>
  );
};

const contentPadding = 16;
const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
    elevation: 2,
    overflow: "hidden",
  },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: contentPadding,
  },
  sectionContentList: {
    flexGrow: 1,
    marginHorizontal: -contentPadding,
    marginVertical: -contentPadding / 2,
  },
  sectionContentProgress: {
    marginRight: 16,
  },
  sectionContentProgressText: {
    flexShrink: 1,
    fontSize: 16,
  },
  sectionLeft: {
    marginRight: 48,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  sectionRight: {
    marginLeft: 48,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreenSection;
