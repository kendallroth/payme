import React, { ReactElement, useMemo, useRef } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Animated, StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";

// Components
import { ProgressIcon } from "@components/icons";
import { PaymentIndicator, UnpaidIndicator } from "@components/typography";

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

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const EventListItem = (props: EventListItemProps): ReactElement => {
  const { event, onRemove } = props;

  const fadeAnim = useRef(new Animated.Value(1)).current;

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
      <PaymentIndicator
        {...rightProps}
        attending={event.stats?.attending}
        style={styles.listItemPaymentIndicator}
        unpaid={event.stats?.unpaid}
      />
    );
  };

  /**
   * Render left swipe action
   *
   * @param   progress - Progress animated interpolation
   * @param   dragX    - Drag animated interpolation
   * @returns Left swipe action
   */
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ): ReactElement | null => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    });
    return (
      <View style={[styles.listItemSwipeLeft, themeStyles.listItemSwipeLeft]}>
        <AnimatedIcon
          color={colors.white}
          name="delete"
          size={24}
          style={{ transform: [{ scale }] }}
        />
      </View>
    );
  };

  /**
   * Perform animation when left action is triggered
   *
   * NOTE: There is a brief delay after action before Swipeable animation
   *         completes, which can be disguised by fading the element out.
   */
  const onLeftOpenAnimate = (): void => {
    Animated.timing(fadeAnim, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Swipeable
      // Minimum horizontal distance before activation
      activeOffsetX={[-30, 30]}
      friction={2}
      // Prevent animation if straying vertically before activation
      failOffsetY={[-20, 20]}
      // Distance necessary to trigger action upon release
      leftThreshold={80}
      containerStyle={{ opacity: fadeAnim }}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={(): void => onRemove(event.id)}
      onSwipeableLeftWillOpen={onLeftOpenAnimate}
    >
      <List.Item
        key={event.id}
        description={description}
        left={renderListItemLeft}
        right={renderListItemRight}
        style={themeStyles.listItem}
        title={event.title}
        titleStyle={themeStyles.listItemTitle}
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  listItemLeftIcon: {
    marginRight: 4,
  },
  listItemSwipeLeft: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
  listItemPaymentIndicator: {
    marginLeft: 16,
  },
});

export default EventListItem;
