import React, { forwardRef, ReactElement, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TFunction, useTranslation } from "react-i18next";
import { Alert, StyleSheet, TextInput as RNTextInput } from "react-native";
import { Button, Dialog, Text, useTheme } from "react-native-paper";
import * as yup from "yup";

// Components
import { BottomSheet } from "@components/dialogs";
import { TextInput } from "@components/form";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { compareSafeStrings } from "@utilities/string";

interface IFormData {
  /** Number of people added (used for disabling "required" validation) */
  count: number;
  name: string;
}

type ManagePersonSheetProps = {
  /** Determine whether a name is valid (not used) */
  checkName?: (name: string) => boolean;
  /** Cancellation callback */
  onCancel: () => void;
  /** Save callback */
  onSave: (names: string[]) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getSchema = (t: TFunction<("common" | "screens")[], undefined>) =>
  yup.object({
    count: yup.number(),
    name: yup
      .string()
      .label(t("screens:peopleAdd.personNameLabel"))
      .required()
      .min(2),
  });

const ManagePersonSheet = forwardRef<BottomSheetRef, ManagePersonSheetProps>(
  (props: ManagePersonSheetProps, ref): ReactElement => {
    const { checkName, onCancel: onCancelProp, onSave } = props;

    const nameRef = useRef<RNTextInput | null>(null);
    const [names, setNames] = useState<string[]>([]);

    const { colors } = useTheme();
    const { t } = useTranslation(["common", "screens"]);
    const form = useForm<IFormData>({
      defaultValues: {
        count: 0,
        name: "",
      },
      resolver: yupResolver(getSchema(t)),
    });

    const hasNameError = form.formState.errors.name;

    /**
     * Cancel adding name(s)
     *
     * Includes safety check when adding multiple names
     */
    const onCancel = (): void => {
      // Enable cancelling without confirm if no names have already been entered
      if (!names.length) {
        onCancelProp();
        return;
      }

      // Prompt user to confirm cancelling adding multiple names!
      Alert.alert(
        t("screens:peopleAdd.cancelAddConfirmTitle"),
        t("screens:peopleAdd.cancelAddConfirmDescription", {
          count: names.length,
        }),
        [
          { text: t("common:confirmations.cancel"), style: "cancel" },
          {
            text: t("common:confirmations.confirm"),
            onPress: onCancelProp,
          },
        ],
      );
    };

    /**
     * Prepare modal when opened
     */
    const onOpen = (): void => {
      form.reset();
      setNames([]);

      // NOTE: Short timeout necessary to access ref and open keyboard!
      setTimeout(() => {
        nameRef.current?.focus();
      }, 150);
    };

    /**
     * Add another name to save (when using multiple workflow)
     *
     * @param   data - Submitted form data
     * @returns - Whether name was added successfully
     */
    const onNameAdd = (data: IFormData): [valid: boolean, names: string[]] => {
      const newName = data.name.trim();
      if (!newName) return [false, names];

      // Prevent entering duplicate names (checks both current additions and main store)
      const localListHasName = names.some((n) =>
        compareSafeStrings(n, newName),
      );
      const storeListHasName = checkName ? checkName(newName) : false;
      if (localListHasName || storeListHasName) {
        form.setError("name", {
          message: t("screens:peopleAdd.personNameUsedError"),
        });
        return [false, names];
      }

      const newNames = [...names, newName];
      setNames(newNames);
      // Track number of names added to conditionally disable 'required' name validation
      form.setValue("count", newNames.length);
      form.reset();
      return [true, newNames];
    };

    /**
     * Add the entered person/people
     *
     * NOTE: Will run validation against current name and include it (for single names)!
     *
     * @param data - Submitted form data
     */
    const onSubmit = (data: IFormData): void => {
      // NOTE: Cannot use state 'names' because they do not update in time after adding!
      const [valid, newNames] = onNameAdd(data);
      if (!valid) return;

      // TODO: Figure out way to detect when trying to submit after adding multiple people,
      //         as Yup requires the name field! Validation should be required whenever
      //         adding via the "add more" button, but not via the "Save" button IF at
      //         least one person has been added!

      onSave(newNames);
    };

    return (
      <BottomSheet
        ref={ref}
        style={styles.sheetContent}
        title={t("screens:peopleAdd.title")}
        titleRight={
          names.length ? (
            <Text style={styles.sheetTitleRight}>
              {t("screens:peopleAdd.peopleCount", { count: names.length })}
            </Text>
          ) : null
        }
        onOpen={onOpen}
      >
        <TextInput
          autoCapitalize="words"
          control={form.control}
          error={false}
          innerRef={nameRef}
          name="name"
          label={t("screens:peopleAdd.personNameLabel")}
          right={
            <TextInput.Icon
              color={hasNameError ? colors.error : colors.primary}
              name="account-plus"
              onPress={form.handleSubmit(onNameAdd)}
            />
          }
        />
        <Dialog.Actions>
          <Button color={colors.grey.dark} onPress={onCancel}>
            {t("common:confirmations.cancel")}
          </Button>
          <Button onPress={form.handleSubmit(onSubmit)}>
            {t("common:actions.add")}
          </Button>
        </Dialog.Actions>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheetContent: {},
  sheetTitleRight: {
    marginRight: 2,
  },
});

export default ManagePersonSheet;
