"use server";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { cookies } from "next/headers";

const getDeviceId = async () => {
  const cookieStore = await cookies();
  let get_device_id = cookieStore.get("gsrtc_device_id")?.value;

  if (!get_device_id) {
    const fpAgent = FingerprintJS.load();
    const fp = await fpAgent;
    const newDeviceId = await fp.get();

    cookieStore.set("gsrtc_device_id", newDeviceId.visitorId, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_APP_ENV === "production",
      sameSite:
        process.env.NEXT_PUBLIC_APP_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 400 * 24 * 60 * 60 * 1000,
    });

    return newDeviceId.visitorId;
  } else {
    return get_device_id;
  }
};

export default getDeviceId;
