import React, { ComponentProps, ReactElement } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

// Types
import { MaterialCommunityIcons } from "@typings/app.types";

type ScreenFABProps = {
  /** FAB icon */
  icon: keyof MaterialCommunityIcons;
  /** FAB label */
  label?: string;
  /** Whether FAB is visible */
  visible?: boolean;
} & ComponentProps<typeof FAB>;

const ScreenFAB = (props: ScreenFABProps): ReactElement => {
  const { icon, label, visible = true, ...rest } = props;

  const isScreenFocused = useIsFocused();

  return (
    <FAB
      icon={icon}
      label={label}
      style={styles.portalFAB}
      visible={isScreenFocused && visible}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  portalFAB: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
  },
});

export default ScreenFAB;
