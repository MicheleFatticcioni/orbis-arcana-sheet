import { NextResponse } from "next/server";
import { comparePassword, signJWT } from "@/utils/auth.services";
import { query } from "@/utils/query";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  try {
    // Mock authentication
    const users = await query<
      {
        id: number;
        username: string;
        password: string;
      }[]
    >`
      SELECT id, username, password
      FROM users
      WHERE username = ${username}
      LIMIT 1
    `;

    if (!users.length || users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await signJWT({ username });

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
