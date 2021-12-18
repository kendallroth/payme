import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, List } from "react-native-paper";

// Components
import { UnpaidIndicator } from "@components/typography";

// Types
import { IPersonForEvent } from "@typings/attendance.types";

type EventPeopleListItemProps = {
  /** Person with relation to the event */
  person: IPersonForEvent;
  /** Whether entire list item is selectable */
  selectable?: boolean;
  /** Toggle whether person is attending the event */
  onToggle: (person: IPersonForEvent) => void;
};

// TODO: Handle selecting people for attendance!

const EventPeopleListItem = (props: EventPeopleListItemProps): ReactElement => {
  const { person, selectable = false, onToggle: onToggleProp } = props;

  const disabled = Boolean(person.attending && person.paidAt);

  // TODO: Consider using swipe left/right to toggle attendance

  /**
   * List item toggle
   */
  const onToggle = (): void => onToggleProp(person);

  return (
    <List.Item
      key={person.id}
      disabled={disabled}
      left={(leftProps: any): ReactElement => (
        <Checkbox.Android
          {...leftProps}
          disabled={disabled}
          status={person.attending ? "checked" : "unchecked"}
          onPress={onToggle}
        />
      )}
      right={(rightProps: any): ReactElement | null => (
        <UnpaidIndicator
          {...rightProps}
          style={styles.listItemUnpaidIcon}
          visible={person.attending && !person.paidAt}
        />
      )}
      title={person.name}
      onPress={selectable ? onToggle : undefined}
    />
  );
};

const styles = StyleSheet.create({
  listItemUnpaidIcon: {
    alignSelf: "center",
    marginRight: 4,
  },
});

export default EventPeopleListItem;
