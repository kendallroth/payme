import React, { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Badge, Card, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Components
import { Alert } from "@components/typography";
import EventListItem from "./EventListItem";

// Utilities
import { getShadowStyles } from "@styles/utilities";

// Types
import { IEvent } from "@typings/event.types";
import { EventsRouterNavigation } from "../EventsRouter";

type EventProps = {
  /** List of events */
  events: IEvent[];
  /** List container style */
  style?: StyleProp<ViewStyle>;
  /** Event list title */
  title: string;
  // NOTE: Currently not implemented!
  /** Event removal handler */
  onRemove: (event: IEvent) => void;
};

const EventList = (props: EventProps): ReactElement => {
  const { events, style, title } = props;

  const navigator = useNavigation<EventsRouterNavigation>();
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

  /**
   * Open an event's details
   *
   * @param event - Selected event
   */
  const onEventPress = (event: IEvent): void => {
    navigator.navigate("EventDetails", { eventId: event.id });
  };

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
      <View style={styles.listContent}>
        {hasEvents &&
          events.map((event) => (
            <EventListItem
              key={event.id}
              event={event}
              onPress={onEventPress}
            />
          ))}
      </View>
      {!hasEvents && (
        <Alert style={styles.listEmpty}>
          {t("common:errors.noMatchingEvents")}
        </Alert>
      )}
    </Card>
  );
};

const listBorderRadius = 16;
const styles = StyleSheet.create({
  list: {
    borderRadius: listBorderRadius,
    ...getShadowStyles(),
  },
  listContent: {
    borderBottomRightRadius: listBorderRadius,
    borderBottomLeftRadius: listBorderRadius,
    // Necessary as hiding parent "list" hides box shadow on iOS!
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
    borderTopRightRadius: listBorderRadius,
    borderTopLeftRadius: listBorderRadius,
  },
  listTitleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventList;
