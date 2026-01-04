import { hashPassword } from "@/utils/auth.services";
import { query } from "@/utils/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    const data = await request.json();

    // Check if username and password exists
    if (!data.username || !data.password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(data.password);
    const result = await query<{ id: number; username: string }>`
      INSERT INTO users (username, password)
      VALUES (${data.username}, ${hashedPassword})
      RETURNING id, username
    `;

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
