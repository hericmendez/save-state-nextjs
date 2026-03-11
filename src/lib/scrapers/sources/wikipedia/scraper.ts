//src/lib/scrapers/soruces/wikipedia/scraper.ts
import { GameScraper } from "@/lib/scrapers/core/types"
import { searchWikipediaGames } from "./search"
import { fetchWikipediaPage } from "./fetch-page"
import { parseInfobox } from "./parse-infobox"
import { parseSummary } from "./parse-summary"

export const wikipediaScraper: GameScraper = {

  source: "wikipedia",

  async search(query) {
    return searchWikipediaGames(query)
  },

  async scrape(url) {

    const $ = await fetchWikipediaPage(url)

    const title = $("#firstHeading").text().trim()

    const summary = parseSummary($)
    const infobox = parseInfobox($)

    return {
      name: title,
      summary,
      ...infobox,
      release_date: infobox.release_date ? parseInt(infobox.release_date, 10) : undefined
    }
  }

}