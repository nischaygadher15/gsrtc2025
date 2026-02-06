import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user_agent = req.headers.get("user-agent");
    const cookieStore = await cookies();

    const resetPassRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/reset/password`,
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

    const resetPass = await resetPassRes.json();

    console.log("forgotPass: ", resetPass, resetPassRes);

    if (resetPassRes.status === 200 && resetPass.message) {
      return Response.json(
        {
          message: resetPass.message,
        },
        { status: 200 },
      );
    } else {
      return Response.json(
        { message: resetPass.message },
        { status: resetPassRes.status },
      );
    }
  } catch (error: any) {
    console.log("resetPassRes:-Error: ", error);

    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }
}
