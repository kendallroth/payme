import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";

export type ConfirmDialogProps = {
  /**
   * Cancel text
   *
   * @default "cancel"
   */
  cancelText?: string;
  /** Modal contents */
  children?: ReactElement | ReactElement[];
  /**
   * Confirmation text
   *
   * @default "confirm"
   */
  confirmText?: string;
  /** Whether modal is dismissable */
  dismissable?: boolean;
  /** Modal title */
  title: string;
  /** Whether modal is visible */
  visible: boolean;
  /** Cancel callback */
  onCancel?: () => void;
  /** Confirmation callback */
  onConfirm: () => void;
};

const ConfirmDialog = (props: ConfirmDialogProps): ReactElement => {
  let { cancelText, confirmText } = props;
  const {
    children,
    dismissable = false,
    title,
    visible,
    onCancel,
    onConfirm,
  } = props;

  const { t } = useTranslation(["common"]);
  const { colors } = useTheme();

  cancelText = cancelText ?? t("common:choices.cancel");
  confirmText = confirmText ?? t("common:choices.confirm");

  return (
    <Portal>
      <Dialog dismissable={dismissable} visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        {Boolean(children) && <Dialog.Content>{children}</Dialog.Content>}
        <Dialog.Actions>
          {Boolean(onCancel) && (
            <Button color={colors.grey.dark} onPress={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button onPress={onConfirm}>{confirmText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDialog;
