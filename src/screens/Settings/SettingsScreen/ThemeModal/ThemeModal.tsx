import React, { forwardRef, ReactElement } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

// Components
import { BottomSheet } from "@components/dialogs";
import SettingsModalListItem from "../SettingsModalListItem";

// Utilities
import { THEMES } from "@utilities/constants";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppTheme } from "@typings";

type ThemeModalProps = {
  /** Current theme */
  theme: AppTheme;
  /** Selection handler */
  onSelect: (theme: AppTheme) => void;
};

const ThemeModal = forwardRef<BottomSheetRef, ThemeModalProps>(
  (props: ThemeModalProps, ref): ReactElement => {
    const { theme: currentTheme, onSelect } = props;

    const themes = Object.values(THEMES);

    return (
      <BottomSheet ref={ref} inset={false} title="Select Theme">
        {themes.map(
          (theme): ReactElement => (
            <SettingsModalListItem
              key={theme.code}
              disabled={theme.disabled}
              left={(leftProps: any): ReactElement => (
                <List.Icon {...leftProps} icon={theme.icon} />
              )}
              selected={currentTheme === theme.code}
              title={theme.title}
              onPress={(): void => onSelect(theme.code)}
            />
          ),
        )}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({});

export default ThemeModal;
