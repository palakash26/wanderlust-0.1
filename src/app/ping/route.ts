import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "success",
      message: "Server is active and alive!",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200 }
  );
}
