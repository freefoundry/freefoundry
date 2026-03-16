import { NextResponse } from "next/server";
import { fetchRSS } from "@/importers/rssImporter";
import { saveRawOpportunity } from "@/importers/saveRawOpportunity";

export async function GET() {

  try {

    const items = await fetchRSS("https://dev.to/feed");

    let count = 0;

    for (const item of items.slice(0, 20)) {
      await saveRawOpportunity(item);
      count++;
    }

    return NextResponse.json({
      success: true,
      imported: count
    });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }

}