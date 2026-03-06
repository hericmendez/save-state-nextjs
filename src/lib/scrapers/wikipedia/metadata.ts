// src/lib/scrapers/wikipedia/metadata.ts
import { findWikipediaGamePage } from "./find-game-page";
import { fetchWikipediaPage } from "./fetch-page";
import { parseInfobox } from "./parse-infobox";
import { parseSummary } from "./parse-summary";
import type { ScrapedGameMetadata } from "./types";

export async function scrapeWikipediaGameMetadata(
  query: string
): Promise<ScrapedGameMetadata | null> {
  const pageUrl = await findWikipediaGamePage(query);
  if (!pageUrl) return null;

  const $ = await fetchWikipediaPage(pageUrl);

  const title =
    $("#firstHeading").text().trim() || query;

  const summary = parseSummary($);
  const infoboxData = parseInfobox($);
  console.log("infoboxData ==> ", infoboxData);

  return {
    name: title,
    summary,
    ...infoboxData
  };
}
