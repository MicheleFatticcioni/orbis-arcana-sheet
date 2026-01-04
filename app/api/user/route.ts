import { query } from "@/utils/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await query(`INSERT INTO users (username, password) VALUES (${data.username}, ${data.password}) RETURNING *`);
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}