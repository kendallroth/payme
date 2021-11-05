import React, { ReactElement } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

// Utilities
import { colors } from "@styles/theme";

type LanguageIconProps = {
  /** Flag XML string */
  flag: string;
  /** Whether language is selected */
  selected?: boolean;
  /** Icon size */
  size: number;
  /** Style object */
  style?: StyleProp<ViewStyle>;
};

const LanguageIcon = (props: LanguageIconProps): ReactElement => {
  const { flag, selected = false, size, style } = props;

  // Flags are a constant 3x2 ratio
  const heightRatio = 2 / 3;
  const height = size * heightRatio;

  return (
    <View
      style={[
        styles.languageIcon,
        selected ? styles.languageIconSelected : undefined,
        style,
      ]}
    >
      <SvgXml
        xml={flag}
        height={height}
        width={size}
        style={styles.languageIconSvg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  languageIcon: {
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.grey.light,
  },
  languageIconSelected: {
    borderColor: colors.primary,
  },
  // SVG has slight borders around to be hidden
  languageIconSvg: {
    transform: [{ scale: 1.025 }],
  },
});

export default LanguageIcon;
