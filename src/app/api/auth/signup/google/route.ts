import { EmailLoginResponse } from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
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

    const googleSignupRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/signup/google`,
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

    const googleSignup: EmailLoginResponse = await googleSignupRes.json();

    console.log("googleSignup: ", googleSignup, googleSignupRes);

    if (googleSignupRes.status === 201 && googleSignup.access_token) {
      cookieStore.set("GSRTC_ACCESS_TOKEN", googleSignup.access_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(googleSignup.access_token_expires_at),
      });

      cookieStore.set("GSRTC_REFRESH_TOKEN", googleSignup.refresh_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(googleSignup.refresh_token_expires_at),
      });

      return Response.json(
        {
          session_id: googleSignup.session_id,
          user: googleSignup.user,
          message: googleSignup.message,
        },
        { status: 201 },
      );
    } else {
      return Response.json(
        { message: googleSignup.message },
        { status: googleSignupRes.status },
      );
    }
  } catch (error: any) {
    console.log("googleSignupRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
