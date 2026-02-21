import { z } from "zod";

export const upsertPropertySchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    price: z.number().min(1, "Preço deve ser maior que zero"),
    isActive: z.boolean(),
});

export type UpsertPropertyFormData = z.infer<typeof upsertPropertySchema>;
