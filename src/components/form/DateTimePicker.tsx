import React, { ComponentProps, Fragment, ReactElement, useState } from "react";
import dayjs from "dayjs";
import { useController } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput as RNPTextInput } from "react-native-paper";

// Components
import TextInput from "./TextInput";

type DatePickerInputProps = {
  /** Parent selection callback */
  onSelect?: (value: string) => void;
} & ComponentProps<typeof TextInput>;

const DatePickerInput = (props: DatePickerInputProps): ReactElement => {
  const { control, name, onSelect, ...rest } = props;

  const [open, setOpen] = useState(false);

  const { field } = useController({
    control,
    name,
  });
  const valueDate = field.value ? dayjs(field.value).toDate() : new Date();

  /**
   * Custom change handler to convert from date to string
   *
   * @param date - Selected date
   */
  const onChange = (date?: Date): void => {
    if (!date) {
      setOpen(false);
      return;
    }

    const dateString = date ? dayjs(date).format("YYYY-MM-DD") : "";

    setOpen(false);

    field.onChange(dateString);
    onSelect && onSelect(dateString);
  };

  return (
    <Fragment>
      <TextInput
        {...rest}
        control={control}
        name={name}
        readonly
        right={
          <RNPTextInput.Icon
            name="calendar"
            onPress={(): void => setOpen(true)}
          />
        }
        onChange={(): void => {}}
        onFocus={(): void => setOpen(true)}
      />
      <DateTimePickerModal
        date={valueDate}
        isVisible={open}
        mode="date"
        onCancel={onChange}
        onConfirm={onChange}
      />
    </Fragment>
  );
};

DatePickerInput.Affix = RNPTextInput.Affix;
DatePickerInput.Icon = RNPTextInput.Icon;

export default DatePickerInput;
