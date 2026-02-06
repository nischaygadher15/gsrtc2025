import { MobileLoginResponse } from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    const otpResendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/login/mobile/otp/resend`,
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

    const otpResend: MobileLoginResponse = await otpResendRes.json();

    console.log("otpResend: ", otpResend, otpResendRes);

    if (otpResendRes.status === 200 && otpResend.otp_id) {
      return Response.json({ ...otpResend }, { status: 200 });
    } else {
      return Response.json(
        { message: otpResend.message },
        { status: otpResendRes.status },
      );
    }
  } catch (error: any) {
    console.log("otpResendRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
