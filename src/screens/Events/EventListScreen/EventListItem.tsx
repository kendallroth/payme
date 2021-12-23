import React, { ReactElement } from "react";
import dayjs from "dayjs";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

// Components
import { ProgressIcon } from "@components/icons";
import { PaymentIndicator } from "@components/typography";

// Utilities
import { useAppSelector } from "@hooks";
import { selectBehaviours } from "@store/slices/settings";
import { formatDateString } from "@utilities/date.util";

// Types
import { IEvent } from "@typings/event.types";

type EventListItemProps = {
  /** Event */
  event: IEvent;
  /** Event selection handler */
  onPress?: (event: IEvent) => void;
};

const EventListItem = (props: EventListItemProps): ReactElement => {
  const { event, onPress } = props;

  const appBehaviours = useAppSelector(selectBehaviours);

  const past = dayjs().isAfter(event.date);
  let description = formatDateString(event.date);
  if (event.cost) {
    description = `${description}  •  $${event.cost}`;
  }

  const themeStyles = {
    listItemTitle: {
      fontWeight: (past ? "500" : "bold") as "bold" | "500",
    },
  };

  /**
   * Render left icon
   *
   * @returns Left icon
   */
  const renderListItemLeft = (): ReactElement | null => {
    if (!event.stats) return null;

    const { attending, unpaid } = event.stats;
    const paid = attending - unpaid;
    const percent = attending > 0 ? paid / attending : 0;

    // Display "empty" warning indicator with no attendees, or the
    //   percentage paid (if enabled in settings).
    const displayValue =
      attending > 0
        ? appBehaviours.showPaymentPercentage
          ? `${Math.floor(percent * 100)}%`
          : " "
        : "";

    return (
      <ProgressIcon
        progress={percent}
        style={styles.listItemLeftIcon}
        value={displayValue}
      />
    );
  };

  /**
   * Render right actions
   *
   * @param   rightProps - Props from parent list item
   * @returns Right actions
   */
  const renderListItemRight = (rightProps: any): ReactElement => {
    return (
      <View {...rightProps} style={styles.listItemActions}>
        <PaymentIndicator
          attending={event.stats?.attending}
          showAttending
          style={styles.listItemPaymentIndicator}
          unpaid={event.stats?.unpaid}
        />
      </View>
    );
  };

  return (
    <List.Item
      description={description}
      left={renderListItemLeft}
      right={renderListItemRight}
      title={event.title}
      titleStyle={themeStyles.listItemTitle}
      onPress={onPress ? (): void => onPress(event) : undefined}
    />
  );
};

const styles = StyleSheet.create({
  listItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemLeftIcon: {
    marginRight: 4,
  },
  listItemPaymentIndicator: {
    marginLeft: 16,
  },
});

export default EventListItem;
