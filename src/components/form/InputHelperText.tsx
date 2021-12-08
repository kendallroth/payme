import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { HelperText } from "react-native-paper";

// Types
import { IValidationError } from "@localization/yup-locale";

type InputHelperTextProps = {
  /** Error message */
  error?: IValidationError | string;
  /** Hint text */
  hint?: string;
  /** Whether error message is visible */
  visible?: boolean;
};

const InputHelper = (props: InputHelperTextProps): ReactElement | null => {
  const { error, hint, visible = true } = props;

  const { t } = useTranslation();

  /**
   * Render helper text with error or hint
   *
   * @param   message - Error/hint message
   * @returns Helper text component
   */
  const renderHelperText = (
    message: string | null | undefined,
  ): ReactElement => (
    <HelperText type={error ? "error" : "info"} visible={visible}>
      {/* NOTE: Need an extra check ('visible' prop flickers briefly...) */}
      {message}
    </HelperText>
  );

  if (error) {
    if (typeof error === "string") {
      return renderHelperText(error);
    } else {
      const { key, values } = error;
      // @ts-ignore - Ignore error caused by TypeScript complaints about "known" types
      return renderHelperText(t(key, values));
    }
  }

  return renderHelperText(hint ?? null);
};

export default InputHelper;
