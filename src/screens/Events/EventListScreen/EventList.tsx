import React, { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Badge, Card, Text, useTheme } from "react-native-paper";

// Components
import { Alert } from "@components/typography";
import EventListItem from "./EventListItem";

// Types
import { IEvent } from "@typings/event.types";

type EventProps = {
  /** List of events */
  events: IEvent[];
  /** List container style */
  style?: StyleProp<ViewStyle>;
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
        <Alert style={styles.listEmpty}>
          {t("common:errors.noMatchingEvents")}
        </Alert>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  list: {
    overflow: "hidden",
    borderRadius: 16,
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
