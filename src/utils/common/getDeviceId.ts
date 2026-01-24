"use server";

import { cookies } from "next/headers";

export const getDeviceId = async () => {
  const cookieStore = await cookies();
  let get_device_id = cookieStore.get("GSRTC_DEVICE_ID")?.value;
  return get_device_id ?? null;
};

export const setDeviceId = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set("GSRTC_DEVICE_ID", id, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
    sameSite:
      process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
    path: "/",
    maxAge: 400 * 24 * 60 * 60 * 1000,
  });

  return true;
};
