import { UserStateType } from "@/types/user/user.type";
import { createSlice } from "@reduxjs/toolkit";

export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

const initialState: { data: UserStateType } = {
  data: {
    id: "",
    role: "",
    first_name: "",
    last_name: "",
    gender: "",
    user_dob: "",
    user_mobile_no: "",
    user_email: "",
    user_photo: "",
    is_email_verified: false,
    is_mobile_verified: false,
  },
};

const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { setUser, clearUser } = userSLice.actions;

export default userSLice.reducer;
