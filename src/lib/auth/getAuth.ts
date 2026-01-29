"use client";

import { ReduxStore } from "@/redux/store";
import isAuthenticated from "./isAuthenticated";
import { refreshSession } from "./refreshSession";
import { redirect } from "next/navigation";
import { sessionLogout, setSession } from "@/redux/slices/session/sessionSlice";
import toast from "react-hot-toast";

export async function getAuth(isProtectedRoute: boolean = false) {
  try {
    // Verify the session
    const isAuth = await isAuthenticated();

    if (isAuth.status === 401) {
      console.log("Not Authenticated");

      // Check if session expired
      let isRefreshed = await refreshSession();

      console.log("isRefreshed: ", isRefreshed);

      if (isRefreshed.status === 200 && isRefreshed.access_token) {
        ReduxStore.dispatch(setSession(isRefreshed.access_token));
      } else {
        ReduxStore.dispatch(sessionLogout());
        if (isProtectedRoute) {
          toast.error("Please login again!");
          redirect("/");
        }
      }

      return isRefreshed;
    }

    return isAuth;
  } catch (error: unknown) {
    const err = error as { message: string };

    if (err.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.log("getAuth-Error: ", error);
    toast.error(err.message);
  }
}
