"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { searchGameCoversClient } from "@/lib/cover-search/client";
import type { CoverResult } from "@/lib/cover-search/types";

export function GameCoverSearchTest() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CoverResult[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSelected(null);

    try {
      const data = await searchGameCoversClient(query);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível buscar capas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 max-w-xl">
      <div className="flex gap-2">
        <Input
          placeholder="Digite o nome do jogo"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar capa"}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {results.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {results.map((cover) => (
            <button
              key={cover.id}
              type="button"
              onClick={() => setSelected(cover.id)}
              className={clsx(
                "rounded-md overflow-hidden border transition",
                selected === cover.id
                  ? "ring-2 ring-primary border-primary"
                  : "border-muted hover:border-foreground/40"
              )}
            >
              <img
                src={cover.url}
                alt="Capa do jogo"
                className="aspect-[2/3] object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="text-sm text-muted-foreground">
          Capa selecionada: {results.find((r) => r.id === selected)?.source}
        </div>
      )}
    </div>
  );
}
