import API from "@/lib/axios";
import { SignUpSchemaSchemaType } from "@/lib/schema/auth/auth.schema";
import {
  EmailLoginPayloadType,
  ForgotPasswordPayload,
} from "../../types/auth/auth.type";

// <=================== Login ===================>

export const loginWithMobileAPI = (userMobileNo: string) => {
  return API.post("/auth/login/mobile", {
    userMobileNo,
  });
};

export const sendOtpAPI = (
  userMobileNo: string
): Promise<{ message: string }> => {
  return API.post("/auth/otp/send", {
    userMobileNo,
  });
};

export const otpVerificationAPI = (
  userLoginOTP: string
): Promise<{ message: string }> => {
  return API.post("/auth/otp/verify", {
    userLoginOTP,
  });
};

export const loginWithEmailAPI = (
  data: EmailLoginPayloadType
): Promise<{ status: boolean; message: string; access_token: string }> => {
  return API.post("/auth/login/email", {
    userEmail: data.userEmail,
    userPass: data.userPass,
    deviceId: data.deviceId,
    deviceIp: data.deviceIp,
    deviceLat: data.deviceLat,
    deviceLong: data.deviceLong,
  });
};

export const loginWithGoogleAPI = (
  code: string
): Promise<{ status: boolean; message: string }> => {
  return API.post("/auth/login/google", {
    authCode: code,
  });
};

// <=================== Logout===================>

export const logoutAPI = () => {
  return API.get("/auth/logout");
};

// <=================== Sign up ===================>

export const signUpWithEmailAPI = (
  signUpData: SignUpSchemaSchemaType
): Promise<{ status: boolean; message: string }> => {
  return API.post("auth/signup/email", signUpData);
};

// <=================== Forgot/Reset Password ===================>

export const forgotPasswordAPI = (
  data: ForgotPasswordPayload
): Promise<{ status: number; message: string }> => {
  return API.post("/auth/forgot/password", {
    userEmail: data.userEmail,
    deviceIp: data.deviceIp,
    deviceLat: data.deviceLat,
    deviceLong: data.deviceLong,
  });
};
