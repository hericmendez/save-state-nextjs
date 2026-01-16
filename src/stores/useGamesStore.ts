import { create } from 'zustand'

export type Game = {
  _id: string
  name: string
  gameListIds: string[]
}

type GamesState = {
  games: Game[]
  loading: boolean
  error: string | null

  loadGames: () => Promise<void>
  createGame: (name: string) => Promise<void>
  updateGame: (gameId: string, name: string) => Promise<void>
  deleteGame: (gameId: string) => Promise<void>

  addGameToList: (gameId: string, listId: string) => Promise<void>
  removeGameFromList: (gameId: string, listId: string) => Promise<void>
}

export const useGamesStore = create<GamesState>((set, get) => ({
  games: [],
  loading: false,
  error: null,

  loadGames: async () => {
    try {
      set({ loading: true, error: null })

      const res = await fetch('/api/games')
      if (!res.ok) throw new Error(`Erro ${res.status}`)

      set({ games: await res.json() })
    } catch (err) {
      console.error('loadGames:', err)
      set({ error: 'Erro ao carregar jogos' })
    } finally {
      set({ loading: false })
    }
  },

  createGame: async payload => {
    const res = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Erro ao criar jogo')

    const game = await res.json()
    set(state => ({ games: [...state.games, game] }))
    return game
  },

  updateGame: async (id, payload) => {
    const res = await fetch(`/api/games/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Erro ao atualizar jogo')

    await get().loadGames()
  },

  deleteGame: async gameId => {
    await fetch(`/api/games/${gameId}`, {
      method: 'DELETE'
    })

    await get().loadGames()
  },

  addGameToList: async (gameId, listId) => {
    await fetch(`/api/games/${gameId}/lists/${listId}`, {
      method: 'POST'
    })

    await get().loadGames()
  },

  removeGameFromList: async (gameId, listId) => {
    await fetch(`/api/games/${gameId}/lists/${listId}`, {
      method: 'DELETE'
    })

    await get().loadGames()
  }
}))
