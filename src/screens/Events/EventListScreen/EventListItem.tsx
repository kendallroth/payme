import React, { Fragment, ReactElement } from "react";
import dayjs from "dayjs";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Chip, IconButton, List, Text, useTheme } from "react-native-paper";

// Components
import { UnpaidIndicator } from "@components/typography";

// Utilities
import { formatDateString } from "@utilities/date.util";

// Types
import { IEvent } from "@typings/event.types";
import { randomNumber } from "@utilities/misc.util";

type EventListItemProps = {
  /** Event */
  event: IEvent;
  /** Style */
  style?: StyleProp<ViewStyle>;
  /** Event removal handler */
  onRemove: (eventId: string) => void;
};

const EventListItem = (props: EventListItemProps): ReactElement => {
  const { event, style, onRemove } = props;

  const past = dayjs().isAfter(event.date);

  let dateCost = formatDateString(event.date);
  if (event.cost) {
    dateCost = `${dateCost}  •  $${event.cost}`;
  }

  const { colors } = useTheme();

  const themeStyles = {
    listItemDate: {
      color: colors.grey.base,
    },
    listItemTitle: {
      fontWeight: (past ? "500" : "bold") as "bold" | "500",
    },
  };

  const renderListItemDescription = (): ReactElement => {
    return (
      <View style={styles.listItemDescription}>
        <Text style={[styles.listItemDate, themeStyles.listItemDate]}>
          {formatDateString(event.date)}
        </Text>
        <View style={styles.listItemChips}>
          <Chip icon="face" style={styles.listItemChip}>
            {randomNumber(5, 20)}
          </Chip>
          <Chip icon="exclamation" style={styles.listItemChip}>
            {randomNumber(0, 5)}
          </Chip>
          {Boolean(event.cost) && (
            <Chip icon="currency-usd" style={styles.listItemChip}>
              {event.cost}
            </Chip>
          )}
        </View>
      </View>
    );
  };

  const renderListItemLeft = (leftProps: any): ReactElement | null => {
    return null;
  };

  const renderListItemRight = (rightProps: any): ReactElement => {
    return (
      <Fragment>
        <UnpaidIndicator count={randomNumber(0, 1, true)} />
        <IconButton
          {...rightProps}
          color={colors.error}
          icon="delete"
          style={{ alignSelf: "center", ...rightProps.style }}
          onPress={(): void => {}}
          onLongPress={(): void => onRemove(event.id)}
        />
      </Fragment>
    );
  };

  return (
    <List.Item
      key={event.id}
      // description={renderListItemDescription}
      description={dateCost}
      left={renderListItemLeft}
      right={renderListItemRight}
      title={event.title}
      titleStyle={themeStyles.listItemTitle}
    />
  );

  /*return (
    <List.Item
      key={event.id}
      description={formatDateString(event.date)}
      right={renderListItemRight}
      title={event.title}
    />
  );*/

  /*return (
    <View style={[styles.listItem, style]}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{event.title}</Text>
        <Text style={styles.listItemDate}>{formatDateString(event.date)}</Text>
      </View>
      <View style={styles.listItemActions}>
        <IconButton
          color={colors.error}
          icon="delete"
          onPress={(): void => {}}
          onLongPress={(): void => onRemove(event.id)}
        />
      </View>
    </View>
  );*/
};

const chipMargin = 3;
const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  listItemDescription: {},
  listItemActions: {
    marginLeft: 16,
  },
  listItemContent: {},
  listItemChip: {
    margin: chipMargin,
  },
  listItemChips: {
    flexDirection: "row",
    margin: -chipMargin,
    marginTop: 2,
  },
  listItemDate: {},
  listItemTitle: {
    marginBottom: 4,
    fontSize: 16,
  },
});

export default EventListItem;
