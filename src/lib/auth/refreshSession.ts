"use client";

import { refreshSessionAPI } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { clearSession, setAccessToken } from "./manageCookies";

export const refreshSession = async (): Promise<{
  status: number;
  access_token?: string;
  message?: string;
}> => {
  try {
    const refreshTokenRes = await refreshSessionAPI();

    console.log("refreshTokenRes: ", refreshTokenRes);

    if (refreshTokenRes.status === 200) {
      console.log("Refreshed");

      await setAccessToken(
        refreshTokenRes.access_token,
        refreshTokenRes.access_token_exp,
      );

      return {
        status: 200,
        access_token: refreshTokenRes.access_token,
      };
    } else {
      console.log("401: Failed Refreshed");
      await clearSession();
      return {
        status: 401,
        message: "401: Failed Refreshed",
      };
    }
  } catch (error) {
    console.log("Error: ", error);

    return {
      status: 500,
      message: "500: Failed Refreshed",
    };
  }
};
