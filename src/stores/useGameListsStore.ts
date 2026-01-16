
import { create } from "zustand";

export type GameList = {
  _id: string;
  name: string;
  gamesCount?: number;
};

type GameListsState = {
  lists: GameList[];
  loading: boolean;
  error: string | null;

  loadLists: () => Promise<void>;
  createList: (name: string) => Promise<void>;
  updateList: (listId: string, name: string) => Promise<void>;
  deleteList: (listId: string) => Promise<void>;
};

export const useGameListsStore = create<GameListsState>((set, get) => ({
  lists: [],
  loading: false,
  error: null,

  loadLists: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("/api/game-lists?withCount=true");
      if (!res.ok) throw new Error(`Erro ${res.status}`);

      set({ lists: await res.json() });
    } catch (err) {
      console.error("loadLists:", err);
      set({ error: "Erro ao carregar listas" });
    } finally {
      set({ loading: false });
    }
  },

  createList: async (name) => {
    await fetch("/api/game-lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    await get().loadLists();
  },

  updateList: async (listId, name) => {
    await fetch(`/api/game-lists/${listId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    await get().loadLists();
  },

  deleteList: async (listId) => {
    await fetch(`/api/game-lists/${listId}`, {
      method: "DELETE",
    });

    await get().loadLists();
  },
}));
