import { EmailLoginResponse } from "@/types/auth/auth.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    const forgotPassRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/forgot/password`,
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

    const forgotPass = await forgotPassRes.json();

    console.log("forgotPass: ", forgotPass, forgotPassRes);

    if (forgotPassRes.status === 200 && forgotPass.message) {
      return Response.json(
        {
          message: forgotPass.message,
        },
        { status: 200 },
      );
    } else {
      return Response.json(
        { message: forgotPass.message },
        { status: forgotPassRes.status },
      );
    }
  } catch (error: any) {
    console.log("forgotPassRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
