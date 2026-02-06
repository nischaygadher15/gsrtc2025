import { EmailLoginResponse } from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    const logoutRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/logout`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": user_agent ?? "",
          Cookie: cookieStore.toString(),
        },
      },
    );

    const logout: EmailLoginResponse = await logoutRes.json();

    console.log("emailLogin: ", logout, logoutRes);

    if (logoutRes.status === 200) {
      cookieStore.set("GSRTC_ACCESS_TOKEN", "", {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      cookieStore.set("GSRTC_REFRESH_TOKEN", "", {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return Response.json({ message: logout.message }, { status: 200 });
    } else {
      return Response.json(
        { message: logout.message },
        { status: logoutRes.status },
      );
    }
  } catch (error: any) {
    console.log("logoutRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
