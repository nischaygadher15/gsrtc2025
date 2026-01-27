"use server";

import { refreshSessionAPI } from "@/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const refreshSession = async (): Promise<{
  status: boolean;
  access_token: string;
}> => {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("GSRTC_SESSION")?.value;

    const clearSession = () => {
      cookieStore.set("GSRTC_ACCESS_TOKEN", "", {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite:
          process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
        maxAge: 0,
      });
      cookieStore.set("GSRTC_SESSION", "", {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite:
          process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
        maxAge: 0,
      });
    };

    if (!sessionId) {
      clearSession();
      redirect("/login");
    }

    const refreshTokenRes = await refreshSessionAPI(sessionId);

    console.log("refreshTokenRes: ", refreshTokenRes.data);

    const setCookieHeader = refreshTokenRes.headers["set-cookie"];

    if (!setCookieHeader) {
      clearSession();
      redirect("/login");
    }

    // console.log(
    //   "setCookieHeader: ",
    //   typeof setCookieHeader,
    //   setCookieHeader.toString().split(";")
    // );

    cookieStore.set(
      setCookieHeader.toString().split("=")[0],
      setCookieHeader?.toString().split("=")[1].split(";")[0],
      {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        expires: new Date(Date.now() + 15 * 60 * 1000),
      },
    );

    if (refreshTokenRes.data.status === 200) {
      console.log("Refreshed");
      return {
        status: true,
        access_token: setCookieHeader?.toString().split("=")[1].split(";")[0],
      };
    } else {
      console.log("Failed Refreshed");
      clearSession();
      redirect("/login");
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
