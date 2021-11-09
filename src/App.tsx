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
import setupStore from "@store";
import theme, { colors } from "@styles/theme";
import "./localization/config";

// NOTE: Optimize React Navigation memory usage/performance?
// Taken from: https://reactnavigation.org/docs/react-native-screens/
enableScreens();

const { persistor, store } = setupStore();

const App = (): ReactElement | null => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <ContextProvider>
          {/* NOTE: Children are not rendered until app is fully loaded! */}
          <TheAppDataLoader persistor={persistor}>
            <View style={styles.app}>
              <StatusBar style="auto" />
              <AppRouter />
            </View>
          </TheAppDataLoader>
        </ContextProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

registerRootComponent(App);
