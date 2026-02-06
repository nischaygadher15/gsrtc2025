import axios from "axios";
import {
  EmailLoginPayloadType,
  EmailSignupPayload,
  ForgotPasswordPayload,
  GoogleSignupPayload,
  MobileLoginPayloadType,
  ResetPasswordPayload,
  UserLoginOTP,
} from "../types/auth/auth.type";
import { UserDataType } from "@/types/user/user.type";

// <=================== Authentication ===================>

export const verifySessionAPI = (): Promise<{
  status: number;
  access_token: string;
  access_token_exp: Date;
}> => {
  return axios.get(`/api/auth/session/verify`);
};

export const refreshSessionAPI = (): Promise<{
  status: number;
  access_token: string;
  access_token_exp: Date;
}> => {
  return axios.get(`/api/auth/session/refresh`);
};

// <=================== Login ===================>

// <=================== Logout===================>

// <=================== Sign up ===================>

// <=================== Forgot/Reset Password ===================>

