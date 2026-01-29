"use server";

import { cookies } from "next/headers";

export const setAccessToken = async (token: string, exp: Date) => {
  const cookiesStore = await cookies();

  cookiesStore.set("GSRTC_ACCESS_TOKEN", token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
    path: "/",
    sameSite:
      process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
    expires: new Date(exp),
  });
};

export const clearSession = async () => {
  const cookiesStore = await cookies();

  cookiesStore.set("GSRTC_ACCESS_TOKEN", "", {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
    path: "/",
    sameSite:
      process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
    maxAge: 0,
  });

  cookiesStore.set("GSRTC_SESSION", "", {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
    path: "/",
    sameSite:
      process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
    maxAge: 0,
  });
};
