import { createSlice } from "@reduxjs/toolkit";

interface sessionStateType {
  sessionId: string | null;
}

const initialState: sessionStateType = {
  sessionId: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.sessionId = action.payload;
    },

    sessionLogout: (state) => {
      state.sessionId = null;
    },
  },
});

export const { setSession, sessionLogout } = sessionSlice.actions;

export default sessionSlice.reducer;
