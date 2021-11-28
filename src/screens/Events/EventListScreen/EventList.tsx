import React, { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation(["common"]);
  const { colors } = useTheme();

  const hasEvents = events.length > 0;

  const themeStyles = useMemo(
    () => ({
      listEmpty: {
        color: colors.grey.base,
      },
      listTitle: {
        backgroundColor: colors.primary,
      },
      listTitleBadge: {
        backgroundColor: colors.white,
      },
      listTitleText: {
        color: colors.white,
      },
    }),
    [colors],
  );

  return (
    <Card elevation={2} style={[styles.list, style]}>
      <View style={[styles.listTitle, themeStyles.listTitle]}>
        <Text style={[styles.listTitleText, themeStyles.listTitleText]}>
          {title}
        </Text>
        {hasEvents && (
          <Badge style={themeStyles.listTitleBadge}>{events.length}</Badge>
        )}
      </View>
      {hasEvents &&
        events.map((event) => (
          <EventListItem key={event.id} event={event} onRemove={onRemove} />
        ))}
      {!hasEvents && (
        <Text style={[styles.listEmpty, themeStyles.listEmpty]}>
          {t("common:errors.noMatchingEvents")}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  list: {
    borderRadius: 16,
    overflow: "hidden",
  },
  listEmpty: {
    paddingHorizontal: 16,
    paddingVertical: 24,
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
