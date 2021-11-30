import React, { Fragment, ReactElement } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

type UnpaidIndicatorProps = {
  /** Number of attending people (optional) */
  attending?: number | null;
  /** Style */
  style?: StyleProp<ViewStyle>;
  /** Number of unpaid attendees (optional) */
  unpaid?: number | null;
};

const UnpaidIndicator = (props: UnpaidIndicatorProps): ReactElement | null => {
  const { attending, style, unpaid } = props;

  const { colors } = useTheme();

  const hasBoth = Boolean(attending && unpaid);
  if (!attending && !unpaid) return null;

  return (
    <View style={[styles.indicator, style]}>
      {Boolean(unpaid) && (
        <Fragment>
          <Text style={styles.indicatorText}>{unpaid}</Text>
          <Icon
            color={colors.error}
            name="alert-circle"
            size={20}
            style={styles.indicatorIcon}
          />
        </Fragment>
      )}
      {hasBoth && <Text style={styles.indicatorSeparator}>•</Text>}
      {Boolean(attending) && (
        <Fragment>
          <Text style={styles.indicatorText}>{attending}</Text>
          <Icon
            color={colors.primary}
            name="account-multiple"
            size={20}
            style={styles.indicatorIcon}
          />
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicatorIcon: {
    marginLeft: 4,
  },
  indicatorText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  indicatorSeparator: {
    marginHorizontal: 8,
  },
});

export default UnpaidIndicator;
