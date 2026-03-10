//src/app/api/scraper/game-search/route.ts
import { NextResponse } from "next/server";
import { scrapeWikipediaGameMetadata } from "@/lib/scrapers/wikipedia/metadata";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json(
      { error: "Missing title" },
      { status: 400 }
    );
  }

  try {
    const data = await scrapeWikipediaGameMetadata(title);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to scrape metadata" },
      { status: 500 }
    );
  }
}
