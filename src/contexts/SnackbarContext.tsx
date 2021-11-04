import React, { ReactElement, useReducer } from "react";
import { Snackbar } from "react-native-paper";

// Utilities
import theme from "@theme";

// Delay snackbar slightly to allow previous snackbars to close (animate) properly
const SNACKBAR_DELAY = 200;

interface ISnackbarState {
  buttonText: string | null;
  duration: number;
  message: string;
  open: boolean;
  permanent: boolean;
  type: string;
  onDismiss: () => void;
  onPress: () => void;
}

type SnackbarOptions = Partial<ISnackbarState>;

interface ISnackbarContext {
  /** Close notification */
  closeNotification: () => void
  /** Notify user (regular) */
  notify: (message: string, options?: SnackbarOptions) => void;
  /** Notify user (error) */
  notifyError: (message: string, options?: SnackbarOptions) => void;
  /** Snackbar state/options */
  snackbar: ISnackbarState;
}

interface ISnackbarAction {
  payload?: SnackbarOptions;
  type: string;
}

type SnackbarProviderProps = {
  children?: ReactElement | ReactElement[];
};

const initialState: ISnackbarState = {
  buttonText: "",
  duration: Snackbar.DURATION_SHORT,
  permanent: false,
  message: "",
  open: false,
  type: "info",
  onDismiss: () => {},
  onPress: () => {},
};

const reducer = (
  state: ISnackbarState,
  action: ISnackbarAction,
): ISnackbarState => {
  switch (action.type) {
    case "close":
      // NOTE: Resetting all state will cause visual bugs while the snackbar closes!
      return {
        ...state,
        open: false,
      };
    case "open":
      return {
        ...initialState,
        ...action.payload,
        open: true,
      };
    default:
      return state;
  }
};

const SnackbarContext = React.createContext<ISnackbarContext>({});

const SnackbarProvider = (props: SnackbarProviderProps) => {
  const { children } = props;
  const [snackbar, snackbarDispatch] = useReducer(reducer, initialState);

  let snackbarStyle = {};
  switch (snackbar.type) {
    case "error":
      snackbarStyle = {
        backgroundColor: theme.colors.error,
        color: theme.colors.white,
      };
      break;
    case "info":
    default:
      break;
  }

  const snackbarAction =
    snackbar.buttonText && snackbar.onPress
      ? { label: snackbar.buttonText, onPress: snackbar.onPress }
      : null;

  /**
   * Handle closing the snackbar
   */
  const onDismiss = () => {
    closeNotification();

    snackbar?.onDismiss();
  };

  /**
   * Close the notification
   */
  const closeNotification = () => snackbarDispatch({ type: "close" });

  /**
   * Open a notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notify = (message: string, options: SnackbarOptions = {}) => {
    // Close the previous notification
    closeNotification();

    // Use short timeout to allow close animation to finish
    setTimeout(() => {
      snackbarDispatch({ type: "open", payload: { ...options, message } });
    }, SNACKBAR_DELAY);
  };

  /**
   * Open an error notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notifyError = (message: string, options: SnackbarOptions = {}) => {
    notify(message, { ...options, type: "error" });
  };

  return (
    <SnackbarContext.Provider
      value={{ closeNotification, notify, notifyError, snackbar }}
    >
      {children}
      <Snackbar
        action={snackbarAction}
        duration={snackbar.duration}
        style={snackbarStyle}
        visible={snackbar.open}
        onDismiss={onDismiss}
      >
        {snackbar.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider };
