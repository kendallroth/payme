import React, { ReactElement, useReducer } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Portal } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";

// Utilities
import { colors } from "@theme";

interface IAppLoaderState {
  text: string | null;
  visible: boolean;
}

export interface IAppLoaderContext {
  /**
   * Hide loading animation
   */
  hide: () => void;
  /**
   * Show loading animation
   *
   * @param text - Loading text
   */
  show: (text: string | null) => void;
}

interface IAppLoaderAction {
  payload?: Partial<IAppLoaderState>;
  type: string;
}

type AppLoaderProviderProps = {
  children?: ReactElement | ReactElement[];
};

const initialState: IAppLoaderState = {
  text: null,
  visible: false,
};

const reducer = (
  state: IAppLoaderState,
  action: IAppLoaderAction,
): IAppLoaderState => {
  switch (action.type) {
    case "close":
      return {
        ...state,
        visible: false,
      };
    case "open":
      return {
        ...state,
        ...action.payload,
        visible: true,
      };
    default:
      return state;
  }
};

// @ts-ignore - Will be set by context provider
const AppLoaderContext = React.createContext<IAppLoaderContext>({});

const AppLoaderProvider = (props: AppLoaderProviderProps): ReactElement => {
  const { children } = props;
  const [loading, loadingDispatch] = useReducer(reducer, initialState);

  /**
   * Show the loading indicator
   *
   * @param {string} text - Loading text
   */
  const startLoading = (text: string | null = null): void =>
    loadingDispatch({ type: "open", payload: { text } });

  /**
   * Dismiss the loading indicator
   */
  const stopLoading = (): void => loadingDispatch({ type: "close" });

  const loader = { hide: stopLoading, show: startLoading };

  return (
    <AppLoaderContext.Provider value={loader}>
      {children}
      <Portal>
        <Spinner
          animation="fade"
          customIndicator={
            <ActivityIndicator color={colors.white} size="large" />
          }
          overlayColor="rgba(0, 0, 0, 0.5)"
          textContent={loading.text ?? ""}
          textStyle={styles.text}
          visible={loading.visible}
        />
      </Portal>
    </AppLoaderContext.Provider>
  );
};

const styles = StyleSheet.create({
  text: {
    width: "100%",
    color: colors.white,
    textAlign: "center",
  },
});

export { AppLoaderContext, AppLoaderProvider };
