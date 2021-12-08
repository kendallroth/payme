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
import InputHelperText from "./InputHelperText";

type TextInputProps = {
  /** Control from 'react-hook-form' */
  control: Control<any>;
  /** Hint text */
  hint?: string;
  /** TextInput ref */
  innerRef?: RefObject<RNTextInput>;
  /** Form control name */
  name: string;
  /** Whether field is readonly (allows focus) */
  readonly?: boolean;
} & ComponentProps<typeof RNPTextInput>;

const TextInput = (props: TextInputProps): ReactElement => {
  const { control, hint, innerRef, name, readonly = false, ...rest } = props;

  const { field, fieldState, formState } = useController({
    control,
    name,
  });
  const { error, isTouched } = fieldState;
  const { isSubmitted } = formState;

  // Show errors when field has been touched or submitted (apparently does not touch fields...)
  const errorShown = Boolean(error?.message) && (isTouched || isSubmitted);
  // Numbers must be cast to strings (type warnings)
  const fieldValue = field.value ? `${field.value}` : field.value;

  return (
    <Fragment>
      <RNPTextInput
        {...rest}
        ref={innerRef}
        error={errorShown}
        value={fieldValue}
        onBlur={field.onBlur}
        onChangeText={!readonly ? field.onChange : undefined}
      />
      <InputHelperText
        error={error?.message}
        hint={hint}
        visible={Boolean(errorShown || hint)}
      />
    </Fragment>
  );
};

TextInput.Affix = RNPTextInput.Affix;
TextInput.Icon = RNPTextInput.Icon;

export default TextInput;
