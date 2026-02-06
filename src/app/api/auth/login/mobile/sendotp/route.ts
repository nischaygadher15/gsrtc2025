import {
  EmailLoginResponse,
  MobileLoginResponse,
} from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    const mobileLoginRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/login/mobile`,
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

    const mobileLogin: MobileLoginResponse = await mobileLoginRes.json();

    console.log("emailLogin: ", mobileLogin, mobileLoginRes);

    if (mobileLoginRes.status === 200 && mobileLogin.otp_id) {
      return Response.json({ ...mobileLogin }, { status: 200 });
    } else if (mobileLogin.status === 400) {
      return Response.json({ ...mobileLogin }, { status: 200 });
    } else {
      return Response.json(
        { message: mobileLogin.message },
        { status: mobileLoginRes.status },
      );
    }
  } catch (error: any) {
    console.log("mobileLoginRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
