import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

// Components
import { LanguageIcon } from "@components/icons";

// Utilities
import { colors } from "@styles/theme";

// Types
import { IAppLanguageConfig } from "@typings";

type LanguageModalProps = {
  /** Whether language is disabled */
  disabled?: boolean;
  /** Language code */
  language: IAppLanguageConfig;
  /** Whether language is selected */
  selected: boolean;
  /** Press handler */
  onPress: () => void;
};

const LanguageModalItem = (props: LanguageModalProps): ReactElement => {
  const { disabled = false, language, selected = false, onPress } = props;

  return (
    <List.Item
      {...props}
      disabled={disabled}
      left={(leftProps): ReactElement => (
        <List.Icon
          {...leftProps}
          icon={({ size }): ReactElement => (
            <LanguageIcon
              flag={language.flag}
              selected={selected}
              size={size * 1.25}
              // Move icon to right to compensate for increased size
              style={{ marginLeft: size * 1.25 - size }}
            />
          )}
        />
      )}
      style={[disabled ? styles.itemDisabled : undefined]}
      title={language.title}
      titleStyle={[selected ? styles.itemTitleSelected : undefined]}
      right={(rightProps): ReactElement | null =>
        selected ? (
          <List.Icon
            {...rightProps}
            color={colors.primary}
            icon="check-circle"
          />
        ) : null
      }
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  itemDisabled: {
    opacity: 0.6,
  },
  itemTitleSelected: {
    fontWeight: "700",
  },
});

export default LanguageModalItem;
