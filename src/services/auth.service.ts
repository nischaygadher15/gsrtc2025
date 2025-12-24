import API from "@/lib/axios";

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
}): Promise<{ status: boolean; message: string }> => {
  return API.post("/auth/login/email", {
    userEmail: data.userEmail,
    userPass: data.userPass,
  });
};

export const loginWithGoogleAPI = (
  code: string
): Promise<{ status: boolean; message: string }> => {
  return API.post("/auth/login/google", {
    authCode: code,
  });
};
