import React, { ReactElement } from "react";

// Components
import { AppBar, ComingSoon, Page } from "@components/layout";

const EventsListScreen = (): ReactElement => {
  return (
    <Page>
      <AppBar title="Events" />
      <ComingSoon />
    </Page>
  );
};

export default EventsListScreen;
