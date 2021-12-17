import React, { ComponentProps, Fragment, ReactElement, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useController } from "react-hook-form";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput as RNPTextInput, useTheme } from "react-native-paper";

// Components
import TextInput from "./TextInput";

// Utilities
import { formatDateString } from "@utilities/date.util";

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
  const { dark } = useTheme();
  const { t } = useTranslation(["common", "screens"]);

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

    const dateString = date
      ? formatDateString(date.toISOString(), "YYYY-MM-DD")
      : "";

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
        // Prevent text input (no input mask)
        onChange={(): void => {}}
        // NOTE: On iOS the input field apparently gets focused immediately again
        //         after focusing on the next field (unknown reason)...
        onFocus={(): void => setOpen(true)}
      />
      <DateTimePickerModal
        cancelTextIOS={t("common:choices.cancel")} // iOS only
        confirmTextIOS={t("common:choices.confirm")} // iOS only
        date={valueDate}
        // @ts-ignore
        display={Platform.OS === "ios" ? "inline" : "default"}
        isDarkModeEnabled={dark} // iOS only
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
