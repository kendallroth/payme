import React, {
  ComponentProps,
  Fragment,
  ReactElement,
  RefObject,
} from "react";
import { Control, useController } from "react-hook-form";
import { TextInput as RNTextInput } from "react-native";
import { HelperText, TextInput as RNPTextInput } from "react-native-paper";

type TextInputProps = {
  /** Control from 'react-hook-form' */
  control: Control<any>;
  /** TextInput ref */
  innerRef: RefObject<RNTextInput>;
  /** Form control name */
  name: string;
} & ComponentProps<typeof RNPTextInput>;

const TextInput = (props: TextInputProps): ReactElement => {
  const { control, innerRef, name, ...rest } = props;

  const { field, fieldState, formState } = useController({
    control,
    name,
  });
  const { error, isTouched } = fieldState;
  const { isSubmitted } = formState;

  // Show errors when field has been touched or submitted (apparently does not touch fields...)
  const errorShown = Boolean(error?.message) && (isTouched || isSubmitted);

  return (
    <Fragment>
      <RNPTextInput
        {...rest}
        ref={innerRef}
        error={errorShown}
        value={field.value}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
      />
      <HelperText type="error" visible={errorShown}>
        {/* NOTE: Need an extra check ('visible' flickers briefly...) */}
        {errorShown ? error?.message : ""}
      </HelperText>
    </Fragment>
  );
};

TextInput.Affix = RNPTextInput.Affix;
TextInput.Icon = RNPTextInput.Icon;

export default TextInput;
