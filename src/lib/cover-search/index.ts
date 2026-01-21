// lib/cover-search/index.ts
import { CoverSearchInput, CoverResult } from "./types";
import { wikipediaCoverProvider } from "./providers/wikipedia-provider";
import { scoreWikiResult } from "./ranker";

export async function searchGameCovers(
  input: CoverSearchInput
): Promise<CoverResult[]> {
  const results: CoverResult[] = [];

  const wikiResults = await wikipediaCoverProvider(input.query);
  results.push(...wikiResults);
  console.log("wikiResults ==> ", wikiResults);

  // aplica score individual
  const ranked = results.map((result) => ({
    ...result,
    confidence: scoreWikiResult(result.title, input.query)
  }));

  // ordena do mais relevante pro menos
  ranked.sort((a, b) => b.confidence - a.confidence);

  return ranked;
}
