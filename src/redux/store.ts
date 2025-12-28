import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "@/redux/slices/session/sessionSlice";
import dialogSlice from "@/redux/slices/session/dialogSlice";

export const ReduxStore = configureStore({
  reducer: {
    session: sessionSlice,
    dialog: dialogSlice,
  },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
