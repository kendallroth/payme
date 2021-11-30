import React, { ReactElement } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { company as fakeCompany, date as fakeDate } from "faker";

// Components
import { AppBar, Page } from "@components/layout";
import EventList from "./EventList";

// Utilities
import { useSnackbar } from "@hooks";
import { addEvent, removeEvent, selectEvents } from "@store/slices/events";
import { EventsService } from "@services";
import { randomBool, randomItem } from "@utilities/misc.util";

// Types
import { IEvent } from "@typings/event.types";

const EventListScreen = (): ReactElement => {
  const { t } = useTranslation(["screens"]);

  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const { notifyError } = useSnackbar();

  const { futureEvents, pastEvents } =
    EventsService.separateEventsByTime(events);

  /**
   * Add an event
   */
  const onEventAdd = (): void => {
    const dummyEvent: IEvent = {
      cost: randomBool() ? randomItem([5, 10, 15, 20]) : undefined,
      createdAt: dayjs().toISOString(),
      date: dayjs(
        randomBool() ? fakeDate.future() : fakeDate.recent(),
      ).toISOString(),
      id: uuidv4(),
      title: fakeCompany.companyName(),
    };

    dispatch(addEvent(dummyEvent));
  };

  /**
   * Remove an event
   *
   * TODO: Overhaul with new "removal" workflow (this flow is dangerous)!
   *
   * @param eventId - Removed event ID
   */
  const onEventRemove = (eventId: string): void => {
    dispatch(removeEvent(eventId));
  };

  return (
    <Page>
      <AppBar title={t("screens:eventList.title")} />
      <ScrollView
        contentContainerStyle={styles.pageContent}
        style={styles.pageScroll}
      >
        <EventList
          events={futureEvents}
          style={styles.eventList}
          title={t("screens:eventList.listFuture")}
          onRemove={onEventRemove}
        />
        <EventList
          events={pastEvents}
          style={styles.eventList}
          title={t("screens:eventList.listPast")}
          onRemove={onEventRemove}
        />
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.eventFAB}
        onPress={(): void => notifyError("Not implemented yet")}
        onLongPress={onEventAdd}
      />
    </Page>
  );
};

const listPadding = 20;
const styles = StyleSheet.create({
  eventFAB: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
  },
  eventList: {
    marginBottom: listPadding,
  },
  pageContent: {
    padding: listPadding,
    paddingBottom: 0, // Applied through margin between cards
  },
  pageScroll: {
    flex: 1,
  },
});

export default EventListScreen;
