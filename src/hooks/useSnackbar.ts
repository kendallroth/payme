import { useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";

// Utilities
import { ISnackbarContext, SnackbarContext } from "@contexts";

interface ISnackbarHookOptions {
  /** Whether snackbar should be dismissed on screen transition */
  cleanup: boolean;
}

/**
 * Expose snackbar manager context as hook
 *
 * @param   options - Snackbar hook options
 * @returns Snackbar manager
 */
const useSnackbar = (options?: ISnackbarHookOptions): ISnackbarContext => {
  const snackbar = useContext(SnackbarContext);

  const { cleanup: shouldRemoveOnTransition = true } = options ?? {};

  // Remove snackbar when leaving page by default
  useFocusEffect(
    useCallback(() => {
      return (): void => {
        if (shouldRemoveOnTransition) {
          snackbar.closeNotification();
        }
      };
      // NOTE: Referencing 'closeNotification' here will cause infinite loop!
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return snackbar;
};

export { useSnackbar };
