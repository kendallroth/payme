import React, { ReactElement, useMemo } from "react";
import { sort } from "fast-sort";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
import { AppBar, Page } from "@components/layout";
import EventListItem from "@screens/Events/EventListScreen/EventListItem";
import HomeScreenSection from "./HomeScreenSection";

// Utilities
import { useAppSelector } from "@hooks";
import {
  selectEvents,
  selectEventsCount,
  selectEventsUnpaidCount,
} from "@store/slices/events";
import { selectPeople } from "@store/slices/people";

// Types
import { IEvent } from "@typings/event.types";
import { RootRouterNavigation } from "src/AppRouter";

const getTopUnpaidEvents = (events: IEvent[]): IEvent[] => {
  const unpaidEvents = events.filter((e) => e.stats?.unpaid);
  const topUnpaidEvents = sort(unpaidEvents)
    .desc((e) => e.stats?.unpaid)
    .slice(0, 3);
  return sort(topUnpaidEvents).desc((e) => e.date);
};

const HomeScreen = (): ReactElement | null => {
  const navigation = useNavigation<RootRouterNavigation>();

  const events = useAppSelector(selectEvents);
  const people = useAppSelector(selectPeople);
  const { t } = useTranslation(["screens"]);

  const eventCountTotal = useAppSelector(selectEventsCount);
  const eventCountUnpaid = useAppSelector(selectEventsUnpaidCount);

  const topUnpaidEvents = useMemo(() => getTopUnpaidEvents(events), [events]);

  /**
   * Open an event's details
   *
   * @param event - Selected event
   */
  const onEventPress = (event: IEvent): void => {
    // TODO: Figure out how to prevent "back" from going through events list...
    navigation.navigate("MainRouter", {
      screen: "Events",
      params: {
        screen: "EventDetails",
        params: {
          eventId: event.id,
        },
      },
    });
  };

  return (
    <Page>
      <AppBar back={false} title="PayMe">
        <AppBar.Action
          icon="cog"
          onPress={(): void => navigation.navigate("SettingsRouter")}
        />
      </AppBar>
      <ScrollView contentContainerStyle={styles.pageScroll}>
        <Image source={require("@assets/icon.png")} style={styles.pageLogo} />
        <View style={styles.pageStats}>
          <HomeScreenSection
            completedText={t("screens:home.eventsAllPaid")}
            direction="left"
            emptyText={t("screens:home.eventsEmpty")}
            items={topUnpaidEvents}
            style={styles.pageStat}
            renderItem={(event): ReactElement => (
              <EventListItem
                key={event.id}
                event={event}
                onPress={onEventPress}
              />
            )}
            title={t("screens:eventList.title")}
            total={eventCountTotal}
            unpaid={eventCountUnpaid}
          />
          <HomeScreenSection
            completedText={t("screens:home.peopleAllPaid")}
            direction="right"
            emptyText={t("screens:home.peopleEmpty")}
            items={[]}
            // TODO: Enable tracking people unpaid progress
            style={styles.pageStat}
            title={t("screens:peopleList.title")}
            total={people.length}
          />
        </View>
      </ScrollView>
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
  pageScroll: {
    flexGrow: 1,
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
