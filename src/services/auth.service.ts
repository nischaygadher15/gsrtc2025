import API from "@/lib/axios";

export const loginWithMobile = (userMobileNo: string) => {
  return API.post("/auth/login/mobile", {
    userMobileNo,
  });
};
