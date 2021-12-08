import React, { forwardRef, ReactElement, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TFunction, useTranslation } from "react-i18next";
import {
  StyleSheet,
  TextInput as RNTextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { Button, Dialog, useTheme } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

// Components
import { DateTimeInput, TextInput } from "@components/form";
import BottomSheet from "./BottomSheet";

// Types
import { IEvent, IEventBase } from "@typings/event.types";
import { BottomSheetRef, BOTTOM_SHEET_PADDING } from "./BottomSheet";

interface IFormData {
  cost: number | null;
  date: string;
  title: string;
}

type ManageEventSheetProps = {
  /** Event to update */
  event?: IEvent | null;
  /** Add event callback */
  onAdd: (event: IEventBase) => void;
  /** Cancellation callback */
  onCancel: () => void;
  /** Update event callback */
  onEdit: (event: IEvent) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getSchema = (t: TFunction<("common" | "screens")[], undefined>) =>
  yup.object({
    cost: yup
      .number()
      .label(t("screens:eventAddEdit.eventCostLabel"))
      .min(
        0,
        t("common:validations.invalid", { path: t("screens:eventAddEdit.eventCostLabel")}), // prettier-ignore
      ),
    date: yup
      .string()
      .label(t("screens:eventAddEdit.eventDateLabel"))
      .required()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        t("screens:eventAddEdit.eventDateFormatError"),
      ),
    title: yup
      .string()
      .label(t("screens:eventAddEdit.eventTitleLabel"))
      .required()
      .min(2),
  });

const ManageEventSheet = forwardRef<BottomSheetRef, ManageEventSheetProps>(
  (props: ManageEventSheetProps, ref): ReactElement => {
    const { event, onAdd, onCancel, onEdit } = props;

    const titleRef = useRef<RNTextInput | null>(null);
    const dateRef = useRef<RNTextInput | null>(null);
    const costRef = useRef<RNTextInput | null>(null);

    const { width: screenWidth } = useWindowDimensions();
    const { colors } = useTheme();
    const { t } = useTranslation(["common", "screens"]);
    const form = useForm<IFormData>({
      defaultValues: {
        cost: event?.cost ?? null,
        date: event?.date ?? "",
        title: event?.title ?? "",
      },
      resolver: yupResolver(getSchema(t)),
    });

    const editing = Boolean(event);
    const themeStyles = {
      formRowInput: {
        width: screenWidth / 2 - BOTTOM_SHEET_PADDING * 1.5,
      },
      formRowInputMargin: {
        marginLeft: BOTTOM_SHEET_PADDING,
      },
    };

    // Clear form whenever edited person changes (when editing or adding)
    useEffect(() => {
      form.reset({
        cost: event?.cost ?? null,
        date: event?.date ?? "",
        title: event?.title ?? "",
      });
    }, [event, form]);

    /**
     * Prepare modal when opened
     */
    const onOpen = (): void => {
      // NOTE: Short timeout necessary to access ref and open keyboard!
      setTimeout(() => {
        titleRef.current?.focus();
      }, 250);

      // NOTE: Form is also reset by "visibility" (necessary for editing event)
      form.reset();
    };

    /**
     * Add/update the entered event
     *
     * @param data - Submitted form data
     */
    const onSubmit = (data: IFormData): void => {
      // NOTE: Must use 'event' rather than 'editing' due to TypeScript inference
      if (!event) {
        onAdd({
          ...data,
          id: uuidv4(),
          cost: data.cost ?? undefined,
        });
      } else {
        onEdit({
          ...event,
          ...data,
          cost: data.cost ?? undefined,
        });
      }
    };

    return (
      <BottomSheet
        ref={ref}
        style={styles.sheetContent}
        title={
          editing
            ? t("screens:eventAddEdit.titleEdit")
            : t("screens:eventAddEdit.titleAdd")
        }
        onOpen={onOpen}
      >
        <TextInput
          // Prevent keyboard from flickering when moving to next field
          blurOnSubmit={false}
          control={form.control}
          innerRef={titleRef}
          label={t("screens:eventAddEdit.eventTitleLabel")}
          name="title"
          returnKeyType="next"
          onSubmitEditing={(): void => dateRef.current?.focus()}
        />
        <View style={styles.sheetFormRow}>
          <View style={themeStyles.formRowInput}>
            <DateTimeInput
              // Prevent keyboard from flickering when moving to next field
              blurOnSubmit={false}
              control={form.control}
              innerRef={dateRef}
              label={t("screens:eventAddEdit.eventDateLabel")}
              name="date"
              returnKeyType="next"
              onSelect={(): void => costRef.current?.focus()}
              onSubmitEditing={(): void => costRef.current?.focus()}
            />
          </View>
          <View
            style={[themeStyles.formRowInput, themeStyles.formRowInputMargin]}
          >
            <TextInput
              control={form.control}
              hint={t("common:phrases.optional")}
              innerRef={costRef}
              keyboardType="number-pad"
              label={`${t("screens:eventAddEdit.eventCostLabel")}*`}
              left={<TextInput.Affix text="$  " />}
              maxLength={4}
              name="cost"
            />
          </View>
        </View>
        <Dialog.Actions style={styles.sheetActions}>
          <Button color={colors.grey.dark} onPress={onCancel}>
            {t("common:confirmations.cancel")}
          </Button>
          <Button onPress={form.handleSubmit(onSubmit)}>
            {editing ? t("common:actions.save") : t("common:actions.add")}
          </Button>
        </Dialog.Actions>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheetActions: {
    marginTop: 8,
    padding: 0,
  },
  sheetContent: {},
  sheetFormRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  sheetTitleRight: {
    marginRight: 2,
  },
});

export default ManageEventSheet;
