import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

// Components
import { Alert } from "@components/typography";
import ConfirmDialog from "./ConfirmDialog";

// Types
import { IEvent } from "@typings/event.types";

export type DeleteEventDialogProps = {
  /** Event being deleted */
  event: IEvent | null;
  /** Whether modal is visible */
  visible: boolean;
  /** Cancel callback */
  onCancel: () => void;
  /** Confirmation callback */
  onConfirm: () => void;
};

const DeleteEventDialog = (
  props: DeleteEventDialogProps,
): ReactElement | null => {
  const { event, visible, onCancel, onConfirm } = props;

  const { t } = useTranslation(["screens"]);

  if (!event) return null;

  return (
    <ConfirmDialog
      title={t("screens:eventList.deleteEventConfirmTitle")}
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <Text>{t("screens:eventList.deleteEventConfirmDescription")}</Text>
      <Text style={styles.deleteDialogEvent}>{event.title}</Text>
      {/* TODO: Include attendance count??? */}
      <Alert style={styles.deleteDialogAlert}>
        {t("screens:eventList.deleteEventConfirmWarning")}
      </Alert>
    </ConfirmDialog>
  );
};

const styles = StyleSheet.create({
  deleteDialogAlert: {
    marginTop: 16,
  },
  deleteDialogEvent: {
    marginTop: 12,
    fontWeight: "bold",
  },
});

export default DeleteEventDialog;
