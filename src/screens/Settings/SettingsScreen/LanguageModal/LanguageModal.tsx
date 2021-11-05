import React, { forwardRef, ReactElement } from "react";
import { StyleSheet } from "react-native";

// Components
import { BottomSheet } from "@components/dialogs";
import LanguageModalItem from "./LanguageModalItem";

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

    const languages = Object.values(LANGUAGES);

    return (
      <BottomSheet ref={ref} inset={false} title="Select Language">
        {languages.map(
          (language): ReactElement => (
            <LanguageModalItem
              key={language.code}
              disabled={language.disabled}
              language={language}
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
