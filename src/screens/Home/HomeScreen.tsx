import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

// Components
import { AppBar, Page } from "@components/layout";
import HomeScreenSection from "./HomeScreenSection";

// Utilities
import { selectEvents } from "@store/slices/events";
import { selectPeople } from "@store/slices/people";

// Types
import { RootRouterNavigation } from "src/AppRouter";

const HomeScreen = (): ReactElement | null => {
  const navigation = useNavigation<RootRouterNavigation>();

  const events = useSelector(selectEvents);
  const people = useSelector(selectPeople);
  const { t } = useTranslation(["screens"]);

  const unpaidEvents = events.reduce(
    (accum, e) => (e.stats ? (e.stats.unpaid > 0 ? accum + 1 : accum) : accum),
    0,
  );
  const eventProgress = (events.length - unpaidEvents) / events.length;

  return (
    <Page>
      <AppBar back={false} title="PayMe">
        <AppBar.Action
          icon="cog"
          onPress={(): void => navigation.navigate("SettingsRouter")}
        />
      </AppBar>
      <Image source={require("@assets/icon.png")} style={styles.pageLogo} />
      <View style={styles.pageStats}>
        <HomeScreenSection
          count={events.length}
          direction="left"
          progress={eventProgress}
          progressText={
            // TODO: Refactor text
            eventProgress >= 1
              ? "All events are paid!"
              : "Some events are unpaid!"
          }
          progressValue={unpaidEvents}
          style={styles.pageStat}
          title={t("screens:eventList.title")}
        />
        <HomeScreenSection
          count={people.length}
          direction="right"
          // TODO: Refactor fake progress/text
          progress={1}
          progressText={"All people have paid!"}
          style={styles.pageStat}
          title={t("screens:peopleList.title")}
        />
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  pageLogo: {
    height: 64,
    width: 64,
    alignSelf: "center",
    borderRadius: 16,
  },
  pageStat: {
    marginVertical: 16,
  },
  pageStats: {
    marginTop: 48,
    marginBottom: 24,
  },
});

export default HomeScreen;
