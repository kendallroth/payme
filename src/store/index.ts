import i18n from "i18next";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["settings"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore serialization issues caused by redux-persist actions
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  reducer: persistedReducer,
});

const setupStore = (): any => {
  const persistor = persistStore(store, null, () => {
    // NOTE: Language is loaded when store is rehydrated from async storage
    const language = store.getState().settings.language;
    i18n.changeLanguage(language);
  });

  // @ts-ignore
  if (process.env.NODE_ENV === "development" && module.hot) {
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
