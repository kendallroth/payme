import React, { ComponentProps, ReactElement } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

// Types
import { MaterialCommunityIcons } from "@typings/app.types";

// NOTE: Switching away from the Portal fixed the issue with bottom position
//         on iOS, but introduced a change to how the buttons are rendered.
//         Since they now are mounted in screens, they do not animate out!

type ScreenFABProps = {
  /** FAB icon */
  icon: keyof MaterialCommunityIcons;
} & ComponentProps<typeof FAB>;

const ScreenFAB = (props: ScreenFABProps): ReactElement => {
  const { icon, ...rest } = props;

  const isScreenFocused = useIsFocused();

  return (
    <FAB
      icon={icon}
      style={styles.portalFAB}
      visible={isScreenFocused}
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
