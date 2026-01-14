import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const pregeneratedDir = path.join(process.cwd(), "public/pregenerated");

    if (!fs.existsSync(pregeneratedDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs
      .readdirSync(pregeneratedDir)
      .filter((file) => file.endsWith(".json"));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading pregenerated directory:", error);
    return NextResponse.json(
      { error: "Failed to list pregenerated files" },
      { status: 500 }
    );
  }
}
