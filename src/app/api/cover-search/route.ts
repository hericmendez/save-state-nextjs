// app/api/cover-search/route.ts
import { NextResponse } from "next/server";
import { searchGameCovers } from "@/lib/cover-search";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.query || typeof body.query !== "string") {
      return NextResponse.json({ error: "Query inválida" }, { status: 400 });
    }

    const results = await searchGameCovers({
      query: body.query,
      platform: body.platform,
      year: body.year
    });

    return NextResponse.json({
      query: body.query,
      results
    });
  } catch (err) {
    console.error("[COVER_SEARCH]", err);
    return NextResponse.json(
      { error: "Erro ao buscar capas" },
      { status: 500 }
    );
  }
}
