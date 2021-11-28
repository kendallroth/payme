import React, { ReactElement } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Badge, Card, Text, useTheme } from "react-native-paper";

// Components
import EventListItem from "./EventListItem";

// Types
import { IEvent } from "@typings/event.types";

type EventProps = {
  /** List of events */
  events: IEvent[];
  /** List container style */
  style: StyleProp<ViewStyle>;
  /** Event list title */
  title: string;
  /** Event removal handler */
  onRemove: (eventId: string) => void;
};

const EventList = (props: EventProps): ReactElement => {
  const { events, style, title, onRemove } = props;

  const { colors } = useTheme();

  const themeStyles = {
    listTitle: {
      backgroundColor: colors.primary,
    },
    listTitleBadge: {
      backgroundColor: colors.white,
    },
    listTitleText: {
      color: colors.white,
    },
  };

  return (
    <Card elevation={2} style={[styles.list, style]}>
      <View style={[styles.listTitle, themeStyles.listTitle]}>
        <Text style={[styles.listTitleText, themeStyles.listTitleText]}>
          {title}
        </Text>
        {Boolean(events.length) && (
          <Badge style={themeStyles.listTitleBadge}>{events.length}</Badge>
        )}
      </View>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} onRemove={onRemove} />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  list: {
    borderRadius: 16,
    overflow: "hidden",
  },
  listTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  listTitleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventList;
