"use client";

import isAuthenticated from "./isAuthenticated";
import { refreshSession } from "./refreshSession";
import { redirect } from "next/navigation";

export async function getAuth() {
  // Verify the session
  const isAuth = await isAuthenticated();

  if (!isAuth.status) {
    console.log("Not Authenticated");
    // redirect("/");

    // Check if session expired
    // let isRefreshed = await refreshSession();

    // console.log("isRefreshed: ", isRefreshed);

    // if (!isRefreshed.status) {
    //   redirect("/login");
    // }

    // return isRefreshed;
  }

  return isAuth;
}
