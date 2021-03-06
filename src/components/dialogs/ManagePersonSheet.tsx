import React, {
  forwardRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TFunction, useTranslation } from "react-i18next";
import { Alert, StyleSheet, TextInput as RNTextInput } from "react-native";
import { Button, Dialog, Text, useTheme } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

// Components
import { TextInput } from "@components/form";
import BottomSheet from "./BottomSheet";

// Types
import { IPerson, IPersonBase } from "@typings/people.types";
import { compareSafeStrings } from "@utilities/string";
import { BottomSheetRef } from "./BottomSheet";

interface IFormData {
  name: string;
}

type ManagePersonSheetProps = {
  /** Determine whether a name is valid (not used) */
  checkName?: (name: string) => boolean;
  /** Person to update */
  person?: IPerson | null;
  /** Add people callback */
  onAdd: (people: IPersonBase[]) => void;
  /** Cancellation callback */
  onCancel: () => void;
  /** Update person callback */
  onEdit: (person: IPerson) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getSchema = (t: TFunction<("common" | "screens")[], undefined>) =>
  yup.object({
    name: yup
      .string()
      .label(t("screens:peopleAddEdit.personNameLabel"))
      .required()
      .min(2),
  });

const ManagePersonSheet = forwardRef<BottomSheetRef, ManagePersonSheetProps>(
  (props: ManagePersonSheetProps, ref): ReactElement => {
    const { checkName, person, onAdd, onCancel: onCancelProp, onEdit } = props;

    const nameRef = useRef<RNTextInput | null>(null);
    const [names, setNames] = useState<string[]>([]);

    const { colors } = useTheme();
    const { t } = useTranslation(["common", "screens"]);
    const form = useForm<IFormData>({
      defaultValues: {
        name: person?.name ?? "",
      },
      resolver: yupResolver(getSchema(t)),
    });

    const editing = Boolean(person);
    const hasNameError = Boolean(form.formState.errors.name);
    const nameHasValue = Boolean(form.watch("name"));
    const showTitleRight = Boolean(!editing && names.length);

    // Clear form whenever edited person changes (when editing or adding)
    useEffect(() => {
      form.reset({
        name: person?.name ?? "",
      });
    }, [form, person]);

    /**
     * Cancel adding name(s)
     *
     * Includes safety check when adding multiple names
     */
    const onCancel = (): void => {
      // Enable cancelling without confirm if no names have already been entered
      if (!names.length || editing) {
        onCancelProp();
        return;
      }

      // Prompt user to confirm cancelling adding multiple names!
      Alert.alert(
        t("screens:peopleAddEdit.cancelAddConfirmTitle"),
        t("screens:peopleAddEdit.cancelAddConfirmDescription", {
          count: names.length,
        }),
        [
          { text: t("common:choices.cancel"), style: "cancel" },
          {
            text: t("common:choices.confirm"),
            onPress: onCancelProp,
          },
        ],
      );
    };

    /**
     * Prepare modal when opened
     */
    const onOpen = (): void => {
      // NOTE: Short timeout necessary to access ref and open keyboard!
      setTimeout(() => {
        nameRef.current?.focus();
      }, 250);

      // NOTE: Form is also reset by "visibility" (necessary for editing people)
      form.reset();
      setNames([]);
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

      // Prevent entering duplicate names (checks both current additions and main store).
      //   Note that while editing the user must be able to re-enter their same name,
      //   which technically does exist in the store already!
      const localListHasName = names.some((n) =>
        compareSafeStrings(n, newName),
      );
      const storeListHasName = checkName
        ? checkName(newName) && newName !== person?.name
        : false;
      if (localListHasName || storeListHasName) {
        form.setError("name", {
          message: t("screens:peopleAddEdit.personNameUsedError"),
        });
        return [false, names];
      }

      const newNames = [...names, newName];
      setNames(newNames);
      // NOTE: Workaround to reset form submission state for validation purposes,
      //         as the submission handler appears to set submitted state at the end?
      setTimeout(() => {
        form.reset();
      }, 10);
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

      // NOTE: Must use 'person' rather than 'editing' due to TypeScript inference
      if (!person) {
        const newPeople: IPersonBase[] = newNames.map((name) => ({
          id: uuidv4(),
          name,
        }));

        onAdd(newPeople);
      } else {
        onEdit({
          ...person,
          name: newNames[0],
        });
      }
    };

    /**
     * Special handler to add the entered local person/people
     *
     * NOTE: Will only be called if multiple names are already entered
     *         AND there is no current input. Otherwise it would not be
     *         possible to submit with an empty input (poor UX).
     *
     * @param data - Submitted form data
     */
    const onSubmitEmpty = (): void => {
      const newPeople: IPersonBase[] = names.map((name) => ({
        id: uuidv4(),
        name,
      }));

      onAdd(newPeople);
    };

    // NOTE: Must be able to submit form with empty input IF there is at least
    //         one name already added "locally." Since form validation will prevent
    //         this normally, we must skip the validation IF the form is also empty.
    const submitHandler =
      !editing && names.length && !nameHasValue
        ? onSubmitEmpty
        : form.handleSubmit(onSubmit);

    return (
      <BottomSheet
        ref={ref}
        style={styles.sheetContent}
        title={
          editing
            ? t("screens:peopleAddEdit.titleEdit")
            : t("screens:peopleAddEdit.titleAdd")
        }
        titleRight={
          showTitleRight ? (
            <Text style={styles.sheetTitleRight}>
              {t("screens:peopleAddEdit.peopleCount", { count: names.length })}
            </Text>
          ) : null
        }
        onOpen={onOpen}
      >
        <TextInput
          autoCapitalize="words"
          control={form.control}
          innerRef={nameRef}
          label={t("screens:peopleAddEdit.personNameLabel")}
          name="name"
          right={
            !editing && (
              <TextInput.Icon
                color={hasNameError ? colors.error : colors.primary}
                name="account-plus"
                onPress={form.handleSubmit(onNameAdd)}
              />
            )
          }
        />
        <Dialog.Actions style={styles.sheetActions}>
          <Button color={colors.grey.dark} onPress={onCancel}>
            {t("common:choices.cancel")}
          </Button>
          <Button onPress={submitHandler}>
            {editing ? t("common:actions.save") : t("common:actions.add")}
          </Button>
        </Dialog.Actions>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheetActions: {
    padding: 0,
  },
  sheetContent: {},
  sheetTitleRight: {
    marginRight: 2,
  },
});

export default ManagePersonSheet;
