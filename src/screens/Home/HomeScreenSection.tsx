import React, { Fragment, ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Badge, Surface, Text, useTheme } from "react-native-paper";

// Components
import { ProgressIcon } from "@components/icons";
import { Alert } from "@components/typography";

// Utilities
import { getShadowStyles } from "@styles/utilities";

// Types
import { LeftRight } from "@typings/app.types";

type HomeScreenSectionProps<ItemType> = {
  /** Whether section is left/right aligned */
  align: LeftRight;
  /** Whether section is implemented */
  comingSoon?: boolean;
  /** Completed section text */
  completedText: string;
  /** Empty section text */
  emptyText: string;
  /** Section items */
  items: ItemType[];
  /** Callback to render an item */
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
    align,
    comingSoon = false,
    completedText,
    emptyText,
    items,
    renderItem,
    style,
    title,
    total = 0,
    unpaid = 0,
  } = props;

  const { colors } = useTheme();
  const { t } = useTranslation(["common"]);

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
        align === "left" ? styles.sectionLeft : styles.sectionRight,
        style,
      ]}
    >
      <View
        style={[
          styles.sectionTitle,
          themeStyles.sectionTitle,
          align === "left" ? styles.sectionTitleLeft : styles.sectionTitleRight,
        ]}
      >
        <Text style={[styles.sectionTitleText, themeStyles.sectionTitleText]}>
          {title}
        </Text>
        {Boolean(total) && (
          <Badge style={themeStyles.sectionTitleBadge}>{total}</Badge>
        )}
      </View>
      {!comingSoon || !total ? (
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
      ) : (
        <Alert
          iconSize={32}
          style={styles.sectionComingSoon}
          textStyle={styles.sectionComingSoonText}
        >
          {t("common:phrases.comingSoon")}
        </Alert>
      )}
    </Surface>
  );
};

const sectionBorderRadius = 8;
const contentPadding = 16;
const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
    elevation: 2,
    ...getShadowStyles(),
  },
  sectionComingSoon: {
    padding: contentPadding,
  },
  sectionComingSoonText: {
    alignSelf: "center",
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
    borderTopRightRadius: sectionBorderRadius,
    borderBottomRightRadius: sectionBorderRadius,
  },
  sectionRight: {
    marginLeft: 48,
    borderTopLeftRadius: sectionBorderRadius,
    borderBottomLeftRadius: sectionBorderRadius,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  sectionTitleLeft: {
    borderTopRightRadius: sectionBorderRadius,
  },
  sectionTitleRight: {
    borderTopLeftRadius: sectionBorderRadius,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreenSection;
