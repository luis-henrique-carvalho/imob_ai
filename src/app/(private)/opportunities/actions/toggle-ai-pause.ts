"use server";

import { db } from "@/db";
import { opportunity } from "@/db/schema/opportunity-schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

const toggleAiPauseSchema = z.object({
    id: z.string(),
    isAiPaused: z.boolean(),
});

export const toggleAiPause = actionClient
    .inputSchema(toggleAiPauseSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { success: false, serverError: "Não autorizado." };
        }

        try {
            await db
                .update(opportunity)
                .set({ isAiPaused: parsedInput.isAiPaused })
                .where(
                    and(
                        eq(opportunity.id, parsedInput.id),
                        eq(opportunity.userId, session.user.id)
                    )
                );

            return {
                success: true,
                message: "Status da IA atualizado com sucesso.",
            };
        } catch (error) {
            return { success: false, serverError: "Erro ao atualizar status da IA." };
        }
    });
