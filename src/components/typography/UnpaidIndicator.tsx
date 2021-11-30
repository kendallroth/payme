import React, { ReactElement } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

type UnpaidIndicatorProps = {
  /** Number of unpaid items */
  count: number | null;
  /** Style */
  style?: StyleProp<ViewStyle>;
};

const UnpaidIndicator = (props: UnpaidIndicatorProps): ReactElement | null => {
  const { count, style } = props;

  const { colors } = useTheme();

  if (!count) return null;

  return (
    <View style={[styles.indicator, style]}>
      <Text style={styles.indicatorText}>{count}</Text>
      <Icon
        color={colors.error}
        name="information"
        size={20}
        style={styles.indicatorIcon}
      />
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
});

export default UnpaidIndicator;
