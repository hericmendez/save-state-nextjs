export type GameSearchResult = {
  title: string
  url: string
  source: string
}

export type GameMetadata = {
  name: string
  summary?: string
  release_date?: number
  developers?: string[]
  publishers?: string[]
  genres?: string[]
  platforms?: string[]
}

export interface GameScraper {
  source: string

  search(query: string): Promise<GameSearchResult[]>

  scrape(url: string): Promise<GameMetadata | null>
}