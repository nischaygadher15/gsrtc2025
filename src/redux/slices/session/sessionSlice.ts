import { createSlice } from "@reduxjs/toolkit";

interface sessionStateType {
  access_token: string | null;
}

const initialState: sessionStateType = {
  access_token: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.access_token = action.payload;
    },

    sessionLogout: (state) => {
      state.access_token = null;
    },
  },
});

export const { setSession, sessionLogout } = sessionSlice.actions;

export default sessionSlice.reducer;
