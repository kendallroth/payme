import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

export type Props = {
  /** Page content */
  children: ReactElement | ReactElement[];
};

/** Common page component (currently just page styles) */
const Page = (props: Props): ReactElement => {
  const { children } = props;

  return <View style={styles.page}>{children}</View>;
};

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
  },
});

export default Page;
