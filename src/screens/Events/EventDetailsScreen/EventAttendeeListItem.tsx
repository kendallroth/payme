import React, { ReactElement, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";

// Components
import { UnpaidIndicator } from "@components/typography";

// Types
import { IPersonForEvent } from "@typings/attendance.types";
import { formatDateString } from "@utilities/date.util";

type EventAttendeeItemProps = {
  /** Attendee */
  person: IPersonForEvent;
  /** Toggle whether an attendee has paid for an event */
  onPay: (person: IPersonForEvent) => void;
  /** Remove an attendee */
  onRemove: (person: IPersonForEvent) => void;
};

const EventAttendeeListItem = (props: EventAttendeeItemProps): ReactElement => {
  const { person, onPay, onRemove } = props;

  const { colors } = useTheme();

  const themeStyles = useMemo(
    () => ({
      listItem: {
        // Necessary to "hide" swipe action colors
        // backgroundColor: colors.surface,
        // borderRadius: 4,
      },
      listItemSwipeLeft: {
        // backgroundColor: colors.error,
      },
      listItemDate: {
        color: colors.grey.base,
      },
      listItemTitle: {},
      listItemTitleUnpaid: {
        color: colors.error,
        fontWeight: "600",
      },
    }),
    [colors],
  );

  // TODO: Consider using swipe left/right to toggle payment

  /**
   * Render right actions
   *
   * @param   rightProps - Props from parent list item
   * @returns Right actions
   */
  const renderListItemRight = (rightProps: any): ReactElement => {
    return (
      <View {...rightProps} style={styles.listItemActions}>
        <UnpaidIndicator
          style={styles.listItemUnpaid}
          visible={!person.paidAt}
        />
        <IconButton
          icon={person.paidAt ? "currency-usd" : "currency-usd-off"}
          onPress={(): void => {}}
          onLongPress={(): void => onPay(person)}
        />
        <IconButton
          disabled={Boolean(person.paidAt)}
          icon="delete"
          onPress={(): void => onRemove(person)}
        />
      </View>
    );
  };

  return (
    <List.Item
      description={person.paidAt ? formatDateString(person.paidAt) : "Unpaid"}
      descriptionStyle={[styles.listItemDate, themeStyles.listItemDate]}
      right={renderListItemRight}
      style={themeStyles.listItem}
      title={person.name}
      titleStyle={[
        themeStyles.listItemTitle,
        !person.paidAt ? themeStyles.listItemTitleUnpaid : undefined,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  listItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemDate: {
    fontStyle: "italic",
  },
  listItemUnpaid: {
    marginRight: 8,
  },
});

export default EventAttendeeListItem;
