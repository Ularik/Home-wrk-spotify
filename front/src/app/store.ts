import { configureStore } from "@reduxjs/toolkit";
import artistsReducer from "../components/artists/store/artistsSlice";
import albumsReducer from "../components/albums/store/albumsSlice";
import trecksReducer from "../components/trecks/store/trecksSlice";


export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    trecks: trecksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
