import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  platform: z.string().optional(),
  progress: z.number().min(0).max(100),
})
