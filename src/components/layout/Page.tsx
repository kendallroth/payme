import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export type Props = {
  /** Page content */
  children: ReactElement | (ReactElement | false | null)[];
};

/** Common page component (currently just page styles) */
const Page = (props: Props): ReactElement => {
  const { children } = props;

  const { colors } = useTheme();

  const pageStyles = {
    backgroundColor: colors.background,
  };

  return <View style={[styles.page, pageStyles]}>{children}</View>;
};

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
  },
});

export default Page;
