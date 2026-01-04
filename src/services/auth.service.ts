import API from "@/lib/axios";
import {
  EmailLoginPayloadType,
  EmailSignupPayload,
  ForgotPasswordPayload,
  GoogleSignupPayload,
  ResetPasswordPayload,
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
    device_ip: data.device_ip,
    device_lat: data.device_lat,
    device_long: data.device_long,
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
  emailSignupPayload: EmailSignupPayload
): Promise<{ status: number; message: string }> => {
  return API.post("auth/signup/email", emailSignupPayload);
};

export const signUpWithGoogleAPI = (
  googleSignupPayload: GoogleSignupPayload
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
    }
  );
};

// <=================== Forgot/Reset Password ===================>

export const forgotPasswordAPI = (
  data: ForgotPasswordPayload
): Promise<{ status: number; message: string }> => {
  return API.post("/auth/forgot/password", {
    userEmail: data.userEmail,
    device_ip: data.device_ip,
    device_lat: data.device_lat,
    device_long: data.device_long,
  });
};

export const resetPasswordAPI = (
  data: ResetPasswordPayload
): Promise<{ status: number; message: string }> => {
  return API.post("/auth/reset/password", {
    userPass: data.userPass,
    userConfirmPass: data.userConfirmPass,
    device_ip: data.device_ip,
    device_lat: data.device_lat,
    device_long: data.device_long,
  });
};
