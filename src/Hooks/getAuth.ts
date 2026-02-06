import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuth = async (isProtected: boolean = false) => {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("GSRTC_ACCESS_TOKEN");
    const refresh_token = cookieStore.get("GSRTC_REFRESH_TOKEN");

    console.log("getAuth:");

    if (!access_token && !refresh_token) {
      if (isProtected) {
        redirect("/");
      }

      return {
        user: null,
      };
    }

    const verifySessionRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/session/verify`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );

    const verifySession = await verifySessionRes.json();

    console.log("verifySession: ", verifySession);

    if (verifySessionRes.status === 401) {
      console.log("Need refresh");

      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL!}/api/auth/refresh`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
        },
      );

      const refresh = await refreshRes.json();

      console.log("refresh: ", refresh);

      return refresh;
    }

    return {
      user: verifySession.user,
    };
  } catch (error: any) {
    console.log("getAuth:-Error: ", error);

    if (isRedirectError(error)) {
      throw error; // Let Next.js handle the redirect
    }

    if (isProtected) {
      redirect("/");
    }
  }
};

export default getAuth;
