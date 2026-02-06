import { createSlice } from "@reduxjs/toolkit";

interface sessionStateType {
  session_id: string | null;
}

const initialState: sessionStateType = {
  session_id: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session_id = action.payload;
    },

    sessionLogout: (state) => {
      state.session_id = null;
    },
  },
});

export const { setSession, sessionLogout } = sessionSlice.actions;

export default sessionSlice.reducer;
