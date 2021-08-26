import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";

// Components
import Router from "./Router";

// Utilities
import theme, { colors } from "@styles/theme";

const App = (): ReactElement | null => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Prevent hiding the splash screen automatically (ignore errors)
      await SplashScreen.preventAutoHideAsync().catch();

      setIsAppReady(true);
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      // This tells the splash screen to hide immediately! If we call this after `setAppIsReady`,
      //   then we may see a blank screen while the app is loading its initial state and
      //   rendering its first pixels. So instead,  we hide the splash screen once we know the
      //   root view has already performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) return null;

  return (
    <PaperProvider theme={theme}>
      <View style={styles.app} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Router />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

registerRootComponent(App);
