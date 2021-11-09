import React, { forwardRef, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

// Components
import { BottomSheet } from "@components/dialogs";
import { LanguageIcon } from "@components/icons";
import SettingsModalListItem from "../SettingsModalListItem";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { AppLanguage } from "@typings";
import { LANGUAGES } from "@utilities/constants";

type LanguageModalProps = {
  /** Current language */
  language: AppLanguage;
  /** Selection handler */
  onSelect: (language: AppLanguage) => void;
};

const LanguageModal = forwardRef<BottomSheetRef, LanguageModalProps>(
  (props: LanguageModalProps, ref): ReactElement => {
    const { language: currentLanguage, onSelect } = props;

    const { t } = useTranslation();

    const languages = Object.values(LANGUAGES);

    return (
      <BottomSheet
        ref={ref}
        inset={false}
        title={t("screens.settingsLanguage.title")}
      >
        {languages.map(
          (language): ReactElement => (
            <SettingsModalListItem
              key={language.code}
              disabled={language.disabled}
              left={(leftProps: any): ReactElement => (
                <List.Icon
                  {...leftProps}
                  icon={({ size }): ReactElement => (
                    <LanguageIcon
                      flag={language.flag}
                      selected={currentLanguage === language.code}
                      size={size * 1.25}
                      // Move icon to right to compensate for increased size
                      style={{ marginLeft: size * 1.25 - size }}
                    />
                  )}
                />
              )}
              // TODO: https://brainsandbeards.com/blog/i18n-in-react-native-apps#overrides
              title={t(language.title)}
              selected={currentLanguage === language.code}
              onPress={(): void => onSelect(language.code)}
            />
          ),
        )}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({});

export default LanguageModal;
