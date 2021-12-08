import React, { ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Components
import { DeleteEventDialog, ManageEventSheet } from "@components/dialogs";
import { AppBar, ComingSoon, Page } from "@components/layout";

// Utilities
import { useAppDispatch, useAppSelector, useSnackbar } from "@hooks";
import { removeEvent, selectEvent, updateEvent } from "@store/slices/events";
import { formatDateString } from "@utilities/date.util";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { IEvent } from "@typings/event.types";
import { EventDetailsScreenProps } from "../EventsRouter";

const EventDetailsScreen = (): ReactElement | null => {
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const manageEventRef = useRef<BottomSheetRef>(null);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  // TODO: Update to get from params!
  // const event = useSelector((state) => selectEvent(state, route.params.id));
  const route = useRoute<EventDetailsScreenProps>();
  const event = useAppSelector((state) =>
    selectEvent(state, route.params.eventId),
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

  let eventSubtitle = formatDateString(event.date);
  if (event.cost) {
    eventSubtitle = `${eventSubtitle}  •  $${event.cost}`;
  }

  /**
   * Prompt user for confirmation before deleting event
   */
  const onEventDeletePress = (): void => {
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
      t("screens:eventList.deleteEventSuccess", {
        title: event.title,
      }),
    );
  };

  /**
   * Display an event for editing
   */
  const onEventEditPress = (): void => {
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

    // TODO: Refactor notification
    notify(
      t("screens:eventAddEdit.eventEditSuccess", { title: updatedEvent.title }),
    );
  };

  return (
    <Page>
      <AppBar subtitle={eventSubtitle} title={event.title}>
        <AppBar.Action icon="pencil" onPress={onEventEditPress} />
        <AppBar.Action icon="delete" onPress={onEventDeletePress} />
      </AppBar>
      <ComingSoon />
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

const styles = StyleSheet.create({});

export default EventDetailsScreen;
