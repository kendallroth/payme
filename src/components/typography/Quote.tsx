import React, { ReactElement, useMemo } from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

type QuoteProps = {
  /** Quote content */
  children: string;
  /** Quote border colour */
  color?: string;
  /** Quote style */
  style?: ViewStyle;
  /** Quote content style */
  textStyle?: TextStyle;
};

const Quote = (props: QuoteProps): ReactElement => {
  const { children, color, style, textStyle } = props;

  const { colors } = useTheme();

  const themeStyles = useMemo(
    () => ({
      quote: {
        borderLeftColor: color ?? colors.primary,
      },
      quoteText: {
        color: colors.grey.dark,
      },
    }),
    [color, colors],
  );

  return (
    <View style={[styles.quote, themeStyles.quote, style]}>
      <Text style={[styles.quoteText, themeStyles.quoteText, textStyle]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quote: {
    paddingVertical: 4,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderRadius: 4,
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 24,
  },
});

export default Quote;
