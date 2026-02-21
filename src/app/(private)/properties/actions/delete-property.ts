"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/db";
import { property } from "@/db/schema/property-schema";

const deletePropertySchema = z.object({
    id: z.string().min(1, "ID é obrigatório"),
});

export const deleteProperty = actionClient
    .inputSchema(deletePropertySchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { success: false, serverError: "Não autorizado." };
        }

        const existing = await db
            .select({ id: property.id })
            .from(property)
            .where(
                and(
                    eq(property.id, parsedInput.id),
                    eq(property.userId, session.user.id)
                )
            );

        if (existing.length === 0) {
            return { success: false, serverError: "Imóvel não encontrado." };
        }

        try {
            await db
                .delete(property)
                .where(
                    and(
                        eq(property.id, parsedInput.id),
                        eq(property.userId, session.user.id)
                    )
                );

            revalidatePath("/properties");

            return { success: true };
        } catch {
            return { success: false, serverError: "Erro ao excluir imóvel." };
        }
    });
