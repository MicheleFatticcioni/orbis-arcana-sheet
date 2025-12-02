import { NextResponse } from "next/server";
import { getSheets, createSheet } from "@/utils/db";

export async function GET() {
  try {
    const sheets = await getSheets();
    return NextResponse.json(sheets);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sheets" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newSheet = await createSheet(data);
    return NextResponse.json(newSheet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create sheet" },
      { status: 500 }
    );
  }
}
