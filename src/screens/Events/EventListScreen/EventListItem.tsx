import React, { ReactElement, useMemo } from "react";
import dayjs from "dayjs";
import { StyleSheet, View } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";

// Components
import { ProgressIcon } from "@components/icons";
import { PaymentIndicator } from "@components/typography";

// Utilities
import { formatDateString } from "@utilities/date.util";

// Types
import { IEvent } from "@typings/event.types";

type EventListItemProps = {
  /** Event */
  event: IEvent;
  /** Event removal handler */
  onRemove: (event: IEvent) => void;
};

const EventListItem = (props: EventListItemProps): ReactElement => {
  const { event, onRemove } = props;

  const past = dayjs().isAfter(event.date);
  let description = formatDateString(event.date);
  if (event.cost) {
    description = `${description}  •  $${event.cost}`;
  }

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
      listItemTitle: {
        fontWeight: (past ? "500" : "bold") as "bold" | "500",
      },
    }),
    [colors, past],
  );

  /**
   * Render left icon
   *
   * @returns Left icon
   */
  const renderListItemLeft = (): ReactElement | null => {
    if (!event.stats) return null;

    const { attending, unpaid } = event.stats;
    const paid = attending - unpaid;
    const percent = paid / attending;

    return (
      <ProgressIcon
        progress={percent}
        style={styles.listItemLeftIcon}
        value={unpaid}
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
    // return <UnpaidIndicator {...rightProps} count={event.stats?.unpaid ?? 0} />;
    return (
      <View {...rightProps} style={styles.listItemActions}>
        <PaymentIndicator
          attending={event.stats?.attending}
          style={styles.listItemPaymentIndicator}
          // unpaid={event.stats?.unpaid}
        />
        <IconButton
          {...rightProps}
          icon="delete"
          onPress={(): void => onRemove(event)}
        />
      </View>
    );
  };

  return (
    <List.Item
      description={description}
      left={renderListItemLeft}
      right={renderListItemRight}
      style={themeStyles.listItem}
      title={event.title}
      titleStyle={themeStyles.listItemTitle}
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
