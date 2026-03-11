import { GameSearchResult } from "@/lib/scrapers/core/types"

type WikiSearchResponse = {
  query?: {
    search?: {
      pageid: number
      title: string
      snippet: string
    }[]
  }
}

export async function searchWikipediaGames(
  query: string
): Promise<GameSearchResult[]> {

  const api =
    "https://en.wikipedia.org/w/api.php" +
    "?action=query" +
    "&list=search" +
    "&srsearch=" +
    encodeURIComponent(`${query} video game`) +
    "&srlimit=10" +
    "&format=json"

  const res = await fetch(api)

  if (!res.ok) return []

  const data = (await res.json()) as WikiSearchResponse
  const pages = data.query?.search ?? []

  return pages.map(p => ({
    title: p.title,
    url: `https://en.wikipedia.org/?curid=${p.pageid}`,
    source: "wikipedia"
  }))
}