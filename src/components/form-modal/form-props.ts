import z from "zod";

export const gameFormSchema = z.object({
  game_data: z.object({
    id: z.number(),
    name: z.string().min(1, "Nome do jogo é obrigatório."),
    summary: z.string().optional(),
    release_date: z.string().optional(),
    developers: z.string().optional(),
    total_rating: z.number().min(0).max(100).optional(),
    cover: z.string().url().optional()
  }),

  player_data: z.object({
    status: z.string(),
    hours_played: z.number().min(0, "Horas jogadas não pode ser negativo."),
    rating: z.number().min(0).max(10).optional(),
    review: z.string().max(500).optional()
  })
});

export const defaultValues = {
  game_data: {
    id: 1,
    name: "zelda",
    release_date: "2020",
    developers: "",
    total_rating: 100,
    cover: "https://placehold.co/400/orange/white",
    summary: "Good Game - IGN"
  },
  player_data: {
    status: "Wishlist",
    hours_played: 0,
    rating: undefined,
    review:
      "Joguei todos, zerei TODOS. Essa é a diferença de um fã pra um fanboy. -  Jones, Davy"
  }
};
