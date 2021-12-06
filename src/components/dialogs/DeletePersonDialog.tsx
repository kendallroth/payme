import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

// Components
import { Alert } from "@components/typography";
import ConfirmDialog from "./ConfirmDialog";

// Types
import { IPerson } from "@typings/people.types";

export type DeletePersonDialogProps = {
  /** Person being deleted */
  person: IPerson | null;
  /** Whether modal is visible */
  visible: boolean;
  /** Cancel callback */
  onCancel: () => void;
  /** Confirmation callback */
  onConfirm: () => void;
};

const DeletePersonDialog = (
  props: DeletePersonDialogProps,
): ReactElement | null => {
  const { person, visible, onCancel, onConfirm } = props;

  const { t } = useTranslation(["screens"]);

  if (!person) return null;

  return (
    <ConfirmDialog
      title={t("screens:peopleList.deletePersonConfirmTitle")}
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <Text>{t("screens:peopleList.deletePersonConfirmDescription")}</Text>
      <Text style={styles.deleteDialogPerson}>{person.name}</Text>
      <Alert style={styles.deleteDialogAlert}>
        {t("screens:peopleList.deletePersonConfirmWarning")}
      </Alert>
    </ConfirmDialog>
  );
};

const styles = StyleSheet.create({
  deleteDialogAlert: {
    marginTop: 16,
  },
  deleteDialogPerson: {
    marginTop: 12,
    fontWeight: "bold",
  },
});

export default DeletePersonDialog;
