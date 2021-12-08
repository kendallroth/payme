import React, { forwardRef, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

// Components
import { BottomSheet } from "@components/dialogs";
import SettingsModalListItem from "../SettingsModalListItem";

// Utilities
import { THEMES } from "@utilities/constants";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppTheme } from "@typings/settings.types";

type ThemeModalProps = {
  /** Current theme */
  theme: AppTheme;
  /** Selection handler */
  onSelect: (theme: AppTheme) => void;
};

const ThemeModal = forwardRef<BottomSheetRef, ThemeModalProps>(
  (props: ThemeModalProps, ref): ReactElement => {
    const { theme: currentTheme, onSelect } = props;

    const { t } = useTranslation(["screens"]);

    const themes = Object.values(THEMES);

    return (
      <BottomSheet
        ref={ref}
        dismissable
        inset={false}
        title={t("screens:settingsTheme.title")}
      >
        {themes.map(
          (theme): ReactElement => (
            <SettingsModalListItem
              key={theme.code}
              disabled={theme.disabled}
              left={(leftProps: any): ReactElement => (
                <List.Icon {...leftProps} icon={theme.icon} />
              )}
              selected={currentTheme === theme.code}
              title={t(theme.title as any)}
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
