import React, { Fragment, ReactElement, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Badge, Surface, Text, useTheme } from "react-native-paper";

// Components
import { ProgressIcon } from "@components/icons";

// Types
import { LeftRight } from "@typings/app.types";

type HomeScreenSectionProps = {
  /** Number of items */
  count?: number;
  /** Whether section is left/right aligned */
  direction: LeftRight;
  /** Combined progress of items */
  progress?: number;
  /** Progress indicator message */
  progressText?: string;
  /** Progress indicator display value */
  progressValue?: number;
  /** Styles */
  style?: StyleProp<ViewStyle>;
  /** Section title */
  title: string;
};

const HomeScreenSection = (
  props: HomeScreenSectionProps,
): ReactElement | null => {
  const {
    count = 0,
    direction,
    progress = 1,
    progressText,
    progressValue,
    style,
    title,
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
        {Boolean(count) && (
          <Badge style={themeStyles.sectionTitleBadge}>{count}</Badge>
        )}
      </View>
      <View style={styles.sectionContent}>
        {count ? (
          <Fragment>
            <ProgressIcon
              progress={progress}
              style={styles.sectionContentProgress}
              value={progressValue}
            />
            <Text style={styles.sectionContentProgressText}>
              {progressText}
            </Text>
          </Fragment>
        ) : (
          <View style={styles.sectionContentEmpty}>
            <Text style={styles.sectionContentEmptyText}>Empty</Text>
          </View>
        )}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
    elevation: 2,
    overflow: "hidden",
  },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  sectionContentEmpty: {},
  sectionContentEmptyText: {},
  sectionContentProgress: {
    marginRight: 16,
  },
  sectionContentProgressText: {
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
