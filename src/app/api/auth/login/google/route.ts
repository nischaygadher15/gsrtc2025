import { EmailLoginResponse } from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const authorization = req.headers.get("authorization");
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    if (!authorization) {
      return Response.json(
        { message: "Unauthorized request!" },
        { status: 401 },
      );
    }

    const googleLoginRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/login/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
          "User-Agent": user_agent ?? "",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(body),
      },
    );

    const googleLogin: EmailLoginResponse = await googleLoginRes.json();

    console.log("googleLogin: ", googleLogin, googleLoginRes);

    if (googleLoginRes.status === 200 && googleLogin.access_token) {
      cookieStore.set("GSRTC_ACCESS_TOKEN", googleLogin.access_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(googleLogin.access_token_expires_at),
      });

      cookieStore.set("GSRTC_REFRESH_TOKEN", googleLogin.refresh_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(googleLogin.refresh_token_expires_at),
      });

      return Response.json(
        {
          session_id: googleLogin.session_id,
          user: googleLogin.user,
          message: googleLogin.message,
        },
        { status: 200 },
      );
    } else {
      return Response.json(
        { message: googleLogin.message },
        { status: googleLoginRes.status },
      );
    }
  } catch (error: any) {
    console.log("googleLoginRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
