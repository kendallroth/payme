import React, { ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

// Components
import { DeleteEventDialog, ManageEventSheet } from "@components/dialogs";
import { AppBar, Page, ScreenFAB } from "@components/layout";
import EventList from "./EventList";

// Utilities
import { useAppDispatch, useAppSelector, useSnackbar } from "@hooks";
import { addEvent, removeEvent, selectEvents } from "@store/slices/events";
import { EventsService } from "@services";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { IEvent, IEventBase } from "@typings/event.types";

const EventListScreen = (): ReactElement => {
  const [deletedEvent, setDeletedEvent] = useState<IEvent | null>(null);
  const manageEventRef = useRef<BottomSheetRef>(null);

  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEvents);
  const { notify } = useSnackbar();
  const { t } = useTranslation(["common", "screens"]);

  const { futureEvents, pastEvents } =
    EventsService.separateEventsByTime(events);

  /**
   * Prompt for confirmation before deleting a event
   *
   * @param event - Deleted event
   */
  const onEventDeletePress = (event: IEvent): void => {
    setDeletedEvent(event);
  };

  /**
   * Cancel deleting an event
   */
  const onEventDeleteCancel = (): void => {
    setDeletedEvent(null);
  };

  /**
   * Delete an event after confirmation
   */
  const onEventDeleteConfirm = (): void => {
    if (!deletedEvent) return;

    setDeletedEvent(null);
    dispatch(removeEvent(deletedEvent.id));

    notify(
      t("screens:eventShared.deleteEventSuccess", {
        title: deletedEvent.title,
      }),
    );
  };

  /**
   * Add an event
   *
   * @param event - New event
   */
  const onEventManageAdd = (event: IEventBase): void => {
    dispatch(addEvent(event));

    manageEventRef.current?.close();
    notify(t("screens:eventAddEdit.eventAddSuccess"));
  };

  /**
   * Cancel adding an event
   */
  const onEventManageCancel = (): void => {
    manageEventRef.current?.close();
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
          onRemove={onEventDeletePress}
        />
        <EventList
          events={pastEvents}
          style={styles.eventList}
          title={t("screens:eventList.listPast")}
          onRemove={onEventDeletePress}
        />
      </ScrollView>
      <ScreenFAB
        icon="calendar-plus"
        onPress={(): void => manageEventRef.current?.open()}
      />
      <ManageEventSheet
        ref={manageEventRef}
        onAdd={onEventManageAdd}
        onCancel={onEventManageCancel}
      />
      <DeleteEventDialog
        event={deletedEvent}
        visible={Boolean(deletedEvent)}
        onCancel={onEventDeleteCancel}
        onConfirm={onEventDeleteConfirm}
      />
    </Page>
  );
};

const listPadding = 20;
const styles = StyleSheet.create({
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
