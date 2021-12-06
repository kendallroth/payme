import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { HelperText } from "react-native-paper";

// Types
import { IValidationError } from "@localization/yup-locale";

type InputErrorProps = {
  /** Error message */
  error?: IValidationError | string;
  /** Whether error message is visible */
  visible?: boolean;
};

const InputError = (props: InputErrorProps): ReactElement | null => {
  const { error, visible = true } = props;

  const { t } = useTranslation();

  const renderHelperText = (
    message: string | null | undefined,
  ): ReactElement => (
    <HelperText type="error" visible={visible}>
      {/* NOTE: Need an extra check ('visible' prop flickers briefly...) */}
      {visible ? message : ""}
    </HelperText>
  );

  if (error === undefined) {
    return renderHelperText(null);
  } else if (typeof error === "string") {
    return renderHelperText(error);
  } else {
    const { key, values } = error;
    // @ts-ignore - Ignore error caused by TypeScript complaints about "known" types
    return renderHelperText(t(key, values));
  }
};

export default InputError;
