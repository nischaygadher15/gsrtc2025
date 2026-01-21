import API from "@/lib/axios";
import {
  EmailLoginPayloadType,
  EmailSignupPayload,
  ForgotPasswordPayload,
  GoogleSignupPayload,
  MobileLoginPayload,
  ResetPasswordPayload,
} from "../types/auth/auth.type";
import { UserLoginOTP } from "./auth.type";

// <=================== Login ===================>

export const loginWithMobileAPI = (
  mobileLoginPayload: MobileLoginPayload,
): Promise<{ status: number; message: string; opt_id: string }> => {
  return API.post("/auth/login/mobile", {
    user_mobile_no: mobileLoginPayload.userMobileNo,
    device_ip: mobileLoginPayload.device_ip,
    device_lat: mobileLoginPayload.device_lat,
    device_long: mobileLoginPayload.device_long,
  });
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
  return API.post("/auth/login/mobile/otp/verify", {
    userLoginOTP,
  });
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
