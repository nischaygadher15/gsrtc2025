import { EmailLoginResponse } from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    const emailLoginRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/login/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": user_agent ?? "",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(body),
      },
    );

    const emailLogin: EmailLoginResponse = await emailLoginRes.json();

    console.log("emailLogin: ", emailLogin, emailLoginRes);

    if (emailLoginRes.status === 200 && emailLogin.access_token) {
      cookieStore.set("GSRTC_ACCESS_TOKEN", emailLogin.access_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(emailLogin.access_token_expires_at),
      });

      cookieStore.set("GSRTC_REFRESH_TOKEN", emailLogin.refresh_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(emailLogin.refresh_token_expires_at),
      });

      return Response.json(
        {
          session_id: emailLogin.session_id,
          user: emailLogin.user,
          message: emailLogin.message,
        },
        { status: 200 },
      );
    } else {
      return Response.json(
        { message: emailLogin.message },
        { status: emailLoginRes.status },
      );
    }
  } catch (error: any) {
    console.log("emailLoginRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
