"use server";

import { verifySessionAPI } from "@/services/auth.service";
import { cookies } from "next/headers";

const isAuthenticated = async (): Promise<{
  status: boolean;
  access_token?: string;
}> => {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("GSRTC_ACCESS_TOKEN")?.value;
    const session = cookieStore.get("GSRTC_SESSION")?.value;

    console.log("cookieStore: ", access_token, session);

    if (!access_token || !session) {
      return {
        status: false,
      };
    }

    const verifySessionRes = await verifySessionAPI(access_token, session);

    console.log("verifySessionRes: ", verifySessionRes);

    if (verifySessionRes.status === 200) {
      return {
        status: true,
        access_token: verifySessionRes.access_token,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    console.log("isAuthenticated - Error: ", error);
    throw error;
  }
};

export default isAuthenticated;
