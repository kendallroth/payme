import React, { ReactElement, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";

// Types
import { IPerson } from "@typings/people.types";

type EventAttendeeItemProps = {
  /** Attendee */
  person: IPerson;
};

const EventAttendeeListItem = (props: EventAttendeeItemProps): ReactElement => {
  const { person } = props;

  const { colors } = useTheme();

  const themeStyles = useMemo(
    () => ({
      listItem: {
        // Necessary to "hide" swipe action colors
        backgroundColor: colors.surface,
        borderRadius: 4,
      },
      listItemSwipeLeft: {
        backgroundColor: colors.error,
      },
      listItemDate: {
        color: colors.grey.base,
      },
      listItemTitle: {},
    }),
    [colors],
  );

  /**
   * Render right actions
   *
   * @param   rightProps - Props from parent list item
   * @returns Right actions
   */
  const renderListItemRight = (rightProps: any): ReactElement => {
    // return <UnpaidIndicator {...rightProps} count={event.stats?.unpaid ?? 0} />;
    return (
      <View {...rightProps} style={styles.listItemActions}>
        <IconButton
          {...rightProps}
          icon="delete"
          // onPress={(): void => onRemove(event)}
          onPress={(): void => {}}
        />
      </View>
    );
  };

  return (
    <List.Item
      description={"YYYY-MMM-DD"}
      right={renderListItemRight}
      style={themeStyles.listItem}
      title={person.name}
      titleStyle={themeStyles.listItemTitle}
    />
  );
};

const styles = StyleSheet.create({
  listItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default EventAttendeeListItem;
