
import { NextResponse } from "next/server"
import { scrapeGame } from "@/lib/scrapers/core/engine"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const source = searchParams.get("source")
  const url = searchParams.get("url")

  if (!source || !url) {
    return NextResponse.json(
      { error: "Missing params" },
      { status: 400 }
    )
  }

  const data = await scrapeGame(source, url)

  return NextResponse.json(data)
}