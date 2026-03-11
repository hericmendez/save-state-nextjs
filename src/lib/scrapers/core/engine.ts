import { scrapers } from "./registry"

export async function searchGames(query: string) {

  const results = await Promise.all(
    scrapers.map(scraper => scraper.search(query))
  )

  return results.flat()
}

export async function scrapeGame(source: string, url: string) {

  const scraper = scrapers.find(s => s.source === source)

  if (!scraper) {
    throw new Error(`Unknown scraper source: ${source}`)
  }

  return scraper.scrape(url)
}