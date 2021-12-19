import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

// Components
import { Alert } from "@components/typography";
import EventAttendeeListItem from "./EventAttendeeListItem";

// Utilities
import { flatListIdExtractor } from "@utilities/list.util";

// Types
import { ScrollEvent } from "@typings/app.types";
import { IPersonForEvent } from "@typings/attendance.types";

type EventAttendeeListProps = {
  /** List of event attendees */
  attendees: IPersonForEvent[];
  /** Toggle whether an attendee has paid for an event */
  onPay: (person: IPersonForEvent) => void;
  /** Remove an attendee */
  onRemove: (person: IPersonForEvent) => void;
  /** Scroll handler */
  onScroll?: (event: ScrollEvent) => void;
};

const EventAttendeeList = (props: EventAttendeeListProps): ReactElement => {
  const { attendees, onPay, onRemove, onScroll } = props;

  const { t } = useTranslation(["screens"]);

  /**
   * Render an attendee list item
   *
   * @param   item - Attendee item
   * @returns Attendee list item
   */
  const renderAttendeeItem = ({
    item,
  }: ListRenderItemInfo<IPersonForEvent>): ReactElement => (
    <EventAttendeeListItem person={item} onPay={onPay} onRemove={onRemove} />
  );

  // TODO: Render something else (big image) when no people have been added!

  return (
    <FlatList
      data={attendees}
      keyExtractor={flatListIdExtractor}
      ListEmptyComponent={(): ReactElement => (
        <Alert style={styles.listEmpty}>
          {t("screens:eventDetails.attendeeListEmpty")}
        </Alert>
      )}
      renderItem={renderAttendeeItem}
      style={[styles.list]}
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listEmpty: {
    marginTop: 24,
    marginHorizontal: 24,
  },
});

export default EventAttendeeList;
