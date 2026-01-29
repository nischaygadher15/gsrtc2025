"use client";

import { verifySessionAPI } from "@/services/auth.service";

const isAuthenticated = async (): Promise<{
  status: number;
  access_token?: string;
}> => {
  try {
    const verifySessionRes = await verifySessionAPI();

    console.log("verifySessionRes: ", verifySessionRes);

    if (verifySessionRes && verifySessionRes.status === 200) {
      return {
        status: 200,
      };
    } else {
      if (verifySessionRes && verifySessionRes.status === 401)
        console.log("Need Refreshing");
      return {
        status: 401,
      };
    }
  } catch (error) {
    console.log("isAuthenticated - Error: ", error);
    return {
      status: 500,
    };
  }
};

export default isAuthenticated;
