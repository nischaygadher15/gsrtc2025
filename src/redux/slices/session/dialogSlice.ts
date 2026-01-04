import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginDialog: false,
  signUpDialog: false,
  resetPassword: false,
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
    setResetPasswordDialog: (state, action) => {
      state.resetPassword = action.payload;
    },
  },
});

export const { setLoginDialog, setSignUpDialog, setResetPasswordDialog } =
  dialogSlice.actions;

export default dialogSlice.reducer;
