import React, { ComponentProps, ReactElement } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

// Types
import { MaterialCommunityIcons } from "@typings/app.types";

type PortalFABProps = {
  /** FAB icon */
  icon: keyof MaterialCommunityIcons;
} & ComponentProps<typeof FAB>;

const PortalFAB = (props: PortalFABProps): ReactElement => {
  const { icon, ...rest } = props;

  const isScreenFocused = useIsFocused();

  return (
    <Portal>
      <FAB
        icon={icon}
        style={styles.portalFAB}
        visible={isScreenFocused}
        {...rest}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  portalFAB: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
    // Include space for bottom navbar
    marginBottom: 70,
  },
});

export default PortalFAB;
