import { NextResponse } from "next/server";
import { searchWikipediaGames } from "@/lib/scrapers/wikipedia/search-games";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {

    const results = await searchWikipediaGames(q);

    return NextResponse.json(results);

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}