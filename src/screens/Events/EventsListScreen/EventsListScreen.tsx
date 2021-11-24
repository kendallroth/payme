import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

// Components
import { AppBar, ComingSoon, Page } from "@components/layout";

const EventsListScreen = (): ReactElement => {
  const { t } = useTranslation(["screens"]);
  return (
    <Page>
      <AppBar title={t("screens:events.title")} />
      <ComingSoon />
    </Page>
  );
};

export default EventsListScreen;
