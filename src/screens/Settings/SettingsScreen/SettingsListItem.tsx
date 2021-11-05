import React, { ReactElement, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";

// Utilities
import { useSnackbar } from "@hooks";

export type Props = {
  /** Whether list item is disabled */
  disabled?: boolean;
  /** Whether list item is implemented */
  implemented?: boolean;
  /** List item icon */
  icon: string;
  /** List item navigation route */
  route: string;
  /** List item title */
  title: string;
};

const SettingsListItem = (props: Props): ReactElement => {
  const { disabled = false, implemented = true, icon, route, title } = props;

  const { notifyError } = useSnackbar();
  const navigator = useNavigation();

  const onItemPress = useCallback(() => {
    if (!implemented) {
      notifyError("Not implemented yet");
      return;
    }

    navigator.navigate(route);
  }, [implemented, navigator, notifyError, route]);

  return (
    <List.Item
      {...props}
      disabled={disabled}
      left={(leftProps): ReactElement => (
        <List.Icon {...leftProps} icon={icon} />
      )}
      title={title}
      right={(rightProps): ReactElement | null =>
        disabled ? null : <List.Icon {...rightProps} icon="chevron-right" />
      }
      onPress={onItemPress}
    />
  );
};

export default SettingsListItem;
