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
  /** Toggle whether person is attending the event */
  onToggle: (person: IPersonForEvent) => void;
};

// TODO: Handle selecting people for attendance!

const EventPeopleListItem = (props: EventPeopleListItemProps): ReactElement => {
  const { person, onToggle } = props;

  // TODO: Consider using swipe left/right to toggle attendance

  return (
    <List.Item
      key={person.id}
      left={(leftProps: any): ReactElement => (
        <Checkbox.Android
          {...leftProps}
          disabled={person.attending && person.paidAt}
          status={person.attending ? "checked" : "unchecked"}
          onPress={(): void => onToggle(person)}
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
