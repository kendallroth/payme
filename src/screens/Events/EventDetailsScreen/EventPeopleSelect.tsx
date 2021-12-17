import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Searchbar, useTheme } from "react-native-paper";

// Components
import { AppBar, Page } from "@components/layout";
import EventPeopleList from "./EventPeopleList";

// Utilities
import { useAppSelector } from "@hooks";
import { selectPeople } from "@store/slices/people";
import { includesSafeString } from "@utilities/string";

type EventPeopleSelectProps = {
  /** Whether modal is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
};

const EventPeopleSelect = (props: EventPeopleSelectProps): ReactElement => {
  const { visible, onClose } = props;

  const [searchText, setSearchText] = useState("");

  const people = useAppSelector(selectPeople);
  const { colors } = useTheme();
  const { t } = useTranslation(["common", "screens"]);

  const isIOS = Platform.OS === "ios";
  const filteredPeople = searchText.trim()
    ? people.filter((person) => includesSafeString(person.name, searchText))
    : people;

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
      swipeDirection={isIOS ? "right" : undefined}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={isIOS ? onClose : undefined}
    >
      <Page>
        <AppBar
          statusBarHeight={isIOS ? undefined : 0}
          title={t("screens:eventDetails.peopleSelectTitle")}
          onBack={onClose}
        />
        <Searchbar
          placeholder={t("common:phrases.search")}
          style={styles.peopleSearch}
          value={searchText}
          onChangeText={setSearchText}
        />
        <EventPeopleList people={filteredPeople} />
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
});

export default EventPeopleSelect;
