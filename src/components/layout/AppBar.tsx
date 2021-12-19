import React, { ReactElement } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Appbar as BaseAppBar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Components
import AppBarMenu from "./AppBarMenu";

// Utilities
import { sharedColors } from "@styles/theme";

export type Props = {
  children?: any;
  /** Whether back navigation is enabled */
  back?: boolean;
  /** Custom status bar height */
  statusBarHeight?: number;
  /** Page subtitle */
  subtitle?: string;
  /** Page title */
  title: string;
  /** Custom back handler */
  onBack?: () => void;
};

const AppBar = (props: Props): ReactElement => {
  const {
    back = true,
    children,
    statusBarHeight,
    subtitle,
    title,
    onBack,
  } = props;

  const navigation = useNavigation();
  const { dark } = useTheme();

  return (
    <BaseAppBar.Header
      dark={dark}
      statusBarHeight={statusBarHeight ?? StatusBar.currentHeight}
      style={styles.header}
    >
      {back && (
        <BaseAppBar.BackAction onPress={onBack ? onBack : navigation.goBack} />
      )}
      <BaseAppBar.Content subtitle={subtitle} title={title} />
      {children}
    </BaseAppBar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: sharedColors.transparent,
    elevation: 0,
    shadowOpacity: 0,
  },
});

AppBar.Action = BaseAppBar.Action;
AppBar.ActionMenu = AppBarMenu;

export default AppBar;
