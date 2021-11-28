import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";

// Utilities
import { formatDateString } from "@utilities/date.util";

// Types
import { IEvent } from "@typings/event.types";

type EventListItemProps = {
  /** Event */
  event: IEvent;
  /** Event removal handler */
  onRemove: (eventId: string) => void;
};

const EventListItem = (props: EventListItemProps): ReactElement => {
  const { event, onRemove } = props;

  const { colors } = useTheme();

  /**
   * Render the event list item right slot
   *
   * @param   rightProps - List item slot props
   * @returns Event list item right slot
   */
  const renderListItemRight = (rightProps: any): ReactElement => {
    return (
      <IconButton
        {...rightProps}
        color={colors.error}
        icon="delete"
        onPress={(): void => {}}
        onLongPress={(): void => onRemove(event.id)}
      />
    );
  };

  return (
    <List.Item
      key={event.id}
      description={formatDateString(event.date)}
      style={styles.listItem}
      right={renderListItemRight}
      title={event.title}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {},
});

export default EventListItem;
