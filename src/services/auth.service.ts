import API from "@/lib/axios";
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
import axios from "axios";

// <=================== Authentication ===================>

export const verifySessionAPI = (): Promise<{
  status: number;
  access_token: string;
  access_token_exp: Date;
}> => {
  return API.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/session/verify`);
};

export const refreshSessionAPI = (): Promise<{
  status: number;
  access_token: string;
  access_token_exp: Date;
}> => {
  return API.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/session/refresh`);
};

// <=================== Login ===================>

export const loginWithMobileAPI = (
  mobileLoginPayload: MobileLoginPayloadType,
): Promise<{
  status: number;
  message: string;
  opt_id?: string;
  users?: Omit<
    UserDataType,
    "user_dob" | "gender" | "user_mobile_no" | "user_pass"
  >[];
}> => {
  return API.post("/auth/login/mobile", mobileLoginPayload);
};

export const mobileLoginResendOtpAPI = (
  userMobileNo: string,
): Promise<{ message: string }> => {
  return API.post("/auth/login/mobile/otp/resend", {
    userMobileNo,
  });
};

export const onMobileOtpLoginAPI = (
  userLoginOTP: UserLoginOTP,
): Promise<{ status: number; message: string; access_token: string }> => {
  return API.post("/auth/login/mobile/otp/verify", userLoginOTP);
};

export const loginWithEmailAPI = (
  data: EmailLoginPayloadType,
): Promise<{ status: number; message: string; access_token: string }> => {
  return API.post("/auth/login/email", {
    userEmail: data.userEmail,
    userPass: data.userPass,
    device_ip: data.device_ip,
    device_lat: data.device_lat,
    device_long: data.device_long,
  });
};

export const loginWithGoogleAPI = (
  googleSignupPayload: GoogleSignupPayload,
): Promise<{ status: number; message: string; access_token: string }> => {
  return API.post(
    "auth/login/google",
    {
      device_ip: googleSignupPayload.device_ip,
      device_lat: googleSignupPayload.device_lat,
      device_long: googleSignupPayload.device_long,
    },
    {
      headers: {
        Authorization: googleSignupPayload.code,
      },
    },
  );
};

// <=================== Logout===================>

export const logoutAPI = (): Promise<{ status: number; message: string }> => {
  return API.get("/auth/logout");
};

// <=================== Sign up ===================>

export const signUpWithEmailAPI = (
  emailSignupPayload: EmailSignupPayload,
): Promise<{ status: number; message: string }> => {
  return API.post("auth/signup/email", emailSignupPayload);
};

export const signUpWithGoogleAPI = (
  googleSignupPayload: GoogleSignupPayload,
): Promise<{ status: number; message: string }> => {
  return API.post(
    "auth/signup/google",
    {
      device_ip: googleSignupPayload.device_ip,
      device_lat: googleSignupPayload.device_lat,
      device_long: googleSignupPayload.device_long,
    },
    {
      headers: {
        Authorization: googleSignupPayload.code,
      },
    },
  );
};

// <=================== Forgot/Reset Password ===================>

export const forgotPasswordAPI = (
  data: ForgotPasswordPayload,
): Promise<{ status: number; message: string }> => {
  return API.post("/auth/forgot/password", {
    userEmail: data.userEmail,
    device_ip: data.device_ip,
    device_lat: data.device_lat,
    device_long: data.device_long,
  });
};

export const resetPasswordAPI = (
  data: ResetPasswordPayload,
): Promise<{ status: number; message: string }> => {
  return API.post("/auth/reset/password", {
    password: data.userPass,
    reset_code: data.resetCode,
    device_ip: data.device_ip,
    device_lat: data.device_lat,
    device_long: data.device_long,
  });
};
