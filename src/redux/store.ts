import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "@/redux/slices/session/sessionSlice";
import dialogSlice from "@/redux/slices/dialog/dialogSlice";
import userSLice from "./slices/user/user.slice";

export const ReduxStore = configureStore({
  reducer: {
    session: sessionSlice,
    dialog: dialogSlice,
    user: userSLice,
  },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
