import { NextRequest, NextResponse } from "next/server";
import valyu from "@/lib/valyu";
import type { CountryCode } from "valyu-js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "latest news today";
  const country = (searchParams.get("country") || "US") as CountryCode;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;

  try {
    const response = await valyu.search(query, {
      searchType: "news",
      countryCode: country,
      startDate,
      endDate,
      maxNumResults: 20,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Valyu search error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news", results: [] },
      { status: 500 }
    );
  }
}
