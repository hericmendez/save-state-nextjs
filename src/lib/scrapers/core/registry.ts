import { GameScraper } from "./types"
import { wikipediaScraper } from "@/lib/scrapers/sources/wikipedia/scraper"

export const scrapers: GameScraper[] = [
  wikipediaScraper
]