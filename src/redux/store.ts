import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "@/redux/slices/session/sessionSlice";

export const ReduxStore = configureStore({
  reducer: {
    session: sessionSlice,
  },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
