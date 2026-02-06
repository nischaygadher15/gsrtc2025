import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get("GSRTC_REFRESH_TOKEN");

    if (!refresh_token) {
      return Response.json({ message: "No refresh token" }, { status: 401 });
    }

    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/session/refresh`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );

    const refresh = await refreshRes.json();

    console.log("refreshRes: ", refresh, refreshRes.status);

    if (refreshRes.status === 200) {
      cookieStore.set("GSRTC_ACCESS_TOKEN", refresh.access_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(refresh.access_token_expires_at),
      });

      cookieStore.set("GSRTC_REFRESH_TOKEN", refresh.refresh_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(refresh.refresh_token_expires_at),
      });

      return Response.json(
        {
          user: refresh.user,
          session_id: refresh.session_id,
        },
        { status: 200 },
      );
    } else {
      return Response.json(
        { message: refresh.message ?? "Error occurred while refreshing!" },
        { status: refreshRes.status },
      );
    }
  } catch (error: any) {
    console.log("refresh:-Error: ", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
