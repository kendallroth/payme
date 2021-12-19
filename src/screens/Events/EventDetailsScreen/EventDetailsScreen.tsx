import React, { ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Vibration } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Menu, Text } from "react-native-paper";

// Components
import {
  ConfirmDialog,
  DeleteEventDialog,
  ManageEventSheet,
} from "@components/dialogs";
import { AppBar, Page, ScreenFAB } from "@components/layout";
import { PaymentIndicator } from "@components/typography";
import EventPeopleSelect from "./EventPeopleSelect";
import EventAttendeeList from "./EventAttendeeList";

// Utilities
import { useAppDispatch, useAppSelector, useSnackbar } from "@hooks";
import {
  selectPeopleForEvent,
  toggleAttendanceThunk,
  togglePaymentThunk,
} from "@store/slices/attendance";
import { removeEvent, selectEvent, updateEvent } from "@store/slices/events";
import { formatDateString } from "@utilities/date.util";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppBarMenuRef } from "@components/layout/AppBarMenu";
import { IPersonForEvent } from "@typings/attendance.types";
import { IEvent } from "@typings/event.types";
import { EventDetailsScreenProps } from "../EventsRouter";

const EventDetailsScreen = (): ReactElement | null => {
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const [isSelectAttendeesShown, setIsSelectAttendeesShown] = useState(false);
  const [removedAttendee, setRemovedAttendee] =
    useState<IPersonForEvent | null>(null);
  const manageEventRef = useRef<BottomSheetRef>(null);
  const menuActionRef = useRef<AppBarMenuRef>(null);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<EventDetailsScreenProps>();
  const { eventId } = route.params;
  const event = useAppSelector((state) => selectEvent(state, eventId));
  const peopleForEvent = useAppSelector((state) =>
    selectPeopleForEvent(state, eventId),
  );
  const { notify } = useSnackbar();
  const { t } = useTranslation(["common", "screens"]);

  // NOTE: Rare edge case if event is not found or deleted!
  if (!event) {
    if (navigation.isFocused()) {
      // navigation.popToTop();
    }
    return null;
  }

  const attendees = peopleForEvent.filter((p) => p.attending);

  let eventSubtitle = formatDateString(event.date);
  if (event.cost) {
    eventSubtitle = `${eventSubtitle}  •  $${event.cost}`;
  }

  /**
   * Toggle whether an attendee has paid
   *
   * @param attendee - Attendee
   */
  const onAttendeePayPress = (attendee: IPersonForEvent): void => {
    Vibration.vibrate(100);

    dispatch(
      togglePaymentThunk({
        eventId: event.id,
        paid: !attendee.paidAt,
        personId: attendee.id,
      }),
    );
  };

  /**
   * Prompt for confirmation before removing attendee
   *
   * @param attendee - Attendee for removal
   */
  const onAttendeeRemovePress = (attendee: IPersonForEvent): void => {
    setRemovedAttendee(attendee);
  };

  /**
   * Cancel removing an attendee
   */
  const onAttendeeRemoveCancel = (): void => {
    setRemovedAttendee(null);
  };

  /**
   * Confirm removing an attendee
   */
  const onAttendeeRemoveConfirm = (): void => {
    setRemovedAttendee(null);

    if (!removedAttendee) return;

    dispatch(
      toggleAttendanceThunk({
        attending: false,
        eventId: event.id,
        personId: removedAttendee.id,
      }),
    );

    notify(`Removed ${removedAttendee?.name}`);
  };

  /**
   * Prompt user for confirmation before deleting event
   */
  const onEventDeletePress = (): void => {
    menuActionRef.current?.close();
    setIsDeleteDialogShown(true);
  };

  /**
   * Cancel deleting an event
   */
  const onEventDeleteCancel = (): void => {
    setIsDeleteDialogShown(false);
  };

  /**
   * Delete an event after confirmation
   */
  const onEventDeleteConfirm = (): void => {
    setIsDeleteDialogShown(false);
    dispatch(removeEvent(event.id));

    navigation.goBack();

    notify(
      t("screens:eventShared.deleteEventSuccess", {
        title: event.title,
      }),
    );
  };

  /**
   * Display an event for editing
   */
  const onEventEditPress = (): void => {
    menuActionRef.current?.close();
    manageEventRef.current?.open();
  };

  /**
   * Cancel updating an event
   */
  const onEventEditCancel = (): void => {
    manageEventRef.current?.close();
  };

  /**
   * Save an edited event
   */
  const onEventEditSave = (updatedEvent: IEvent): void => {
    dispatch(updateEvent(updatedEvent));

    manageEventRef.current?.close();

    // TODO: Refactor notification??
    notify(
      t("screens:eventAddEdit.eventEditSuccess", { title: updatedEvent.title }),
    );
  };

  return (
    <Page>
      <AppBar subtitle={eventSubtitle} title={event.title}>
        <PaymentIndicator
          attending={event.stats?.attending}
          style={styles.eventStats}
          unpaid={event.stats?.unpaid}
        />
        <AppBar.ActionMenu ref={menuActionRef}>
          <Menu.Item
            icon="pencil"
            title={t("common:actions.edit")}
            onPress={onEventEditPress}
          />
          <Menu.Item
            icon="delete"
            title={t("common:actions.delete")}
            onPress={onEventDeletePress}
          />
        </AppBar.ActionMenu>
      </AppBar>
      <EventAttendeeList
        attendees={attendees}
        onPay={onAttendeePayPress}
        onRemove={onAttendeeRemovePress}
      />
      <ScreenFAB
        icon="account-multiple-plus"
        onPress={(): void => setIsSelectAttendeesShown(true)}
      />
      <ConfirmDialog
        title={t("screens:eventDetails.attendeeRemoveConfirmTitle")}
        visible={Boolean(removedAttendee)}
        onCancel={onAttendeeRemoveCancel}
        onConfirm={onAttendeeRemoveConfirm}
      >
        <Text>
          {t("screens:eventDetails.attendeeRemoveConfirmDescription")}
        </Text>
        <Text style={styles.removeDialogAttendee}>{removedAttendee?.name}</Text>
      </ConfirmDialog>
      <EventPeopleSelect
        event={event}
        people={peopleForEvent}
        visible={isSelectAttendeesShown}
        onClose={(): void => setIsSelectAttendeesShown(false)}
      />
      <ManageEventSheet
        ref={manageEventRef}
        event={event}
        onCancel={onEventEditCancel}
        onEdit={onEventEditSave}
      />
      <DeleteEventDialog
        event={event}
        visible={isDeleteDialogShown}
        onCancel={onEventDeleteCancel}
        onConfirm={onEventDeleteConfirm}
      />
    </Page>
  );
};

const styles = StyleSheet.create({
  eventStats: {},
  removeDialogAttendee: {
    marginTop: 16,
    fontWeight: "bold",
  },
});

export default EventDetailsScreen;
