import React, { ReactElement, useMemo, useRef } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";

// Types
import { MaterialCommunityIcons } from "@typings";

type SwipeableListItemProps = {
  /** Actual list item */
  children: (props: any) => ReactElement;
  /** Whether left swipe action should fade upon opening */
  fadeOnLeftOpen?: boolean;
  /** Whether left swipe action should fade upon opening */
  fadeOnRightOpen?: boolean;
  /** Left swipe action color */
  leftColor?: string;
  /** Left swipe action icon */
  leftIcon?: keyof MaterialCommunityIcons;
  /** Left swipe action color */
  rightColor?: string;
  /** Right swipe action icon */
  rightIcon?: keyof MaterialCommunityIcons;
  /** Callback for left swipe */
  onLeftOpen?: () => void;
  /** Callback for right swipe */
  onRightOpen?: () => void;
};

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SwipeableListItem = (props: SwipeableListItemProps): ReactElement => {
  const {
    children,
    fadeOnLeftOpen = true,
    fadeOnRightOpen = true,
    leftColor,
    leftIcon,
    rightColor,
    rightIcon,
    onLeftOpen,
    onRightOpen,
    ...rest
  } = props;

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { colors } = useTheme();

  const themeStyles = useMemo(
    () => ({
      listItem: {
        // Necessary to "hide" swipe action colors
        backgroundColor: colors.surface,
        borderRadius: 4,
      },
      listItemSwipeLeft: {
        backgroundColor: leftColor ?? colors.grey.base,
      },
      listItemSwipeRight: {
        backgroundColor: rightColor ?? colors.grey.base,
      },
    }),
    [colors, leftColor, rightColor],
  );

  /**
   * Render left/right swipe action
   *
   * @param   progress - Progress animated interpolation
   * @param   dragX    - Drag animated interpolation
   * @param   left     - Whether left side action
   * @returns Left/right swipe action
   */
  const renderSwipeAction = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    left = true,
  ): ReactElement | null => {
    if (left && !onLeftOpen) return null;
    else if (!left && !onRightOpen) return null;

    const scale = dragX.interpolate({
      inputRange: left ? [0, 80] : [-80, 0],
      outputRange: left ? [0.5, 1] : [1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <View
        style={[
          styles.listItemSwipe,
          left ? themeStyles.listItemSwipeLeft : themeStyles.listItemSwipeRight,
          left ? styles.listItemSwipeLeft : styles.listItemSwipeRight,
        ]}
      >
        <AnimatedIcon
          color={colors.white}
          name={(left ? leftIcon : rightIcon) ?? "help"}
          size={24}
          style={{ transform: [{ scale }] }}
        />
      </View>
    );
  };

  /**
   * Cleanup animation state when closing
   */
  const onClose = (): void => {
    fadeAnim.setValue(1);
  };

  /**
   * Perform fade animation when left/right action is triggered (optional)
   *
   * NOTE: There is a brief delay after action before Swipeable animation
   *         completes, which can be disguised by fading the element out.
   *
   * @param left - Whether swiping from the left
   */
  const onOpenFade = (left: boolean): void => {
    if (left && !fadeOnLeftOpen) return;
    else if (!left && !fadeOnRightOpen) return;

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
      {...rest}
      containerStyle={{ opacity: fadeAnim }}
      renderLeftActions={(...args): ReactElement | null =>
        renderSwipeAction(...args, true)
      }
      renderRightActions={(...args): ReactElement | null =>
        renderSwipeAction(...args, false)
      }
      onSwipeableClose={onClose}
      onSwipeableLeftOpen={onLeftOpen}
      onSwipeableLeftWillOpen={(): void => onOpenFade(true)}
      onSwipeableRightOpen={onRightOpen}
      onSwipeableRightWillOpen={(): void => onOpenFade(false)}
    >
      {Boolean(children) && children({ style: themeStyles.listItem })}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  listItemSwipe: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
  listItemSwipeLeft: {
    justifyContent: "flex-start",
  },
  listItemSwipeRight: {
    justifyContent: "flex-end",
  },
});

export default SwipeableListItem;
