import { configureStore, combineReducers } from "@reduxjs/toolkit";
import artistsReducer from "../components/artists/store/artistsSlice";
import albumsReducer from "../components/albums/store/albumsSlice";
import trecksReducer from "../components/trecks/store/trecksSlice";
import { usersReducer } from "../components/users/store/usersSlice";
import storage from "redux-persist/es/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";


const usersPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  artists: artistsReducer,
  albums: albumsReducer,
  trecks: trecksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
