import React, { ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Components
import { DeleteEventDialog, ManageEventSheet } from "@components/dialogs";
import { AppBar, Page, PortalFAB } from "@components/layout";
import EventList from "./EventList";

// Utilities
import { useSnackbar } from "@hooks";
import {
  addEvent,
  removeEvent,
  selectEvents,
  updateEvent,
} from "@store/slices/events";
import { EventsService } from "@services";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { IEvent, IEventBase } from "@typings/event.types";

const EventListScreen = (): ReactElement => {
  const [editedEvent, setEditedEvent] = useState<IEvent | null>(null);
  const [deletedEvent, setDeletedEvent] = useState<IEvent | null>(null);
  const manageEventRef = useRef<BottomSheetRef>(null);

  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
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
      t("screens:eventList.deleteEventSuccess", {
        title: deletedEvent.title,
      }),
    );
  };

  /**
   * Display an event for editing
   *
   * @param event - Edited event
   */
  const onEventEditPress = (event: IEvent): void => {
    setEditedEvent(event);
    manageEventRef.current?.open();
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
   * Cancel adding/updating an event
   */
  const onEventManageCancel = (): void => {
    manageEventRef.current?.close();
    setEditedEvent(null);
  };

  /**
   * Save an edited event
   *
   * @param event - Edited event
   */
  const onEventManageEdit = (event: IEvent): void => {
    dispatch(updateEvent(event));

    setEditedEvent(null);
    manageEventRef.current?.close();
    notify(t("screens:eventAddEdit.eventEditSuccess", { title: event.title }));
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
      {/* NOTE: Must render before other Portals for z-positioning! */}
      <PortalFAB
        icon="calendar-plus"
        onPress={(): void => manageEventRef.current?.open()}
      />
      <ManageEventSheet
        ref={manageEventRef}
        event={editedEvent}
        onAdd={onEventManageAdd}
        onCancel={onEventManageCancel}
        onEdit={onEventManageEdit}
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
