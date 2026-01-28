"use server";

import { refreshSessionAPI } from "@/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const refreshSession = async (): Promise<{
  status: number;
  access_token?: string;
  message?: string;
}> => {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("GSRTC_SESSION")?.value;
    console.log("sessionId: ", sessionId, cookieStore);

    const clearSession = () => {
      cookieStore.set("GSRTC_ACCESS_TOKEN", "", {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
        path: "/",
        sameSite:
          process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
        maxAge: 0,
      });
      cookieStore.set("GSRTC_SESSION", "", {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
        path: "/",
        sameSite:
          process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
        maxAge: 0,
      });
    };

    if (!sessionId) {
      console.log("401: sessionId not found");
      // clearSession();
      return {
        status: 401,
        message: "401: sessionId not found",
      };
    }

    const refreshTokenRes = await refreshSessionAPI(sessionId);

    console.log("refreshTokenRes: ", refreshTokenRes.data);

    const setCookieHeader = refreshTokenRes.headers["set-cookie"];

    if (!setCookieHeader) {
      console.log("401: setCookieHeader not found");
      // clearSession();
      return {
        status: 401,
        message: "401: setCookieHeader not found",
      };
    }

    // console.log(
    //   "setCookieHeader: ",
    //   setCookieHeader,
    //   new Date(parseInt(setCookieHeader.toString().split(",")[1])),
    // );

    cookieStore.set(
      "GSRTC_ACCESS_TOKEN",
      setCookieHeader.toString().split(",")[0],
      {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
        path: "/",
        sameSite:
          process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
        expires: new Date(parseInt(setCookieHeader.toString().split(",")[1])),
      },
    );

    if (refreshTokenRes.data.status === 200) {
      console.log("Refreshed");
      return {
        status: 200,
        access_token: setCookieHeader.toString().split(",")[0],
      };
    } else {
      console.log("401: Failed Refreshed");
      // clearSession();
      return {
        status: 401,
        message: "401: Failed Refreshed",
      };
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
