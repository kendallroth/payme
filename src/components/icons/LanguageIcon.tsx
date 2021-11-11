import React, { ReactElement } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import { useTheme } from "react-native-paper";

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

  const { colors } = useTheme();

  // Flags are a constant 3x2 ratio
  const heightRatio = 2 / 3;
  const height = size * heightRatio;

  const themeStyles = {
    languageIcon: {
      borderColor: colors.grey.light,
    },
    languageIconSelected: {
      borderColor: colors.primary,
    },
  };

  return (
    <View
      style={[
        styles.languageIcon,
        themeStyles.languageIcon,
        selected ? themeStyles.languageIconSelected : undefined,
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
  },
  // SVG has slight borders around to be hidden
  languageIconSvg: {
    transform: [{ scale: 1.025 }],
  },
});

export default LanguageIcon;
