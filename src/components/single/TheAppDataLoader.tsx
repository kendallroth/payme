/*
 * Component to keep splash screen visible until vital data is loaded.
 *
 * Adapted from: https://github.com/rt2zz/redux-persist/blob/master/src/integration/react.js
 */

import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Persistor, PersistorSubscribeCallback } from "redux-persist/es/types";

type AppDataLoaderProps = {
  children: React.ReactElement;
  /** Redux persistor */
  persistor: Persistor;
};

/**
 * Data Loader to keep splash screen until important data is loaded
 */
const AppDataLoader = (
  props: AppDataLoaderProps,
): React.ReactElement | null => {
  const { children, persistor } = props;

  // NOTE: Need to track Redux Persist loading status separately!
  const [isAppReady, setIsAppReady] = useState(false);
  const [isReduxReady, setIsReduxReady] = useState(false);

  useEffect(() => {
    // Prevent hiding the splash screen automatically (ignore errors)
    SplashScreen.preventAutoHideAsync().catch();
  }, []);

  // Load persisted Redux data into store
  useEffect(() => {
    const unsubscribe = persistor.subscribe(
      handlePersistor as PersistorSubscribeCallback,
    );

    handlePersistor(unsubscribe);

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load/cache appropriate app data (Redux is separate)
  // TODO: Eventually follow this guide more closely (if using Redux?)
  //         https://docs.expo.io/versions/latest/sdk/splash-screen/
  useEffect(() => {
    const prepare = async (): Promise<void> => {
      // TODO: Load
      try {
      } catch {
        // TODO: Handle errors...
      } finally {
        setIsAppReady(true);
      }
    };

    prepare();
  }, []);

  /**
   * Hide the splash screen once all data has loaded
   *
   * NOTE: This is currently just Redux Persist!
   *
   * @param {function} unsubscribe - Persistor watch unsubscribe function
   */
  const handlePersistor = (unsubscribe: () => void): void => {
    const { bootstrapped } = persistor.getState();
    if (!bootstrapped) return;

    setIsReduxReady(true);

    unsubscribe && unsubscribe();
  };

  // Only hide the splash screen once data is fully loaded; otherwise there
  //   will be a brief flash of the loading screen!
  useEffect(() => {
    if (isAppReady && isReduxReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady, isReduxReady]);

  if (!isAppReady || !isReduxReady) return null;

  return children;
};

export default AppDataLoader;
