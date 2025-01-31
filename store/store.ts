import { configureStore } from "@reduxjs/toolkit";
import historyReducer, { HistorySliceType } from "./features/history/historySlice";
import { persistReducer, persistStore, WebStorage } from 'redux-persist';

const storage: WebStorage = {
  getItem: (key) => Promise.resolve((typeof window !== 'undefined' && localStorage.getItem(key)) || null),
  setItem: (key, value) => Promise.resolve(typeof window !== 'undefined' ? localStorage.setItem(key, value) : undefined),
  removeItem: (key) => Promise.resolve(typeof window !== 'undefined' ? localStorage.removeItem(key) : undefined),
};

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
    reducer: {
      history: persistReducer<HistorySliceType>(persistConfig, historyReducer)
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;