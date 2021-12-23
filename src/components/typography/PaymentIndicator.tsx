import React, { Fragment, ReactElement } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

type PaymentIndicatorProps = {
  /** Number of attending people (optional) */
  attending?: number | null;
  /** Whether attending count should always be shown (even if empty) */
  showAttending?: boolean;
  /** Style */
  style?: StyleProp<ViewStyle>;
  /** Number of unpaid attendees (optional) */
  unpaid?: number | null;
};

const PaymentIndicator = (
  props: PaymentIndicatorProps,
): ReactElement | null => {
  const { attending, showAttending = false, style, unpaid } = props;

  const { colors } = useTheme();

  const hasBoth = Boolean(attending && unpaid);
  if (!attending && !unpaid && !showAttending) return null;

  const iconSize = 20;

  return (
    <View style={[styles.indicator, style]}>
      {Boolean(unpaid) && (
        <Fragment>
          <Text style={styles.indicatorText}>{unpaid}</Text>
          <Icon
            color={colors.error}
            name="alert-circle"
            size={iconSize}
            style={styles.indicatorIcon}
          />
        </Fragment>
      )}
      {hasBoth && <Text style={styles.indicatorSeparator}>•</Text>}
      {Boolean(attending || showAttending) && (
        <Fragment>
          <Text style={styles.indicatorText}>{attending ?? "0"}</Text>
          <Icon
            color={attending ? colors.primary : colors.warning}
            name="account-multiple"
            size={iconSize}
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
    marginLeft: 4,
    marginRight: 6,
  },
});

export default PaymentIndicator;
