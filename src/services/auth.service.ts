import API from "@/lib/axios";
import { SignUpSchemaSchemaType } from "@/lib/schema/auth/auth.schema";

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

export const loginWithEmailAPI = (data: {
  userEmail: string;
  userPass: string;
  userAgent: string;
  deviceId: string;
}): Promise<{ status: boolean; message: string; access_token: string }> => {
  return API.post("/auth/login/email", {
    userEmail: data.userEmail,
    userPass: data.userPass,
    userAgent: data.userAgent,
    deviceId: data.deviceId,
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

// <=================== Login ===================>

export const signUpWithEmailAPI = (
  signUpData: SignUpSchemaSchemaType
): Promise<{ status: boolean; message: string }> => {
  return API.post("auth/signup/email", signUpData);
};
