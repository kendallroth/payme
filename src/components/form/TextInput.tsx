import React, {
  ComponentProps,
  Fragment,
  ReactElement,
  RefObject,
} from "react";
import { Control, useController } from "react-hook-form";
import { TextInput as RNTextInput } from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";

// Components
import InputError from "./InputError";

type TextInputProps = {
  /** Control from 'react-hook-form' */
  control: Control<any>;
  /** TextInput ref */
  innerRef?: RefObject<RNTextInput>;
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
      <InputError error={error?.message} visible={errorShown} />
    </Fragment>
  );
};

TextInput.Affix = RNPTextInput.Affix;
TextInput.Icon = RNPTextInput.Icon;

export default TextInput;
