import React, { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Appbar, Menu, useTheme } from "react-native-paper";

// Types
import { MaterialCommunityIcons } from "@typings/app.types";

type AppBarMenuProps = {
  /** Menu items */
  children: any;
  /** Action icon */
  icon?: keyof MaterialCommunityIcons;
  /** Style */
  style?: ViewStyle;
};

export type AppBarMenuRef = {
  /** Close the menu */
  close: () => void;
};

const AppBarMenu = forwardRef<AppBarMenuRef, AppBarMenuProps>(
  (props: AppBarMenuProps, ref) => {
    const { children, icon = "dots-vertical", style } = props;

    const [menuOpen, setMenuOpen] = useState(false);
    const { colors, dark } = useTheme();

    useImperativeHandle(ref, (): AppBarMenuRef => {
      return {
        close: (): void => setMenuOpen(false),
      };
    });

    return (
      <Menu
        anchor={
          <Appbar.Action
            color={dark ? colors.white : colors.black}
            icon={icon}
            onPress={(): void => setMenuOpen(true)}
          />
        }
        style={[styles.menuStyle, style]}
        visible={menuOpen}
        onDismiss={(): void => setMenuOpen(false)}
      >
        {children}
      </Menu>
    );
  },
);

const styles = StyleSheet.create({
  menuStyle: {
    minWidth: 200,
  },
});

export default AppBarMenu;
