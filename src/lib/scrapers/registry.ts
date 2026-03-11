// scrapers/registry.ts

import { wikipediaScraper } from "./wikipedia/scraper"
import { steamScraper } from "./steam/scraper"
import { mobyScraper } from "./mobygames/scraper"

export const scrapers = [
  wikipediaScraper,
  steamScraper,
  mobyScraper
]