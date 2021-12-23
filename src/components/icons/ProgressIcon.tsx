import React, { ReactElement } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Svg, { Circle } from "react-native-svg";

// Utilities
import { lerpColor } from "@utilities/misc.util";

// Types
import { MaterialCommunityIcons } from "@typings/app.types";

const EPSILON = 0.999999;

type ProgressIconProps = {
  /** Completed icon colour */
  completedColor?: string;
  /**
   * Completion icon
   *
   * @default "check-decagram"
   */
  completedIcon?: keyof MaterialCommunityIcons;
  /**
   * Empty icon (no progress or value)
   *
   * @default "alert-decagram"
   */
  emptyIcon?: keyof MaterialCommunityIcons;
  /** Progress percentage (between 0 and 1) */
  progress: number;
  /** Progress circle colour */
  progressColor?: string | [string, string];
  /**
   * Progress icon size
   *
   * @default 36
   */
  size?: number;
  /** Style */
  style?: StyleProp<ViewStyle>;
  /** Progress value (non-percentage) */
  value?: number | string;
};

const ProgressIcon = (props: ProgressIconProps): ReactElement => {
  let { completedColor, progressColor } = props;
  const {
    completedIcon = "check-decagram",
    emptyIcon = "alert-decagram-outline",
    progress,
    size = 32,
    style,
    value,
  } = props;

  const { colors } = useTheme();

  completedColor = completedColor ?? colors.primary;
  progressColor = progressColor
    ? Array.isArray(progressColor)
      ? lerpColor(progressColor[0], progressColor[1], progress)
      : progressColor
    : colors.error;

  const themeStyles = {
    progressText: {
      color: progressColor,
    },
  };

  const completeTransform = {
    rotation: -90,
    originX: size / 2,
    originY: size / 2,
  };
  const progressTransform = {
    rotation: -90 + 360 * progress,
    originX: size / 2,
    originY: size / 2,
  };

  // NOTE: 'size' here refers to size within SVG viewport!
  const lineWidth = 3;
  const radius = size / 2 - lineWidth / 2;
  const circumference = radius * 2 * Math.PI;

  if (!progress && !value) {
    return (
      <View style={[styles.container, styles.progressIcon, style]}>
        <Icon color={colors.warning} name={emptyIcon} size={size} />
      </View>
    );
  }

  if (progress > EPSILON) {
    return (
      <View style={[styles.container, styles.progressIcon, style]}>
        <Icon color={completedColor} name={completedIcon} size={size} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={completedColor}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress * circumference}
          strokeLinecap="round"
          strokeWidth={lineWidth * 0.5}
          transform={completeTransform}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - (1 - progress) * circumference}
          strokeLinecap="round"
          strokeWidth={lineWidth}
          transform={progressTransform}
        />
      </Svg>
      {Boolean(value) && (
        <Text style={[styles.progressText, themeStyles.progressText]}>
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  progressIcon: {
    // Slightly enlarge icon to appear same size as progress circle
    transform: [{ scale: 1.125 }],
  },
  progressText: {
    position: "absolute",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default ProgressIcon;
