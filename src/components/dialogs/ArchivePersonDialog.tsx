import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

// Components
import ConfirmDialog from "./ConfirmDialog";

// Types
import { IPerson } from "@typings/people.types";

export type ArchivePersonDialogProps = {
  /** Person being archived */
  person: IPerson | null;
  /** Whether modal is visible */
  visible: boolean;
  /** Cancel callback */
  onCancel: () => void;
  /** Confirmation callback */
  onConfirm: () => void;
};

const ArchivePersonDialog = (
  props: ArchivePersonDialogProps,
): ReactElement | null => {
  const { person, visible, onCancel, onConfirm } = props;

  const { t } = useTranslation(["screens"]);

  if (!person) return null;

  // TODO: Support unarchiving
  // const archiving = !person.archivedAt;

  return (
    <ConfirmDialog
      title={t("screens:peopleList.archivePersonConfirmTitle")}
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <Text>{t("screens:peopleList.archivePersonConfirmDescription")}</Text>
      <Text style={styles.archiveDialogPerson}>{person.name}</Text>
    </ConfirmDialog>
  );
};

const styles = StyleSheet.create({
  archiveDialogPerson: {
    marginTop: 16,
    fontWeight: "bold",
  },
});

export default ArchivePersonDialog;
