// Polyfill for 'getRandomValues': https://github.com/uuidjs/uuid#getrandomvalues-not-supported
import "react-native-get-random-values";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";

// Components
import { TheAppDataLoader } from "@components/single";
import ContextProvider from "@contexts/ContextProvider";
import AppRouter from "./AppRouter";

// Utilities
import { useAppSelector } from "@hooks";
import { SettingsService } from "@services";
import { selectThemeConfig } from "@store/slices/settings";
import setupStore from "@store";
import { darkTheme, lightTheme } from "@styles/theme";
import "./localization/config";

// Types
import { AppTheme } from "@typings";

// NOTE: Optimize React Navigation memory usage/performance?
// Taken from: https://reactnavigation.org/docs/react-native-screens/
enableScreens();

const { persistor, store } = setupStore();

const AppWrapped = (): ReactElement => {
  // QUESTION: Does this actually react to changes?
  // NOTE: Cannot use Redux selectors because Redux context does not exist
  // const themeConfig = store.getState().settings.theme;
  const themeConfig = useAppSelector(selectThemeConfig);

  const themeType: AppTheme =
    themeConfig.code === AppTheme.AUTO
      ? SettingsService.getDeviceTheme()
      : themeConfig.code;
  const theme = themeType === AppTheme.DARK ? darkTheme : lightTheme;
  const statusTheme = themeType === AppTheme.DARK ? "light" : "dark";

  const appStyles = {
    backgroundColor: theme.colors.background,
  };

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <ContextProvider>
          {/* NOTE: Children are not rendered until app is fully loaded! */}
          <TheAppDataLoader persistor={persistor}>
            <View style={[styles.app, appStyles]}>
              <StatusBar style={statusTheme} />
              <AppRouter />
            </View>
          </TheAppDataLoader>
        </ContextProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

const App = (): ReactElement => (
  <ReduxProvider store={store}>
    <AppWrapped />
  </ReduxProvider>
);

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

registerRootComponent(App);
