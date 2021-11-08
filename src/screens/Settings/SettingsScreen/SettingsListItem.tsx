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
  /** List item right slot (defaults to arrow icon) */
  right?: (props: any) => ReactElement;
  /** List item navigation route */
  route?: string;
  /** List item title */
  title: string;
  /** Press handler (if not route) */
  onPress?: () => void;
};

const SettingsListItem = (props: Props): ReactElement => {
  const {
    disabled = false,
    implemented = true,
    icon,
    right,
    route,
    title,
    onPress,
  } = props;

  const { notifyError } = useSnackbar();
  const navigator = useNavigation();

  const onItemPress = useCallback(() => {
    if (!implemented) {
      notifyError("Not implemented yet");
      return;
    }

    if (route) {
      navigator.navigate(route);
    } else if (onPress) {
      onPress();
    }
  }, [implemented, navigator, notifyError, onPress, route]);

  /**
   * Render right icon
   *
   * @param   rightProps - Right props
   * @returns Rendered right icon
   */
  const renderRight = (rightProps: any): ReactElement | null => {
    if (right) {
      return right(rightProps);
    } else {
      return disabled ? null : (
        <List.Icon {...rightProps} icon="chevron-right" />
      );
    }
  };

  return (
    <List.Item
      {...props}
      disabled={disabled}
      left={(leftProps): ReactElement => (
        <List.Icon {...leftProps} icon={icon} />
      )}
      title={title}
      right={renderRight}
      onPress={onItemPress}
    />
  );
};

export default SettingsListItem;
