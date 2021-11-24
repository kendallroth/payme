import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { List, useTheme } from "react-native-paper";

type SettingsModalListItemProps = {
  /** Whether item is disabled */
  disabled?: boolean;
  /** Item left slot */
  left: any;
  /** Item title */
  title: string;
  /** Whether item is selected */
  selected: boolean;
  /** Press handler */
  onPress: () => void;
};

const SettingsModalListItem = (
  props: SettingsModalListItemProps,
): ReactElement => {
  const { disabled = false, selected = false, title, onPress, ...rest } = props;

  const { colors } = useTheme();

  return (
    <List.Item
      {...rest}
      disabled={disabled}
      style={[disabled ? styles.itemDisabled : undefined]}
      title={title}
      titleStyle={[selected ? styles.itemTitleSelected : undefined]}
      right={(rightProps): ReactElement | null =>
        selected ? (
          <List.Icon
            {...rightProps}
            color={colors.primary}
            icon="check-circle"
          />
        ) : null
      }
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  itemDisabled: {
    opacity: 0.6,
  },
  itemTitleSelected: {
    fontWeight: "700",
  },
});

export default SettingsModalListItem;
