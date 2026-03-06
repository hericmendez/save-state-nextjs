// lib/cover-search/providers/mock-provider.ts
import { CoverResult } from "../types";
export async function mockCoverProvider(query: string): Promise<CoverResult[]> {
  await new Promise((r) => setTimeout(r, 400));

  return [
    {
      id: "1",
      url: "https://placehold.co/300x450?text=Cover+1",
      source: "mock-db",
      confidence: 0.92
    },
    {
      id: "2",
      url: "https://placehold.co/300x450?text=Cover+2",
      source: "mock-db",
      confidence: 0.81
    },
    {
      id: "3",
      url: "https://placehold.co/300x450?text=Cover+3",
      source: "mock-db",
      confidence: 0.65
    }
  ];
}
