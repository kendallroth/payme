import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Searchbar, useTheme } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import { PaymentIndicator } from "@components/typography";
import EventPeopleList from "./EventPeopleList";

// Utilities
import { useAppDispatch } from "@hooks";
import { includesSafeString } from "@utilities/string";

// Types
import { IPersonForEvent } from "@typings/attendance.types";
import { IEvent } from "@typings/event.types";
import { toggleAttendanceThunk } from "@store/slices/attendance";

type EventPeopleSelectProps = {
  /** Event */
  event: IEvent;
  /** List of people with relation to the event */
  people: IPersonForEvent[];
  /** Whether modal is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
};

const EventPeopleSelect = (props: EventPeopleSelectProps): ReactElement => {
  const { event, people, visible, onClose } = props;

  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation(["common", "screens"]);

  const isIOS = Platform.OS === "ios";
  const filteredPeople =
    searchText.trim() && visible
      ? people.filter((person) => includesSafeString(person.name, searchText))
      : people;

  /**
   * Toggle whether a person is attending the event
   *
   * @param person - Attendee
   */
  const onToggleAttendancePerson = (person: IPersonForEvent): void => {
    dispatch(
      toggleAttendanceThunk({
        attending: !person.attending,
        eventId: event.id,
        personId: person.id,
      }),
    );
  };

  return (
    <Modal
      animationIn={isIOS ? "slideInRight" : "slideInUp"}
      animationOut={isIOS ? "slideOutRight" : "slideOutDown"}
      backdropColor={colors.background}
      backdropOpacity={1}
      // NOTE: Necessary to fix backdrop flicker bug when closing. If flickering
      //         persists try 'hideModalContentWhileAnimating' as well.
      backdropTransitionOutTiming={0}
      isVisible={visible}
      style={styles.modal}
      // Replicate normal iOS "back" swipe behaviour (Android has back button)
      // NOTE: This is currently broken on iOS and prevents scrolling entirely!
      // Source: https://github.com/react-native-modal/react-native-modal/issues/236
      // swipeDirection={isIOS ? "right" : undefined}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={isIOS ? onClose : undefined}
    >
      <Page>
        <AppBar
          statusBarHeight={isIOS ? undefined : 0}
          title={t("screens:eventDetails.peopleSelectTitle")}
          onBack={onClose}
        >
          <PaymentIndicator
            attending={event.stats?.attending}
            style={styles.peopleStats}
          />
        </AppBar>
        <Searchbar
          placeholder={t("common:phrases.search")}
          style={styles.peopleSearch}
          value={searchText}
          onChangeText={setSearchText}
        />
        <EventPeopleList
          people={filteredPeople}
          onPersonToggle={onToggleAttendancePerson}
        />
      </Page>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flexGrow: 1,
  },
  peopleSearch: {
    margin: 24,
    marginTop: 8,
    elevation: 2,
  },
  peopleStats: {
    marginRight: 20,
  },
});

export default EventPeopleSelect;
