import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Period } from "@/lib/types";

function normalizePeriod(period: string | null): Period {
  if (period === "weekly") return "weekly";
  if (period === "monthly") return "monthly";
  if (period === "daily") return "daily";
  return "all";
}

export async function GET(request: NextRequest) {
  const period = normalizePeriod(request.nextUrl.searchParams.get("period"));
  const sortField = period === "weekly" ? "weeklyWagered" : period === "monthly" ? "monthlyWagered" : "totalWagered";
  const users = await prisma.user.findMany({
    orderBy: { [sortField]: "desc" },
    take: 50,
  });

  return NextResponse.json(users);
}
