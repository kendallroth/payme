import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

// Components
import { AppBar, ComingSoon, Page } from "@components/layout";

const PeopleListScreen = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <Page>
      <AppBar title={t("screens.people.title")} />
      <ComingSoon />
    </Page>
  );
};

export default PeopleListScreen;
