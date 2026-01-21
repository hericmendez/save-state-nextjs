// src/lib/cover-search/client.ts
import type { CoverResult } from "@/lib/cover-search/types";

export async function searchGameCoversClient(query: string) {
  const start = Date.now();
  // search

  const res = await fetch("/api/cover-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });
  console.log("cover-search:", Date.now() - start, "ms");
  console.log("res ==> ", res);
  if (!res.ok) {
    throw new Error("Erro ao buscar capas");
  }

  const data = await res.json();
  return data.results as CoverResult[];
}
