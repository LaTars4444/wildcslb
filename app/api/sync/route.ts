import { NextRequest, NextResponse } from "next/server";
import { syncLeaderboardData } from "@/lib/sync-service";

export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-sync-secret");
  const expectedSecret = process.env.SYNC_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncLeaderboardData();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Sync failed", error: String(error) }, { status: 500 });
  }
}
