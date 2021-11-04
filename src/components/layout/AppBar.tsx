import React, { ReactElement } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Appbar as BaseAppBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Utilities
import { colors } from "@styles/theme";

export type Props = {
  children?: any;
  /** Whether back navigation is enabled */
  back?: boolean;
  /** Page subtitle */
  subtitle?: string;
  /** Page title */
  title: string;
};

const AppBar = (props: Props): ReactElement => {
  const { back = true, children, subtitle, title } = props;

  const navigation = useNavigation();

  return (
    <BaseAppBar.Header
      dark={false}
      statusBarHeight={StatusBar.currentHeight}
      style={styles.header}
    >
      {back && <BaseAppBar.BackAction onPress={navigation.goBack} />}
      <BaseAppBar.Content subtitle={subtitle} title={title} />
      {children}
    </BaseAppBar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
});

AppBar.Action = BaseAppBar.Action;

export default AppBar;
