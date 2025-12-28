import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginDialog: false,
  signUpDialog: false,
};

const dialogSlice = createSlice({
  name: "dialogBox",
  initialState,
  reducers: {
    setLoginDialog: (state, action) => {
      state.loginDialog = action.payload;
    },
    setSignUpDialog: (state, action) => {
      state.signUpDialog = action.payload;
    },
  },
});

export const { setLoginDialog, setSignUpDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
