"use client";

import { verifySessionAPI } from "@/services/auth.service";

const isAuthenticated = async (): Promise<{
  status: boolean;
  access_token?: string;
}> => {
  try {
    const verifySessionRes = await verifySessionAPI();

    console.log("verifySessionRes: ", verifySessionRes.data);

    if (verifySessionRes.data && verifySessionRes.status === 200) {
      return {
        status: true,
        access_token: verifySessionRes.data.access_token,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    console.log("isAuthenticated - Error: ", error);
    return {
      status: false,
    };
  }
};

export default isAuthenticated;
