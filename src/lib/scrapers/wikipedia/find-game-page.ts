// src/lib/scrapers/wikipedia/find-game-page.ts
type WikiSearchResponse = {
  query?: {
    search?: {
      pageid: number
      title: string
    }[]
  }
}

export async function findWikipediaGamePage(query: string) {
  const api =
    "https://en.wikipedia.org/w/api.php" +
    "?action=query" +
    "&list=search" +
    "&srsearch=" +
    encodeURIComponent(`${query} video game`) +
    "&srlimit=5" +
    "&format=json";

  const res = await fetch(api, {
    headers: {
      "User-Agent": "SaveStateBot/1.0 (metadata-scraper)"
    }
  });

  if (!res.ok) return null;

  const data = (await res.json()) as WikiSearchResponse;
  const pages = data.query?.search ?? [];

  if (!pages.length) return null;

  // heurística simples e eficaz (MVP)
  const best = pages.find(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  ) ?? pages[0];

  return `https://en.wikipedia.org/?curid=${best.pageid}`;
}
