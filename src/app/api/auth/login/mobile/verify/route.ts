import { EmailLoginResponse } from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    const otpVerifyRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/login/mobile/otp/verify`,
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

    const otpVerify: EmailLoginResponse = await otpVerifyRes.json();

    console.log("otpVerify: ", otpVerify, otpVerifyRes);

    if (otpVerifyRes.status === 200 && otpVerify.access_token) {
      cookieStore.set("GSRTC_ACCESS_TOKEN", otpVerify.access_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(otpVerify.access_token_expires_at),
      });

      cookieStore.set("GSRTC_REFRESH_TOKEN", otpVerify.refresh_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(otpVerify.refresh_token_expires_at),
      });

      return Response.json(
        {
          session_id: otpVerify.session_id,
          user: otpVerify.user,
          message: otpVerify.message,
        },
        { status: 200 },
      );
    } else {
      return Response.json(
        { message: otpVerify.message },
        { status: otpVerifyRes.status },
      );
    }
  } catch (error: any) {
    console.log("otpVerifyRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
