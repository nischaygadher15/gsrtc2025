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
