import React, { ReactElement } from "react";
import { Text } from "react-native-paper";

// Components
import { AppBar, ComingSoon, Page } from "@components/layout";

const PeopleListScreen = (): ReactElement => {
  return (
    <Page>
      <AppBar title="People" />
      <ComingSoon />
    </Page>
  );
};

export default PeopleListScreen;
