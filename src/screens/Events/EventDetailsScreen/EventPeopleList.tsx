import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

// Components
import { Alert } from "@components/typography";
import EventPeopleListItem from "./EventPeopleListItem";

// Utilities
import { useAppSelector } from "@hooks";
import { selectBehaviours } from "@store/slices/settings";
import { flatListIdExtractor } from "@utilities/list.util";

// Types
import { IPersonForEvent } from "@typings/attendance.types";

type EventPeopleListProps = {
  /** List of people with relation to the event */
  people: IPersonForEvent[];
  /** Toggle whether a person is attending the event */
  onPersonToggle: (person: IPersonForEvent) => void;
};

const EventPeopleList = (props: EventPeopleListProps): ReactElement => {
  const { people, onPersonToggle } = props;

  const appBehaviours = useAppSelector(selectBehaviours);

  const { t } = useTranslation(["common"]);

  /**
   * Render a person list item
   *
   * @param   item - Person item
   * @returns Person list item
   */
  const renderPersonItem = ({
    item,
  }: ListRenderItemInfo<IPersonForEvent>): ReactElement => (
    <EventPeopleListItem
      person={item}
      selectable={appBehaviours?.selectAttendeeCheckboxRows}
      onToggle={onPersonToggle}
    />
  );

  // TODO: Render something else (big image) when no people have been added!

  return (
    <FlatList
      data={people}
      keyExtractor={flatListIdExtractor}
      ListEmptyComponent={(): ReactElement => (
        <Alert style={styles.listEmpty}>
          {t("common:errors.noMatchingPeople")}
        </Alert>
      )}
      renderItem={renderPersonItem}
      style={[styles.list]}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listEmpty: {
    marginHorizontal: 24,
  },
});

export default EventPeopleList;
