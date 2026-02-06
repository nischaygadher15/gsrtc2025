import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user_agent = req.headers.get("user-agent");
  const cookieStore = await cookies();

  try {
    const emailSignupRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/signup/email`,
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

    const emailSignup = await emailSignupRes.json();

    console.log("emailLogin: ", emailSignup, emailSignupRes.status);

    if (emailSignupRes.status === 201 && emailSignup.access_token) {
      cookieStore.set("GSRTC_ACCESS_TOKEN", emailSignup.access_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(emailSignup.access_token_expires_at),
      });

      cookieStore.set("GSRTC_REFRESH_TOKEN", emailSignup.refresh_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(emailSignup.refresh_token_expires_at),
      });

      return Response.json(
        {
          session_id: emailSignup.session_id,
          user: emailSignup.user,
          message: emailSignup.message,
        },
        { status: 201 },
      );
    } else {
      return Response.json(
        { message: emailSignup.message },
        { status: emailSignupRes.status },
      );
    }
  } catch (error: any) {
    console.log("emailSignupRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
