// src/lib/scrapers/wikipedia/types.ts
export type ScrapedGameMetadata = {
  name: string
  summary?: string
  release_date?: number
  developers?: string
  publishers?: string
  genres?: string
  platforms?: string
  rating?: number
}
