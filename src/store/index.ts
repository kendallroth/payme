import i18n from "i18next";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utilities
import config from "@config";
import reducers from "./reducers";

// Types
import { Persistor } from "redux-persist/es/types";

interface IStoreExport {
  persistor: Persistor;
  store: typeof store;
}

const persistConfig = {
  // Enable separately persisted Redux stores per release channel
  key: `store_${config.environment}`,
  storage: AsyncStorage,
  whitelist: ["events", "people", "settings"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore serialization issues caused by redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: persistedReducer,
});

/**
 * Setup Redux store and configure persistance
 *
 * @returns Redux store and persistance
 */
const setupStore = (): IStoreExport => {
  const persistor = persistStore(store, null, () => {
    // NOTE: Language is loaded when store is rehydrated from async storage
    const language = store.getState().settings.language;
    i18n.changeLanguage(language);
  });

  // @ts-ignore
  if (process.env.NODE_ENV !== "production" && module.hot) {
    // Source: https://github.com/rt2zz/redux-persist/blob/master/docs/hot-module-replacement.md
    // @ts-ignore
    module.hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default;
      store.replaceReducer(persistReducer(persistConfig, nextReducer));
    });
  }

  return { persistor, store };
};

export default setupStore;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
